<template>
    <panel header = "Список каналов">
        <table border="1" class="table table-hover shadow" width="100%">
            <tr>
                <td><b>№</b></td>
                <td><b>name</b></td>
                <td><b>description</b></td>
                <td><b>logo</b></td>
                <td><b>Макс. в день</b></td>
                <td><b>create_date</b></td>
                <td><b>update_date</b></td>
                <td></td>
                <td></td>
            </tr>
                <tr v-for="channel in channels" :key="channel.id">
                <td>{{ channel.id }}</td>
                <td>{{ channel.name }}</td>
                <td>{{ channel.description }}</td>
                <td><img :src="logoPrefix + channel.logo"></td>
                <td>{{ channel.max_ads_per_day }}</td>
                <td>{{ format_date(channel.create_date) }}</td>
                <td v-if="channel.update_date">{{ format_date(channel.update_date) }}</td>
                <td v-else></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td><input class="form-control" type="text" name="name" v-model="channel.name"></td>
                <td><input class="form-control" type="text" name="name" v-model="channel.description"></td>
                <td><input class="form-control-sm" type="file" accept="image/*" @change="onImageChanged($event)" id="file-input"></td>
                <td><input class="form-control" type="number" min="0" name="name" v-model="channel.max_ads_per_day"></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button type="submit" class="btn btn-primary" @click="addChannel()">Добавить</button></td>
            </tr>
        </table>
    </panel>
</template>

<script>
import panel from '../components/Panel.vue'
import moment from 'moment'

export default {
    components: {
        panel
    },
    data: function(){
        return {
            channel:{
                name: '',
                description: '',
                max_ads_per_day: ''
            },
            channelLogo: null,
        }
    },
    computed:{
        channels(){
            return this.$store.state.channels.channels;
        },
        logoPrefix(){
            return (this.$store._modules.root.state.apiPrefix).replace('api', 'uploads/');
        }
    },
    created(){
        this.getChannels()
    },
    methods: {
        getChannels () {
            this.$store.dispatch('channels/getChannels')
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        format_date(value){
         if (value) {
           return moment(String(value)).format('YYYY/MM/DD HH:mm')
          }
      },
        addChannel(){
            try{
                const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
                if(!allowedTypes.includes(this.channelLogo.type)){
                    throw new Error("Логотип может быть только картинкой")
                }
                if(this.channelLogo.size > 1500000){
                    throw new Error("Максимальный размер файла - 15МБ")
                }
                let formData = new FormData();
                formData.append('logo', this.channelLogo);
                this.$store.dispatch('channels/uploadLogo', formData)
                .then(res => {
                    if(res && res.status == 200 && res.data.success){
                        this.channel.logo = res.data.filename;
                        this.$store.dispatch('channels/addChannel', this.channel)
                        .then(()=>{
                            setTimeout(()=>{this.success = false},3000)
                            this.clearFields()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            catch(e){
                console.log(e)
            }
        },
        onImageChanged(event){
            this.channelLogo = event.target.files[0]
        },
        clearFields(){
            this.channel.name = '';
            this.channel.description = '';
            this.channel.max_ads_per_day = '';
            this.channel.channelLogo = null;
        }
    },
}
</script>

<style>
img{
    width: 150px;
    height: 70px;
}
table{
    word-break: normal;
    text-align-last: left;
}
td:nth-child(1){
    width: 3%;
}
td:nth-child(2){
    width:10%;
}
td:nth-child(3){
    width: 20%;
}
td:nth-child(4){
    width: 20%;
}
td:nth-child(5){
    width: 10%;
}
td:nth-child(6){
    width: 10%;
}
td:nth-child(7){
    width: 10%;
}
</style>
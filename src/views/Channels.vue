<template>
    <panel header = "Список каналов">
        <table width="100%">
            <tr>
                <td><b>№</b></td>
                <td><b>name</b></td>
                <td><b>description</b></td>
                <td><b>logo</b></td>
                <td><b>Макс. в день</b></td>
                <td></td>
                <td></td>
            </tr>
                <tr v-for="channel in channels" :key="channel.id">
                <td>{{ channel.id }}</td>
                <td>{{ channel.name }}</td>
                <td>{{ channel.description }}</td>
                <td><img class="channel-logo" :src="logoPrefix + channel.logo"></td>
                <td>{{ channel.max_ads_per_day }}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td><input type="text" name="name" v-model="channel.name"></td>
                <td><input type="text" name="name" v-model="channel.description"></td>
                <td><input type="file" accept="image/*" @change="onImageChanged($event)" id="file-input"></td>
                <td><input type="number" min="0" name="name" v-model="channel.max_ads_per_day"></td>
                <td></td>
                <td><button @click="addChannel()">Добавить</button></td>
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

<style scoped>
/* table{
    word-break: break-all;
    text-align-last: left;
} */
table, th, td {
    max-height: 50px;
    /* text-align: center; */
    word-break: normal;
    border: 1px solid rgba(131, 123, 123, 0.397);
}
td:nth-child(1){
    width: 1%;
}
td:nth-child(2){
    width: 5%;
}
td:nth-child(3){
    word-break: break-all;
    min-width: 200px;
    width: 10%;
}
td:nth-child(4){
    width: 5%;
}
td:nth-child(5){
    width: 4%;
}
td:nth-child(6){
    width: 5%;
}
td:nth-child(7){
    width: 5%;
}
td:nth-child(8){
    width: 3%;
}
td:nth-child(9){
    width: 3%;
}
</style>
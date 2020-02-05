<template>
<panel header = "Список каналов">
        <table border="1" class="table">
            <tr>
                <td><b>№</b></td>
                <td><b>username</b></td>
                <td><b>name</b></td>
                <td><b>phone</b></td>
                <td><b>email</b></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
                <tr v-for="channel in channels" :key="channel.id">
                <td>{{ channel.id }}</td>
                <td>{{ channel.name }}</td>
                <td>{{ channel.description }}</td>
                <td>{{ channel.logo }}</td>
                <td>{{ channel.max_ads_per_day }}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <!-- <td><input class="form-control" type="text" name="username" v-model="user.username"></td>
                <td><input class="form-control" type="text" name="name" v-model="user.name"></td>
                <td><input class="form-control" type="text" name="phone" v-model="user.phone"></td>
                <td><input class="form-control" type="text" name="email" v-model="user.email"></td> -->
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button type="submit" class="btn btn-primary">Добавить</button></td>
            </tr>
        </table>
    </panel>
</template>

<script>
import panel from '../components/Panel.vue'

export default {
    components: {
        panel
    },
    data: function(){
        return {
            
        }
    },
    computed:{
        channels(){
            return this.$store.state.channels.channels;
        },
    },
    created(){
        this.getChannels()
    },
    methods: {
        getChannels () {
            this.$store.dispatch('channels/getChannels', this.$route.params.id)
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                console.log(this.channels)
                this.isLoading = false; 
            })    
        }
    },
}
</script>
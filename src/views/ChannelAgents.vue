<template>
    <panel header = "Агенты каналов">
        <table border="1" class="table table-hover shadow" width="100%">
            <tr>
                <td><b>№</b></td>
                <td><b>Канал</b></td>
                <td><b>Агент</b></td>
                <td></td>
                <td></td>
            </tr>
            <tr v-for="channelAgent in channelAgents" :key="channelAgent.id">
                <td>{{ channelAgent.id }}</td>
                <td>{{ channelAgent.channel.name }}</td>
                <td>{{ channelAgent.user.username }}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <select class="form-control form-control-sm shadow" v-model="channelAgent.channelId">
                        <option disabled value=''>Канал</option>
                        <option v-for="channel in channels" :key="channel.id" :value="channel.id">
                            {{ channel.channel.name }}
                        </option>
                    </select>
                </td>
                <td>
                    <select class="form-control form-control-sm shadow" v-model="channelAgent.userId">
                        <option disabled value=''>Пользователь</option>
                        <option v-for="user in users" :key="user.id" :value="user.id">
                            {{ user.username }}
                        </option>
                    </select>
                </td>
                <td></td>
                <td><button type="submit" class="btn btn-primary" @click="addchannelAgent()">Добавить</button></td>
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
            channelAgent:{
                channelId: '',
                userId: ''
            },
            channelAgents: [],
            channels: []
        }
    },
    computed:{
        users(){
            return this.$store.state.users.users;
        }
    },
    created(){
        this.getMyChannelsAdmin()
        this.getUsers()
        this.getChannelsAgents()
    },
    methods: {
        getMyChannelsAdmin () {
            this.$store.dispatch('channels/getMyChannelsAdmin')
            .then(res => {
                console.log(res)
                this.channels = res
            })
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        getChannelsAgents () {
            this.$store.dispatch('channels/getChannelsAgents')
            .then(res => {
                this.channelAgents = res
            })
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        getUsers () {
            this.$store.dispatch('users/getUsers')
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        addchannelAgent(){
            try{
                this.$store.dispatch('channels/addchannelAgent', this.channelAgent)
                .then(
                    console.log("nice")
                )
                .catch(err=>{
                    console.log(err)
                })
            }
            catch(e){
                console.log(e)
            }
        }
    },
}
</script>

<style scoped>
table{
    word-break: break-all;
    border: 1px solid rgba(131, 123, 123, 0.397);
    text-align-last: left;
    height: 100%;
}
td:nth-child(1){
    width: 3%;
}
td:nth-child(2){
    width: 20%;
}
td:nth-child(3){
    width: 20%;
}
td:nth-child(4){
    width: 5%;
}
td:nth-child(5){
    width: 5%;
}
</style>
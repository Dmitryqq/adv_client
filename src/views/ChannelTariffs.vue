<template>
    <panel header = "Тарифы каналов">
        <table border="1" class="table table-hover shadow" width="100%">
            <tr>
                <td><b>№</b></td>
                <td><b>Канал</b></td>
                <td><b>Тариф</b></td>
                <td><b>Цена</b></td>
                <td></td>
                <td></td>
            </tr>
            <tr v-for="channelTariff in channelTariffs" :key="channelTariff.id">
                <td>{{ channelTariff.id }}</td>
                <td>{{ channelTariff.channel.name }}</td>
                <td>{{ channelTariff.tariff.type }}</td>
                <td>{{ channelTariff.price }}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <select class="form-control form-control-sm shadow" v-model="channelTariff.channelId">
                        <option disabled value=''>Канал</option>
                        <option v-for="channel in channels" :key="channel.id" :value="channel.id">
                            {{ channel.channel.name }}
                        </option>
                    </select>
                </td>
                <td>
                    <select class="form-control form-control-sm shadow" v-model="channelTariff.tariffId">
                        <option disabled value=''>Тариф</option>
                        <option v-for="tariff in tariffs" :key="tariff.id" :value="tariff.id">
                            {{ tariff.type }}
                        </option>
                    </select>
                </td>
                <td><input class="form-control form-control-sm" type="text" v-model="channelTariff.price"></td>
                <td></td>
                <td><button type="submit" class="btn btn-primary" @click="addChannelAdmin()">Добавить</button></td>
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
            channelTariff:{
                channelId: '',
                tariffId: '',
                price: ''
            },
            channelTariffs: [],
            channels: []
        }
    },
    computed:{
        tariffs(){
            return this.$store.state.tariffs.tariffs;
        },
    },
    created(){
        this.getMyChannelsTariffs()
        this.getMyChannelsAgent()
        this.getTariffs()
    },
    methods: {
        getMyChannelsTariffs() {
            this.$store.dispatch('channels/getMyChannelsTariffs')
            .then((res)=>{
                this.channelTariffs = res;
            })
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        getMyChannelsAgent() {
            this.$store.dispatch('channels/getMyChannelsAgent')
            .then((res)=>{
                this.channels = res;
            })
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        getTariffs () {
            this.$store.dispatch('tariffs/getTariffs')
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
    },
}
</script>

<style scoped>
table{
    word-break: break-all;
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
    width: 10%;
}
td:nth-child(5){
    width: 5%;
}
td:nth-child(6){
    width: 5%;
}
</style>
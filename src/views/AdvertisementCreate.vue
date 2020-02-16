<template>
    <div class="advcreate">
        <div class="adv_text shadow">
            <div class="form-group green-border-focus">
                <label for="exampleFormControlTextarea5">Текст объявления</label>
                <textarea class="form-control" id="exampleFormControlTextarea5" rows="3" v-on:input="countLetters" v-model="adv_text"></textarea>
                <label>Длина: {{length}}, букв: {{letters}}, слов: {{words}}</label>
            </div>
        </div>
        <div class="adv_channels shadow">
            <table class="table table-hover shadow">
                <tr>
                    <td></td>
                    <td>Лого</td>
                    <td>Название</td>
                    <td>Тип оплаты</td>
                    <td>Прайс</td>
                    <td>Даты</td>
                    <td>Стоимость</td>
                </tr>
                <tr v-for="channel in channels" :key="channel.id" :title='channel.description'>
                    <td>
                        <div class="switch_box box_1">
                            <input type="checkbox" class="switch_1 shadow" v-model="channel.checked" @change="channel.tariff='';methodThatForcesUpdate()">
                        </div>
                    </td>
                    
                    <td><img :src="logoPrefix + channel.logo"></td>
                    <td>{{channel.name}}</td>
                    <td>
                        <select class="form-control form-control-sm shadow" :disabled="!channel.checked" v-model="channel.tariff" @change="methodThatForcesUpdate()">
                            <option disabled value="">Тариф</option>
                            <option v-for="channelTariff in getTariffsForChannel(channel)" :key="channelTariff.id" :value="channelTariff">
                                {{ channelTariff.tariff.type }}
                            </option>
                        </select>
                    </td>
                    <td v-if="channel.tariff">{{channel.tariff.price}} сом</td>
                    <td v-else></td>
                    <td v-if="channel.checked">
                        <vc-date-picker mode="multiple" color='teal' :min-date='new Date()' v-model='channel.dates' :masks="{ input: 'DD.MM.YY', data: 'DD/MM/YYYY' }" :input-props='{
                            class: "w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 hover:border-blue-5",
                            placeholder: "Выберите даты",
                            readonly: true
                        }'
                        @input="methodThatForcesUpdate()"/>
                    </td>
                    <td v-else><input class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 hover:border-blue-5 color-gray" disabled/></td>
                    <td v-if="channel.tariff && channel.dates && channel.dates.length>0">{{channel.tariff.price * letters * channel.dates.length}} сом</td>
                    <td v-else></td>
                </tr>
                <tr>
                    <td colspan="5"></td>
                    <td align="right"><b>Итого:</b></td>
                    <td>{{calculateSum()}} сом</td>
                </tr>
            </table>
            <button type="submit" class="btn btn-primary btn float-right" @click="adCreate()">Создать</button>
            <!-- {{channelsTariffs}} -->
        </div>
    </div>
</template>

<script>

export default {
    components: {
        
    },
    data: function(){
        return {
            adv_text: null,
            length: 0,
            letters: 0,
            words: 0,
            channelsTariffs: [],
            advChannels: [],
            tariff: '',
            mode: 'single'
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
    beforeMount(){
        this.getChannelsTariffs()
    },
    methods: {
        // getAdvertisementChannel () {
        //     this.$store.dispatch('advertisements/getAdvertisementChannel', this.$route.params.id)
        //     .then((res)=>{
        //         this.advertisement = res;
        //     })
        //     .catch(err=>{
        //         this.error = err.message;
        //     })   
        //     .finally(()=>{
        //         this.isLoading = false; 
        //     })    
        // },
        async adCreate() {
            this.$store.dispatch('advertisements/addAdvertisement', {"adv_text": this.adv_text})
            .then((res) => {
                if(res && res.id){
                    this.channels.forEach(channel => {
                        if(this.checkFields(channel)){
                            // let advChannel = await this.generateAdvChannel(channel, res.id);'
                            console.log(channel.id)
                            let advChannel = {};
                            advChannel.channelId = channel.id;
                            advChannel.advertisementId = res.id;
                            advChannel.tariffId = channel.tariff.tariff.id;
                            advChannel.statusId = 1;
                            this.$store.dispatch('advertisements/addAdvertisementChannel', advChannel)
                            .then((res) => {
                                let advChannelDates = {};
                                advChannelDates.advertisementchannelId = res.id;
                                advChannelDates.dates = channel.dates;
                                this.$store.dispatch('advertisements/addAdvertisementChannelDates', advChannelDates)
                                .then((res) => {
                                    console.log(res)
                                    
                                })
                                .catch(err=>{
                                    console.log(err.message);
                                })
                            })
                            .catch(err=>{
                                console.log(err.message);
                            })
                        }
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            })   
            .finally(()=>{
                this.isLoading = false; 
            })   
        },
        async generateAdvChannel(channel, id){
            var advChannel;
            advChannel.channelId = channel.id;
            advChannel.advertisementId = id;
            advChannel.tariffId = channel.tariff.tariff.id;
            advChannel.statusId = 1;
            return advChannel;
        },
       async getChannels () {
            this.$store.dispatch('channels/getChannels')
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.channels.map(item => {
                        item.checked = false,
                        item.tariff = "",
                        item.dates = []
                    })
                this.isLoading = false; 
            })    
        },
        async getChannelsTariffs () {
            this.$store.dispatch('channels/getChannelsTariffs')
            .then((res)=>{
                this.channelsTariffs = res;
            })
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        getTariffsForChannel(channel){
            let tariffs = [];
            this.channelsTariffs.forEach(element =>{
                if(channel.id == element.channel.id){
                    tariffs.push(element);
                }
            })
            return tariffs;
        },
        countLetters(){
            if (this.adv_text) {
                this.length = this.adv_text.length;
                this.letters = this.adv_text.replace(/\s+/g, '').length;
                this.words = this.adv_text.split(/\s+/).length;
            }
            else{
                this.length = 0;
                this.letters = 0;
                this.words = 0;
            }
        },
        methodThatForcesUpdate() {
            this.$forceUpdate();
        },
        calculateSum(){
            let sum = 0
            this.channels.forEach(channel => {
                if(channel.checked && channel.tariff && channel.dates && channel.dates.length)
                    sum += channel.tariff.price * this.letters * channel.dates.length;
            });
            return sum;
        },
        checkFields(channel){
            if(channel.checked && channel.tariff != '' && channel.dates.length > 0)
                return true;
            else
                return false;
        }
    },
}
</script>

<style scoped>
.advcreate{
    width: 80%;
    margin: auto;
    /* padding-top: 20px; */
}
.adv_text{
    padding: 20px;
    margin-top: 20px;
    background: #f0f0f0d3;
    outline: 3px solid gray;
    outline-style: auto;
}
.adv_channels{
    margin-top: 20px;
    background: #f0f0f0d3;
    outline: 3px solid gray;
    outline-style: auto;
}
.form-control{
    min-height: 40px;
    max-height: 90px;
    height: 65px;
}
.wrapper{
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	width: 400px;
	margin: 50vh auto 0;
	-ms-flex-wrap: wrap;
    flex-wrap: wrap;
	-webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}

.switch_box{
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	/* max-width: 200px;
	min-width: 200px;
	height: 200px; */
	-webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
	-webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
	-webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

/* Switch 1 Specific Styles Start */

/* .box_1{
	background: #eee;
} */

input[type="checkbox"].switch_1{
	font-size: 20px;
	-webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
	width: 3.5em;
	height: 1.5em;
	background: #ddd;
	border-radius: 3em;
	position: relative;
	cursor: pointer;
	outline: none;
	-webkit-transition: all .2s ease-in-out;
	transition: all .2s ease-in-out;
  }
  
  input[type="checkbox"].switch_1:checked{
	background: #0ebeff;
  }
  
  input[type="checkbox"].switch_1:after{
	position: absolute;
	content: "";
	width: 1.5em;
	height: 1.5em;
	border-radius: 50%;
	background: #fff;
	-webkit-box-shadow: 0 0 .25em rgba(0,0,0,.3);
    box-shadow: 0 0 .25em rgba(0,0,0,.3);
	-webkit-transform: scale(.7);
    transform: scale(.7);
	left: 0;
	-webkit-transition: all .2s ease-in-out;
	transition: all .2s ease-in-out;
  }
  
  input[type="checkbox"].switch_1:checked:after{
	left: calc(100% - 1.5em);
  }
  input:disabled {
  background: #e9ecef;
}

/* td{
    vertical-align: middle;
} */
td:nth-child(1){
    width: 8%;
}
td:nth-child(2){
    width:10%;
}
td:nth-child(3){
    width: 15%;
}
td:nth-child(4){
    width: 20%;
}
td:nth-child(5){
    width: 10%;
}
td:nth-child(6){
    width: 5%;
}
</style>
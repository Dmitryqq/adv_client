<template>
    <div class="advcreate">
        <div class="adv_text">
                <b>ТЕКСТ ОБЪЯВЛЕНИЯ</b>
                <textarea class="adv-text" v-on:input="countLetters" v-model="adv_text"></textarea>
                <label>Длина: {{length}}, букв: {{letters}}, слов: {{words}}</label>
        </div>
        <div class="adv_channels">
            <table id="t01" style="width:100%">
                <tr>
                    <td></td>
                    <td colspan="2"><b>Канал</b></td>
                    <!-- <td>Название</td> -->
                    <td><b>Тип оплаты</b></td>
                    <td><b>Прайс</b></td>
                    <td><b>Даты</b></td>
                    <td><b>Стоимость</b></td>
                </tr>
                <tr v-for="channel in channels" :key="channel.id" :title='channel.description'>
                    <td>
                        <div class="switch_box box_1">
                            <input type="checkbox" class="switch_1 shadow" v-model="channel.checked" @change="channel.tariff='';methodThatForcesUpdate()">
                        </div>
                    </td>
                    
                    <td><img :src="logoPrefix + channel.logo" class="channel-logo"></td>
                    <td>{{channel.name}}</td>
                    <td>
                        <select :disabled="!channel.checked" v-model="channel.tariff" @change="methodThatForcesUpdate()">
                            <option disabled value="">Тариф</option>
                            <option v-for="channelTariff in getTariffsForChannel(channel)" :key="channelTariff.id" :value="channelTariff">
                                {{ channelTariff.tariff.type }}
                            </option>
                        </select>
                    </td>
                    <td v-if="channel.tariff">{{channel.tariff.price}} сом</td>
                    <td v-else></td>
                    <td v-if="channel.checked">
                        <vc-date-picker class="date-picker" mode="multiple" color='teal' :min-date='new Date()' v-model='channel.dates' :masks="{ input: 'DD.MM', data: 'DD/MM/YYYY' }" :input-props='{
                            placeholder: "Выберите даты",
                            readonly: true,
                        }'
                        @input="methodThatForcesUpdate()"/>
                    </td>
                    <td v-else><input class="date-picker-disabled" disabled/></td>
                    <td v-if="channel.tariff && channel.tariff.tariff.id == 1 && channel.dates && channel.dates.length>0">{{channel.tariff.price * letters * channel.dates.length}} сом</td>
                    <td v-else-if="channel.tariff && channel.tariff.tariff.id == 2 && channel.dates && channel.dates.length>0">{{channel.tariff.price * words * channel.dates.length}} сом</td>
                    <td v-else></td>
                </tr>
                <tr>
                    <td colspan="5"></td>
                    <td style="text-align:right"><b>Итого:</b></td>
                    <td>{{calculateSum()}} сом</td>
                </tr>
            </table>
            <button class="button button1" style="margin-left: auto; display: block; margin-top: 20px" @click="adCreate()">Создать</button>
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
        this.getChannelsTariffs()
    },
    beforeMount(){
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
            this.$store.dispatch('advertisements/addAdvertisement', {"adv_text": this.adv_text, "channels": this.channels})
            .then((res) => {
                if(res && res.id){
                    this.channels.forEach(channel => {
                        if(this.checkFields(channel)){
                            // let advChannel = await this.generateAdvChannel(channel, res.id);'
                            let advChannel = {};
                            advChannel.channelId = channel.id;
                            advChannel.advertisementId = res.id;
                            advChannel.tariffId = channel.tariff.tariff.id;
                            advChannel.statusId = 1;
                            advChannel.days = channel.dates.length;
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
            await this.$store.dispatch('channels/getChannels')
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.channels.map(item => {
                        item.checked = false,
                        item.tariff = '',
                        item.dates = []
                    })
                this.isLoading = false; 
            })    
        },
        async getChannelsTariffs () {
            await this.$store.dispatch('channels/getChannelsTariffs')
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
                    if(channel.tariff.tariff.id == 1)
                        sum += channel.tariff.price * this.letters * channel.dates.length;
                    else
                        sum += channel.tariff.price * this.words * channel.dates.length;
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

<style>
select option:disabled{
    color: gray;
}
.advcreate{
    width: 100%;
    height: calc(100% + 400px);
    margin: auto;
    font-size: 18px;
    padding-top: 100px;
    background-image: url("../../public/4cf2f0b3f95698b0758a239d7fea30f0.jpg");
    background-size: 50%;

    padding-bottom: 100px;
}
.adv_text, .adv_channels{
    width: 70%;
    margin: 0 15%;
    padding: 20px 10px 10px 10px;
    color: black;
    background-image: url("../../public/adv_text_background.png");
    background-size: 100% 120%;
    background-position: center;
    box-shadow: 5px 5px 20px 3px #696969;
}
.adv_channels{
    margin-top: 20px;
}
textarea {
  width: 96%;
  height: 75px;
  padding: 10px 10px;
  margin: 0 2%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  resize: none;
}
select {
  width: 100%;
  padding: 5px 6px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
}
table, th, td {
    /* height: 50px; */
    word-break:normal;
    text-align: center;
    /* border: 1px solid rgba(131, 123, 123, 0.349); */
}
.date-picker /deep/ input {
    display: block !important;
    max-width: 200px;
    width: 92% !important;
    color: #495057 !important;
    background-color: #fff !important;
    background-clip: padding-box !important;
    border: 1px solid #ced4da !important;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out !important;
    padding: .25rem .5rem !important;
    font-size: .875rem !important;
    line-height: 1.5 !important;
    border-radius: .2rem !important;
}
.date-picker-disabled {
    display: block !important;
    width: 92% !important;
    color: #495057 !important;
    background-color: #fff !important;
    background-clip: padding-box !important;
    border: 1px solid #ced4da !important;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out !important;
    padding: .25rem .5rem !important;
    font-size: .875rem !important;
    line-height: 1.5 !important;
    border-radius: .2rem !important;
}

.switch_box{
  /* max-width: 100%; */
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
input[type="checkbox"].switch_1{
	/* font-size: 100%; */
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
table#t01 tr:nth-child(1) {
  background-color: rgba(95, 158, 160, 0.6);
  max-height: 30px;
}
table#t01 tr:last-child {
  background-color: rgba(95, 158, 160, 0.6);
  max-height: 30px;
}
.channel-logo {
    width: 15vw;
    /* height: 70px; */
    border-radius: 10%;
  max-width: 100px;
  height: auto;
}

@media screen and (max-width: 1280px) {
  div, .dropbtn {
    font-size: 18px;
  }
  .adv_text, .adv_channels{
      width: 90%;
      margin: 20px 5% 0;
  }
}

@media screen and (max-width: 992px) {
  div, .dropbtn {
    font-size: 15px;
  }
}

@media screen and (max-width: 767px) {
  div, .dropbtn {
    font-size: 12px;
  }
  select.form-control{
      font-size: 12px;
      min-width: 75px;
      /* max-width: 90px; */
  }
  .table td, .table th{
      padding-left: 0.15rem;
      padding-right: 0.15rem;
  }
    
  .w-full{
      min-width: 25px;
  }
  .adv_text, .adv_channels{
      width: 90%;
      margin: 0 2% 10px;
  }
}
@media screen and (max-width: 500px) {
  
  .adv_channels tr:not(:first-child) td:nth-child(2) {
        visibility: hidden;
        width: auto;
        max-width: 0px;
    }
    .adv_channels tr:last-child td:nth-child(2) {
        visibility:visible;
    }
    .adv_channels td:nth-child(6) {
        width: 40%;
    }
    input[type="checkbox"].switch_1{
	width: 2.5em;
	height: 1.0em;
  }
  input[type="checkbox"].switch_1:after{
	width: 1.0em;
	height: 1.0em;
  }
}
</style>
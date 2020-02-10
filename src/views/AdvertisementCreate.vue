<template>
    <div class="advcreate">
        <div class="adv_text">
            <div class="form-group green-border-focus">
                <label for="exampleFormControlTextarea5">Текст объявления</label>
                <textarea class="form-control" id="exampleFormControlTextarea5" rows="3" v-on:input="countLetters" v-model="adv_text"></textarea>
                <label>Длина: {{lenght}}, букв: {{letters}}, слов: {{words}}</label>
            </div>
        </div>
        <div class="adv_channels">
            <table class="table table-hover">
                <tr>
                    <td></td>
                    <td>Лого</td>
                    <td>Название</td>
                    <td>Тип оплаты</td>
                    <td></td>
                    <td>Даты</td>
                    <td>Стоимость</td>
                </tr>
                <tr v-for="channel in channels" :key="channel.id">
                    <td>
                        <div class="switch_box box_1">
                            <input type="checkbox" class="switch_1" v-model="channel.checked">
                        </div>
                    </td>
                    
                    <td>{{channel.logo}}</td>
                    <td>{{channel.name}}</td>
                    <td>
                        <div class="form-group">
                            <select class="form-control form-control-sm" v-model="channel.tariff">
                                <option value="" selected disabled>Тариф</option>
                                <option v-for="channelTariff in getTariffsForChannel(channel)" :key="channelTariff.id" :value="channelTariff">
                                    {{ channelTariff.tariff.type }}
                                </option>
                            </select>
                        </div>
                    </td>
                    <td v-if="channel.tariff">{{channel.tariff.price}} сом</td>
                    <td v-else></td>
                    <td>Datepicker</td>
                    <td>...сом</td>
                </tr>
            </table>
            <!-- {{channelsTariffs}} -->
        </div>
    </div>
</template>

<script>
// import panel from '../components/Panel.vue'

export default {
    components: {
        // panel
    },
    data: function(){
        return {
            adv_text: '',
            lenght: 0,
            letters: 0,
            words: 0,
            channelsTariffs: [],
            advChannels: [],
            tariff: '',

        }
    },
    computed:{
        channels(){
            return this.$store.state.channels.channels;
        },
    },
    created(){
        this.getChannels()
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
        getChannels () {
            this.$store.dispatch('channels/getChannels')
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        getChannelsTariffs () {
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
                this.lenght = this.adv_text.length;
                this.letters = this.adv_text.replace(/\s+/g, '').length;
                this.words = this.adv_text.match(/(\w+)/g).length;
            }
            else{
                this.lenght = 0;
                this.letters = 0;
                this.words = 0;
            }
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

.box_1{
	background: #eee;
}

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
</style>
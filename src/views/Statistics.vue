<template>
  <div class="statistics">
      <div class="menu">
        <select class="dropdownlist" v-model="channel">
            <option disabled value=''>Выберите канал</option>
            <option v-for="channel in channels" :key="channel.id" :value="channel.id">
                {{ channel.channel.name }}
            </option>
        </select>
        <select class="dropdownlist" v-model="type" @change="clearFields()">
            <option disabled value=''>Выберите тип</option>
            <option v-for="type in types" :key="type.id" :value="type.id">
                {{ type.name }}
            </option>
        </select>
        <select v-if="type==1" class="dropdownlist" v-model="month">
            <option disabled value=''>Выберите месяц</option>
            <option v-for="month in months" :key="month.id" :value="month.id">
                {{ month.name }}
            </option>
        </select>
        <select v-if="type==1" class="dropdownlist" v-model="year">
            <option disabled value=''>Выберите год</option>
            <option>2020</option>
        </select>
        <vc-date-picker v-if="type==2" class="date-picker-statistic" mode="single" color='teal' v-model='start' :masks="{ input: 'DD.MM.YYYY', data: 'DD/MM/YYYY' }" :input-props='{
            placeholder: "Начальная дата",
            readonly: true,
        }'/>
        <vc-date-picker v-if="type==2" :min-date='start' class="date-picker-statistic" mode="single" color='teal' v-model='end' :masks="{ input: 'DD.MM.YYYY', data: 'DD/MM/YYYY' }" :input-props='{
            placeholder: "Конечная дата",
            readonly: true,
        }'/>
        <button class="button button1" style="height:30px;" :disabled="type == ''" @click="fillData">Показать</button>
    </div>
    <div class="small">
    <line-chart :styles="myStyles" v-if="countcollection != {} || countcollection.datasets.length>0" :chart-data="countcollection"></line-chart>
    <line-chart :styles="myStyles" v-if="incomecollection != {} || incomecollection.datasets.length>0 " :chart-data="incomecollection"></line-chart>
    <!-- <div class="advchannel">

    </div> -->
  </div>
  </div>
</template>

<script>
import LineChart from '../components/LineChart'

export default {
    components: {
      LineChart
    },
    data(){
        return {
            channel: '',
            type: '',
            types: [
              {
                  id: 1,
                  name: "За месяц"
              },
              {
                  id: 2,
                  name: "За период"
              }  
            ],
            months: [
              {
                  id: 1,
                  name: "Январь"
              },
              {
                  id: 2,
                  name: "Февраль"
              },
              {
                  id: 3,
                  name: "Март"
              },
              {
                  id: 4,
                  name: "Апрель"
              },
              {
                  id: 5,
                  name: "Май"
              },
              {
                  id: 6,
                  name: "Июнь"
              },
              {
                  id: 7,
                  name: "Июль"
              },
              {
                  id: 8,
                  name: "Август"
              },
              {
                  id: 9,
                  name: "Сентябрь"
              },
              {
                  id: 10,
                  name: "Октябрь"
              },
              {
                  id: 11,
                  name: "Ноябрь"
              },
              {
                  id: 12,
                  name: "Декабрь"
              }  
            ],
            year: '',
            month: '',
            start: '',
            end: '',
            channels: [],
            countcollection: {},
            incomecollection: {},
        }
    },
     mounted () {
      this.fillData()
    },
    computed:{
        myStyles () {
            return {
                width: '100%',
                position: 'relative'
            }
    }
    },
    created (){
        this.getMyChannelsAdmin()
    },
    methods:{
        getMyChannelsAdmin () {
            this.$store.dispatch('channels/getMyChannelsAdmin')
            .then(res => {
                this.channels = res
            })
            .catch(err=>{
                this.error = err.message;
            })   
        },
        fillData () {
            if(this.start != '' && this.end != '')
            {
                this.$store.dispatch("statistics/getStatisticsForRange", {start: this.start, end: this.end, channel: this.channel})
                .then((res)=>
                {
                    this.countcollection = {
                        labels: res.map(a => a.date),
                        datasets: [
                            {
                                label: 'Заказы',
                                backgroundColor: '#f87979',
                                data: res.map(a => a.count),
                                barPercentage: 10.5,
                                barThickness: 16,
                                maxBarThickness: 18,
                                minBarLength: 2,
                            },
                        ],
                    }
                    this.incomecollection = {
                        labels: res.map(a => a.date),
                        datasets: [
                            {
                                label: 'Выручка',
                                backgroundColor: '#98AFC7',
                                data: res.map(a => a.total),
                                barPercentage: 10.5,
                                barThickness: 16,
                                maxBarThickness: 18,
                                minBarLength: 2,
                        }, 
                        ],
                    }
                })
                .catch(err => {
                    this.error = err.message;
                })
            }
            else if(this.year != '' && this.month != '')
            {
                this.$store.dispatch("statistics/getStatisticsForMonth", {year: this.year, month: this.month, channel: this.channel})
                .then((res)=>{
                    this.countcollection = {
                        labels: res.map(a => a.date),
                        datasets: [
                            {
                                label: 'Заказы',
                                backgroundColor: '#f87979',
                                data: res.map(a => a.count),
                                barPercentage: 10.5,
                                barThickness: 16,
                                maxBarThickness: 18,
                                minBarLength: 2,
                            },
                        ],
                    }
                    this.incomecollection = {
                        labels: res.map(a => a.date),
                        datasets: [
                            {
                                label: 'Выручка',
                                backgroundColor: '#98AFC7',
                                data: res.map(a => a.total),
                                barPercentage: 10.5,
                                barThickness: 16,
                                maxBarThickness: 18,
                                minBarLength: 2,
                        }, 
                        ],
                    }
                })
                .catch(err => {
                this.error = err.message;
                })
            }
            this.clearFields()
      },
      clearFields(){
          this.year = '';
          this.month = '';
          this.start = '';
          this.end = '';
      }
    }
};
</script>
<style>
.statistics {
  width: 70%;
  height: auto;
  margin: 90px auto 50px auto;
  padding: 20px;
  background: #f0f0f0d3;
  outline: 3px solid gray;
  z-index: 1;
  outline-style: auto;
}
.menu{
    padding: 0 5%;
}
.dropdownlist{
    width: 20%;
    max-width: 200px;
    margin: 5px;
    outline: 1px solid #ced4da;
}
.date-picker-statistic /deep/ input {
    width: 20% !important;
    max-width: 18% !important;
    margin: 0 5px;
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
.small {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    /* margin:  150px auto; */
  }
</style>
<template>
  <div class="payment">
      <div class="advtext">Текст объявления: {{advertisement.adv_text}}</div>
      <div class="advchannel" v-if="adv_channels.length == undefined">
          Телеканал: {{adv_channels.channel.name}} <br>
          Тариф: {{adv_channels.tariff.type}} ({{adv_channels.tariff.description}}) <br>
          Даты: <ul style="background-color: transparent; margin-left: 20px; padding: 0px"><li v-for="date in adv_channels.dates" :key="date.id" style="float:none; text-align:left; list-style-type: disc;">
              {{date.date}}
            </li></ul> <br>
          К оплате: {{adv_channels.total_price}} сом <br>
    </div>
      <div v-else class="advchannel" v-for="adv_channel in adv_channels" :key="adv_channel.id">
          Телеканал: {{adv_channel.channel.name}} <br>
          Тариф: {{adv_channel.tariff.type}} ({{adv_channel.tariff.description}}) <br>
          Даты: <ul style="background-color: transparent; margin-left: 20px; padding: 0px"><li v-for="date in adv_channel.dates" :key="date.id" style="float:none; text-align:left; list-style-type: disc;">
              {{date.date}}
            </li></ul> <br>
          К оплате: {{adv_channel.total_price}} сом <br>
    </div>
    Итого к оплате: {{sum}} сом <br><br>
    Способ оплаты: <br>
    <input type="radio" value="emoney" v-model="type">
    <label>Электронные деньги</label>
    <br>
    <input type="radio" value="bank" v-model="type">
    <label>Банковская карта</label>
    <br>
    <input type="radio" value="balance" v-model="type">
    <label>Баланс аккаунта</label>
    <br>
    <br>
    <button class="button button1" :disabled="type != 'balance'" @click="pay()">Оплатить</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            type: 'emoney',
            sum: 0,
        }
    },
    computed:{
        advertisement(){
            return this.$attrs.advertisement;
        },
        adv_channels(){
            return this.$attrs.channel;
        }
    },
    created (){
        this.getSum();
    },
    methods:{
        pay(){
            let advertisement = this.advertisement
            let channel = this.adv_channels.channel
            if(this.adv_channels.length == undefined)
                this.$store.dispatch("advertisements/Pay", {advertisement, channel})
                .then(()=>{
                    this.$store.dispatch("advertisements/getMyAdvertisements")
                    this.$store.dispatch("notifications/getNotifications");
                    this.$router.push('/ads')
                })
                .catch(err => {
                this.error = err.message;
                })
                .finally(() => {
                this.isLoading = false;
                });
            else
            this.adv_channels.forEach(element => {
                    this.$store.dispatch("advertisements/Pay", {advertisement, element})
                    .then(()=>{
                        this.$store.dispatch("advertisements/getMyAdvertisements")
                        this.$store.dispatch("notifications/getNotifications");
                    })
                    .catch(err => {
                    this.error = err.message;
                    })
                    .finally(() => {
                    this.isLoading = false;
                    });
            });
    },
        getSum(){
            if(this.adv_channels.length == undefined)
                this.sum+=this.adv_channels.total_price;
            else{
                this.adv_channels.forEach(element => {
                    this.sum+=element.total_price
                });
            }
        }
    }
};
</script>
<style>
.payment {
  width: 70%;
  margin: 90px auto 50px auto;
  padding: 20px;
  background: #f0f0f0d3;
  outline: 3px solid gray;
  outline-style: auto;
}
.advchannel {
  width: 90%;
  margin: 20px auto 30px auto;
  padding: 20px;
  outline: 3px solid gray;
  outline-style: auto;
}
</style>
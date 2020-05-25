<template>
  <div class="dashboard">
    <div>
      <h1 class="dashboard-label">Текст объявления</h1>
    </div>
    <!-- Рекламы -->
    <main style="margin: 10px;">
      <details v-for="advertisement in advertisements" :key="advertisement.id">
        <summary :tabindex="advertisement.id">
          <span>{{advertisement.adv_text}}</span>
        </summary>
        <!-- Каналы -->
        <details v-for="adv_channel in advertisement.adv_channels" :key="adv_channel.id" open>
          <summary style="width: 97%; margin-left: -1.5em;" :tabindex="adv_channel.id">
            <span>{{adv_channel.channel.name}}</span>
            <span class="status">{{adv_channel.status.name}}</span>
          </summary>
          <div class="row">

          <div class="column left">
            Тариф: {{adv_channel.tariff.type}} <br>
            Стоимость: {{adv_channel.total_price}} сом <br>
            Кол-во дней: {{adv_channel.dates.length}} <br>
            Даты: <ul style="background-color: transparent; margin-left: 20px; padding: 0px;"><li v-for="date in adv_channel.dates" :key="date.id" style="float:none; text-align:left; list-style-type: disc;">
              {{date.date}};
            </li></ul>
          </div>
          <div class="column right">
            <vc-calendar
              mode="multiple"
              color="teal"
              :attributes="generateAttributes(adv_channel.dates)"
            />
          </div>
          
          </div>
          <button v-if="adv_channel.status.id == 1" class="button button1" @click="toPayPage(advertisement, adv_channel)">К оплате</button>
        </details>
        <button class="button button1" v-if="getUnpaid(advertisement.adv_channels)" @click="toPayPage(advertisement, advertisement.adv_channels)">К оплате</button>
        <!-- конец -->
      </details>
    </main>
  </div>
</template>

<script>
// import panel from '../components/Panel.vue'

export default {
  components: {
    // panel
  },
  data: function() {
    return {
      attributes: [
        {
          key: "today",
          highlight: true,
          dates: new Date()
        }
      ]
    };
  },
  computed: {
    advertisements() {
      return this.$store.state.advertisements.advertisements;
    }
  },
  created() {
    this.getMyAdvertisements();
  },
  methods: {
    getMyAdvertisements() {
      this.$store
        .dispatch("advertisements/getMyAdvertisements")
        // .then((res)=>{
        //     this.advertisement = res;
        // })
        .catch(err => {
          this.error = err.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    generateAttributes(advDates) {
      var dates = [];
      advDates.forEach(element => {
        dates.push(element.date);
      });
      var attribut = [
        {
          key: "today",
          highlight: true,
          dates: dates
        }
      ];
      return attribut;
    },
    getUnpaid(adv_channels){
      let counter = 0;
      adv_channels.forEach(element => {
        if(element.status.id == 1)
          counter +=1;
      });
      if(counter <= 1)
        return false
      else
        return true
    },
    toPayPage(advertisement, channel){
      this.$router.replace({name:'payment', params:{advertisement, channel}});
      // this.$store
      //   .dispatch("advertisements/Pay", {advertisement, channel})
      //   .then(()=>{
      //       this.$store.dispatch("advertisements/getMyAdvertisements")
      //       this.$store.dispatch("notifications/getNotifications");
      //   })
      //   .catch(err => {
      //     this.error = err.message;
      //   })
      //   .finally(() => {
      //     this.isLoading = false;
      //   });
    }
  }
};
</script>

<style>
.dashboard {
  width: 70%;
  margin: 90px auto 50px auto;
  padding-bottom: 20px;
  background: #f0f0f0d3;
  outline: 3px solid gray;
  outline-style: auto;
}
.dashboard-label {
  padding: 10px;
}
.column {
  float: left;
  width: 50%;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
.left{
  width: 40%;
}
.right{
  width: 60%;
}
.status {
  font-weight: right;
  text-align: right;
  float: right;
  color: black !important;
  border-bottom: none;
}
@media screen and (max-width: 1280px) {
  .dashboard {
    width: 90%;
  }
}
/* @media screen and (max-width: 767px) {
  
  .dashboard{
      width: 90%;
      margin: 0 5%;
  }
} */
</style>
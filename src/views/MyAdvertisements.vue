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
        <details v-for="adv_channel in advertisement.adv_channels" :key="adv_channel.id">
          <summary style="width: 97%; margin-left: -1.5em;" :tabindex="adv_channel.id">
            <span>{{adv_channel.channel.name}}</span>
            <span class="status">{{adv_channel.status.name}}</span>
          </summary>
          <div class="col">
            Стоимость: {{adv_channel.total_price}}
            Тариф: {{adv_channel.tariff.type}}
          </div>
          <div class="col">
            <vc-calendar
              mode="multiple"
              color="teal"
              :attributes="generateAttributes(adv_channel.dates)"
            />
          </div>
        </details>
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
    }
  }
};
</script>

<style>
.dashboard {
  width: 70%;
  margin: auto;
  padding-bottom: 20px;
  background: #f0f0f0d3;
  outline: 3px solid gray;
  outline-style: auto;
}
.dashboard-label {
  padding: 10px;
}
.status {
  font-weight: right;
  text-align: right;
  float: right;
  color: black !important;
  border-bottom: none;
}
@media screen and (max-width: 1280px) {
  .dashboard{
      width: 90%;
      margin: 20px 5% 0;
  }
}
/* @media screen and (max-width: 767px) {
  
  .dashboard{
      width: 90%;
      margin: 0 5%;
  }
} */
</style>
<template>
  <div class="dashboard">
    <div>
      <h1 class="dashboard-label">Мои каналы</h1>
    </div>
    <!-- Каналы -->
    <main style="margin: 10px;">
      <details v-for="channelAgent in channelAgents" :key="channelAgent.id">
        <summary :tabindex="channelAgent.id">
          <span>{{channelAgent.channel.name}}</span>
        </summary>
        <!-- Рекламы -->
        <details v-for="adv_channel in channelAgent.channel.adv_channels" :key="adv_channel.id">
          <summary style="width: 97%; margin-left: -1.5em;" :tabindex="adv_channel.id">
            <span>{{adv_channel.advertisement.adv_text}}</span>
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
          <div class="buttons" v-if="adv_channel.status.id == 2">
            <button class="button button1" @click="accept(adv_channel.advertisement, channelAgent.channel)">Одобрить</button>
            <button class="button button2" @click="reject(adv_channel.advertisement, channelAgent.channel)">Отклонить</button>
          </div>
        </details>
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
      ],
      channelAgents: [],
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    // advertisements(){
    //     return this.$store.state.advertisements.advertisements;
    // }
    paginatedItems() {
      let page = 1;
      return [].concat.apply(
        [],
        this.items.map((item, index) =>
          index % this.itemsPerPage
            ? []
            : {
                page: page++,
                items: this.items.slice(index, index + this.itemsPerPage)
              }
        )
      );
    },
    currentPageItems() {
      let currentPageItems = this.paginatedItems.find(
        pages => pages.page == this.currentPage
      );
      return currentPageItems ? currentPageItems.items : [];
    }
  },
  created() {
    this.getAdsOnMyChannel();
  },
  methods: {
    getAdsOnMyChannel() {
      this.$store
        .dispatch("advertisements/getAdsOnMyChannel")
        .then(res => {
          this.channelAgents = res;
        })
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
    changePage(pageNumber) {
      if (pageNumber !== this.currentPage) this.currentPage = pageNumber;
    },
    accept(advertisement, channel){
      this.$store
        .dispatch("advertisements/accept", {advertisement, channel})
        .then(()=>{
            this.$store.dispatch("advertisements/getAdsOnMyChannel")
            this.$store.dispatch("notifications/getNotifications");
        })
        .catch(err => {
          this.error = err.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    reject(advertisement, channel){
      this.$store
        .dispatch("advertisements/reject", {advertisement, channel})
        .then(()=>{
            this.$store.dispatch("advertisements/getAdsOnMyChannel")
            this.$store.dispatch("notifications/getNotifications");
        })
        .catch(err => {
          this.error = err.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style>
.status {
  font-weight: right;
  text-align: right;
  float: right;
}
</style>
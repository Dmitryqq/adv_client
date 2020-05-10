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
    }
  }
};
</script>

<style>
.ads_on_my_channel {
  width: 90%;
  margin: auto;
  padding: 20px;
  margin-top: 20px;
  background: #f0f0f0d3;
  outline: 3px solid gray;
  outline-style: auto;
}
.status {
  font-weight: right;
  text-align: right;
  float: right;
}
</style>
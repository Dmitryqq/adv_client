<template>
    <div class="ads_on_my_channel shadow">
        <div class="form-group green-border-focus">
            <label for="exampleFormControlTextarea5">Мои каналы</label>
            <!-- Рекламы -->
            <div class="card" v-for="channelAgent in channelAgents" :key="channelAgent.id">
                <div class="card-header" :id="channelAgent.channel.id">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" :data-target="'#collapse' + channelAgent.channel.id" aria-expanded="true" :aria-controls="'collapse' + channelAgent.channel.id">
                            {{channelAgent.channel.name}}
                        </button>
                    </h5>
                </div>

                <div :id="'collapse' + channelAgent.channel.id" class="collapse" :aria-labelledby="'heading' + channelAgent.channel.id" data-parent="#accordion">
                    <div class="card-body">
                        <div class="card" v-for="adv_channel in channelAgent.channel.adv_channels" :key="adv_channel.id">
                            <div class="card-header" :id="adv_channel.id">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" :data-target="'#collapse' + adv_channel.id" aria-expanded="true" :aria-controls="'collapse' + adv_channel.id">
                                        {{adv_channel.advertisement.adv_text}}
                                    </button>
                                    <label class="status">{{adv_channel.status.name}}</label>
                                </h5>
                            </div>

                            <div :id="'collapse' + adv_channel.id" class="collapse" :aria-labelledby="'heading' + adv_channel.id" data-parent="#accordion">
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col">
                                                Стоимость: {{adv_channel.total_price}}
                                                Тариф: {{adv_channel.tariff.type}}
                                            </div>
                                            <div class="col">
                                                <vc-calendar mode="multiple" color='teal' :attributes='generateAttributes(adv_channel.dates)'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            attributes: [
            {
                key: 'today',
                highlight: true,
                dates: new Date()
            }
            ],
            channelAgents: [],
            currentPage: 1,
            itemsPerPage: 10,
        }
    },
    computed:{
        // advertisements(){
        //     return this.$store.state.advertisements.advertisements;
        // }
        paginatedItems() {
          let page = 1;
          return [].concat.apply(
             [], 
             this.items.map( (item, index) => 
                index % this.itemsPerPage ? 
                   [] : 
                   { page: page++, items: this.items.slice(index, index + this.itemsPerPage)}
             )
           );
       },
       currentPageItems() {
          let currentPageItems = this.paginatedItems.find(pages => pages.page == this.currentPage);
            return currentPageItems ? currentPageItems.items : [];
       }
    },
    created(){
        this.getAdsOnMyChannel()
    },
    methods: {
        getAdsOnMyChannel() {
            this.$store.dispatch('advertisements/getAdsOnMyChannel')
            .then((res)=>{
                this.channelAgents = res;
            })
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        generateAttributes(advDates){
            var dates = []
            advDates.forEach(element => {
                dates.push(element.date)
            });
            var attribut = [{
                key: 'today',
                highlight: true,
                dates: dates
            }]
            return attribut;
        },
        changePage(pageNumber) {
          if(pageNumber !== this.currentPage)
               this.currentPage = pageNumber;
       }
    },
}
</script>

<style>
.ads_on_my_channel{
    width: 90%;
    margin: auto;
    padding: 20px;
    margin-top: 20px;
    background: #f0f0f0d3;
    outline: 3px solid gray;
    outline-style: auto;
}
.status{
    font-weight: right;
    text-align: right;
    float: right;
}
</style>
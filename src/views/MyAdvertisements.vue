<template>
    <div class="my_ads">
        <div class="adv_text shadow">
            <div class="form-group green-border-focus">
                <label for="exampleFormControlTextarea5">Текст объявления</label>
                <!-- Рекламы -->
                <div class="card" v-for="advertisement in advertisements" :key="advertisement.id">
                    <div class="card-header" :id="advertisement.id">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" :data-target="'#collapse' + advertisement.id" aria-expanded="true" :aria-controls="'collapse' + advertisement.id">
                                {{advertisement.adv_text}}
                            </button>
                            <!-- <label class="status">{{advertisement.status[0].name}}</label> -->
                        </h5>
                    </div>

                    <div :id="'collapse' + advertisement.id" class="collapse" :aria-labelledby="'heading' + advertisement.id" data-parent="#accordion">
                        <div class="card-body">
                            <!-- Каналы -->
                            <div class="card" v-for="adv_channel in advertisement.adv_channels" :key="adv_channel.id">
                                <div class="card-header" :id="adv_channel.id">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" :data-target="'#collapse' + adv_channel.id" aria-expanded="true" :aria-controls="'collapse' + advertisement.id">
                                            {{adv_channel.channel.name}}
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
                            <!-- конец -->
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
        }
    },
    computed:{
        advertisements(){
            return this.$store.state.advertisements.advertisements;
        },
    },
    created(){
        this.getMyAdvertisements()
    },
    methods: {
        getMyAdvertisements() {
            this.$store.dispatch('advertisements/getMyAdvertisements')
            // .then((res)=>{
            //     this.advertisement = res;
            // })
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
        }
    },
}
</script>

<style>
.my_ads{
    width: 90%;
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
.status{
    font-weight: right;
    text-align: right;
    float: right;
}
</style>
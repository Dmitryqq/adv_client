import { mixins, Bar } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Bar,
    mixins: [reactiveProp],
    props: {
        responsive: false,
        maintainAspectRatio: false,
        width: {
            type: Number,
            validator: value => value > 0
        },
        height: {
            type: Number,
            validator: value => value > 0
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    },
    mounted() {
        // this.chartData создаётся внутри миксина.
        // Если вы хотите передать опции, создайте локальный объект options
        this.renderChart(this.chartData, this.options)
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        width: {
            type: Number,
            validator: value => value > 0
        },
        height: {
            type: Number,
            validator: value => value > 0
        },
        datasets: {
            type: Array,
            required: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    },
    watch: {
        chartData() {
            this.$data._chart.update()
        }
    }
}
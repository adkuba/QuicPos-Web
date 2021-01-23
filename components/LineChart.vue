<script>
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: {
        chartdata: {
            type: Object,
            default: null
        }
    },
    computed: {
        computedData: function() {
            return this.chartdata
        }
    },
    data() {
        return {
            viewsOptions: {
                responsive: true,
                maintainAspectRatio: false,
                responsiveAnimationDuration: 800, 
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            maxRotation: 90
                        }
                    }]   
                } 
            }
        }
    },
    mounted() {
        this.renderChart(this.computedData, this.viewsOptions)
    },
    watch: {
        chartdata: function(){
            //console.log("Zmiana")
            this.renderChart(this.computedData, this.viewsOptions)
        }
    }
}
</script>
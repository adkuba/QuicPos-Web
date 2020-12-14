<template>
    <div>
        <nuxt-link to="/" id="title">QuicPos</nuxt-link>
        <div id="stat" v-if="stats" :class="$mq">
            <div class="subtitle">Stats</div>
            <div class="info">User @{{stats.userid}}</div>
            <div>{{stats.text.substring(0, 100)}}...</div>
            <div class="chart-wrapper">
                <line-chart :chartdata="chartData" :style="'width:' + chartData.labels.length * 50 + 'px'" class="chart"/>
            </div>
            <div class="info">
                Budget:
                <div style="display: inline; color: var(--color)">${{ stats.money }}</div>
            </div>
            <nuxt-link :to="'/pay/' + $route.params.id" class="promote-link">Promote</nuxt-link>
        </div>
        <div v-else class="error">This post doesn't exists</div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { GraphQLClient, gql } from 'graphql-request'
import LineChart from '~/components/LineChart.vue'

export default Vue.extend({
  components: { LineChart },

    data() {
        return {
            stats: null as any,
            chartData: null as any
        }
    },

    head() {
        return {
            title: "QuicPos - Stats",
            meta: [
                { hid: 'description', name: 'description', content: "Check stats for post: " + this.$route.params.id },
                { hid: 'og:url', property: 'og:url', content: "https://quicpos.com/stats/" + this.$route.params.id },
                { hid: 'og:title', property: 'og:title', content: "QuicPos - Stats" },
                { hid: 'og:description', property: 'og:description', content: "Check stats for post: " + this.$route.params.id },
                { hid: 'og:image', property: 'og:image', content: "https://storage.googleapis.com/quicpos-images/index_meta.png" },
                { hid: 'twitter:card', property: 'twitter:card', content: "summary_large_image" },
                { hid: 'twitter:url', property: 'twitter:url', content: "https://quicpos.com/stats/" + this.$route.params.id },
                { hid: 'twitter:title', property: 'twitter:title', content: "QuicPos - Stats" },
                { hid: 'twitter:description', property: 'twitter:description', content: "Check stats for post: " + this.$route.params.id },
                { hid: 'twitter:image', property: 'twitter:image', content: "https://storage.googleapis.com/quicpos-images/index_meta.png" }
            ]
        }
    },

    async created(){
        if (this.stats == null){
            const query = gql`
                query stats($id: String!) {
                    getStats(id: $id) {
                        text
                        userid
                        views{
                            localization
                            date
                        }
                        money
                    }
                }
            `
            const client = new GraphQLClient("https://api.quicpos.com/query")

            const variables = { id: this.$route.params.id }
            const resp = await client.request(query, variables).catch(error => {})
            if (resp){
                this.stats = resp.getStats
                this.chartData = this.parseViews(this.stats['views'])
            }
        }
    },

    methods: {
        addDays(date: Date, days: number) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        },
        parseViews(views: Array<any>){
            
            views = views.sort(function(a, b){
                var date1 = a['date'].substring(0, 10) as string
                var date2 = b['date'].substring(0, 10) as string
                return new Date(date1).getTime() - new Date(date2).getTime()
            })
            var labels: Array<string> = []
            var data: Array<number> = []
            var labelsFinal: Array<string> = []
            var dataFinal: Array<number> = []
            
            views.forEach(view => {
                var date = view['date'].substring(0, 10)
                var index = labels.indexOf(date)
                if (index == -1){
                    //doesn't exists
                    labels.push(date)
                    data.push(1)
                } else {
                    //exists
                    data[index] += 1
                }
            });

            for (var i = 0; i < labels.length-1; i++){
                var date1 = new Date(labels[i])
                var date2 = new Date(labels[i+1])

                //add first
                labelsFinal.push(labels[i].slice(5, 10))
                dataFinal.push(data[i])

                //add missing days
                var diff = Math.abs(date1.getTime() - date2.getTime())
                var diffDays = Math.ceil(diff / (1000 * 3600 * 24))
                for(var j = 0; j < diffDays-1; j++){
                    var day = this.addDays(date1, j+1)
                    labelsFinal.push((day.getMonth()+1) + "-" + day.getDate())
                    dataFinal.push(0)
                }
            }
            //add final
            labelsFinal.push(labels[labels.length-1].slice(5, 10))
            dataFinal.push(data[data.length-1])

            var chartdata = {
                labels: labelsFinal,
                datasets: [
                    {
                        backgroundColor: "transparent",
                        borderColor: "rgba(1, 116, 188, 0.8)",
                        pointBackgroundColor: "rgba(1, 116, 188, 1)",
                        data: dataFinal,
                        label: "views"
                    }
                ]
            }
            return chartdata
        }
    }
    
})
</script>


<style lang="sass" scoped>

.chart-wrapper
    width: 100% 
    overflow-x: auto
.chart-wrapper::-webkit-scrollbar
    height: 7px
.chart-wrapper::-webkit-scrollbar-track
    background: #e7e7e7
    border-radius: 5px
.chart-wrapper::-webkit-scrollbar-thumb
    background: #c0c0c0
    border-radius: 5px
.chart-wrapper::-webkit-scrollbar-thumb:hover
    background: #a3a3a3

.info
    color: gray
    font-size: 15px
    margin-bottom: 10px

.promote-link
    text-decoration: none
    color: var(--color)
    font-weight: bold
    font-size: 20px

.chart
    margin-top: 50px
    height: 200px
    margin-bottom: 30px

.subtitle
    font-size: 20px
    color: var(--color)
    letter-spacing: 2px

.error
    position: absolute
    left: 50%
    transform: translateX(-50%)
    top: 30%
    font-size: 25px
    font-weight: bold


#title
    position: absolute
    font-size: 35px
    margin: 10px 20px
    color: var(--color)
    text-decoration: none
    font-weight: bold
    letter-spacing: 1px


#stat
    position: absolute
    top: 190px
    left: 50%
    width: 40%
    transform: translateX(-50%)
    box-sizing: border-box
    padding-bottom: 200px
    &.md
        width: 70%
        top: 150px
    &.sm
        width: 100%
        padding: 0px 24px
        top: 110px

    
.chart-wrapper
    width: 100% 
    overflow-x: auto

</style>
<template>
    <div>
        <nuxt-link to="/" id="title">QuicPos</nuxt-link>
        <div id="stat" v-if="stats" :class="$mq">
            <div class="subtitle">Stats</div>
            <div class="info">User @{{stats.userid}}</div>
            <div>{{stats.text.substring(0, 100)}}...</div>
            <div class="chart-wrapper">
                <line-chart :chartdata="chartData" :style="{'width': chartData['datasets'][0]['data'].length * 80} + 'px'" class="chart"/>
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
        parseViews(views: Array<any>){
            var labels: Array<string> = []
            var data: Array<number> = []
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
            var chartdata = {
                labels: labels,
                datasets: [
                    {
                        backgroundColor: "transparent",
                        borderColor: "rgba(1, 116, 188, 0.8)",
                        pointBackgroundColor: "rgba(1, 116, 188, 1)",
                        data: data,
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
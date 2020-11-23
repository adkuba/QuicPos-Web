<template>
    <div>
        <nuxt-link to="/" id="title">QuicPos</nuxt-link>
        <div id="pay" v-if="stats">
            <div class="main-title">PAY</div>
            <div>User @{{stats.userid}}</div>
            <div>{{stats.text.substring(0, 50)}}...</div>
            <nuxt-link :to="'/stats/' + $route.params.id">Stats</nuxt-link>
        </div>
        <div v-else class="error">This post doesn't exists</div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { GraphQLClient, gql } from 'graphql-request'

export default Vue.extend({

    data() {
        return {
            stats: null
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
                    }
                }
            `
            const client = new GraphQLClient("https://api.quicpos.com/query")

            const variables = { id: this.$route.params.id }
            const resp = await client.request(query, variables).catch(error => {})
            if (resp){
                this.stats = resp.getStats
            }
        }
    }
    
})
</script>


<style lang="sass" scoped>

.main-title
    font-size: 25px
    letter-spacing: 1px
    font-weight: bold
    margin-bottom: 20px

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


#pay
    position: absolute
    top: 220px
    left: 50%
    transform: translateX(-50%)


</style>
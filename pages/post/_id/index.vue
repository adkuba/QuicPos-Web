<template>
    <div>
        <nuxt-link to="/" id="title">QuicPos</nuxt-link>
        <div v-if="post.ID.slice(10, -2) != '000000000000000000000000' && !post.blocked">
            <Post :post="post"/>
        </div>
        <div v-else class="error">This post doesn't exists</div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { GraphQLClient, gql } from 'graphql-request'

export default Vue.extend({

    computed: {
        post(){
            return this.$store.state.post
        }
    },
    
    async asyncData({ params, store }){
        if (store.state.post.ID.slice(10, -2) != params.id){
            const query = gql`
                query getPostByID($id: String!) {
                    viewerPost(id: $id) {
                        ID
                        text
                        userId
                        shares
                        views
                        creationTime
                        initialReview
                        image
                    }
                }
            `
            const client = new GraphQLClient("https://api.quicpos.com/query")

            const variables = { id: params.id }
            const post = await client.request(query, variables).catch(error => {})
            if (post) {
                store.commit('changePost', post.viewerPost)
            }
        }
    },

    async created(){
        if (this.post.ID.slice(10, -2) != this.$route.params.id){
            const query = gql`
                query getPostByID($id: String!) {
                    viewerPost(id: $id) {
                        ID
                        text
                        userId
                        shares
                        views
                        creationTime
                        initialReview
                        image
                    }
                }
            `
            const client = new GraphQLClient("https://api.quicpos.com/query")

            const variables = { id: this.$route.params.id }
            const resp = await client.request(query, variables).catch(error => {})
            if (resp){
                this.$store.commit('changePost', resp.viewerPost)
            }
        }
    }
    
})
</script>


<style lang="sass" scoped>

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


</style>
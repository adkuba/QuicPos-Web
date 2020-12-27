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
import * as linkify from 'linkifyjs'
import linkifyHtml from 'linkifyjs/html'
import sanitizeHtml from 'sanitize-html'

export default Vue.extend({

    computed: {
        post(){
            return this.$store.state.post
        }
    },

    head() {
        return {
            title: "QuicPos - Post",
            meta: [
                { hid: 'description', name: 'description', content: !this.$store.state.post.blocked && this.$store.state.post.ID.slice(10, -2) != '000000000000000000000000' ? this.$store.state.post.text : "This post doesn't exists" },
                { hid: 'og:url', property: 'og:url', content: "https://quicpos.com/post/" + this.$route.params.id },
                { hid: 'og:title', property: 'og:title', content: "QuicPos - Post" },
                { hid: 'og:description', property: 'og:description', content: !this.$store.state.post.blocked && this.$store.state.post.ID.slice(10, -2) != '000000000000000000000000' ? this.$store.state.post.text : "This post doesn't exists" },
                { hid: 'og:image', property: 'og:image', content: !this.$store.state.post.blocked && this.$store.state.post.image != "" ? "https://storage.googleapis.com/quicpos-images/" + this.$store.state.post.image : "https://storage.googleapis.com/quicpos-images/index_meta.png" },
                { hid: 'twitter:card', property: 'twitter:card', content: "summary_large_image" },
                { hid: 'twitter:url', property: 'twitter:url', content: "https://quicpos.com/post/" + this.$route.params.id },
                { hid: 'twitter:title', property: 'twitter:title', content: "QuicPos - Post" },
                { hid: 'twitter:description', property: 'twitter:description', content: !this.$store.state.post.blocked && this.$store.state.post.ID.slice(10, -2) != '000000000000000000000000' ? this.$store.state.post.text : "This post doesn't exists" },
                { hid: 'twitter:image', property: 'twitter:image', content: !this.$store.state.post.blocked && this.$store.state.post.image != "" ? "https://storage.googleapis.com/quicpos-images/" + this.$store.state.post.image : "https://storage.googleapis.com/quicpos-images/index_meta.png" }
            ]
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
                var parsedText = sanitizeHtml(post.viewerPost['text'])
                post.viewerPost['text'] = linkifyHtml(parsedText)
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
                var parsedText = sanitizeHtml(resp.viewerPost['text'])
                resp.viewerPost['text'] = linkifyHtml(parsedText)
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
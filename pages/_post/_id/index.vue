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
    
    async asyncData({ params }){
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
        const client = new GraphQLClient("http://api.quicpos.com/query")

        const variables = { id: params.id }
        const post = await client.request(query, variables).catch(error => {})
        if (post) {
            return {post: post.viewerPost}
        }
        return { post: null }
    }
    
})
</script>


<style scoped>

.error{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30%;
    font-size: 25px;
    font-weight: bold;
}

#title{
    position: absolute;
    font-size: 35px;
    margin: 10px 20px;
    color: white;
    text-decoration: none;
    font-weight: bold;
}

</style>
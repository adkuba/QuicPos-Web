<template>
    <div>
        <div v-if="post && !post.blocked">
            <Post :post="post"/>
        </div>
        <div v-else>This post doesn't exists</div>
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
                    views {
                        userId
                        time
                    }
                    creationTime
                    initialReview
                    image
                    reports
                }
            }
        `
        const client = new GraphQLClient("http://localhost:8080/query")

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

</style>
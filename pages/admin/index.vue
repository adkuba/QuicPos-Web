<template>
    <div>
        <div>Admin page</div>
        <input id="password" placeholder="Enter password" v-model="password">
        <div class="get-button" v-on:click="getPost()">Get post</div>
        <select id="mode" v-model="mode">
            <option>New posts</option>
            <option>Reported</option>
        </select>
        <div class="sep"></div>
        <div>Posts to be reviewed in selected mode: {{ left }}</div>
        <div>Spam probability {{ spam*100 }}%</div>
        <div class="sep"></div>
        <div class="action" v-on:click="review(false)">Mark as good</div>
        <div class="action" v-on:click="review(true)">Block post</div>
        <Post :post="post" v-if="post && left!=0"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GraphQLClient, gql } from 'graphql-request'

export default Vue.extend({
    data(){
        return {
            password: "",
            post: {
                ID: ""
            },
            mode: '',
            left: 0,
            spam: 0,
            client: new GraphQLClient("http://api.quicpos.com/query")
        }
    },
    methods: {
        review(deleteMode: boolean){
            if (deleteMode){
                if (!confirm("Block this post?")){
                    return
                }
            }
            const query = gql`
            mutation review($postID: String!, $new: Boolean!, $delete: Boolean!, $password: String!) {
                    review(
                        input: {
                        postID: $postID
                        new: $new
                        delete: $delete
                        password: $password
                        }
                    )
                }
            `

            const variables = {
                postID: this.post.ID.slice(10, -2),
                new: this.mode=="New posts" ? true : false,
                delete: deleteMode,
                password: this.password
            }
            this.client.request(query, variables)
                .then(response => {
                    if (!response.review){
                        alert("Can't review")
                    } else {
                        this.getPost()
                    }
                })
                .catch(error => {})
        },
        getPost(){
            const query = gql`
            query getForReview($password: String!, $new: Boolean!) {
                    unReviewed(password: $password, new: $new) {
                        post {
                            ID
                            text
                            userId
                            shares
                            views
                            creationTime
                            initialReview
                            image
                        }
                        left
                        spam
                    }
                }
            `

            const variables = {
                password: this.password,
                new: this.mode=="New posts" ? true : false
            }
            this.client.request(query, variables)
                .then(response => {
                    this.post = response.unReviewed.post
                    this.left = response.unReviewed.left
                    this.spam = response.unReviewed.spam
                })
                .catch(error => {})
        }
    }
})
</script>

<style scoped>

.sep{
    margin-top: 50px;
}

.action{
    cursor: pointer;
}

.get-button{
    display: inline;
    cursor: pointer;
    border: 1px solid white;
    padding: 5px 10px;
}

#password{
    background: rgb(28, 29, 30);
    outline: none;
    border: none;
    color: white;
    font-size: 16px;
    padding: 5px 10px;
}

</style>
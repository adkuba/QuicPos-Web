<template>
    <div>
        <div>Admin page</div>
        <input id="password" placeholder="Enter password" type="password" v-model="password">
        <div class="get-button" :class="$mq" v-on:click="getPost()">Get post</div>
        <select id="mode" v-model="mode" class="selector" placeholder="select mode">
            <option>New posts</option>
            <option>Reported</option>
            <option>No humanreview</option>
        </select>
        <div class="sep"></div>
        <div>Posts to be reviewed in selected mode: {{ left }}</div>
        <div class="spam" :style="'color: ' + (spam > 0.5 ? 'red;' : 'green;' )">Spam probability {{ Math.round(spam*100) }}%</div>
        <div class="sep"></div>
        <div class="action" v-on:click="review(false)">Mark as good</div>
        <div class="action" v-on:click="review(true)">Block post</div>
        <Post class="post" :class="$mq" :post="post" v-if="post && left!=0"/>
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
            client: new GraphQLClient("https://api.quicpos.com/query")
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
            mutation review($postID: String!, $type: Int!, $delete: Boolean!, $password: String!) {
                    review(
                        input: {
                        postID: $postID
                        type: $type
                        delete: $delete
                        password: $password
                        }
                    )
                }
            `

            var variables = {
                postID: this.post.ID.slice(10, -2),
                type: 0,
                delete: deleteMode,
                password: this.password
            }
            if (this.mode == "New posts") {
                variables.type = 0

            } else if (this.mode == "Reported") {
                variables.type = 1

            } else {
                variables.type = 2
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
            query getForReview($password: String!, $type: Int!) {
                    unReviewed(password: $password, type: $type) {
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

            var variables = {
                password: this.password,
                type: 0
            }
            if (this.mode == "New posts") {
                variables.type = 0

            } else if (this.mode == "Reported") {
                variables.type = 1

            } else {
                variables.type = 2
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

<style lang="sass" scoped>

.spam
    font-weight: bold
    font-size: 17px

.sep
    margin-top: 50px

.post
    &.md
        margin-top: 150px
    &.sm
        margin-top: 250px


.action
    cursor: pointer


.get-button
    display: inline-block
    cursor: pointer
    border: 1px solid white
    padding: 5px 10px

.selector
    background: var(--bg)
    color: var(--color)
    font-size: 16px
    padding: 5px 10px

#password
    background: var(--bg)
    color: var(--color)
    margin-top: 10px
    outline: none
    border: 1px solid var(--color)
    font-size: 16px
    padding: 5px 10px

</style>
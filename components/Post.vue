<template>
	<div id="post" :class="$mq">
		<div v-if="!post.initialReview" class="verification">Post still unverified!</div>
		<div class="userid">User @{{ post.userId }}</div>
		<div class="text" v-html="post.text"></div>
		<img :src="'https://storage.googleapis.com/quicpos-images/' + post.image " class="image" :class="$mq" v-if="post.image">
		<div class="date">
			{{ post.creationTime.split(' ')[0] }} &bull; {{ post.creationTime.split(' ')[1].slice(0, -6) }}
		</div>
		<div class="stat">
			<div class="stat-item">{{ post.views }}</div>
			<div style="display: inline; margin-right: 10px">views</div> 
			<div class="stat-item">{{ post.shares }}</div>
			shares
		</div>
		<div class="action" v-on:click="reportPost()">Report</div>
		<nuxt-link :to="'/stats/' + post.ID.slice(10, -2)" class="stats-link">Stats</nuxt-link>
	</div>
</template>


<script lang="ts">
import Vue from 'vue'
import { GraphQLClient, gql } from 'graphql-request'

export default Vue.extend({

	props: {
		post: Object
	},

	methods: {
		async reportPost(){
			if (confirm("Do you really want to report this post?")){
				const query = gql`
					mutation review($userID: Int!, $postID: String!) {
						report(
							input: { 
								userID: $userID, 
								postID: $postID 
							})
					}
				`
				const client = new GraphQLClient("https://api.quicpos.com/query")

				const variables = { userID: -3, postID: this.post.ID.slice(10, -2) }
				const resp = await client.request(query, variables).catch(error => {})
				if (!resp){
					alert("Can't report post, contact with us.")
				}
				else if (resp.report) {
					alert("Thank you, out team will review it.")
				} else {
					alert("Can't report post, contact with us.")
				}
			}
		}
	}

})
</script>


<style lang="sass" scoped>

.stats-link
	display: inline-block
	text-decoration: none
	letter-spacing: 1px
	color: var(--color)
	font-weight: bold
	margin-left: 25px


.action
	margin-top: 20px
	cursor: pointer
	display: inline-block
	font-weight: bold
	letter-spacing: 1px


.userid
	font-size: 14px
	color:#b2b2b2
	margin-bottom: 20px


.stat
	font-size: 14px
	color:#b2b2b2
	margin-top: 3px


.stat-item
	display: inline
	font-weight: bold
	color: var(--color)


.date
	font-size: 14px
	color: #b2b2b2
	margin-top: 40px


.verification
	font-size: 13px
	text-align: center
	transform: translateY(-20px)
	color: #999999


.text
	margin-bottom: 20px
	white-space: pre-wrap


.image
	border-radius: 5px
	width: 100%
	margin: 0


#post
	position: absolute
	top: 210px
	left: 50%
	transform: translateX(-50%)
	border-radius: 20px
	padding: 0px 25px
	width: 30%
	box-sizing: border-box
	padding-bottom: 200px
	&.md
		width: 80%
		max-width: 500px
	&.sm
		top: 20%
		min-width: 0
		width: 100%
		top: 110px

</style>

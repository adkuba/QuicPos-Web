<template>
	<div id="post">
		<div v-if="!post.initialReview" class="verification">Post still unverified!</div>
		<div class="text">{{ post.text }}</div>
		<img :src="'https://storage.googleapis.com/quicpos-images/' + post.image " class="image" v-if="post.image">
		<br v-else>
		<div class="date">
			{{ post.creationTime.split(' ')[0] }} &bull; {{ post.creationTime.split(' ')[1].slice(0, -7) }}
		</div>
		<div class="stat">
			<div class="stat-item">{{ post.views }}</div>
			<div style="display: inline; margin-right: 10px">views</div> 
			<div class="stat-item">{{ post.shares }}</div>
			shares
		</div>
	</div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	//example post/5f79cc689ec125d75f2e36e5

	props: {
		post: Object
	}
})
</script>


<style scoped>

.stat{
	font-size: 14px;
	color:#b2b2b2;
	margin-top: 3px;
}

.stat-item{
	display: inline;
	font-weight: bold;
	color: white;
}

.date{
	font-size: 14px;
	color: #b2b2b2;
	margin-top: 15px;
}

.verification{
	font-size: 13px;
	text-align: center;
	transform: translateY(-20px);
	color: #999999;
}

.text{
	margin-bottom: 20px;
}

.image{
	height: 200px;
	max-height: 80vh;
	object-fit: contain;
	border-radius: 5px;
}

#post{
	position: absolute;
	top: 25%;
	left: 50%;
	transform: translateX(-50%) ;
	background: rgb(28, 29, 30);
	border-radius: 20px;
	padding: 30px 40px;
	min-width: 250px;
}

</style>

<template>
	<div>
		<div>{{ post.text }}</div>
		<div>{{ post.image }}</div>
		<div>{{ post.creationTime }}</div>
		<div>{{ post.shares }}</div>
		<div>{{ post.views }}</div>
		<div v-if="!post.initialreview">Post still unverified!</div>
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

</style>

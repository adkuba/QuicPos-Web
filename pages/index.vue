<template>
  <div class="container">
	<div>
	  <h1 class="title">QuicPos</h1>
	  <div class="subtitle">My application</div>
	  <div class="links">
		<a href="https://github.com/adkuba/QuicPos-Server" target="_blank" rel="noopener noreferrer" class="button--grey">GitHub</a>
	  </div>
	</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style>
.container {
	margin: 0 auto;
	min-height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.title {
  	display: block;
  	font-weight: 300;
  	font-size: 100px;
  	letter-spacing: 1px;
	margin-bottom: 20px;
}

.subtitle {
	font-weight: 300;
	font-size: 42px;
	word-spacing: 5px;
	padding-bottom: 15px;
}

.links {
	padding-top: 15px;
}
</style>

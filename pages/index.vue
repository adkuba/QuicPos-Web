<template>
  <div class="container" :class="$mq">
    <h1 class="title" :class="$mq">QuicPos</h1>
    <div class="subtitle">New way for social media</div>
    <div id="features" :class="$mq">
        
        <div class="feature-title">Content based</div>
        <div class="feature-text">
            No profiles, likes or comments. Everything revolve around posts.
            They can be viewed and shared. Users builds their feed by interacing with posts.
            Disturbing content will be blocked by our team.
        </div>
        
        <div class="feature-title">Data privacy</div>
        <div class="feature-text">
            In QuicPos there is no online account. Users are identified by a random id.
            You can choose special private mode where absolutely no data is collected.
            Uninstalling the app leads to the complete data erase.
        </div>

        <div class="feature-title">Recommendation system</div>
        <div class="feature-text">
            Neural net running our recommender is the core of QuicPos.
            The more you use the app the better your homepage posts will be.
            Simple as that. We also use AI to detect spam and all inappropriate content.
        </div>

        <div class="feature-title">Promote posts</div>
        <div class="feature-text">
            We earn money from posts promotions. Everyone can boost views of their targeted post.
            Our recommender system chooses the best user for your content.
            All based on content with maximum privacy.
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="sass">

.feature-text
    margin-bottom: 80px
    text-align: left

.feature-title
    font-size: 19px
    margin-bottom: 4px
    font-weight: bold

#features
    margin: 0 auto
    margin-top: 80px
    font-size: 17px
    width: 70%
    &.md
        width: 80%
    &.sm
        width: 100%
        margin-top: 50px

.container
    text-align: center
    margin: 0 auto
    margin-top: 100px
    width: 50%
    padding-bottom: 200px
    &.md
        width: 80%
    &.sm
        width: 95%
        margin-top: 0
        text-align: left


.title
    display: block
    font-weight: bold
    font-size: 70px
    letter-spacing: 1px
    margin-bottom: 40px
    &.sm
        margin-top: 20px


.subtitle
    font-weight: bold
    font-size: 25px
    word-spacing: 5px
    letter-spacing: 1px
    padding-bottom: 15px

</style>

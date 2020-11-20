<template>
  <div class="container" :class="$mq">
    <div class="sub-container" :class="$mq">
          <h1 class="title">QuicPos</h1>
        <div class="subtitle">Create posts with maximum privacy</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="sass">
.container
    margin: 0 auto
    min-height: 90vh
    display: flex
    justify-content: center
    align-items: center
    text-align: center
    .sm
        min-height: 80vh


.sub-container 
    width: 40%
    .md
        width: 60%
    .sm
        width: 95%


.title
    display: block
    font-weight: bold
    font-size: 70px
    letter-spacing: 1px
    margin-bottom: 55px


.subtitle
    font-weight: bold
    font-size: 25px
    word-spacing: 5px
    letter-spacing: 1px
    padding-bottom: 15px

</style>

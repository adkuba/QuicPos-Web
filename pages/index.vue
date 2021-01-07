<template>
  <div class="container" :class="$mq">
    <h1 class="title" :class="$mq">QuicPos</h1>
    <div class="subtitle">Simpler social media</div>
    <div id="features" :class="$mq">
        
        <div class="feature-title">Open tests</div>
        <div class="feature-text">
            Kliknij odpowiedni link poniżej. Zostaniesz zapisany do otwartego testu QuicPos.
            Na iOS wymagane będzie pobranie dodatkowej aplikacji TestFlight.
            Każda opinia i znaleziony błąd jest bardzo ważny!
        </div>
        <a href="https://play.google.com/store/apps/details?id=com.quicpos.quicpos" class="link" :class="$mq" target="_blank">Android</a>
        <a href="https://testflight.apple.com/join/FXXagROz" class="link" :class="$mq" target="_blank">iOS</a>

        <div class="feature-title">Content based</div>
        <div class="feature-text">
            No profiles, likes or comments. Everything revolve around posts.
            They can be viewed and shared. Users builds their feed by interacing with posts.
            Disturbing content will be blocked by our team.
        </div>
        <img class="image" :class="$mq" src="/dark/content_based.png"/>
        
        <div class="feature-title">Data privacy</div>
        <div class="feature-text">
            In QuicPos there is no online account. Users are identified by a random id.
            You can choose special private mode where absolutely no data is collected.
            Uninstalling the app leads to the complete data erase.
        </div>
        <img class="image" :class="$mq" src="/dark/data_privacy.png"/>

        <div class="feature-title">Recommendation system</div>
        <div class="feature-text">
            Neural net running our recommender is the core of QuicPos.
            The more you use the app the better your homepage posts will be.
            Simple as that. We also use AI to detect spam and all inappropriate content.
        </div>
        <img class="image" :class="$mq" src="/dark/recommender.png"/>

        <div class="feature-title">Promote posts</div>
        <div class="feature-text">
            We earn money from posts promotions. Everyone can boost views of their targeted post.
            Our recommender system chooses the best user for your content.
            All based on content with maximum privacy.
        </div>
        <img class="image" :class="$mq" src="/dark/promote_posts.png"/>
        <div id="regulations" class="feature-title">Regulations</div>
        <div class="regulation" :class="$mq">
            We do not take any responsibility for the content sent by users. 
            Our team works hard to review every post. If you will see any inappropriate content please report it. 
            After the review we can block your post.
        </div>
        <div class="regulation" :class="$mq">
            We do not collect any personal data. In the normal browsing mode, QuicPos measures the time spent on a current post and your IP address. 
            We can’t link these data with you as it is anonymous. In private mode QuicPos doesn’t collect any data.
        </div>
        <div class="regulation" :class="$mq">
            You must be at least 13 years old to use QuicPos.
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    head() {
        return {
            title: "QuicPos",
            meta: [
                { hid: 'description', name: 'description', content: "QuicPos is content based, no accounts, only posts. Data privacy is the most important thing. Discover our system with mobile applications. Advanced recommender system smooths your experience. Users can also promote their posts." },
                { hid: 'og:url', property: 'og:url', content: "https://quicpos.com" },
                { hid: 'og:title', property: 'og:title', content: "QuicPos" },
                { hid: 'og:description', property: 'og:description', content: "QuicPos is content based, no accounts, only posts. Data privacy is the most important thing. Discover our system with mobile applications. Advanced recommender system smooths your experience. Users can also promote their posts." },
                { hid: 'og:image', property: 'og:image', content: "https://storage.googleapis.com/quicpos-images/index_meta.png" },
                { hid: 'twitter:card', property: 'twitter:card', content: "summary_large_image" },
                { hid: 'twitter:url', property: 'twitter:url', content: "https://quicpos.com" },
                { hid: 'twitter:title', property: 'twitter:title', content: "QuicPos" },
                { hid: 'twitter:description', property: 'twitter:description', content: "QuicPos is content based, no accounts, only posts. Data privacy is the most important thing. Discover our system with mobile applications. Advanced recommender system smooths your experience. Users can also promote their posts." },
                { hid: 'twitter:image', property: 'twitter:image', content: "https://storage.googleapis.com/quicpos-images/index_meta.png" }
            ]
        }
    },
})
</script>

<style lang="sass" scoped>

.link
    width: 48%
    text-align: center
    font-size: 20px
    display: inline-block
    margin-bottom: 200px
    text-decoration: none
    color: #5CB3FF
    font-weight: bold
    &.md
        margin-bottom: 170px
    &.sm
        margin-bottom: 130px

.image
    filter: var(--invert)
    width: 50%
    margin-bottom: 200px
    object-fit: contain
    text-align: center
    &.sm
        width: 95%
        margin-right: 0
        margin-bottom: 100px
    &.md
        width: 60%
        margin-right: 40%
        margin-bottom: 150px

.feature-text
    margin-bottom: 50px
    text-align: left

.regulation
    text-align: left
    margin-bottom: 25px
    &.sm
        margin-bottom: 40px

.feature-title
    text-align: left
    font-size: 19px
    margin-bottom: 20px
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

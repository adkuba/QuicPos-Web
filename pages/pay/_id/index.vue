<template>
    <div>
        <nuxt-link to="/" id="title">QuicPos</nuxt-link>
        <div id="pay" :class="$mq" v-if="stats">
            <div class="main-title">PAY</div>
            <div class="user">User @{{ stats.userid.substring(0, 4) }}</div>
            <div>{{stats.text.substring(0, 100)}}...</div>
            <div class="money-info">1$ equals to 100 views</div>
            <!-- Display a payment form -->
            <form id="payment-form" :class="$mq" action="javascript:void(0);">
                <div class="dolar">$</div>
                <input id="amount-number" required type="number" placeholder="0" class="amount" step="0.01">
                <div id="card-element"></div>
                <button id="submit" v-on:click="getPaymentIntent()">
                    <div class="spinner hidden" id="spinner"></div>
                    <span id="button-text">Pay</span>
                </button>
                <p id="card-error" role="alert"></p>
                <p class="result-message hidden">
                    Payment succeeded Refresh the page to pay again.
                </p>
            </form>
            <nuxt-link :to="'/stats/' + $route.params.id" class="promote-link">Stats</nuxt-link>
            <div class="info">
                Budget:
                <div style="display: inline; color: var(--color)">${{ stats.money }}</div>
            </div>
        </div>
        <div v-else class="error">This post doesn't exists</div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { GraphQLClient, gql } from 'graphql-request'

export default Vue.extend({

    data() {
        return {
            stats: null as any,
            stripe: null as any,
            card: null as any,
            client: new GraphQLClient("https://api.quicpos.com/quicpos/query")
        }
    },

    head() {
        return {
            title: "QuicPos - Pay",
            meta: [
                { hid: 'description', name: 'description', content: "Promote post: " + this.$route.params.id },
                { hid: 'og:url', property: 'og:url', content: "https://quicpos.com/pay/" + this.$route.params.id },
                { hid: 'og:title', property: 'og:title', content: "QuicPos - Pay" },
                { hid: 'og:description', property: 'og:description', content: "Promote post: " + this.$route.params.id },
                { hid: 'og:image', property: 'og:image', content: "https://storage.googleapis.com/quicpos-images/index_meta.png" },
                { hid: 'twitter:card', property: 'twitter:card', content: "summary_large_image" },
                { hid: 'twitter:url', property: 'twitter:url', content: "https://quicpos.com/pay/" + this.$route.params.id },
                { hid: 'twitter:title', property: 'twitter:title', content: "QuicPos - Pay" },
                { hid: 'twitter:description', property: 'twitter:description', content: "Promote post: " + this.$route.params.id },
                { hid: 'twitter:image', property: 'twitter:image', content: "https://storage.googleapis.com/quicpos-images/index_meta.png" }
            ]
        }
    },

    updated() {
        if (this.stripe == null){
            this.stripe = Stripe('pk_live_51Hq3HhGxanHGMmbqgEbQaZTPwbh0WNWks3XsdARwxv3bhCuMvm7XGGkREwxyOkflJtT3gZD0TgxEwIZ1d0DyeyBE00vBKQDspm')
            var elements = this.stripe.elements()
            var style = {
            base: {
                color: getComputedStyle(document.documentElement).getPropertyValue('--color'),
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                iconColor: getComputedStyle(document.documentElement).getPropertyValue('--color')
            },
            invalid: {
                fontFamily: 'Arial, sans-serif',
                color: getComputedStyle(document.documentElement).getPropertyValue('--color'),
                iconColor: getComputedStyle(document.documentElement).getPropertyValue('--color')
            }
            }
            this.card = elements.create("card", { style: style })
            // Stripe injects an iframe into the DOM
            this.card.mount("#card-element")
            this.card.on("change", function (event: any) {
                // Disable the Pay button if there are no card details in the Element
                // Funkcja zwraca pierwszy element wewnątrz dokumentu, który pasuje do podanego selektora
                var button = document.querySelector("button")
                var cardError = document.querySelector("#card-error")
                if (button){
                    button.disabled = event.empty
                }
                if (cardError){
                    cardError.textContent = event.error ? event.error.message : ""
                }
            });
        }
    },

    async created(){
        if (this.stats == null){
            const query = gql`
                query stats($id: String!) {
                    getStats(id: $id) {
                        text
                        userid
                        views{
                            localization
                            date
                        }
                        money
                    }
                }
            `
            const client = new GraphQLClient("https://api.quicpos.com/quicpos/query")

            const variables = { id: this.$route.params.id }
            const resp = await client.request(query, variables).catch(error => {})
            if (resp){
                this.stats = resp.getStats
            }
        }
    },

    methods: {
        async getPaymentIntent(){
            const query = gql`
                query getStripeClient($amount: Float!) {
                    getStripeClient(amount: $amount)
                }
            `
            const client = new GraphQLClient("https://api.quicpos.com/quicpos/query")

            var amountField = document.getElementById("amount-number") as HTMLInputElement
            if (amountField){
                var amount = parseFloat(amountField.value)
                if (amount > 0){
                    const variables = { amount: amount }
                    const resp = await client.request(query, variables).catch(error => {})
                    if (resp){
                        this.payWithCard(resp.getStripeClient, amount)
                    }
                }
            }
        },
        //client secret generated from server
        payWithCard(clientSecret: string, amount: number){
            this.loading(true)
            var self = this
            this.stripe
                .confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: this.card
                    }
                })
                .then(function(result: any) {
                    if (result.error){
                        self.showError(result.error.message)
                    } else {
                        self.paymentComplete(result.paymentIntent.id, amount)
                    }
                })
        },
        paymentComplete(paymentIntentId: string, amount: number) {
            this.loading(false)
            var result = document.querySelector(".result-message")
            if (result) {
                result.classList.remove("hidden")
            }
            var button = document.querySelector("button")
            if (button){
                button.disabled = true
            }
            
            
            const query = gql`
            mutation payment($amount: Float!, $postid: String!) {
                    payment(
                        input: {
                            amount: $amount
                            postid: $postid
                        }
                    )
                }
            `

            const variables = {
                amount: amount,
                postid: this.$route.params.id
            }
            this.client.request(query, variables)
                .then(response => {
                    if (!response.payment){
                        alert("Can't pay")
                    } else {
                        this.stats.money += amount
                        alert("Success, thank you!")
                    }
                })
                .catch(error => {alert(error)})
        },
        showError(errorMessageText: string){
            this.loading(false)
            var errorMessage = document.querySelector("#card-error")
            if (errorMessage){
                errorMessage.textContent = errorMessageText
                setTimeout(function () {
                    if (errorMessage){
                        errorMessage.textContent = ""
                    }
                }, 10000)
            }
        },
        loading(isLoading: boolean){
            var button = document.querySelector("button")
            var spinner = document.querySelector("#spinner")
            var buttonText = document.querySelector("#button-text")

            if (isLoading) {
                // Disable the button and show a spinner
                if (button){
                    button.disabled = true
                }
                if (spinner){
                    spinner.classList.remove("hidden")
                }
                if (buttonText){
                    buttonText.classList.add("hidden")
                }
            } else {
                if (button){
                    button.disabled = false
                }
                if (spinner){
                    spinner.classList.add("hidden")
                }
                if (buttonText){
                    buttonText.classList.remove("hidden")
                }
            }
        }
    }
    
})
</script>


<style lang="sass" scoped>

.user 
    color: gray
    font-size: 15px
    margin-bottom: 10px

.info
    color: gray
    font-size: 15px
    margin-bottom: 5px
    display: inline-block
    margin-left: 20px

.money-info
    margin-top: 30px
    font-size: 15px
    color: gray

.dolar
    font-size: 19px
    color: gray
    transform: translateX(+17px) translateY(+8px)
    position: absolute

.promote-link
    display: inline-block
    text-decoration: none
    color: var(--color)
    font-weight: bold
    font-size: 19px

.amount
    padding-left: 45px
    color: var(--color)
    margin-bottom: 0
    border: 1px solid rgba(50, 50, 93, 0.1)
    border-bottom: 0
    border-radius: 4px 4px 0 0 

form
    width: 100%
    align-self: center
    border-radius: 7px
    padding: 10px 0 30px 0
    box-sizing: border-box

input 
  border-radius: 6px
  margin-bottom: 6px
  padding: 12px
  border: 1px solid rgba(50, 50, 93, 0.1)
  height: 44px
  font-size: 16px
  width: 100%
  background: var(--bglight)
  box-sizing: border-box

.result-message 
  line-height: 22px
  font-size: 16px

.result-message a 
  color: rgb(89, 111, 214)
  font-weight: 600
  text-decoration: none

.hidden 
  display: none

#card-error 
  color: var(--color)
  text-align: left
  font-size: 13px
  line-height: 17px
  margin-top: 12px
  padding-left: 2px

#card-element 
  padding: 12px
  border: 1px solid rgba(50, 50, 93, 0.1)
  height: 44px
  width: 100%
  background: var(--bglight)
  box-sizing: border-box

#payment-request-button 
  margin-bottom: 32px

/* Buttons and links */
button 
  background: #5469d4
  color: #ffffff
  font-family: Arial, sans-serif
  border-radius: 0 0 4px 4px
  border: 0
  padding: 12px 16px
  font-size: 16px
  font-weight: 600
  cursor: pointer
  display: block
  transition: all 0.2s ease
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)
  width: 100%
  box-sizing: border-box

button:hover 
  filter: contrast(115%)

button:disabled 
  opacity: 0.5
  cursor: default

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after 
  border-radius: 50%

.spinner 
  color: #ffffff
  font-size: 22px
  text-indent: -99999px
  margin: 0px auto
  position: relative
  width: 20px
  height: 20px
  box-shadow: inset 0 0 0 2px
  -webkit-transform: translateZ(0)
  -ms-transform: translateZ(0)
  transform: translateZ(0)

.spinner:before,
.spinner:after 
  position: absolute
  content: ""

.spinner:before 
  width: 10.4px
  height: 20.4px
  background: #5469d4
  border-radius: 20.4px 0 0 20.4px
  top: -0.2px
  left: -0.2px
  -webkit-transform-origin: 10.4px 10.2px
  transform-origin: 10.4px 10.2px
  -webkit-animation: loading 2s infinite ease 1.5s
  animation: loading 2s infinite ease 1.5s

.spinner:after 
  width: 10.4px
  height: 10.2px
  background: #5469d4
  border-radius: 0 10.2px 10.2px 0
  top: -0.1px
  left: 10.2px
  -webkit-transform-origin: 0px 10.2px
  transform-origin: 0px 10.2px
  -webkit-animation: loading 2s infinite ease
  animation: loading 2s infinite ease

@-webkit-keyframes loading 
  0% 
    -webkit-transform: rotate(0deg)
    transform: rotate(0deg)
  
  100% 
    -webkit-transform: rotate(360deg)
    transform: rotate(360deg)
  

@keyframes loading 
  0% 
    -webkit-transform: rotate(0deg)
    transform: rotate(0deg)
  
  100% 
    -webkit-transform: rotate(360deg)
    transform: rotate(360deg)


.main-title
    font-size: 25px
    letter-spacing: 1px
    font-weight: bold
    margin-bottom: 20px

.error
    position: absolute
    left: 50%
    transform: translateX(-50%)
    top: 30%
    font-size: 25px
    font-weight: bold


#title
    position: absolute
    font-size: 35px
    margin: 10px 20px
    color: var(--color)
    text-decoration: none
    font-weight: bold
    letter-spacing: 1px


#pay
    width: 30%
    position: absolute
    top: 220px
    left: 50%
    transform: translateX(-50%)
    padding-bottom: 200px
    &.md
        width: 60%
        top: 180px
    &.sm
        width: 88%
        top: 130px


</style>
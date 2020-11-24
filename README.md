# QuicPos-Web
QuicPos webpage in Nuxt.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## UWAGI
Jak robilem w mounted to nie wykrywalo mi elementow po get by id dlatego że elemnt do którego chciałem się odnieść był w v-if!!!!  V-if nie wykonał się jeszcze i tego elementu nie bylo - dlatego nie moglem zainicjalizowac stripe<br>
Dlatego przenioslem inicjalizacje stripe do updated ze sprawdzaniem!
* zeby sie kompilator typescripta nie prul musialem zainstalowac typy stripe: <code>sudo npm install --save @types/stripe-v3</code> i dodac w tsconfig w types linijkę <code>@types/stripe-v3</code>

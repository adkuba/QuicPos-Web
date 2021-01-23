# Table of Contents
- [What I've learned](#what-ive-learned)
- [Important](#important)
- [Nuxt](#nuxt)



# What I've learned
- How to create **SSR** webpage in **Nuxt**
- How to automatically deploy to **Google Cloud**
- Working with **Typescript** and **Chart.js**
- Implementing payments with **Stripe**



# Important
To recreate project run:
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
See also <code>cloudbuild.yaml</code> and <code>app.yaml</code> - Google Cloud configuration files. Automatic Google Build webhook is set to this repository.



# Nuxt
[Nuxt](https://nuxtjs.org/) is like Vue but with already implemented SSR and many more features. Notes about the project:
- I wanted to reference element in mounted hook but I couldn't reach it. Referenced id was in <code>v-if</code> and the conditional rendering was not done. I needed to move code from mounted to updated hook with duplication check to execute code only once.
- Typescript compiler needs all used in code types to be installed. For example, to work with stripe execute: <code>sudo npm install --save @types/stripe-v3</code> and add in tsconfig: <code>@types/stripe-v3</code>
- <code>main.css</code> contains CSS definition of dark and light mode.
- See stats folder for Chart.js implementation.

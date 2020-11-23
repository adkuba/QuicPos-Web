export const state = () => ({
    post: {
        ID: "ObjectID('000000000000000000000000')",
        blocked: false
    }
  })
  
  export const mutations = {
    changePost(state, newPost) {
      state.post = newPost
    }
  }
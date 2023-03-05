import { createSlice } from '@reduxjs/toolkit';

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    articles: [],
    page: 1,
    articlesCount: null,
    fullArticle: {
      article: null,
      body: null
    },
    token: null,
    logged: false,
    userCreated: false,
    user: {
      email: null,
      token: null,
      username: null,
      bio: null,
      image: null
    },
    error: null
  },
  reducers: {
    addArticles(state, action) {
      state.articles = action.payload
    },
    changePage(state, action) {
      state.page = action.payload
    },
    addArticlesCount(state, action) {
      state.articlesCount = action.payload
    },
    addFullArticle(state, action) {
      state.fullArticle = {
        article: action.payload,
        body: action.payload.body
      }
    },
    addToken(state, action) {
      state.token = action.payload
    },
    loggedOn(state) {
      state.logged = true
    },
    loggedOut(state) {
      state.logged = false
    },
    newUserCreated(state) {
      state.userCreated = true
    },
    addUser(state, action) {
      state.user = action.payload
    },
    onError(state, action) {
      state.error = action.payload
    }
  }
});

export default toolkitSlice.reducer
export const {
  addArticles,
  changePage,
  addArticlesCount,
  addFullArticle,
  addToken,
  loggedOn,
  loggedOut,
  newUserCreated,
  addUser,
  onError
} = toolkitSlice.actions
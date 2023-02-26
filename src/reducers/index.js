import { combineReducers } from 'redux';

import {ADD_ARTICLES, ADD_FULL_ARTICLE, ARTICLES_COUNT, CHANGE_PAGE} from '../actions';

const articles = (state = [], action) => {
  switch (action.type) {
  case ADD_ARTICLES:
    return action.payload
  default:
    return state;
  }
}

const page = (state = 1, action) => {
  switch (action.type) {
  case CHANGE_PAGE:
    return action.payload
  default:
    return state;
  }
}

const articlesCount = (state = null, action) => {
  switch (action.type) {
  case ARTICLES_COUNT:
    return action.payload
  default:
    return state;
  }
}

const fullArticle = (state = {article: null, body: null}, action) => {
  switch (action.type) {
  case ADD_FULL_ARTICLE:
    return {
      article: action.payload,
      body: action.payload.body
    }
  default:
    return state;
  }
}

const reducer = combineReducers({
  articles,
  page,
  articlesCount,
  fullArticle
});

export default reducer;
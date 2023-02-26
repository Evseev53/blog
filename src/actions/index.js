import {getArticles, getFullArticle} from '../api-service/api-service';

export const ADD_ARTICLES = 'ADD_ARTICLES';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const ARTICLES_COUNT = 'ARTICLES_COUNT';
export const ADD_FULL_ARTICLE = 'ADD_FULL_ARTICLE';

export const addArticles = (payload) => ({type: ADD_ARTICLES, payload});
export const changePage = (payload) => ({type: CHANGE_PAGE, payload});
export const addArticlesCount = (payload) => ({type: ARTICLES_COUNT, payload});
export const addFullArticle = (payload) => ({type: ADD_FULL_ARTICLE, payload});

export const fetchArticles = (limit) => {
  return (dispatch) => {
    getArticles(limit).then(json => {
      dispatch(addArticles(json.articles))
      dispatch(addArticlesCount(json.articlesCount))
    });
  }
}

export const fetchFullArticle = (slug) => {
  return (dispatch) => {
    getFullArticle(slug).then(json => {
      dispatch(addFullArticle(json.article))
    })
  }
}
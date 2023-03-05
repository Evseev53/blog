import {
  addArticles,
  addArticlesCount,
  addFullArticle,
  addToken,
  loggedOn,
  newUserCreated,
  addUser,
  onError
} from '../toolkitSlice';

import {sendNewUser, getArticles, getFullArticle, userLogin, updateUser} from './api-service';

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

export const fetchNewUser = (user) => {
  return (dispatch) => {
    sendNewUser(user).then(json => {
      if (json.errors) {
        dispatch(onError(json.errors))
      } else {
        const { token } = json.user;
        dispatch(addToken(token));
        dispatch(newUserCreated());
      }
    })
  }
}

export const fetchUserLogin = (user) => {
  return (dispatch) => {
    userLogin(user).then(json => {
      if (json.errors) {
        dispatch(onError(json.errors))
      } else {
        const { token } = json.user;
        dispatch(addToken(token));
        dispatch(loggedOn());
        dispatch(addUser(json.user));
        sessionStorage.setItem('token', token);
      }
    })
  }
}

export const fetchUpdateUser = (token, user) => {
  return dispatch => {
    updateUser(token, user)
      .then(json => {
        if (json.errors) {
          dispatch(onError(json.errors))
        } else {
          dispatch(addUser(json.user))
        }
      });
  }
}
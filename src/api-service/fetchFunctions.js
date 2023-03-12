import {
  addArticles,
  addArticlesCount,
  addFullArticle,
  addToken,
  loggedOn,
  newUserCreated,
  addUser,
  onError,
  toggleLike,
  toggleLoading
} from '../toolkitSlice';

import {
  sendNewUser,
  getArticles,
  getFullArticle,
  userLogin,
  updateUser,
  sendLike,
  sendDislike,
  createArticle,
  updateArticle
} from './api-service';

export const fetchArticles = (limit, token) => {
  return (dispatch) => {
    getArticles(limit, token)
      .then(json => {
        dispatch(addArticles(json.articles))
        dispatch(addArticlesCount(json.articlesCount))
        dispatch(toggleLoading(false))
      })
      .catch(e => onError({message: e.message}))
  }
}

export const fetchFullArticle = (slug, token) => {
  return (dispatch) => {
    getFullArticle(slug, token)
      .then(json => {
        dispatch(addFullArticle(json.article))
      })
      .catch(e => onError({message: e.message}))
  }
}

export const fetchNewArticle = (article, token, callback) => {
  return dispatch => {
    dispatch(toggleLoading(true));
    createArticle(article, token)
      .then(json => {
        if (json.errors) {
          dispatch(toggleLoading(false));
          dispatch(onError(json.errors));
        } else {
          dispatch(toggleLoading(false));
          callback();
        }
      })
      .catch(e => onError({message: e.message}))
  }
}

export const fetchUpdateArticle = (article, token, slug, callback) => {
  return dispatch => {
    dispatch(toggleLoading(true));
    updateArticle(article, token, slug)
      .then(json => {
        if (json.errors) {
          dispatch(toggleLoading(false));
          dispatch(onError(json.errors));
        } else {
          dispatch(toggleLoading(false));
          callback();
        }
      })
      .catch(e => onError({message: e.message}))
  }
}

export const fetchNewUser = (user) => {
  return (dispatch) => {
    sendNewUser(user)
      .then(json => {
        if (json.errors) {
          dispatch(onError(json.errors))
        } else {
          const { token } = json.user;
          dispatch(addToken(token));
          dispatch(newUserCreated());
        }
      })
      .catch(e => onError({message: e.message}))
  }
}

export const fetchUserLogin = (user) => {
  return (dispatch) => {
    userLogin(user)
      .then(json => {
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
      .catch(e => onError({message: e.message}))
  }
}

export const fetchUpdateUser = (token, user, callback) => {
  return dispatch => {
    updateUser(token, user)
      .then(json => {
        if (json.errors) {
          dispatch(onError(json.errors));
        } else {
          dispatch(addUser(json.user));
          callback();
        }
      })
      .catch(e => onError({message: e.message}))
  }
}

export const fetchLike = (token, slug, favotited) => {
  const foo = favotited ? sendDislike : sendLike;
  return dispatch => {
    foo(token, slug)
      .then(json => {
        if (json.errors) {
          console.error(json)
        } else {
          dispatch(addFullArticle(json.article));
          dispatch(toggleLike(json.article));
        }
      })
      .catch(e => console.error(e))
  }
}
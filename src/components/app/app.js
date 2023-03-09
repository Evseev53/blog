import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Header from '../header/header';
import ArticlesList from '../articles-list/articles-list';
import Profile from '../forms/profile/profile';
import NewArticle from '../forms/new-article/new-article';
import ProtectedRoute from '../protected-route/protected-route';
import { fetchArticles } from '../../api-service/fetchFunctions';
import ArticleFull from '../article-full/article-full';
import SignInForm from '../forms/sign-in-form/sign-in-form';
import SignUpForm from '../forms/sign-up-form/sign-up-form';
import EditArticle from '../forms/edit-article/edit-article';
import NotFound from '../not-found/not-found';
import { getCurrentUser } from '../../api-service/api-service';
import { addUser, loggedOn } from '../../toolkitSlice';

import classes from './app.module.scss';

function App() {
  const dispatch = useDispatch();
  const { toolkit } = useSelector(state => state);
  const { page, logged } = toolkit;

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      getCurrentUser(token)
        .then(json => {
          dispatch(addUser(json.user))
          dispatch(loggedOn())
        })
    }
  }, []);

  useEffect(() => {
    dispatch(fetchArticles(`${page}0`));
  }, [page]);

  return (
    <div className={classes.app}>
      <Header />
      <div className={classes['content-container']}>
        <Routes>
          <Route path='/articles' element={<ArticlesList />} />
          <Route path='/articles/:slug' element={<ArticleFull />} />
          <Route path='/articles/:slug/edit' element={
            <ProtectedRoute logged={ logged }>
              <EditArticle />
            </ProtectedRoute>
          } />
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/profile' element={
            <ProtectedRoute logged={ logged }>
              <Profile />
            </ProtectedRoute>} />
          <Route path='/new-article' element={
            <ProtectedRoute logged={ logged }>
              <NewArticle />
            </ProtectedRoute>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
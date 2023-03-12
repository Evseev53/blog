import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Result } from 'antd';

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

  const [online, setOnline] = useState(true);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      getCurrentUser(token)
        .then(json => {
          dispatch(addUser(json.user))
          dispatch(loggedOn())
        })
    }
  }, []);

  useEffect(() => {
    dispatch(fetchArticles(`${page}0`, token));
  }, [page]);

  const routes = (
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
  );

  window.addEventListener('offline', (e) => {
    setOnline(false);
  });

  window.addEventListener('online', (e) => {
    setOnline(true);
  });

  return (
    <div className={classes.app}>
      <Header />
      <div className={classes['content-container']}>
        { online ?
          routes :
          <Result status="warning" title="There are some problems with your operation."/> }
      </div>
    </div>
  );
}

export default App;
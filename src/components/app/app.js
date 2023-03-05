import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

import Header from '../header/header';
import ArticlesList from '../articles-list/articles-list';
import Profile from '../forms/profile/profile';
import { fetchArticles } from '../../api-service/fetchFunctions';
import ArticleFull from '../article-full/article-full';
import SignInForm from '../forms/sign-in-form/sign-in-form';
import SignUpForm from '../forms/sign-up-form/sign-up-form';
import { getCurrentUser } from '../../api-service/api-service';
import { addUser, loggedOn } from '../../toolkitSlice';

import classes from './app.module.scss';

function App() {
  const dispatch = useDispatch();
  const { toolkit } = useSelector(state => state);
  const { page } = toolkit;

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
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
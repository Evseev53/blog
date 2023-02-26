import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

import Header from '../header/header';
import ArticlesList from '../articles-list/articles-list';
import { fetchArticles } from '../../actions';
import ArticleFull from '../article-full/article-full';

import classes from './app.module.scss';

function App() {
  const dispatch = useDispatch();
  const { page } = useSelector(state => state);

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
        </Routes>
      </div>
    </div>
  );
}

export default App;
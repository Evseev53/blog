import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Article from '../article/article';
import Spinner from '../spinner/spinner';
import { fetchFullArticle } from '../../api-service/fetchFunctions';
import { onError } from '../../toolkitSlice';

import classes from './article-full.module.scss';

export default function ArticleFull() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { toolkit } = useSelector(state => state);
  const { fullArticle } = toolkit;
  const { article, body } = fullArticle;

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchFullArticle(slug, token))
    return () => { onError(null) };
  }, []);

  const content = article ? <Article article={ article } body={ body } fullVersion /> : <Spinner />;

  return(
    <div className={classes['article-full-container']}>
      { content }
    </div>
  )
}
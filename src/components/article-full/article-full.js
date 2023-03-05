import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Article from '../article/article';
import { fetchFullArticle } from '../../api-service/fetchFunctions';

import classes from './article-full.module.scss';

export default function ArticleFull() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { toolkit } = useSelector(state => state);
  const { fullArticle } = toolkit;
  const { article, body } = fullArticle;
  useEffect(() => {
    dispatch(fetchFullArticle(slug))
  }, []);
  const content = article ? <Article article={ article } body={ body } fullVersion /> : <div>Идет загрузка</div>;
  return(
    <div className={classes['article-full-container']}>
      { content }
    </div>
  )
}
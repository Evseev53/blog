import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Article from '../article/article';
import { changePage } from '../../toolkitSlice';
import Spinner from '../spinner/spinner';

import classes from './articles-list.module.scss';

export default function ArticlesList () {
  const { toolkit } = useSelector(state => state);
  const { articles, articlesCount, page, loading } = toolkit;
  const dispatch = useDispatch();

  const onPagination = (value) => {
    dispatch(changePage(value));
  }
  
  const articlesCopy = [...articles];
  articlesCopy.splice(0, articlesCopy.length - 10);

  const articlesList = articlesCopy.map(article => {
    const { slug } = article;
    return(
      <Article key={ slug.toString() } article={ article }/>
    )
  })

  return(
    <div className={classes['articles-list']}>
      { loading ? <Spinner /> : articlesList }
      <div className={classes.pagination}>
        <Pagination onChange={(num) => onPagination(num)} current={ page } total={ articlesCount } showSizeChanger={false}/>
      </div>
    </div>
  )
}
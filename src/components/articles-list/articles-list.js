import {Pagination} from 'antd';
import {useDispatch, useSelector} from 'react-redux';

import Article from '../article/article';
import { changePage } from '../../actions';

import classes from './articles-list.module.scss';

export default function ArticlesList () {
  const { articles, articlesCount, page } = useSelector(state => state);
  const dispatch = useDispatch();

  const onPagination = (value) => {
    dispatch(changePage(value))
  }
  
  const articlesCopy = [...articles];
  articlesCopy.splice(0, articlesCopy.length - 10);

  const articlesList = articlesCopy.map(article => {
    return(
      <Article article={ article }/>
    )
  })

  return(
    <div className={classes['articles-list']}>
      { articlesList }
      <div className={classes.pagination}>
        <Pagination onChange={(num) => onPagination(num)} current={ page } total={ articlesCount } showSizeChanger={false}/>
      </div>
    </div>
  )
}
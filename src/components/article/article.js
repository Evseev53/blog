import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Popconfirm } from 'antd';
import _ from 'lodash';

import { deleteArticle } from '../../api-service/api-service';
import { fetchArticles, fetchLike } from '../../api-service/fetchFunctions';
import heart from '../../images/heart.svg';
import heartRed from '../../images/heart_red.svg';

import classes from './article.module.scss';

export default function Article ({ article, body, fullVersion }) {
  const { title, description, createdAt, tagList, author, favorited, favoritesCount, slug } = article;
  const { username, image } = author;

  const { toolkit } = useSelector(state => state);
  const { user, page } = toolkit;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onDelete = () => {
    deleteArticle(user.token, article.slug)
      .then(json => {
        navigate('/articles');
        dispatch(fetchArticles(`${page}0`, user.token));
      })
  }

  const onLike = () => {
    dispatch(fetchLike(user.token, article.slug, favorited));
  }

  const buttons = (
    <div className={classes['buttons-container']}>
      <Popconfirm
        description="Are you sure to delete this task?"
        placement='right'
        okText="Yes"
        cancelText="No"
        onConfirm={ onDelete }
      >
        <button className={classes.button} type='button'><span className={classes['button-text']}>Delete</span></button>
      </Popconfirm>
      <Link to='edit' className={`${classes['button--edit']} ${classes.button}`}>
        <span className={classes['button-text']}>Edit</span>
      </Link>
    </div>
  )

  const getFormatDate = (d) => {
    const date = new Date(d);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC'
    };
    return date.toLocaleString('en-US', options);
  }

  const cutStr = (str) => {
    const copyStr = str;
    return _.truncate(copyStr, {length: 75, omission: ' ...'})
  }

  let id = 0;

  const tagsElList = tagList.map(el => {
    id += 1;
    if (el.length) {
      return(
        <div key={ id.toString() } className={classes['article-tag']}>{ cutStr(el) }</div>
      )
    }
  });

  return(
    <div className={fullVersion ? classes['article-full'] : classes.article}>
      <div>
        <div className={classes['article-head']}>
          <Link to={`/articles/${slug}`} className={classes['article-title']}>
            <span className={classes['title-text']}>{ title }</span>
          </Link>
          <span className={classes['article-likes']}>
            <button className={classes['button--no-style']} type='button' onClick={ onLike } onKeyDown={ onLike }>
              <img src={ favorited ? heartRed : heart } alt="like" />
            </button>
            <span className={classes['article-likes-num']}>
              { favoritesCount }
            </span>
          </span>
        </div>
        <div className={classes['tags-list']}>
          { tagsElList }
        </div>
        <p className={classes.text}>
          { description }
        </p>
        <p className={classes['article-body']}>{ body ? <ReactMarkdown>{ body }</ReactMarkdown> : null }</p>
      </div>
      <div className={classes['article-author-container']}>
        <div className={classes['article-author']}>
          <div>
            <span className={classes.name}>{ username }</span>
            <span className={classes.date}>{ getFormatDate(createdAt) }</span>
          </div>
          <img className={classes.avatar} alt="avatar" src={ image }/>
        </div>
        { username === user.username && fullVersion ? buttons : null }
      </div>
    </div>
  )
}
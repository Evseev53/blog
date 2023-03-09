import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { Popconfirm } from 'antd';

import { deleteArticle } from '../../api-service/api-service';

import classes from './article.module.scss';

export default function Article ({ article, body, fullVersion }) {
  const { title, description, createdAt, tagList, author, favoritesCount, slug } = article;
  const { username, image } = author;

  const { toolkit } = useSelector(state => state);
  const { user } = toolkit;

  const navigate = useNavigate();

  const onDelete = () => {
    deleteArticle(user.token, article.slug)
      .then(json => {
        navigate('/articles')
      })
  }

  const buttons = (
    <div>
      <Popconfirm
        description="Are you sure to delete this task?"
        placement='right'
        okText="Yes"
        cancelText="No"
        onConfirm={ onDelete }
      >
        <button className={classes.button} type='button'>Delete</button>
      </Popconfirm>
      <Link to='edit' className={classes.button} type='button'>Edit</Link>
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

  const tagsElList = tagList.map(el => {
    return(
      <div className={classes['article-tag']}>{ el }</div>
    )
  })

  return(
    <div className={fullVersion ? classes['article-full'] : classes.article}>
      <div>
        <div>
          <Link to={`/articles/${slug}`} className={classes['article-title']}>{ title }</Link>
          <span>
            <span> &#x2661; </span>
            <span className={classes['article-likes']}>{ favoritesCount }</span>
          </span>
        </div>
        <div className={classes['tags-list']}>
          { tagsElList }
        </div>
        <p className={classes.text}>
          { description }
        </p>
        { body ? <ReactMarkdown>{ body }</ReactMarkdown> : null }
      </div>
      <div className={classes['article-author-container']}>
        <div className={classes['article-author']}>
          <div>
            <span className={classes.name}>{ username }</span>
            <span className={classes.date}>{ getFormatDate(createdAt) }</span>
          </div>
          <img className={classes.avatar} src={ image } alt="avatar"/>
        </div>
        { username === user.username && fullVersion ? buttons : null }
      </div>
    </div>
  )
}
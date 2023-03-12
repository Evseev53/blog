import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {fetchArticles, fetchNewArticle, fetchUpdateArticle} from '../../../api-service/fetchFunctions';
import Tag from '../tag/tag';
import Spinner from '../../spinner/spinner';
import classes from '../forms.module.scss';
import { onError } from '../../../toolkitSlice';

export default function NewArticle ({ defaultValues = { article: null, body: null } }) {
  const { article, body } = defaultValues;

  const [tags, setTag] = useState([{text: '', id: 0}]);
  const [maxID, setID] = useState(1);

  const { toolkit } = useSelector(state => state);
  const { user, loading, page } = toolkit;
  const { token } = user;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: article?.title,
      description: article?.description,
      body
    }
  });

  const createTagList = (list) => {
    let copyID = maxID;
    const newTagList = list.map(tag => {
      copyID += 1;
      return {text: tag, id: copyID};
    })
    copyID += 1;
    setID(copyID);
    setTag(newTagList);
  }

  useEffect(() => {
    if (article?.tagList) {
      createTagList(article.tagList);
    }
    return () => onError(null)
  }, []);

  const addTag = (tag) => {
    if (tags.length < 11) {
      setID(prevState => prevState + 1);
      const newTags = [...tags];
      newTags.push({text: '', id: maxID});
      setTag(newTags);
    }
  }

  const updateTag = (e, id) => {
    const { value } = e.target;
    const newTags = tags.map(el => {
      if (el.id === id) {
        return {
          ...el,
          text: value
        }
      }
      return el
    });
    setTag(newTags);
  }

  const delTag = (id) => {
    if (tags.length > 1) {
      const newTags = tags.filter(el => el.id !== id);
      setTag(newTags);
    }
  }

  const onSubmit = (art) => {
    const tagsArr = tags.map(el => el.text);
    const taggedArticle = { ...art, tagList: [...tagsArr] };
    const callback = () => {
      dispatch(fetchArticles(`${page}0`, user.token));
      navigate('/articles');
    };
    if (article === null) {
      dispatch(fetchNewArticle(taggedArticle, token, callback));
    } else {
      dispatch(fetchUpdateArticle(taggedArticle, token, article.slug, callback));
    }
  }

  const tagsList = tags.map((tag, idx) => {
    const showAddButton = tags.length - 1 === idx;
    return(
      <Tag
        key={ tag.id }
        id={ tag.id }
        tagText={ tag.text }
        addTag={ addTag }
        showAddButton={ showAddButton }
        update={ updateTag }
        del={ delTag }
      />
    )
  });

  return (
    <div className={`${classes.container} ${classes['container--xxl']}`}>
      <form className={classes.form} onSubmit={ handleSubmit(onSubmit) }>
        <div className={classes['form-title']}>{ article === null ? 'Create new article' : 'Edit article' }</div>
        <label className={classes.label} htmlFor='title' >
          <div className={classes['label-text']}>Title</div>
          <input
            className={`${classes.input} ${classes['input-xxl']}`}
            type='text'
            id='title'
            placeholder='Title'
            {...register('title', {
              required: 'This is required.',
              maxLength: {
                value: 100,
                message: 'Article title should be no more than 100 characters.'
              }
            })}
          />
          <p className={classes['error-message']}>{errors.title?.message}</p>
        </label>
        <label className={classes.label} htmlFor='description'>
          <div className={classes['label-text']}>Short description</div>
          <input
            className={`${classes.input} ${classes['input-xxl']}`}
            type='text'
            id='description'
            placeholder='Title'
            {...register('description', {
              required: 'This is required.',
              maxLength: {
                value: 100,
                message: 'Article description should be no more than 100 characters.'
              }
            })}
          />
          <p className={classes['error-message']}>{errors.description?.message}</p>
        </label>
        <label className={classes.label} htmlFor='text'>
          <div className={classes['label-text']}>Text</div>
          <textarea
            className={`${classes.input} ${classes.textarea}`}
            id='text'
            placeholder='Text'
            rows='10'
            {...register('body', {
              required: 'This is required.'
            })}
          />
          <p className={classes['error-message']}>{ errors.body?.message }</p>
        </label>
        <div className={classes.tags}>
          <label htmlFor='tag'>
            <div className={classes['label-text']}>Tags</div>
            { tagsList }
          </label>
          <label className={classes.label} htmlFor='submit'>
            { loading ? <Spinner /> : <input className={classes.submit} type='submit' id='submit' value='Send'/> }
          </label>
        </div>
      </form>
    </div>
  )
}
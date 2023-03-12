import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';

import { fetchUpdateUser } from '../../../api-service/fetchFunctions';
import classes from '../forms.module.scss';
import { onError } from '../../../toolkitSlice';

export default function Profile () {
  const dispatch = useDispatch();

  const { toolkit } = useSelector(state => state);
  const { user, error } = toolkit;

  const [updated, setUpdated] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: user?.password,
      image: user?.image
    }
  });

  useEffect(() => {
    return () => {
      dispatch(onError(null))
    }
  }, [])

  const onSubmit = (e) => {
    const callback = () => {
      setUpdated(true);
    }
    dispatch(fetchUpdateUser(user.token, e, callback));
  };

  return (
    <div className={`${classes.container} ${classes['container--l']}`}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
        <div className={classes['form-title']}>Edit Profile</div>
        { updated ? <p className={classes.message}>Successfully updated.</p> : null }
        <label htmlFor='username'>
          <div className={classes['label-text']}>Username</div>
          <input
            className={classes.input}
            type='text'
            id='username'
            placeholder='Username'
            {...register('username', {
              required: 'This is required.',
              minLength: {
                value: 3,
                message: 'Your username needs to be at least 3 characters.'
              },
              maxLength: {
                value: 20,
                message: 'Your username must be no more than 20 characters.'
              }
            })}
          />
          <p className={classes['error-message']}>{errors.username?.message}</p>
          <p className={classes['error-message']}>{error?.username}</p>
        </label>
        <label htmlFor='email'>
          <div className={classes['label-text']}>Email address</div>
          <input
            className={classes.input}
            type='email'
            id='email'
            placeholder='Email address'
            {...register('email',
              {
                required: 'This is required.',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Error in email address.'
                }
              })}
          />
          <p className={classes['error-message']}>{errors.email?.message}</p>
          <p className={classes['error-message']}>{error?.email}</p>
        </label>
        <label htmlFor='password'>
          <div className={classes['label-text']}>New password</div>
          <input
            className={classes.input}
            type='password'
            id='password'
            placeholder='New password'
            {...register('password', {
              required: 'This is required.',
              minLength: {
                value: 4,
                message: 'Your password needs to be at least 4 characters.'
              },
              maxLength: {
                value: 60,
                message: 'Your password must be no more than 60 characters.'
              }
            })}
          />
          <p className={classes['error-message']}>{errors.password?.message}</p>
          <p className={classes['error-message']}>{error?.password}</p>
        </label>
        <label htmlFor='avatar'>
          <div className={classes['label-text']}>Avatar image (url)</div>
          <input
            className={classes.input}
            type='url'
            id='avatar'
            placeholder='Avatar image'
            {...register('image')}
          />
          <p className={classes['error-message']}>{error?.avatar}</p>
        </label>
        <label htmlFor='submit'>
          <input className={classes.submit} type='submit' id='submit' value='Save' />
        </label>
      </form>
    </div>
  )
}
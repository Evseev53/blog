import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from '../forms.module.scss';
import { fetchNewUser } from '../../../api-service/fetchFunctions';
import { onError } from '../../../toolkitSlice';

export default function SignUpForm () {
  const [ checked, setChecked ] = useState(true);
  const dispatch = useDispatch();
  const { toolkit } = useSelector(state => state);
  const { userCreated, error } = toolkit;

  useEffect(() => {
    return () => {
      dispatch(onError(null))
    }
  }, [])

  const onSubmit = data => {
    dispatch(fetchNewUser(
      {
        user: {
          username: data.username,
          email: data.email,
          password: data.password
        }
      }
    ))
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const onCheck = (e) => {
    setChecked(!e.target.checked)
  };

  const form = (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes['form-title']}>Sign Up</div>
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
        <div className={classes['label-text']}>Password</div>
        <input
          className={classes.input}
          type='password'
          id='password'
          placeholder='Password'
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
      <label htmlFor='repeat-password'>
        <div className={classes['label-text']}>Repeat Password</div>
        <input
          className={classes.input}
          type='password'
          id='repeat-password'
          placeholder='Password'
          {...register('repeat-password',
            {
              validate: value => value === password || 'Passwords must match'
            })}
        />
        <p className={classes['error-message']}>{errors['repeat-password']?.message}</p>
      </label>
      <label htmlFor='checkbox'>
        <input className={classes.checkbox} type='checkbox' id='checkbox' onChange={onCheck}/>
        <span className={classes['label-text']}>I agree to the processing of my personal information</span>
      </label>
      <label htmlFor='submit'>
        <input className={classes.submit} type='submit' id='submit' value='Create' disabled={ checked }/>
      </label>
      <div className={classes['form-text']}>
        Already have an account? <Link className={classes['sign-link']} to='/sign-in'>Sign In.</Link>
      </div>
    </form>
  );

  const content = userCreated ? <div className={classes.message}>Registration completed successfully.</div> : form;

  return (
    <div className={`${classes.container} ${classes['container--xl']}`}>
      { content }
    </div>
  )
}
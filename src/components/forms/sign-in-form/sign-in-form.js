import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import classes from '../forms.module.scss';
import { fetchUserLogin } from '../../../api-service/fetchFunctions';
import { onError } from '../../../toolkitSlice';

export default function SignInForm () {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { toolkit } = useSelector(state => state);
  const { logged, error } = toolkit;

  useEffect(() => {
    return () => {
      dispatch(onError(null))
    }
  }, [])

  const onSubmit = data => {
    dispatch(onError(null));
    dispatch(fetchUserLogin({
      user: {
        email: data.email.toLowerCase(),
        password: data.password
      }
    }));
  };

  const form = (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes['form-title']}>Sign In</div>
      { error ? <p className={classes['error-message']}>Invalid email or password.</p> : null }
      <label className={classes.label} htmlFor='email'>
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
      </label>
      <label className={classes.label} htmlFor='password'>
        <div className={classes['label-text']}>Password</div>
        <input
          className={classes.input}
          type='password'
          id='password'
          placeholder='Password'
          {...register('password', {required: 'This is required.'})}
        />
        <p className={classes['error-message']}>{errors.password?.message}</p>
      </label>
      <label className={classes.label} htmlFor='submit'>
        <input className={classes.submit} type='submit' id='submit' value='Login'/>
      </label>
      <div className={classes['form-text']}>
        Don’t have an account? <Link className={classes['sign-link']} to='/sign-up'>Sign Up.</Link>
      </div>
    </form>
  );

  const content = logged ? <div className={classes.message}>Logged in.</div> : form;

  return (
    <div className={classes.container}>
      { content }
    </div>
  )
}
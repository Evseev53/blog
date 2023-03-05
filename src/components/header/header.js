import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addUser, loggedOut } from '../../toolkitSlice';
import imgavatar from '../../images/imgavatar.png';

import classes from './header.module.scss';

export default function Header () {
  const { toolkit } = useSelector(state => state);
  const { logged, user } = toolkit;
  const dispatch = useDispatch();

  const buttons = (
    <div className={classes.buttons}>
      <Link to='/sign-in' className={classes['button-in']}><span className={classes['button-text']}>Sign In</span></Link>
      <Link to='/sign-up' className={classes['button-up']}><span className={classes['button-text']}>Sign Up</span></Link>
    </div>
  );

  const onLogOut = () => {
    sessionStorage.clear();
    dispatch(loggedOut());
    dispatch(addUser({}));
  };

  const profile = (
    <div className={classes.profile}>
      <button className={classes['button-crt']} type='button'>Create article</button>
      <Link to='/profile' className={classes.name}>{ user.username }</Link>
      <Link to='/profile'>
        <img className={classes.avatar} src={ user.image ? user.image : imgavatar } alt='avatar'/>
      </Link>
      <button className={classes['button-out']} type='button' onClick={ onLogOut }>Log Out</button>
    </div>
  )

  const content = logged ? profile : buttons ;

  return (
    <header className={classes.header}>
      <div className={classes.title}>Realworld Blog</div>
      <div className={classes['header-buttons']}>{ content }</div>
    </header>
  )
}
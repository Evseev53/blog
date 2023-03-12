import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addUser, loggedOut } from '../../toolkitSlice';
import { fetchArticles } from '../../api-service/fetchFunctions';

import classes from './header.module.scss';

export default function Header () {
  const { toolkit } = useSelector(state => state);
  const { logged, user, page } = toolkit;
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

  const updateArticlesList = () => {
    dispatch(fetchArticles(`${page}0`, user.token));
  }

  const imgUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  const profile = (
    <div className={classes.profile}>
      <Link to='/new-article' className={classes['button-crt']} type='button'>
        <span className={classes['button-text']}>Create article</span>
      </Link>
      <Link to='/profile' className={classes.name}>{ user.username }</Link>
      <Link to='/profile'>
        <img className={classes.avatar} src={ user.image ? user.image : imgUrl } alt='avatar'/>
      </Link>
      <button className={classes['button-out']} type='button' onClick={ onLogOut }>Log Out</button>
    </div>
  )

  const content = logged ? profile : buttons ;

  return (
    <header className={classes.header}>
      <Link to='/articles' onClick={updateArticlesList} className={classes.title}>Realworld Blog</Link>
      <div className={classes['header-buttons']}>{ content }</div>
    </header>
  )
}
import classes from './header.module.scss';

export default function Header () {
  return (
    <header className={classes.header}>
      <div className={classes.title}>Realworld Blog</div>
      <button className={classes['button-in']} type='button'>Sign In</button>
      <button className={classes['button-up']} type='button'>Sign Up</button>
    </header>
  )
}
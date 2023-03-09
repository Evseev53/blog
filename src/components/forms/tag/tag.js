import classes from '../forms.module.scss';

export default function Tag ({ id, tagText, addTag, showAddButton = false, update, del }) {
  const addButton = (
    <button
      type='button'
      className={`${classes.button} ${classes['button--blue']}`}
      onClick={ addTag }
    >
      Add tag
    </button>
  )
  return (
    <div>
      <input
        type='text'
        className={`${classes.input}`}
        placeholder='Tag'
        id='tag'
        defaultValue={ tagText ? tagText : null }
        onChange={ (e) => update(e, id) }
      />
      <button
        type='button'
        className={classes.button}
        onClick={ () => del(id) }
      >
        Delete
      </button>
      { showAddButton ? addButton : null }
    </div>
  )
}
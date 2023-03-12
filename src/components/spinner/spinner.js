import { Spin } from 'antd';

import classes from './spinner.module.scss';

export default function Spinner () {
  return(
    <div className={classes['spin-container']}>
      <Spin />
    </div>
  )
}
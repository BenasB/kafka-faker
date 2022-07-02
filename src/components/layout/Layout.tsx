import React, { PropsWithChildren } from 'react'
import style from './layout.module.scss'

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={style.layoutContainer}>{children}</div>
  )
}

export default Layout
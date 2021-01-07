import React, { useState } from 'react'
import './Header.css'
import nightIcon from '../icons/moon.svg'
import dayIcon from '../icons/sun.svg'

interface Props {
  setContext: (item: string) => void;
}

export const Header: React.FC<Props> = ({ setContext }) => {
  return (
    <header>
      <h1>GP Solution</h1>
      <div>
        <button onClick={() => { setContext('day') }}><img className='icon-img' src={dayIcon} /></button>
        <button onClick={() => { setContext('night') }}><img className='icon-img' src={nightIcon} /></button>
      </div>
    </header>
  )
}

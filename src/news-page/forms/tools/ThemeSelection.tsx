import React, { useState, MouseEvent } from 'react'
import { IState } from '../../interfaces/InitialState'
import toggleUp from '../../icons/toggle-up.svg'
import toggleDown from '../../icons/toggle-down.svg'
import './ThemeSelection.css'

type Props = {
  store: IState;
  setStore: (item: IState) => void;
}

export const Theme: React.FC<Props> = ({ store, setStore }) => {

  const [hover, setHover] = useState(false)

  const res = ['Politics', 'IT', 'Sport', 'Travel', 'Business'];

  const fnClick = (e: boolean, i: string): void => setStore({ ...store, [i]: e })

  const toggleOnHover = () => setHover(true)
  const toggleOffHover = () => setHover(false)

  return (
    <div className='checkbox-block'>
      <button onMouseEnter={toggleOnHover} onMouseLeave={toggleOffHover}>
        {
          hover ? <img className='icon-img' src={toggleUp} alt="icon" />
            : <img className='icon-img' src={toggleDown} alt="icon" />
        }
      </button>
      <form className={hover ? 'checkbox-block-on' : 'checkbox-block-off'} onMouseEnter={toggleOnHover} onMouseLeave={toggleOffHover}>
        {
          res.map((item: string, id: number) => (
            <label key={id}>
              <input
                className='checkbox'
                name={item}
                onClick={(e: any) => {
                  fnClick(e.target.checked, item)
                }}
                onChange={(e: any) => {
                  fnClick(e.target.checked, item)
                }}
                type="checkbox"
                checked={store[item]}
              />
              {item}
            </label>
          ))
        }
      </form>
    </div>
  )
}

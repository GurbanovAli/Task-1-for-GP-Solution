import React, { useState, MouseEvent } from 'react'
import { IState } from '../../interfaces/InitialState'
import toggleUp from '../../icons/toggle-up.svg'
import toggleDown from '../../icons/toggle-down.svg'
import './ThemeSelection.css'

type Props = {
  state: IState;
  setState: (item: IState) => void;
}

export const Theme: React.FC<Props> = ({ state, setState }) => {

  const [hover, setHover] = useState(false)

  const res = ['Politics', 'IT', 'Sport', 'Travel', 'Business'];

  const fnClick = (e: MouseEvent<HTMLInputElement, MouseEvent>, i: string): void => setState({ ...state, [i]: e })

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
          res.map((i: string) => (
            <label>
              <input
                className='checkbox'
                name={i}
                onClick={(e: MouseEvent<HTMLInputElement, MouseEvent>) => {
                  fnClick(e.target.checked, i)
                }}
                onChange={(e: MouseEvent<HTMLInputElement, MouseEvent>) => {
                  fnClick(e.target.checked, i)
                }}
                type="checkbox"
                checked={state[i]}
              />
              {i}
            </label>
          ))
        }
      </form>
    </div>
  )
}

import React, { useState } from 'react'
import { Filter } from './Filter'
import { Data } from '../redux/interfaces/Data'
import arrowToDown from '../icons/arrow-down.svg'
import arrowToUp from '../icons/arrow-up.svg'
import './DropDown.css'

type Props = {
  data: Data[];
  setData: (item: Data[]) => void;
  setNewsView: (item: string) => void;
  addNewsItem: boolean;
  setAddNewsItem: (item: boolean) => void;
  setFilterText: (item: string) => void;
}

export const DropDown: React.FC<Props> = ({ data, setData, setNewsView, addNewsItem, setAddNewsItem, setFilterText }) => {

  const [onDropDown, setOnDropDown] = useState(false);

  const changeDropDown = () => {
    setOnDropDown(onDropDown ? false : true)

    if (addNewsItem) setAddNewsItem(false)
  }

  return (
    <div className='dropDown-block'>
      <button className='dropDown-btn' onClick={() => { changeDropDown() }}>
        {onDropDown ?
          <img className='arrow-img' src={arrowToUp} />
          : <img className='arrow-img' src={arrowToDown} />}
      </button>
      {
        onDropDown ?
          <div className='filters-block'>
            <Filter setFilterText={setFilterText} />
            <div className='addNewsBtn'>
              <button onClick={() => { setAddNewsItem(addNewsItem === false ? true : false) }}>{addNewsItem ? 'cancel' : 'add news'}</button>
            </div>
            <div className='changeViewBtn'>
              <button onClick={() => { setNewsView('isList') }}>L</button>
              <button onClick={() => { setNewsView('isTable') }}>T</button>
            </div>
          </div>
          : ''
      }
    </div>
  )
}

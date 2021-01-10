import React, { useState } from 'react'
import { Filter } from './Filter'
import { Data } from '../interfaces/Data'
import arrowToDown from '../icons/arrow-down.svg'
import arrowToUp from '../icons/arrow-up.svg'
import blocks from '../icons/blocks.svg'
import tables from '../icons/tables.svg'
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
          <img className='arrow-img' src={arrowToUp} alt="icon" />
          : <img className='arrow-img' src={arrowToDown} alt="icon" />}
      </button>
      {
        onDropDown ?
          <div className='filters-block'>
            <Filter setFilterText={setFilterText} />
            <div className='addNewsBtn'>
              <button onClick={() => { setAddNewsItem(addNewsItem === false ? true : false) }}><span>{addNewsItem ? 'cancel' : 'add news'}</span></button>
            </div>
            <div className='changeViewBtn'>
              <button onClick={() => { setNewsView('isList') }}><img className='change-view-icon' src={blocks} alt="icon" /></button>
              <button onClick={() => { setNewsView('isTable') }}><img className='change-view-icon' src={tables} alt="icon" /></button>
            </div>
          </div>
          : ''
      }
    </div>
  )
}

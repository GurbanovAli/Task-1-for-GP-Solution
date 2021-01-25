import React, { useState } from 'react'
import { Filter } from './tools/Filter'
import { Data } from '../interfaces/Data'
import { Sort } from './tools/Sort'
import { Theme } from './tools/ThemeSelection'
import { IState } from '../interfaces/InitialState'
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
  store: IState;
  setStore: (item: IState) => void;
}

export const DropDown: React.FC<Props> = ({ data, setData, setNewsView, addNewsItem, setAddNewsItem, setFilterText, store, setStore }) => {

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
            <Sort
              data={data}
              setData={setData}
            />
            <Theme
              store={store}
              setStore={setStore}
            />
            <div className='addNewsBtn'>
              <button onClick={() => { setAddNewsItem(addNewsItem === false ? true : false) }}><span>add news</span></button>
            </div>
            <div className='changeViewBtn'>
              <button onClick={() => { setNewsView('isList') }}><img className='icon-img' src={blocks} alt="icon" /></button>
              <button onClick={() => { setNewsView('isTable') }}><img className='icon-img' src={tables} alt="icon" /></button>
            </div>
          </div>
          : ''
      }
    </div>
  )
}

import React, { useState, useEffect, useRef } from 'react';
import './Filter.css'

type Props = {
  setFilterText: (item: string) => void;
}

export const Filter: React.FC<Props> = ({ setFilterText }) => {

  const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const getFilterText = () => setFilterText(searchRef.current.value.toUpperCase());

  return (
    <div className='search-block' >
      <input className='search-input' ref={searchRef} type="text" placeholder="title / theme" />
      <button className='search-submit' type='submit' onClick={() => { getFilterText() }} >search</button>
    </div>
  )
}
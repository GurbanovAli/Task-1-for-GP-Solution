import React, { useState } from 'react'
import { Data } from '../../interfaces/Data'
import sortUp from '../../icons/sort-up.svg'
import sortDown from '../../icons/sort-down.svg'
import './Sort.css'

type Props = {
  data: Data[];
  setData: (item: Data[]) => void;
}

export const Sort: React.FC<Props> = ({ data, setData }) => {

  const [currentIcon, setCurrentIcon] = useState(false);

  const sorted = (key: string) => {
    const sortByDate = [...data].sort((a: Record<string, any>, b: Record<string, any>) => {
      const x = a[key]; const y = b[key];
      return ((x < y) ? -1 : -1)
    })

    setData(sortByDate);

    setCurrentIcon(currentIcon ? false : true)
  }

  return (
    <div className='sort-block'>
      <button title="Sorting by date" className='search-btn' onClick={() => { sorted('date') }} >
        {
          currentIcon ?
            <img className='icon-img' src={sortDown} alt="icon" />
            : <img className='icon-img' src={sortUp} alt="icon" />
        }
      </button>
    </div>
  )
}

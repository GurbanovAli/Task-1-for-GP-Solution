import React, { useState, useEffect } from "react"
import { Header } from './header/Header'
import { AddForm } from './forms/AddForm'
import { DropDown } from './forms/DropDown'
import { ListNews } from './items/ListNews'
import { TableNews } from './items/TableNews'
import { Data } from './interfaces/Data'
import dataJson from '../data.json'
import './News.css'


export const News = () => {

  const [data, setData]: [Data[], (data: Data[]) => void] = useState(dataJson);
  const [newsView, setNewsView] = useState('isList')
  const [addNewsItem, setAddNewsItem] = useState(false);
  const [context, setContext] = useState('day');
  const [filterText, setFilterText] = useState("");

  const addNews = (item: Data) => {
    item.id = data.length + 1
    setData([...data, item])
  }

  useEffect(() => {
    const storage = localStorage.getItem('data')
    if (storage) {
      setData(JSON.parse(storage))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  })


  return (
    <div className={`main-block ${context}`}>
      <Header setContext={setContext} />
      <DropDown
        data={data}
        setData={setData}
        setNewsView={setNewsView}
        addNewsItem={addNewsItem}
        setAddNewsItem={setAddNewsItem}
        setFilterText={setFilterText}
      />
      {addNewsItem ? <AddForm addNews={addNews} newsView={newsView} /> : ''}
      <div className='items-block'>
        {
          newsView === 'isTable' ?
            <TableNews
              data={data}
              setData={setData}
              filterText={filterText}
              newsView={newsView}
            />
            : <ListNews
              data={data}
              setData={setData}
              filterText={filterText}
              newsView={newsView}
            />
        }
      </div>
    </div>
  );
}

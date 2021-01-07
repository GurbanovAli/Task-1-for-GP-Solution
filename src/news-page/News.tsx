import React, { useState, useEffect } from "react"
import { Header } from './header/Header'
import { AddForm } from './forms/AddForm'
import { EditForm } from './forms/EditForm'
import { DropDown } from './forms/DropDown'
import { ListNews } from './items/ListNews'
import { TableNews } from './items/TableNews'
import './News.css'
import { Data } from './redux/interfaces/Data'
import dataNews from '../dataNews.json'


export const News = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(dataNews);
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
      {addNewsItem ? <AddForm addNews={addNews} /> : ''}
      <div className='items-block'>
        {
          newsView === 'isTable' ?
            <TableNews
              data={data}
              setData={setData}
            />
            : <ListNews
              context={context}
              data={data}
              setData={setData}
              filterText={filterText}
            />
        }
      </div>
    </div>
  );
}

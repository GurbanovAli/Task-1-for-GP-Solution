import React, { useState, useEffect } from "react"
import { Header } from './header/Header'
import { AddForm } from './forms/AddForm'
import { DropDown } from './forms/DropDown'
import { ListNews } from './items/ListNews'
import { TableNews } from './items/TableNews'
import './News.css'
import { Data } from './redux/interfaces/Data'
import { AppState } from './redux/store';
import dtas from '../data.json'


export const News = () => {

  const defaultData: Data[] = [];

  const [data, setData]: [Data[], (data: Data[]) => void] = useState(
    defaultData
  );
  const [newsView, setNewsView] = useState('isList')
  const [addNewsItem, setAddNewsItem] = useState(false);
  const [context, setContext] = useState('day');
  const [filterText, setFilterText] = useState("");

  const getData = () => {
    fetch('data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function(response) {
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }

  useEffect(() => {
    getData()
  }, [])

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

import React, { useState, useEffect } from "react"
import { Header } from './header/Header'
import { AddForm } from './forms/AddForm'
import { DropDown } from './forms/DropDown'
import { ListNews } from './items/ListNews'
import { TableNews } from './items/TableNews'
import { Data } from './interfaces/Data'
import { IState } from './interfaces/InitialState'
import './News.css'

export const News = () => {

  const defaultData: Data[] = [];

  const [data, setData]: [Data[], (data: Data[]) => void] = useState(defaultData);
  const [newsView, setNewsView] = useState('isList')
  const [addNewsItem, setAddNewsItem] = useState(false);
  const [context, setContext] = useState('day');
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  useEffect(() => {
    setLoading(true);
    fetch('data.json')
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((e) => {
        setLoading(false);
        setError('fetch failed');
      });
  }, []);

  const initialState: IState = {
    'Politics': true,
    'IT': true,
    'Sport': true,
    'Travel': true,
    'Business': true
  };

  const [store, setStore] = useState(initialState);

  const addNews = (item: Data) => {
    item.id = data.length + 1
    setData([...data, item])
  }

  if (loading) {
    return <p>loading..</p>;
  }

  if (error !== '') {
    return <p>ERROR: {error}</p>;
  }

  return (
    <React.Fragment>
      <div className={`main-block ${context}`}>
        <Header setContext={setContext} />
        <DropDown
          data={data}
          setData={setData}
          setNewsView={setNewsView}
          addNewsItem={addNewsItem}
          setAddNewsItem={setAddNewsItem}
          setFilterText={setFilterText}
          store={store}
          setStore={setStore}
        />
        {addNewsItem ?
          <AddForm
            addNews={addNews}
            newsView={newsView}
            addNewsItem={addNewsItem}
            setAddNewsItem={setAddNewsItem}
          />
          : ''}
        <div className='items-block'>
          {
            newsView === 'isTable' ?
              <TableNews
                data={data}
                setData={setData}
                filterText={filterText}
                newsView={newsView}
                store={store}
              />
              : <ListNews
                data={data}
                setData={setData}
                filterText={filterText}
                newsView={newsView}
                store={store}
              />
          }
        </div>
      </div>
    </React.Fragment>
  );
}

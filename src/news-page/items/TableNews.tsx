import React, { useState, useEffect } from "react"
import { EditForm } from '../forms/EditForm'
import { Data } from '../interfaces/Data'
import { IState } from '../interfaces/InitialState'
import './TableNews.css'

type Props = {
  data: Data[];
  setData: (item: Data[]) => void;
  filterText: string;
  newsView: string;
  store: IState;
}

export const TableNews: React.FC<Props> = ({ data, setData, filterText, newsView, store }) => {

  const initialFormState = {
    id: 0,
    title: '',
    theme: '',
    date: '',
    description: ''
  };

  const [currentNews, setCurrentNews] = useState(initialFormState)
  const [editing, setEditing] = useState(0)

  useEffect(() => {
    const storage = localStorage.getItem('data')
    if (storage) {
      setData(JSON.parse(storage))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  })

  const deleteNews = (id: number) => {
    setEditing(0)

    setData(data.filter((news: Data) => news.id !== id))
  }

  const updateNews = (id: number, updatedNews: any) => {
    setEditing(0)

    setData(data.map((news: Data) => (news.id === id ? updatedNews : news)))
  }

  const editRow = (item: Data, id: number) => {
    setEditing(id)

    setCurrentNews({
      id: item.id,
      title: item.title,
      theme: item.theme,
      date: item.date,
      description: item.description,
    })
  }

  const filteredItems = data.filter(
    (i: Data) =>
      i.title.toUpperCase().includes(filterText) ||
      i.description.toUpperCase().includes(filterText)
  )

  const itemsToDisplay = filterText ? filteredItems : data;

  return (
    <div className='table-block'>
      {!filteredItems.length && (
        <div> News is not found </div>
      )}
      {itemsToDisplay.map((item: Data) => (
        editing === item.id ?
          <EditForm
            key={item.id}
            updateNews={updateNews}
            setEditing={setEditing}
            currentNews={currentNews}
            newsView={newsView}
          />
          :
          <>
            {
              store[item.theme] ?
                <table className='table-item' key={item.id}>
                  <tr>
                    <th><h2>{item.title}</h2></th>
                    <td><h3>{item.theme}</h3></td>
                    <td>
                      <button className='td-btn' onClick={() => { editRow(item, item.id) }}>edit</button>
                      <button className='td-btn' onClick={() => { if (window.confirm('Are you sure wish to delete this news?')) deleteNews(item.id) }}>
                        delete
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><p>{item.description}</p></td>
                    <td><p className='td-item-date'>{item.date}</p></td>
                  </tr>
                </table>
                : ''
            }
          </>
      ))}
    </div>
  )
}

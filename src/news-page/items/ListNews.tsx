import React, { useState } from "react"
import { EditForm } from '../forms/EditForm'
import { Data } from '../interfaces/Data'
import './ListNews.css'

type Props = {
  data: Data[];
  setData: (item: Data[]) => void;
  filterText: string;
  newsView:string;
}

export const ListNews: React.FC<Props> = ({ data, setData, filterText, newsView }) => {

  const initialFormState = {
    id: 0,
    title: '',
    theme: '',
    date: '',
    description: ''
  };

  const [currentNews, setCurrentNews] = useState(initialFormState)
  const [editing, setEditing] = useState(0)

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
    <div className='list-block'>
      {!filteredItems.length && (
        <div> News is not found </div>
      )}
      {itemsToDisplay.map((item: Data) => (
        editing === item.id ?
          <EditForm
            updateNews={updateNews}
            setEditing={setEditing}
            currentNews={currentNews}
            newsView={newsView}
          />
          : <ul className='list-item' key={item.id}>
            <li><h2>{item.title}</h2></li>
            <li><h3>{item.theme}</h3></li>
            <li><p>{item.date}</p></li>
            <li><p>{item.description}</p></li>
            <li>
              <button className='list-btn' onClick={() => { editRow(item, item.id) }}>edit</button>
              <button className='list-btn' onClick={() => { deleteNews(item.id) }}>delete</button>
            </li>
          </ul>
      ))}
    </div>
  )
}

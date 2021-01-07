import React, { useState, useEffect } from "react"
import { EditForm } from '../forms/EditForm'
import { Data } from '../redux/interfaces/Data'
import './TableNews.css'

type Props = {
  data: Data[];
  setData: (item: Data[]) => void;
}

export const TableNews: React.FC<Props> = ({ data, setData }) => {

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

  return (
    <>
      {data.map((item: Data) => (
        editing === item.id ?
          <EditForm
            updateNews={updateNews}
            setEditing={setEditing}
            currentNews={currentNews}
          />
          : <table className='table-block' key={item.id}>
            <tr>
              <th><h2>{item.title}</h2></th>
              <td><h3>{item.theme}</h3></td>
              <td><p>{item.date}</p></td>
              <td><p>{item.description}</p></td>
              <td>
                <button onClick={() => { editRow(item, item.id) }}>edit</button>
                <button onClick={() => { deleteNews(item.id) }}>delete</button>
              </td>
            </tr>
          </table>
      ))}
    </>
  )
}

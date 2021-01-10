import React, { useState, useEffect } from 'react'
import { Data } from '../interfaces/Data'
import './EditForm.css'

type Props = {
  updateNews: (id: number, item: Data) => void;
  setEditing: (item: number) => void;
  currentNews: Data;
  newsView:string;
}

export const EditForm: React.FC<Props> = ({ updateNews, setEditing, currentNews, newsView }) => {
  const [item, setItem] = useState(currentNews)

  useEffect(
    () => {
      setItem(currentNews)
    },
    [currentNews]
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = event.target as HTMLInputElement;

    setItem({ ...item, [name]: value })
  }

  return (
    <form
      className={newsView === 'isTable' ? 'edit-form-block-table' : 'edit-form-block-list' }
      onSubmit={event => {
        event.preventDefault()

        updateNews(item.id, item)
      }}>
      <input type="text" name='title' value={item.title} onChange={handleInputChange} />
      <input type="text" name='theme' value={item.theme} onChange={handleInputChange} />
      <input type="text" name='date' value={item.date} onChange={handleInputChange} />
      <textarea name='description' value={item.description} rows={8} cols={30} onChange={handleInputChange} />
      <button>Update news</button>
      <button onClick={() => setEditing(0)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

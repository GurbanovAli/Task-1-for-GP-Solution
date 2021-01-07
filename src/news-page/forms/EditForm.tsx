import React, { useState, useEffect } from 'react'
import { Data } from '../redux/interfaces/Data'
import './EditForm.css'

type Props = {
  updateNews: (id: number, item: Data) => void;
  setEditing: (item: number) => void;
  currentNews: Data;
}

export const EditForm: React.FC<Props> = ({ updateNews, setEditing, currentNews }) => {
  const [item, setItem] = useState(currentNews)

  useEffect(
    () => {
      setItem(currentNews)
    },
    [currentNews]
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target as any;

    setItem({ ...item, [name]: value })
  }

  return (
    <form
      className='edit-form-block'
      onSubmit={event => {
        event.preventDefault()

        updateNews(item.id, item)
      }}>
      <input type="text" name='title' value={item.title} onChange={handleInputChange} />

      <input type="text" name='theme' value={item.theme} onChange={handleInputChange} />

      <input type="text" name='date' value={item.date} onChange={handleInputChange} />

      <input type="text" name='description' value={item.description} onChange={handleInputChange} />

      <button>Update news</button>
      <button onClick={() => setEditing(0)} className="button muted-button">
        Cancel
      </button>

    </form>
  )
}

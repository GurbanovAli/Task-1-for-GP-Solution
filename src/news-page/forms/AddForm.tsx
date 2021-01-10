import React, { useState } from 'react'
import { Data } from '../redux/interfaces/Data'
import './AddForm.css'

type Props = {
  addNews: (item: Data) => void;
  newsView: string;
}

export const AddForm: React.FC<Props> = ({ addNews, newsView }) => {

  const today = new Date().toISOString().slice(0, 10)

  const initialFormState = {
    id: 0,
    title: '',
    theme: '',
    date: today,
    description: '',
  };

  const [item, setItem] = useState(initialFormState)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = event.target as HTMLInputElement;

    setItem({ ...item, [name]: value })
  }

  return (
    <form
      className={newsView=== 'isTable' ? 'add-form-block-table' : 'add-form-block-list' }
      onSubmit={event => {
        event.preventDefault()
        if (!item.title) return

        addNews(item)
        setItem(initialFormState)
      }}
    >
      <input type="text" name='title' value={item.title} onChange={handleInputChange} placeholder='Title'/>
      <input type="text" name='theme' value={item.theme} onChange={handleInputChange} placeholder='Theme'/>
      <input type="text" name='date' value={item.date} onChange={handleInputChange} placeholder='Date'/>
      <textarea  name='description' value={item.description} onChange={handleInputChange} rows={8} cols={30} placeholder='Description'/>
      <button>Add news</button>
    </form>
  )
}

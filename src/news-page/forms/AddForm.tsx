import React, { useState } from 'react'
import { Data } from '../redux/interfaces/Data'
import './AddForm.css'

type Props = {
  addNews: (item: Data) => void
}

export const AddForm: React.FC<Props> = ({ addNews }) => {

  const today = new Date().toISOString().slice(0, 10)
  
  const initialFormState = {
    id: 0,
    title: '',
    theme: '',
    date: today,
    description: '',
  };

  const [item, setItem] = useState(initialFormState)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target as any;

    setItem({ ...item, [name]: value })
  }

  return (
    <form
      className='add-form-block'
      onSubmit={event => {
        event.preventDefault()
        if (!item.title) return

        addNews(item)
        setItem(initialFormState)
      }}
    >
      <label>Title
      <input type="text" name='title' value={item.title} onChange={handleInputChange} />
      </label>
      <label>Theme
      <input type="text" name='theme' value={item.theme} onChange={handleInputChange} />
      </label>
      <label>Date
      <input type="text" name='date' value={item.date} onChange={handleInputChange} />
      </label>
      <label>Description
      <input type="text" name='description' value={item.description} onChange={handleInputChange} id='text-4' />
      </label>
      <button>Add news</button>
    </form>
  )
}

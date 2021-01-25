import React, { useState } from 'react'
import { Data } from '../interfaces/Data'
import deleteIcon from '../icons/delete.svg'

import './AddForm.css'

type Props = {
  addNews: (item: Data) => void;
  newsView: string;
  addNewsItem: boolean;
  setAddNewsItem: (item: boolean) => void;
}

export const AddForm: React.FC<Props> = ({ addNews, newsView, addNewsItem, setAddNewsItem }) => {

  const today = new Date().toLocaleString().slice(0, 17)

  const initialFormState = {
    id: 0,
    title: '',
    theme: '',
    date: today,
    description: '',
  };

  const [item, setItem] = useState(initialFormState)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target as HTMLInputElement;

    setItem({ ...item, [name]: value })
  }

  return (
    <form
      className={newsView === 'isTable' ? 'add-form-block-table' : 'add-form-block-list'}
      onSubmit={event => {
        event.preventDefault()
        if (!item.title) return

        addNews(item)
        setItem(initialFormState)
      }}
    >
      <button onClick={() => { setAddNewsItem(addNewsItem === false ? true : false) }}>
        <img className='icon-img' src={deleteIcon} alt="icon" />
      </button>
      <input type="text" name='title' value={item.title} onChange={handleInputChange} minlength="25" required placeholder='Title' />
      <select name='theme' value={item.theme} onChange={handleInputChange}>
        <option value='Politics' >Politics</option>
        <option value='IT' >IT</option>
        <option value='Sport' >Sport</option>
        <option value='Travel' >Travel</option>
        <option value='Business' >Business</option>
      </select>
      <input type="text" name='date' value={item.date} />
      <textarea name='description' maxlength="20" minlength="5" value={item.description} onChange={handleInputChange} rows={8} cols={30} required placeholder='Description'>
      </textarea>
      <button>Add news</button>
    </form>
  )
}

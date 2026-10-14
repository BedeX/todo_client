import React from 'react'
import { useState } from 'react'
import { todosData } from '../data'
import { Button } from '@heroui/react'
import { FaTrash } from 'react-icons/fa'
import { MdDoneOutline } from 'react-icons/md'
import { NewTodo } from './NewTodo'
import { useEffect } from 'react'

export const MyTodos = ({ setIsLoggedIn }) => {
  const [todos, setTodos] = useState(todosData)
  const [remaining, setRemaining] = useState(0)

  console.log('A backend elérése:',import.meta.env.VITE_API_URL)

  useEffect(() => {
    const count = todos.filter(({ done }) => !done).length
    setRemaining(count)
  }, [todos])

  console.log(todos);

  const handleDelete = (id) => {
    console.log(id);
    setTodos(prev => prev.filter(obj => obj.id != id))
  }

  const handleDone = (id) => {
    setTodos(prev => prev.map(obj => obj.id == id ? { ...obj, done: !obj.done } : obj))
  }
  const handleAdd = (descr) => {
    const newTodo = {
      id: Date.now(),
      descr,
      done: false
    }
    setTodos(prev => [...prev, newTodo])
  }


  return (
    <div className='max-w-3xl relative w-full p-5 m-auto bg-white text-black rounded-3xl'>
      <h2 className='flex items-center flex-col p-3 font-bold text-3xl'>My Todos</h2>
      <Button className='absolute top-5 right-5' variant="danger" onClick={() => setIsLoggedIn(false)}>Kijelentkezés</Button>
      <NewTodo handleAdd={handleAdd} />
      <ul className='flex flex-col gap-3 mt-4 max-w-3xl font-semi-bold'>
        {todos.map(({ id, descr, done }) =>
          <li key={id} className='flex justify-between p-5 shadow-md shadow-indigo-300' style={{ opacity: done ? 0.25 : 1 }}>
            <Button isIconOnly variant="tertiary" onClick={() => handleDone(id)} style={{ color: done ? 'green' : 'gray' }}>
              <MdDoneOutline />
            </Button>

            <div style={{ textDecoration: done ? "line-through" : "" }}>{descr}</div>

            <Button isIconOnly aria-label="Delete" variant="danger" onClick={() => handleDelete(id)}>
              <FaTrash />
            </Button>
          </li>
        )}
      </ul>
      <div>
        <p className='flex items-center justify-center font-bold pt-4'>{remaining === 0 ? "Nincs több teendő" : `Elvégezetlen feladatok: ${remaining}`}</p>
      </div>
    </div>
  )
}



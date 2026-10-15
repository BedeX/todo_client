import React from 'react'
import { useState, useEffect } from 'react'
import { todosData } from '../data'
import { Button } from '@heroui/react'
import { FaTrash } from 'react-icons/fa'
import { MdDoneOutline } from 'react-icons/md'
import { NewTodo } from './NewTodo'
import { addTodo, completeTodo, deleteTodo, readTodos } from '../api'
import { Message } from './Message'

export const MyTodos = ({ setIsLoggedIn }) => {
  const [todos, setTodos] = useState(todosData)
  const [remaining, setRemaining] = useState(0)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    readTodos().then(setTodos)
  }, [])

  useEffect(() => {
    if (!todos) return
    const count = todos.filter(({ complete }) => !complete).length
    setRemaining(count)
  }, [todos])

  const handleDelete = async (id) => {
    setMessage('')
    const data = await deleteTodo(id)
    console.log(data.msg);
    setMessage(data.msg)
    setTodos(prev => prev.filter(obj => obj.id != id)) // Frissül az UI
  }

  const handleDone = async (id) => {
    setMessage('')
    const data = await completeTodo(id)
    console.log(data)
    setMessage(data.msg)
    setTodos(prev => prev.map(obj => obj.id == id ? { ...obj, complete: !obj.complete } : obj))
  }
  const handleAdd = async (task) => {
    setMessage('')
    const data = await addTodo({ task: task }) // Módosul az adatbázis
    console.log((data.msg));
    setMessage((data.msg))
    readTodos().then(setTodos) // Újra lekértük az adatbázisból az adatokat
  }


  return (
    <div className='max-w-3xl relative w-full p-5 m-auto bg-white text-black rounded-3xl'>
      <h2 className='flex items-center flex-col p-3 font-bold text-3xl'>My Todos</h2>
      <Button className='absolute top-5 right-5' variant="danger" onClick={() => setIsLoggedIn(false)}>Kijelentkezés</Button>
      <NewTodo handleAdd={handleAdd} />
      <ul className='flex flex-col gap-3 mt-4 max-w-3xl font-semi-bold'>
        {todos && todos.map(({ id, task, complete }) =>
          <li key={id} className='flex justify-between p-5 shadow-md shadow-indigo-300' style={{ opacity: complete ? 0.25 : 1 }}>
            <Button isIconOnly variant="tertiary" onClick={() => handleDone(id)} style={{ color: complete ? 'green' : 'gray' }}>
              <MdDoneOutline />
            </Button>

            <div style={{ textDecoration: complete ? "line-through" : "" }}>{task}</div>

            <Button isIconOnly aria-label="Delete" variant="danger" onClick={() => handleDelete(id)}>
              <FaTrash />
            </Button>
          </li>
        )}
      </ul>
      <div>
        <p className='flex items-center justify-center font-bold pt-4'>{remaining === 0 ? "Nincs több teendő" : `Elvégezetlen feladatok: ${remaining}`}</p>
        {/*         <p className='flex items-center justify-center font-bold pt-2'>{message}</p> */}
        <Message message={message} />
      </div>
    </div>
  )
}



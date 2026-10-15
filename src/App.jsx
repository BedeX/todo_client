import { useState } from 'react'
import './App.css'
import { MyTodos } from './components/MyTodos'
import { Login } from './components/Login'

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div className='flex items-center justify-center bg-indigo-950 text-indigo-50 min-h-screen'>
      {isLoggedIn ? <MyTodos setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>

  )
}

export default App
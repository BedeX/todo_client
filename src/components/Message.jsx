import React from 'react'
import { useState, useEffect } from 'react'

export const Message = ({ message }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!message) return
        setVisible(true)
        const timer=setTimeout(()=>setVisible(false),2000)

        return () => clearTimeout(timer)
    }, [message])


    if (!message || !visible) return null

    return (
        <div className='max-w-xl m-auto bg-indigo-100 text-indigo-900 text-center animate-bounce p-4 rounded-3xl'>
            {message}
        </div>
    )
}

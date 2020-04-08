import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'

let socket

const Chat = ({ location }) => {
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io('localhost:5000')

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, () => {

    })

    return () => {
      socket.emit('disconnect')

      socket.off()
    }
  }, ['localhost:5000', location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(location)

  return (
    <div>
      <div>
        <div>
          {messages.map((mess, i) => {
            let isSentByCurrentUser = false

            const trimmedName = name.trim().toLowerCase()

            if (mess.user === trimmedName) {
              isSentByCurrentUser = true
            }

            return (
              isSentByCurrentUser ? <div key={i}>
                <p>{trimmedName}</p>
                <div>
                  <p>{mess.text}</p>
                </div>
              </div>
                :
                <div key={i}>
                  <div>
                    <p>{mess.text}</p>
                  </div>
                  <p>{mess.user}</p>
                </div>)
          })}
        </div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
      </div>
    </div>
  )
}


export default Chat

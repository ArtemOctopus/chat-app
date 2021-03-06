import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Join = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')


  return (
    <div className='joinOuterContainer'>
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div><input placeholder="" className="joinInput" type="text" onChange={(e) => setName(e.target.value)} /></div>
        <div><input placeholder="" className="joinInput" type="text" onChange={(e) => setRoom(e.target.value)} /></div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className="button" type="submit">
            Sign In
         </button>
        </Link>
      </div>
    </div>
  )
}
export default Join

import {InfoOutlined, MenuRounded, StarBorderOutlined} from '@material-ui/icons';
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import ChatInput from './ChatInput'
import './Chat.css'
import db from './firebase'
import Message from './Message'

function Chat() {
  const [roomDetails, setRoomDetails] = useState(null)
  const [roomMessages, setRoomMessages] = useState([])
  const {roomId} = useParams();
  // useParams is using the roomId in the URL of the room that we selected to select which document in the database to pull info from

  useEffect(() => {
    if (roomId) {
      // pulling data from room that roomId matches and setting the roomDetails to an object of that data
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot(snapshot => (
        setRoomDetails(snapshot.data())
      ))
      // go to the message collection that's inside of the roomId. collection within a collection that we made in firebase
      db.collection('rooms').doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map(doc => doc.data()))
        // mapping through every message, grabbing the data, and sending that data to roomMessages
      )
    }
  }, [roomId]);
  // firing the useEffect everytime the roomId changes

  const openMenu = () => {
    document.getElementById('sidebar').style.left = '0'
    document.getElementById('chat__overlay').style.opacity = '100%'
  }

  const closeMenu = () => {
    document.getElementById('sidebar').style.left = '-100%'
  }

  console.log(roomMessages)

  return (
    <div 
      // onClick={closeMenu}
      className="chat" 
      id="chat"
    >
      <div className="chat__overlay" id="chat__overlay"></div>
      <div className="chat__header">
        <div className="chat__headerLeft">
          <div
            onClick={openMenu}
            className="chat__mobileMenu" 
            id="chat__mobileMenu"
          >
            <MenuRounded />
          </div>
          <h4 className="chat__channelName">
            <strong>#{roomDetails?.name}</strong>
            <StarBorderOutlined />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>

      <div className="chat__messages">
        {roomMessages.map(({ message, timestamp, user, userImage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
          />
        ))}
      </div>

      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  )
}

export default Chat

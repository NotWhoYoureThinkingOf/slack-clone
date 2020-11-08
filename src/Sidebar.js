import {Create, FiberManualRecord, InsertComment, Inbox, Drafts, BookmarkBorder, PeopleAlt, Apps, FileCopy, ExpandLess, ExpandMore, Add} from '@material-ui/icons'
import React, {useState, useEffect} from 'react'
import db from './firebase'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import {useStateValue} from './StateProvider'

function Sidebar() {
  const [channels, setChannels] = useState([])
  const [{user}] = useStateValue()

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => (
      setChannels(
        snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }))
      )
    ))
  }, [])

  const closeMenu = () => {
    document.getElementById('sidebar').style.left = '-100%'
    document.getElementById('chat__overlay').style.opacity = '0'
  }

  return (
    <div
      onClick={closeMenu}
      className="sidebar" 
      id="sidebar"
    >
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Clever Programmer</h2>
          <h3><FiberManualRecord />
            {user?.displayName}
          </h3>
        </div>
        <Create />
      </div>
      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions & Reactions" />
      <SidebarOption Icon={Drafts} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorder} title="Channel Browser" />
      <SidebarOption Icon={PeopleAlt} title="People & User Groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File Browser" />
      <SidebarOption Icon={ExpandLess} title="Show Less" />
      <hr/>
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr/>
      <SidebarOption Icon={Add} addChannelOption title="Add Channel" />

      {/* connect to db */}
      {/* <SidebarOption ... */}
      {channels.map(channel => (
        <SidebarOption title={channel.name} id={channel.id} />
      ))}
    </div>
  )
}

export default Sidebar

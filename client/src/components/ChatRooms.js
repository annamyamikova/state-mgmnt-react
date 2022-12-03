import React, { useCallback, useEffect, useState } from 'react';
import { Tabs } from 'antd';

import Room from './Room';
import TabModalAction from 'containers/TabModalAction';

const { TabPane } = Tabs;

const ChatRooms = ({rooms, socket, history, userName, room, addMessageToRoom, addUsersToRoom, clearRooms, addRoom}) => {
  const [activeKey, setActiveKey] = useState(Object.keys(rooms)[0]);

  useEffect(() => {
    if (socket === null) {
      history.push("/");
      return;
    }

    socket.on('get_new_msg', msgDate => {
      if(msgDate != null){
        addMessageToRoom(msgDate.messages, msgDate.room);
      }
    });

    socket.on('rooms', rooms => {
      if(rooms != null) {
        clearRooms();
        rooms.forEach((room) =>{
          addRoom(room);
        });
        setActiveKey('public');
      }
    });

    socket.emit('get_rooms', userName);

    socket.on('get_users_in_room', roomData => {
      addUsersToRoom(roomData.users, room)
    });
  },[]);

  const sendMsg = useCallback((values, roomName) => {
    socket.emit('send_new_msg', {msg: values.inputMsg, roomName: roomName});
  }, []);

  const onChange = useCallback((activeKey) => {
    setActiveKey(activeKey)
  }, []);

  const onEdit = useCallback((targetKey, action) => {
    if(action === 'remove') {
      socket.emit('close_room', targetKey);
    }
  }, []);

  return (
    <div>
      <Tabs
        hideAdd
        tabBarExtraContent={<TabModalAction socket={socket}/>}
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >

        {Object.keys(rooms).map(key => (
          <TabPane tab={key} key={key} closable={key !=='public'} >
            <Room messages={rooms[key].messages} users={rooms[key].users} sendMsg={sendMsg} name={key}/>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
};

export default ChatRooms;

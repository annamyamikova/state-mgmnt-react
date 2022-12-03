import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Timeline, Card } from 'antd';

// Components
import Message from "components/Message";

function MessagesTimeline(props) {
  return (
    <Card className="message-list">
      <Scrollbars autoHide universal>
        <div className="middle-all-space">
          <Timeline mode="alternate">
            {props.messages.map((msg, index) => {
              if (msg) {
                const user = props.users.find((user)=>{
                  return (user.userName === msg.userName)
                });
                if (user) {
                  return (
                    <Timeline.Item key={index} position={(user.userName === props.userName) ? "left" : "right"} color={user.isOnline ? "green" : "gray"}><Message content={msg.text} author={msg.userName} datetime={msg.formatTime}/></Timeline.Item>
                  )
                } else {
                  if (msg.userName === 'ChatBot') {
                    return (
                      <Timeline.Item key={index} position={'right'} color="orange"><Message content={msg.text} author={msg.userName} datetime={msg.formatTime}/></Timeline.Item>
                    )
                  }
                }
              } return null;
            })}
          </Timeline>
        </div>
      </Scrollbars>
    </Card>
  );
}

export default MessagesTimeline;
import React, {Component} from 'react';


export default function Message (props){
  console.log(props);
  if(props.type === "incomingMessage"){
    return(
      <div className="message" >
        <span className="message-username">{props.username}</span>
        <span className="message-content">{props.content}</span>
      </div>);
  } else{
    //case incomingNotification
    return(
      <div className="notification">
        <span className="message-username">----------</span>
        <span className="notification-content">{props.content}</span>
      </div>);
    }
}



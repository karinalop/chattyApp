import React, {Component} from 'react';
import Message from './Message.jsx';

export default function MessageList(props){
  const messList = props.messages.map(msg =>{return <Message key={msg.id} username={msg.username} content={msg.content} type={msg.type}/>});
    return(
      <main className="messages">
      {messList}
      </main>
      )}


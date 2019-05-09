import React, {Component} from 'react';

export default function ChatBar(props) {
    const onKeyPress = event => {
      if(event.key == 'Enter'){
        event.preventDefault();
        const messageInput = event.target;
        props.addMessage(messageInput.value );
        messageInput.value = "";
      }
    };

    return(
      <footer className="chatbar">
        <input className="chatbar-username"  placeholder="Type your name" defaultValue ={props.currentUser} />
        <input onKeyPress={onKeyPress}  name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );

}


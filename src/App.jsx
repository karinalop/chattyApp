import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
//import messages from "../messages.json";
//import { generateRandomId } from "./utils";

class App extends Component {
  constructor(props){
    super(props);
     this.state = {messages: [],
     currentUser:'Bob'};

     this.addMessage = this.addMessage.bind(this);
     this.changeCurrentUser = this.changeCurrentUser.bind(this);
    }

  componentDidMount() {
    var connection = new WebSocket("ws://localhost:3001");
    this.setState({connection});
    console.log("contected to the server", connection);

    console.log("componentDidMount <App />");

    connection.onmessage = event => {
      console.log(event.data);
      //console.log(this);
      const incomingMsg = JSON.parse(event.data);
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, incomingMsg];
      switch(incomingMsg.type) {
        case "incomingMessage":
          // handle incoming message
          this.setState({ messages: newMessages });
          break;
        case "incomingNotification":
          // handle incoming notification
          this.setState({messages: newMessages  });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + incomingMsg.type);
      }
    }
  }

  addMessage(content) {

    const newMess = {type: "postMessage", username: this.state.currentUser, content: content};

    this.state.connection.send(JSON.stringify(newMess));
  }

  changeCurrentUser(username){
    const newMess = {type: "postNotification", content: `${this.state.currentUser} has changed their name to ${username}`};
    this.setState({currentUser: username });
    this.state.connection.send(JSON.stringify(newMess));
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} changeCurrentUser={this.changeCurrentUser}/>
      </div>
    );
  }
}
export default App;

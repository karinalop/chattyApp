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
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: "3", username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
      }, 3000);
  }

  addMessage(content) {

    const newMess = {username: this.state.currentUser, content: content};

    this.state.connection.send(JSON.stringify(newMess));
    //receiving mssages from the server
    this.state.connection.onmessage = event => {
      //console.log(event.data);
      //console.log(this);
      const incomingMsg = JSON.parse(event.data);
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, incomingMsg];
      this.setState({ messages: newMessages });
    }
  }

  changeCurrentUser(username){
    this.setState({ currentUser: username });
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

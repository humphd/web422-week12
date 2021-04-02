import { useState, useEffect, useRef } from 'react';

import SocketIOClient from 'socket.io-client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Chat from './Chat';
import EmojiPicker from './EmojiPicker';

import './App.css';

function App() {
  const [name, setName] = useState();
  const [clients, setClients] = useState(0);
  const [emojis, setEmojis] = useState([]);
  const [messages, setMessages] = useState([]);

  let socketRef = useRef();

  useEffect(() => {
    // Create a Web Socket Client connection
    socketRef.current = SocketIOClient('http://localhost:5000');

    // Listen for info about what name we were assigned and previous messages
    socketRef.current.on('init', (data) => {
      // Initialize our chat view with recent messages from other users
      setMessages(data.messages);
      // Set our user's name
      setName(data.name);
      // Set the initial count
      setClients(data.clients);
    });

    // Listen for info about how many clients are connected
    socketRef.current.on('count', (count) => {
      // Update the client count
      setClients(count);
    });

    // Listen for messages broadcast from the server
    socketRef.current.on('message', (message) => {
      // Merge the new message into our current list of messages
      setMessages(messages => [...messages, message])
    });

    // When we unmount this component, release the web socket connection
    return () => socketRef.current.disconnect();
  }, []);

  function handleOnSubmit() {
    // Send this message to the server
    socketRef.current.emit('message', { name, emojis });
    // Clear the input, now that it's sent
    setEmojis([]);
    // Add it to the list of messages, indicating we wrote it (me=true)
    setMessages([...messages, { name, emojis, me: true }])
  }

  function handleOnChange(emoji) {
    // Add this emoji to the list of emojis we have for the input
    setEmojis([...emojis, emoji]);
  }

  return (
    <Container id="app">
      <Row id="chat">
        <Col>
          <Chat messages={messages} />
        </Col>
      </Row>
      <Row id="emoji-picker">
        <Col>
          <EmojiPicker
            clients={clients}
            emojis={emojis}
            onSubmit={handleOnSubmit}
            onChange={handleOnChange} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

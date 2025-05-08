import { useCallback, useEffect, useRef, useState } from 'react';
import './Message.scss';
import { type Socket, io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

interface Message {
  id?: number;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  receiver_id: number;
  sender_id: number;
  Receiver?: User;
  Sender?: User;
}

function Message() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const { user } = useAuth();

  // const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = user?.id ?? null;

  // TODO: Proper updateMsgs function, in order to fetch less times
  // Fetch messages from API then update messages state
  const fetchMsgs = useCallback(async () => {
    const response = await api.get('/me/messages');
    setMessages(response.data.messages);
  }, []);

  // Socket.IO client init
  useEffect(() => {
    // Init socket with Socket.IO server
    const socket = io('https://skillswap-hknk.onrender.com', {
      withCredentials: true, // check for CORS credentials (backend)
    });

    // We're using this socket later
    socketRef.current = socket;

    // Trigger 'join' socket event when page opens
    socket.emit('join', currentUserId);

    // Listen 'receiveMessage' socket event
    socket.on('receiveMessage', () => {
      fetchMsgs();
    });

    return () => {
      socket.disconnect(); // Clean unmount: disconnect socket
    };
  }, [currentUserId, fetchMsgs]);

  // Init existing messages
  useEffect(() => {
    fetchMsgs();
    return () => setMessages([]);
  }, [fetchMsgs]);

  // Sending form to API and Socket
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Save message into API
    await api.post(`/me/messages/${receiverId}`, {
      message: input, // faudrait unifier la key en content:
      sender_id: currentUserId,
      receiver_id: receiverId,
    });

    // Trigger 'sendMessage' socket event
    socketRef.current?.emit('sendMessage', {
      content: input,
      sender_id: currentUserId,
      receiver_id: +receiverId,
    });

    // Refresh messages displayed + Clear message input
    fetchMsgs();
    setInput('');
  };

  return (
    <main className="messages container">
      <section className="content">
        <h1>Messages</h1>

        {messages?.map((el) => (
          <div key={el.id} className="messages-msg">
            <p>{el.content}</p>
            <p>
              de : {el.Sender?.username} pour : {el.Receiver?.username}
            </p>
          </div>
        ))}

        <h1>Envoyer un message</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="receiverId">Destinataire (user id)</label>
          <input
            id="receiverId"
            type="number"
            name="receiverId"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          />
          <label htmlFor="msg">Message</label>
          <input
            id="msg"
            type="text"
            name="msg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-default">
            Envoyer
          </button>
        </form>
      </section>
    </main>
  );
}

export default Message;

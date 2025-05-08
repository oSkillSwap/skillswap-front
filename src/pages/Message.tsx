import { useCallback, useEffect, useRef, useState } from 'react';
import './Message.scss';
import { Link, useParams } from 'react-router';
import { type Socket, io } from 'socket.io-client';
import MessagesList from '../components/MessagesList';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import type IMessage from '../types/Message';

interface Conversation {
  userId: number;
  lastMessage: IMessage;
}

function Message() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const { user } = useAuth();
  const { userId: paramId } = useParams();

  // const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = user?.id;

  // TODO: Proper updateMsgs function, in order to fetch less times
  // Function to fetch all messages then process as conversation with userId unique key and lastMessage
  const fetchMsgs = useCallback(async () => {
    if (!paramId) return;
    const response = await api.get(`/me/messages/${paramId}`);
    const allMsgs = response.data.conversation;

    // Sort messages chronologically
    const sortedMessages = [...allMsgs].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    // Update state
    setMessages(sortedMessages);
  }, [paramId]);

  const fetchConversations = useCallback(async () => {
    const response = await api.get('/me/messages');
    const allMsgs = response.data.messages;

    const convMap = new Map();

    for (const msg of allMsgs) {
      // Getting the other user id of the message
      const otherUserId =
        msg.receiver_id === currentUserId ? msg.sender_id : msg.receiver_id;

      // Setting the message if otherUserId doesn't already exists (unique key)
      // Messages are already chronologically ordered
      !convMap.get(otherUserId) && convMap.set(otherUserId, msg);
    }

    const convList = Array.from(convMap.entries()).map(([key, value]) => ({
      userId: key,
      lastMessage: value,
    }));

    // Update state
    setConversations(convList);
  }, [currentUserId]);

  // Init existing messages
  useEffect(() => {
    fetchMsgs();
    return () => setMessages([]);
  }, [fetchMsgs]);

  // Init existing conversations
  useEffect(() => {
    fetchConversations();
    return () => setConversations([]);
  }, [fetchConversations]);

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
      fetchConversations();
      fetchMsgs();
    });

    return () => {
      socket.disconnect(); // Clean unmount: disconnect socket
    };
  }, [currentUserId, fetchConversations, fetchMsgs]);

  // Sending form to API and Socket
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Save message into API
    await api.post(`/me/messages/${paramId}`, {
      message: input, // faudrait unifier la key en content:
      sender_id: currentUserId,
      receiver_id: paramId,
    });

    // Trigger 'sendMessage' socket event
    socketRef.current?.emit('sendMessage', {
      content: input,
      sender_id: currentUserId,
      receiver_id: paramId,
    });

    // Refresh messages displayed + Clear message input
    fetchMsgs();
    setInput('');
  };

  return (
    <main className="messages container">
      <section className="content">
        {paramId ? (
          <>
            <Link className="btn btn-alt" to={'/message'}>
              Retour
            </Link>
            <h1>Messages avec {paramId}</h1>
            <MessagesList messages={messages} user={user} />

            <form className="messages-form" onSubmit={handleSubmit}>
              <input
                className="messages-form-input"
                type="text"
                id="msg"
                name="msg"
                value={input}
                placeholder={`Envoyer un message à ${paramId}`}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          </>
        ) : (
          <>
            <h1>Conversations</h1>

            {conversations?.map((el) => (
              <Link
                key={el.userId}
                className="conversation"
                to={`/message/${el.userId}`}
              >
                <img
                  src="/img/avatars/robot1.jpg"
                  alt=""
                  className="conversation-userpicture"
                />

                <div>
                  <p className="conversation-username">
                    {el.userId}{' '}
                    <span className="conversation-timestamp">
                      {new Date(el.lastMessage.createdAt || '').toLocaleString(
                        'fr-FR',
                      )}
                    </span>{' '}
                  </p>
                  <p className="conversation-lastmsg">
                    {el.lastMessage.content}
                  </p>
                </div>
              </Link>
            ))}
          </>
        )}
      </section>
    </main>
  );
}

export default Message;

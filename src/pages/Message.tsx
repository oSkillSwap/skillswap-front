import { useCallback, useEffect, useRef, useState } from 'react';
import './Message.scss';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { type Socket, io } from 'socket.io-client';
import MessagesList from '../components/MessagesList';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import type IMessage from '../types/Message';
import type User from '../types/User';
import PageTransition from '../utils/PageTransition';

interface Conversation {
  userId: number;
  lastMessage: {
    message: IMessage;
    user: User;
  };
}

function Message() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [input, setInput] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const { user } = useAuth();
  const { userId: paramId } = useParams();

  // const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = user?.id;

  // TODO: Refactor!!!
  // Function to fetch all messages then process as conversation with userId unique key and lastMessage
  const fetchMsgs = useCallback(async () => {
    if (!paramId) return;
    const response = await api.get(`/me/messages/${paramId}`);
    const allMsgs = response.data.conversation;

    // Sort messages chronologically
    const sortedMessages = [...allMsgs].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Update state
    setMessages(sortedMessages);
  }, [paramId]);

  const fetchConversations = useCallback(async () => {
    const response = await api.get("/me/messages");
    const allMsgs = response.data.messages;

    // Sort messages chronologically
    const sortedMessages = [...allMsgs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const convMap = new Map();

    for (const msg of sortedMessages) {
      // Getting the other user of the message
      const otherUser =
        msg.sender_id === currentUserId ? msg.Receiver : msg.Sender;
      if (!otherUser) continue;

      // Setting the message if otherUser.id doesn't already exists (unique key)
      // Messages are already chronologically ordered
      !convMap.get(otherUser.id) &&
        convMap.set(otherUser.id, { user: otherUser, message: msg });
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
    return () => {
      setMessages([]);
    };
  }, [fetchMsgs]);

  // Init existing conversations
  useEffect(() => {
    fetchConversations();
    return () => setConversations([]);
  }, [fetchConversations]);

  useEffect(() => {
    const fetchOtherUser = async () => {
      if (!paramId) return;
      const response = await api.get(`/users/${paramId}`);
      setOtherUser(response.data.user);
    };
    fetchOtherUser();

    return () => setOtherUser(null);
  }, [paramId]);

  // Socket.IO client init
  useEffect(() => {
    // Init socket with Socket.IO server
    const socket = io("https://skillswap-hknk.onrender.com", {
      withCredentials: true, // check for CORS credentials (backend)
    });

    // We're using this socket later
    socketRef.current = socket;

    // Trigger 'join' socket event when page opens
    socket.emit("join", currentUserId);

    // Listen 'receiveMessage' socket event
    socket.on("receiveMessage", () => {
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
    socketRef.current?.emit("sendMessage", {
      content: input,
      sender_id: currentUserId,
      receiver_id: paramId,
    });

    // Refresh messages displayed + Clear message input
    fetchMsgs();
    setInput("");
  };

  return (
    <main className="messages container">
      <section className="content">
        {paramId ? (
          <div className="messages-chat">
            <div className="messages-chat-header">
              <Link className="btn btn-alt" to={"/message"}>
                <ArrowLeft /> Retour
              </Link>
              <Link
                className="messages-chat-header-user"
                to={`/profile/${otherUser?.id}`}
              >
                <img
                  className="messages-chat-header-user-picture"
                  src={otherUser?.avatar}
                  alt={otherUser?.username}
                />
                <p className="messages-chat-header-user-username">
                  {otherUser?.username}
                </p>
              </Link>
            </div>
            <MessagesList messages={messages} user={user} />

            <form className="messages-form" onSubmit={handleSubmit}>
              <input
                className="messages-form-input"
                type="text"
                id="msg"
                name="msg"
                value={input}
                placeholder={`Envoyer un message à ${otherUser?.username}`}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          </div>
        ) : (
          <>
            <h1>Conversations</h1>

            {conversations.length > 0 ? (
              conversations?.map((el) => (
                <Link
                  key={el.userId}
                  className="conversation btn btn-alt"
                  to={`/message/${el.userId}`}
                >
                  <img
                    src={el.lastMessage.user.avatar}
                    alt=""
                    className="conversation-userpicture"
                  />

                  <div className="conversation-info">
                    <p className="conversation-info-username">
                      {el.lastMessage.user.username}{" "}
                      <span className="conversation-info-timestamp">
                        {new Date(
                          el.lastMessage.message.createdAt || ""
                        ).toLocaleString("fr-FR")}
                      </span>{" "}
                    </p>
                    <p className="conversation-info-lastmsg">
                      {el.lastMessage.message.sender_id === user?.id && (
                        <span className="conversation-info-lastmsg-from">
                          Vous :{" "}
                        </span>
                      )}
                      {el.lastMessage.message.content}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>Pas de conversations</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default PageTransition(Message);

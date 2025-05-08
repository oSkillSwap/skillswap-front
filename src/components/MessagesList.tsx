import { useCallback, useEffect, useRef, useState } from 'react';
import './MessagesList.scss';
import type IMessage from '../types/Message';

interface IMessagesListProps {
  messages: IMessage[];
  user?: { id: number } | null;
}

function MessagesList({ messages, user }: IMessagesListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // utility callback function
  const scrollToBottom = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const offset = el.scrollHeight - el.scrollTop - el.clientHeight;
    const isBottom = offset < 50;
    setIsAtBottom(isBottom);
  };

  // Initial scroll
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  // Conditionnal scroll
  useEffect(() => {
    if (isAtBottom && messages) {
      scrollToBottom();
    }
  }, [messages, isAtBottom, scrollToBottom]);

  return (
    <div
      className="messages-wrapper"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {messages?.map((el) => (
        <div
          key={el.id}
          className={`messages-msg${el.sender_id === user?.id ? ' msg-send' : ''}`}
        >
          <p className="messages-msg-content">{el.content}</p>
          <p className="messages-msg-timestamp">
            {new Date(el.createdAt || '').toLocaleString('fr-FR')}
          </p>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessagesList;

import { useEffect } from 'react';
import './FashMessage.scss';

type FlashMessageProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
};

function FlashMessage({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: FlashMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className={`flash-message flash-${type}`}>{message}</div>;
}

export default FlashMessage;

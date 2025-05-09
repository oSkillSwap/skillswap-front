interface User {
  id: number;
  username: string;
  avatar?: string;
}

export default interface IMessage {
  id?: number;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  receiver_id: number;
  sender_id: number;
  Receiver?: User;
  Sender?: User;
}

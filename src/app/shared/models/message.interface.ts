export interface MessageInterface {
  id?: string;
  senderId?: string;
  receiverId?: string;
  senderName?: string;
  senderEmail?: string;
  receiverEmail?: string;
  type?: string;
  content?: string;
  sendTime?: Date;
  subject?: string;
}
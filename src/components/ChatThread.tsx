import { ChatMessage } from "./ChatMessage";

export interface Message {
  id: string;
  content: string;
  isAi: boolean;
}

interface ChatThreadProps {
  messages: Message[];
}

export const ChatThread = ({ messages }: ChatThreadProps) => {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          content={message.content}
          isAi={message.isAi}
        />
      ))}
    </div>
  );
};
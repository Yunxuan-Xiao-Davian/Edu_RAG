import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isAi: boolean;
}

export const ChatMessage = ({ content, isAi }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-fade-in",
        isAi ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2 shadow-sm",
          isAi
            ? "bg-blue-50 text-gray-800"
            : "bg-white text-gray-800 border border-gray-200"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};
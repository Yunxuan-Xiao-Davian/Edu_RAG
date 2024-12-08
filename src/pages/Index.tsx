import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { ChatThread, Message } from "@/components/ChatThread";
import { useToast } from "@/hooks/use-toast";
import { retrieveDocuments } from "@/services/documentRetrieval";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { DocumentCard, Document } from "@/components/DocumentCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddDocumentDrawer } from "@/components/AddDocumentDrawer";
import { ApiSettingsDialog } from "@/components/ApiSettingsDialog";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        isAi: false,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // First, get relevant documents
      const docs = await retrieveDocuments(content);
      console.log('Retrieved documents:', docs);
      setDocuments(docs);

      // Check if API keys are set
      const openAiKey = localStorage.getItem("openai_key");
      const deepseekKey = localStorage.getItem("deepseek_key");
      const groqKey = localStorage.getItem("groq_key");

      if (!openAiKey && !deepseekKey && !groqKey) {
        throw new Error("No API keys configured");
      }

      // Then, get GPT response
      // @ts-ignore
      const gptResponse = await window.gptEngineer?.ask(content, docs);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: gptResponse || "I apologize, but I couldn't generate a response at this time.",
        isAi: true,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage = error instanceof Error && error.message === "No API keys configured"
        ? "Please configure your API keys in the API Settings"
        : "Failed to process your message. Please try again.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrieveDocuments = async () => {
    if (messages.length === 0) {
      toast({
        title: "No query",
        description: "Please enter a message first to search for relevant documents.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const lastUserMessage = [...messages].reverse().find(m => !m.isAi);
      if (!lastUserMessage) {
        throw new Error("No user message found");
      }

      const docs = await retrieveDocuments(lastUserMessage.content);
      setDocuments(docs);
      
      toast({
        title: "Documents retrieved",
        description: `Found ${docs.length} relevant documents.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retrieve documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGptClick = async () => {
    try {
      setIsLoading(true);
      // @ts-ignore
      const response = await window.gptEngineer?.select();
      if (response) {
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: response,
          isAi: true,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get GPT response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="border-b bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Academic Research Assistant</h1>
          <div className="flex gap-2">
            <Button
              onClick={handleRetrieveDocuments}
              disabled={isLoading || messages.length === 0}
              variant="outline"
            >
              <Search className="mr-2 h-4 w-4" />
              Retrieve Documents
            </Button>
            <Button
              onClick={handleGptClick}
              disabled={isLoading}
              variant="outline"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Ask GPT
            </Button>
            <AddDocumentDrawer onAddDocument={(doc) => setDocuments(prev => [...prev, doc])} />
            <ApiSettingsDialog />
          </div>
        </div>
      </header>
      
      <main className="flex flex-1 gap-4 overflow-hidden p-4">
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-white shadow-sm">
          <ChatThread messages={messages} />
          <div className="border-t p-4">
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          </div>
        </div>

        {documents.length > 0 && (
          <div className="w-96 overflow-hidden rounded-lg border bg-white shadow-sm">
            <div className="border-b p-4">
              <h2 className="font-semibold">Retrieved Documents</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)] p-4">
              <div className="flex flex-col gap-4">
                {documents.map((doc, index) => (
                  <DocumentCard key={index} document={doc} />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ApiSettingsDialog = () => {
  const { toast } = useToast();
  const [openAiKey, setOpenAiKey] = useState("");
  const [deepseekKey, setDeepseekKey] = useState("");
  const [groqKey, setGroqKey] = useState("");

  useEffect(() => {
    // Load saved keys on component mount
    setOpenAiKey(localStorage.getItem("openai_key") || "");
    setDeepseekKey(localStorage.getItem("deepseek_key") || "");
    setGroqKey(localStorage.getItem("groq_key") || "");
  }, []);

  const handleSave = () => {
    // Save keys to localStorage
    if (openAiKey) localStorage.setItem("openai_key", openAiKey);
    if (deepseekKey) localStorage.setItem("deepseek_key", deepseekKey);
    if (groqKey) localStorage.setItem("groq_key", groqKey);

    toast({
      title: "Success",
      description: "API keys have been saved successfully.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          API Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="openai">OpenAI API Key</Label>
            <Input
              id="openai"
              type="password"
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deepseek">Deepseek API Key</Label>
            <Input
              id="deepseek"
              type="password"
              value={deepseekKey}
              onChange={(e) => setDeepseekKey(e.target.value)}
              placeholder="Enter Deepseek API key"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groq">Groq API Key</Label>
            <Input
              id="groq"
              type="password"
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              placeholder="Enter Groq API key"
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save API Keys
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
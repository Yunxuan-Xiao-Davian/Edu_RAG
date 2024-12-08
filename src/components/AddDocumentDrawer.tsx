import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Document } from "./DocumentCard";
import { useToast } from "@/hooks/use-toast";

interface AddDocumentDrawerProps {
  onAddDocument: (document: Document) => void;
}

export const AddDocumentDrawer = ({ onAddDocument }: AddDocumentDrawerProps) => {
  const { toast } = useToast();
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    title: "",
    authors: [],
    abstract: "",
    keywords: [],
    source: "manual",
    url: "",
  });

  const handleAddDocument = () => {
    if (!newDocument.title || !newDocument.abstract) {
      toast({
        title: "Missing Fields",
        description: "Please fill in at least the title and abstract.",
        variant: "destructive",
      });
      return;
    }

    const document: Document = {
      title: newDocument.title,
      authors: newDocument.authors || [],
      abstract: newDocument.abstract,
      keywords: newDocument.keywords || [],
      source: "manual",
      url: newDocument.url || "",
    };

    onAddDocument(document);
    setNewDocument({
      title: "",
      authors: [],
      abstract: "",
      keywords: [],
      source: "manual",
      url: "",
    });

    toast({
      title: "Success",
      description: "Document added successfully!",
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Document</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newDocument.title}
              onChange={(e) =>
                setNewDocument((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authors">Authors (comma-separated)</Label>
            <Input
              id="authors"
              value={newDocument.authors?.join(", ")}
              onChange={(e) =>
                setNewDocument((prev) => ({
                  ...prev,
                  authors: e.target.value.split(",").map((a) => a.trim()),
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea
              id="abstract"
              value={newDocument.abstract}
              onChange={(e) =>
                setNewDocument((prev) => ({ ...prev, abstract: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              value={newDocument.keywords?.join(", ")}
              onChange={(e) =>
                setNewDocument((prev) => ({
                  ...prev,
                  keywords: e.target.value.split(",").map((k) => k.trim()),
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL (optional)</Label>
            <Input
              id="url"
              value={newDocument.url}
              onChange={(e) =>
                setNewDocument((prev) => ({ ...prev, url: e.target.value }))
              }
            />
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleAddDocument}>Add Document</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
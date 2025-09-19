import { useState, useEffect } from "react";
import { X, Save, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeckEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  initialTitle?: string;
  title: string;
}

export function DeckEditor({ 
  isOpen, 
  onClose, 
  onSave, 
  initialTitle = "",
  title 
}: DeckEditorProps) {
  const [deckTitle, setDeckTitle] = useState(initialTitle);

  useEffect(() => {
    setDeckTitle(initialTitle);
  }, [initialTitle, isOpen]);

  const handleSave = () => {
    if (deckTitle.trim()) {
      onSave(deckTitle.trim());
      setDeckTitle("");
      onClose();
    }
  };

  const handleClose = () => {
    setDeckTitle("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Deck Title
            </label>
            <Input
              placeholder="Enter deck title..."
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}
              className="bg-secondary/30 border-border focus:ring-primary"
              autoFocus
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClose}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!deckTitle.trim()}
            className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
          >
            <Save className="h-4 w-4" />
            Save Deck
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
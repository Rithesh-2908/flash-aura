import { useState, useEffect } from "react";
import { X, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CardEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: string, answer: string) => void;
  initialQuestion?: string;
  initialAnswer?: string;
  title: string;
}

export function CardEditor({ 
  isOpen, 
  onClose, 
  onSave, 
  initialQuestion = "", 
  initialAnswer = "",
  title 
}: CardEditorProps) {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);

  useEffect(() => {
    setQuestion(initialQuestion);
    setAnswer(initialAnswer);
  }, [initialQuestion, initialAnswer, isOpen]);

  const handleSave = () => {
    if (question.trim() && answer.trim()) {
      onSave(question.trim(), answer.trim());
      setQuestion("");
      setAnswer("");
      onClose();
    }
  };

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <Plus className="h-6 w-6 text-primary" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Question Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Question
            </label>
            <Textarea
              placeholder="Enter your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-24 bg-secondary/30 border-border resize-none focus:ring-primary"
            />
          </div>

          {/* Answer Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Answer
            </label>
            <Textarea
              placeholder="Enter the answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-24 bg-secondary/30 border-border resize-none focus:ring-primary"
            />
          </div>

          {/* Preview */}
          {(question || answer) && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Preview
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Question
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {question || "Your question will appear here..."}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-accent">
                      Answer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {answer || "Your answer will appear here..."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
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
            disabled={!question.trim() || !answer.trim()}
            className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
          >
            <Save className="h-4 w-4" />
            Save Card
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
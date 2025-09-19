import { useState } from "react";
import { ChevronLeft, Plus, Edit, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface CardListProps {
  deckTitle: string;
  cards: Flashcard[];
  onBack: () => void;
  onAddCard: () => void;
  onEditCard: (card: Flashcard) => void;
  onDeleteCard: (cardId: string) => void;
  onStartStudying: () => void;
}

export function CardList({ 
  deckTitle, 
  cards, 
  onBack, 
  onAddCard, 
  onEditCard, 
  onDeleteCard,
  onStartStudying 
}: CardListProps) {
  const [swipedCard, setSwipedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{deckTitle}</h1>
              <p className="text-muted-foreground">{cards.length} cards</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={onAddCard}
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Card
            </Button>
            {cards.length > 0 && (
              <Button 
                onClick={onStartStudying}
                className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
              >
                <Play className="h-4 w-4" />
                Study Now
              </Button>
            )}
          </div>
        </div>

        {/* Card list */}
        {cards.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <Plus className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No cards yet</h2>
              <p className="text-muted-foreground mb-6">
                Add your first flashcard to start studying
              </p>
              <Button 
                onClick={onAddCard}
                className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
              >
                <Plus className="h-4 w-4" />
                Add First Card
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {cards.map((card, index) => (
              <Card 
                key={card.id}
                className="group bg-gradient-card border-0 shadow-card hover:shadow-card-hover transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">
                            Question
                          </h3>
                          <p className="text-base line-clamp-3">{card.question}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-accent mb-2">
                            Answer
                          </h3>
                          <p className="text-base line-clamp-3 text-muted-foreground">
                            {card.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-secondary/80"
                        onClick={() => onEditCard(card)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                        onClick={() => onDeleteCard(card.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
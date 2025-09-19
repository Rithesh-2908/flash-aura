import { Plus, BookOpen, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface Deck {
  id: string;
  title: string;
  cardCount: number;
  createdAt: Date;
}

interface DeckGridProps {
  decks: Deck[];
  onSelectDeck: (deckId: string) => void;
  onCreateDeck: () => void;
  onEditDeck: (deckId: string) => void;
  onDeleteDeck: (deckId: string) => void;
}

export function DeckGrid({ decks, onSelectDeck, onCreateDeck, onEditDeck, onDeleteDeck }: DeckGridProps) {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FlashStudy
            </h1>
            <p className="text-muted-foreground mt-2">Master your knowledge with elegant flashcards</p>
          </div>
          <Button 
            onClick={onCreateDeck}
            className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
            size="lg"
          >
            <Plus className="h-5 w-5" />
            New Deck
          </Button>
        </div>

        {/* Deck grid */}
        {decks.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No decks yet</h2>
              <p className="text-muted-foreground mb-6">
                Create your first deck to start studying with flashcards
              </p>
              <Button 
                onClick={onCreateDeck}
                className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
              >
                <Plus className="h-4 w-4" />
                Create First Deck
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck, index) => (
              <Card 
                key={deck.id}
                className="group bg-gradient-card border-0 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:scale-105 transform-gpu"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader 
                  className="pb-3"
                  onClick={() => onSelectDeck(deck.id)}
                >
                  <div className="flex items-start justify-between">
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-secondary/80"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditDeck(deck.id);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDeck(deck.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle 
                    className="text-xl line-clamp-2 group-hover:text-primary transition-colors"
                    onClick={() => onSelectDeck(deck.id)}
                  >
                    {deck.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pb-3" onClick={() => onSelectDeck(deck.id)}>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{deck.cardCount} cards</span>
                    <span>•</span>
                    <span>Created {deck.createdAt.toLocaleDateString()}</span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full bg-secondary/50 hover:bg-secondary text-secondary-foreground"
                    onClick={() => onSelectDeck(deck.id)}
                  >
                    Study Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
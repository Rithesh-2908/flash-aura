import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardViewProps {
  cards: Flashcard[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
}

export function FlashcardView({ cards, currentIndex, onNext, onPrevious, onBack }: FlashcardViewProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = cards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    onNext();
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    onPrevious();
  };

  if (!currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No cards in this deck</h2>
          <Button onClick={onBack} variant="outline">
            Back to Decks
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button onClick={onBack} variant="ghost" size="sm" className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} of {cards.length}
        </div>
      </div>

      {/* Navigation arrows */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="nav-arrow nav-arrow-left opacity-70 hover:opacity-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      
      {currentIndex < cards.length - 1 && (
        <button
          onClick={handleNext}
          className="nav-arrow nav-arrow-right opacity-70 hover:opacity-100"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Main flashcard area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="flashcard-container relative">
            <Card 
              className={`
                w-full h-96 p-8 cursor-pointer transition-all duration-500
                bg-gradient-card border-0 shadow-flashcard
                hover:shadow-card-hover transform-gpu
                ${isFlipped ? 'animate-pulse' : ''}
              `}
              onClick={handleFlip}
            >
              <div className="h-full flex items-center justify-center text-center">
                <div className="w-full">
                  {!isFlipped ? (
                    <div className="slide-in-up">
                      <h3 className="text-xl font-medium text-muted-foreground mb-4">Question</h3>
                      <p className="text-2xl leading-relaxed">{currentCard.question}</p>
                    </div>
                  ) : (
                    <div className="slide-in-up">
                      <h3 className="text-xl font-medium text-accent mb-4">Answer</h3>
                      <p className="text-2xl leading-relaxed">{currentCard.answer}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={handleFlip}
              className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
              size="lg"
            >
              <RotateCcw className="h-4 w-4" />
              {isFlipped ? "Show Question" : "Show Answer"}
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="mt-8">
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
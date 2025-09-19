import { useState } from "react";
import { DeckGrid, type Deck } from "@/components/DeckGrid";
import { CardList } from "@/components/CardList";
import { FlashcardView } from "@/components/FlashcardView";
import { DeckEditor } from "@/components/DeckEditor";
import { CardEditor } from "@/components/CardEditor";
import { useToast } from "@/hooks/use-toast";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

type View = "decks" | "cards" | "study";

const Index = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<View>("decks");
  const [selectedDeckId, setSelectedDeckId] = useState<string>("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Modal states
  const [isDeckEditorOpen, setIsDeckEditorOpen] = useState(false);
  const [isCardEditorOpen, setIsCardEditorOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

  // Sample data - in a real app, this would come from a database
  const [decks, setDecks] = useState<Deck[]>([
    {
      id: "1",
      title: "Spanish Vocabulary",
      cardCount: 25,
      createdAt: new Date(2024, 0, 15),
    },
    {
      id: "2",
      title: "Math Formulas",
      cardCount: 18,
      createdAt: new Date(2024, 1, 3),
    },
    {
      id: "3",
      title: "History Facts",
      cardCount: 32,
      createdAt: new Date(2024, 1, 20),
    },
  ]);

  const [allCards, setAllCards] = useState<Record<string, Flashcard[]>>({
    "1": [
      { id: "1-1", question: "Hello (Spanish)", answer: "Hola" },
      { id: "1-2", question: "Goodbye (Spanish)", answer: "Adiós" },
      { id: "1-3", question: "Thank you (Spanish)", answer: "Gracias" },
    ],
    "2": [
      { id: "2-1", question: "Quadratic Formula", answer: "x = (-b ± √(b²-4ac)) / 2a" },
      { id: "2-2", question: "Area of a Circle", answer: "A = πr²" },
    ],
    "3": [
      { id: "3-1", question: "When did World War II end?", answer: "1945" },
      { id: "3-2", question: "Who was the first President of the United States?", answer: "George Washington" },
    ],
  });

  const currentCards = selectedDeckId ? allCards[selectedDeckId] || [] : [];
  const currentDeck = decks.find(d => d.id === selectedDeckId);

  const handleSelectDeck = (deckId: string) => {
    setSelectedDeckId(deckId);
    setCurrentView("cards");
  };

  const handleStartStudying = () => {
    setCurrentCardIndex(0);
    setCurrentView("study");
  };

  const handleBackToDecks = () => {
    setCurrentView("decks");
    setSelectedDeckId("");
  };

  const handleBackToCards = () => {
    setCurrentView("cards");
  };

  const handleNextCard = () => {
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleCreateDeck = () => {
    setEditingDeck(null);
    setIsDeckEditorOpen(true);
  };

  const handleEditDeck = (deckId: string) => {
    const deck = decks.find(d => d.id === deckId);
    if (deck) {
      setEditingDeck(deck);
      setIsDeckEditorOpen(true);
    }
  };

  const handleDeleteDeck = (deckId: string) => {
    setDecks(decks.filter(d => d.id !== deckId));
    delete allCards[deckId];
    setAllCards({ ...allCards });
    toast({
      title: "Deck deleted",
      description: "The deck has been permanently deleted.",
    });
  };

  const handleSaveDeck = (title: string) => {
    if (editingDeck) {
      // Update existing deck
      setDecks(decks.map(d => 
        d.id === editingDeck.id 
          ? { ...d, title }
          : d
      ));
      toast({
        title: "Deck updated",
        description: "The deck has been successfully updated.",
      });
    } else {
      // Create new deck
      const newDeck: Deck = {
        id: Date.now().toString(),
        title,
        cardCount: 0,
        createdAt: new Date(),
      };
      setDecks([...decks, newDeck]);
      allCards[newDeck.id] = [];
      setAllCards({ ...allCards });
      toast({
        title: "Deck created",
        description: "Your new deck has been created.",
      });
    }
  };

  const handleAddCard = () => {
    setEditingCard(null);
    setIsCardEditorOpen(true);
  };

  const handleEditCard = (card: Flashcard) => {
    setEditingCard(card);
    setIsCardEditorOpen(true);
  };

  const handleDeleteCard = (cardId: string) => {
    if (selectedDeckId) {
      const updatedCards = currentCards.filter(c => c.id !== cardId);
      setAllCards({
        ...allCards,
        [selectedDeckId]: updatedCards
      });
      
      // Update deck card count
      setDecks(decks.map(d => 
        d.id === selectedDeckId 
          ? { ...d, cardCount: updatedCards.length }
          : d
      ));
      
      toast({
        title: "Card deleted",
        description: "The flashcard has been removed.",
      });
    }
  };

  const handleSaveCard = (question: string, answer: string) => {
    if (!selectedDeckId) return;

    if (editingCard) {
      // Update existing card
      const updatedCards = currentCards.map(c =>
        c.id === editingCard.id
          ? { ...c, question, answer }
          : c
      );
      setAllCards({
        ...allCards,
        [selectedDeckId]: updatedCards
      });
      toast({
        title: "Card updated",
        description: "The flashcard has been successfully updated.",
      });
    } else {
      // Create new card
      const newCard: Flashcard = {
        id: `${selectedDeckId}-${Date.now()}`,
        question,
        answer,
      };
      const updatedCards = [...currentCards, newCard];
      setAllCards({
        ...allCards,
        [selectedDeckId]: updatedCards
      });
      
      // Update deck card count
      setDecks(decks.map(d => 
        d.id === selectedDeckId 
          ? { ...d, cardCount: updatedCards.length }
          : d
      ));
      
      toast({
        title: "Card added",
        description: "Your new flashcard has been created.",
      });
    }
  };

  if (currentView === "study") {
    return (
      <FlashcardView
        cards={currentCards}
        currentIndex={currentCardIndex}
        onNext={handleNextCard}
        onPrevious={handlePreviousCard}
        onBack={handleBackToCards}
      />
    );
  }

  if (currentView === "cards") {
    return (
      <>
        <CardList
          deckTitle={currentDeck?.title || ""}
          cards={currentCards}
          onBack={handleBackToDecks}
          onAddCard={handleAddCard}
          onEditCard={handleEditCard}
          onDeleteCard={handleDeleteCard}
          onStartStudying={handleStartStudying}
        />
        <CardEditor
          isOpen={isCardEditorOpen}
          onClose={() => setIsCardEditorOpen(false)}
          onSave={handleSaveCard}
          initialQuestion={editingCard?.question}
          initialAnswer={editingCard?.answer}
          title={editingCard ? "Edit Card" : "Add New Card"}
        />
      </>
    );
  }

  return (
    <>
      <DeckGrid
        decks={decks}
        onSelectDeck={handleSelectDeck}
        onCreateDeck={handleCreateDeck}
        onEditDeck={handleEditDeck}
        onDeleteDeck={handleDeleteDeck}
      />
      <DeckEditor
        isOpen={isDeckEditorOpen}
        onClose={() => setIsDeckEditorOpen(false)}
        onSave={handleSaveDeck}
        initialTitle={editingDeck?.title}
        title={editingDeck ? "Edit Deck" : "Create New Deck"}
      />
    </>
  );
};

export default Index;

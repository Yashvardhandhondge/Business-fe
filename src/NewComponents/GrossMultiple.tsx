import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NotepadText } from "lucide-react";
import Notes from "./Notes";
// import { MessageCircle } from 'lucide-react';

interface Props {
  state: any;
  updateState: (key: string, value: number) => void;
}

const GrossMultipleCard: React.FC<Props> = ({ state, updateState }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [grossMultiple, setGrossMultiple] = useState(state.askingPrice / state.grossRevenue);
  const [askingPrice, setAskingPrice] = useState(state.askingPrice);
  const [grossRevenue, setGrossRevenue] = useState(state.grossRevenue);
  const [notes, setNotes] = useState("");
  
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  const handleSaveChanges = () => {
    updateState("grossMultiple", grossMultiple);
    updateState("askingPrice", askingPrice);
    updateState("grossRevenue", grossRevenue);
    
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setGrossMultiple(state.askingPrice / state.grossRevenue);
    setAskingPrice(state.askingPrice);
    setGrossRevenue(state.grossRevenue);
    setNotes("");
    setIsDialogOpen(false);
  };

  const handleAskingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAskingPrice(value);
    setGrossMultiple(value / grossRevenue); 
  };

  const handleGrossRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setGrossRevenue(value);
    setGrossMultiple(askingPrice / value); 
  };

  return (
    <div className="m-1 h-full">
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500"/> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg h-full  relative">
          <div className="flex gap-2justify-between items-center">
              <h3 className="flex-1">Gross Multiple</h3>
              <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button>
            </div>
            <p className="text-2xl text-blue-500">{` ${state.askingPrice / state.grossRevenue} `}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Gross Multiple Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="askingPrice">
              Asking Price
            </label>
            <Input
              id="askingPrice"
              type="number"
              value={askingPrice}
              onChange={handleAskingPriceChange}
              placeholder="Enter asking price"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="grossRevenue">
              Gross Revenue
            </label>
            <Input
              id="grossRevenue"
              type="number"
              value={grossRevenue}
              onChange={handleGrossRevenueChange}
              placeholder="Enter gross revenue"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="grossMultiple">
              Gross Multiple (Calculated)
            </label>
            <Input
              id="grossMultiple"
              type="number"
              value={grossMultiple}
              disabled
              placeholder="Gross multiple is auto-calculated"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="notes">
              Notes
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes here..."
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {isNotesOpen && <Notes notes={state.notes.grossMultiple} title="Gross Multiple" close={() => setIsNotesOpen(false)} />} 
    </div>
  );
};

export default GrossMultipleCard;

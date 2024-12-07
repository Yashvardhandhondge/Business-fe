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

const sdeMultipleCard: React.FC<Props> = ({ state, updateState }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sdeMultiple, setSdeMultiple] = useState(state.sde_multiple);
  const [askingPrice, setAskingPrice] = useState(state.askingPrice);
  const [sceValue, setSCEValue] = useState(state.sce);
  const [notes, setNotes] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  const handleSaveChanges = () => {
    updateState("sdeMultiple", sdeMultiple);
    updateState("askingPrice", askingPrice);
    updateState("sce", sceValue);
    setShowMessageBox(true); 
    setTimeout(() => setShowMessageBox(false), 3000); 
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setSdeMultiple(state.askingPrice / state.sce);
    setAskingPrice(state.askingPrice);
    setSCEValue(state.sce);
    setNotes("");
    setIsDialogOpen(false);
  };

  const handleAskingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAskingPrice(value);
    setSdeMultiple(value / sceValue); 
  };

  const handleSCEValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSCEValue(value);
    setSdeMultiple(askingPrice / value); 
  };

  return (
    <div className="m-1 h-full">
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500"/> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg h-full  relative">
          <div className="flex gap-2justify-between items-center">
              <h3 className="flex-1">SDE Multiple</h3>
              <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button>
            </div>
            <p className="text-2xl text-blue-500">{` ${state.sdeMultiple} `}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit SCE Multiple Card</DialogTitle>
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
            <label className="font-semibold" htmlFor="sceValue">
              SCE Value
            </label>
            <Input
              id="sceValue"
              type="number"
              value={sceValue}
              onChange={handleSCEValueChange}
              placeholder="Enter SCE value"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="sdeMultiple">
              SCE Multiple (Calculated)
            </label>
            <Input
              id="sdeMultiple"
              type="number"
              value={sdeMultiple}
              disabled
              placeholder="SCE multiple is auto-calculated"
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
      {isNotesOpen && <Notes notes={state.notes.sdeMultiple} title="SDE Multiple" close={() => setIsNotesOpen(false)} />}   
    </div>
  );
};

export default sdeMultipleCard;

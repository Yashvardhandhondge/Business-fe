import React, { useEffect, useState } from "react";
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
// import { MessageCircle } from "lucide-react";

interface Props {
  state: any;
  updateState: (key: string, value: number) => void;
}

const SDE: React.FC<Props> = ({ state, updateState }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sde, setSDE] = useState(state.sde);
  const [notes, setNotes] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(() => {
    setSDE(state.sde);
  }, [state]);

  const handleSaveChanges = () => {
    updateState("sde", sde);
    setShowMessageBox(true); 
    setTimeout(() => setShowMessageBox(false), 3000); 
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setSDE(state.sde);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="m-1 h-full">
      {showMessageBox && (
        <div className="absolute top-2 left-2 bg-green-500 text-white p-2 rounded-md shadow-md">
          SDE Value has been updated!
        </div>
      )}
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500" /> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg h-full  relative">
          <div className="flex gap-2justify-between items-center">
              <h3 className="flex-1">SDE/EBIDTA</h3>
              <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button>
            </div>
            <p className="text-2xl text-blue-500">{`$${state.sde}`}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit SDE/EBIDTA Value</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="sde">
              SDE/EBIDTA Value
            </label>
            <Input
              id="sde"
              type="text"
              value={sde?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setSDE(Number(numericValue));
                }
              }}
              placeholder="Enter SDE value"
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
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
      {isNotesOpen && <Notes notes={state.notes.sde} title="SDE Value" close={() => setIsNotesOpen(false)} />}   
    </div>
  );
};

export default SDE;

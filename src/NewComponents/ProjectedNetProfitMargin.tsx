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
// import { MessageCircle } from 'lucide-react';

interface Props {
  state: any;
  updateState: (key: string, value: number) => void;
}

const ProjectedNetProfitMargin: React.FC<Props> = ({ state, updateState }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [netProfitMargin, setNetProfitMargin] = useState(state.projectedNetProfitMargin);
  const [projectedCashflow, setProjectedCashflow] = useState(state.projectedCashflow);
  const [grossRevenue, setGrossRevenue] = useState(state.grossRevenue);
  const [notes, setNotes] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(() => {
    setNetProfitMargin(state.projectedNetProfitMargin);
    setProjectedCashflow(state.projectedCashflow);
    setGrossRevenue(state.grossRevenue);
  }, [state]);

  const handleSaveChanges = () => {
    updateState("projectedNetProfitMargin", netProfitMargin);
    updateState("projectedCashflow", projectedCashflow);
    updateState("grossRevenue", grossRevenue);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setNetProfitMargin(state.projectedNetProfitMargin);
    setProjectedCashflow(state.projectedCashflow);
    setGrossRevenue(state.grossRevenue);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="m-1 h-full">
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500"/> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg h-full  relative">
          <div className="flex gap-2justify-between items-center">
              <h3 className="flex-1">Projected Net Profit Margin</h3>
              <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button>
            </div>
            <p className="text-2xl text-blue-500">{` ${state.projectedNetProfitMargin}% `}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Projected Net Profit Margin Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="netProfitMargin">
              Projected Net Profit Margin
            </label>
            <Input
              id="netProfitMargin"
              type="number"
              value={netProfitMargin}
              disabled
              onChange={(e) => setNetProfitMargin(parseFloat(e.target.value))}
              placeholder="auto calculated"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="projectedCashflow">
              Projected Cashflow
            </label>
            <Input
              id="projectedCashflow"
              type="number"
              value={projectedCashflow}
              onChange={(e) => setProjectedCashflow(parseFloat(e.target.value))}
              placeholder="Enter Projected Cashflow"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="grossRevenue">
              Gross Revenue
            </label>
            <Input
              id="grossRevenue"
              type="number"
              value={grossRevenue}
              onChange={(e) => setGrossRevenue(parseFloat(e.target.value))}
              placeholder="Enter Gross Revenue"
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
      {isNotesOpen && <Notes notes={state.notes.projectedNetProfitMargin} title="Projected Net Profit Margin" close={() => setIsNotesOpen(false)} />}   
    </div>
  );
};

export default ProjectedNetProfitMargin;

import { X } from "lucide-react";

interface NotesProps {
  notes: string[];
  title: string;
  close: () => void;
}

const Notes = ({ notes, title, close }: NotesProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="absolute top-0 right-0 p-4">
            <X className="w-10 h-10 text-gray-100 cursor-pointer" onClick={close}/>
        </div>
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        {notes.map((note, index) => (
          <p key={index} className="mb-2">{`${index + 1}. ${note}`}</p>
        ))}
      </div>
    </div>
  )
}

export default Notes
import { X } from "lucide-react";

interface FilesProps {
  files: string[];
  close: () => void;
}


function shortenURL(url: string, maxLength = 30): string {
    return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
  }

const FilesModal = ({ files, close }: FilesProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="absolute top-0 right-0 p-4">
            <X className="w-10 h-10 text-gray-100 cursor-pointer" onClick={close}/>
        </div>
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        {files.map((file, index) => (
          <a download key={index} className="mb-2 text-blue-600 hover:underline block" href={file} target="_blank">{`${index + 1}. ${shortenURL(file)}`}</a>
        ))}
      </div>
    </div>
  )
}

export default FilesModal
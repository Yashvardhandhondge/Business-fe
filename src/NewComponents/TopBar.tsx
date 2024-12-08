import React from "react";
import { ArrowLeft, LinkIcon,  Loader2,  PencilIcon,  Upload, X } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'react-toastify';
import useBusinessStore from "../store/buisnessSrore";
import FilesModal from "./FilesModal";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

function shortenURL(url: string, maxLength = 30): string {
  return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
}

export default function TopBar({ data }: { data: any }) {
  const { fetchBusiness, uploadFile, updateBusiness } = useBusinessStore();
  const [isUploading, setIsUploading] = React.useState(false);
  const [showFilesModal, setShowFilesModal] = React.useState(false);
  const [showNotesModal, setShowNotesModal] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // const navigate = useNavigate();

  React.useEffect(() => {
    if(data){
      setNotes(data.business_notes);
    }
  }, [data]);

  const handleSaveChanges = () => { 
    if(localStorage.getItem('user_id') === null){
      const business_payload = localStorage.getItem('business_payload');
      if(!business_payload) return;
      const business = JSON.parse(business_payload || '');
      business.business_notes = notes;
      localStorage.setItem('business_payload', JSON.stringify(business));
    }else{
      updateBusiness(data?._id, { business_notes: notes });
    }
    setShowNotesModal(false);
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const response = await uploadFile(data?._id, file);
        console.log("file response"+JSON.stringify(response));
        toast.success("File uploaded successfully!");
        await fetchBusiness(data?._id);
        window.location.reload();
      } catch (error) {
        toast.error("Failed to upload file. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="bg-transparent">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between mb-3 bg-gradient-to-r from-purple-500 to-indigo-600 px-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-base font-normal flex-1 text-center">{data?.business_name}</h1>
      
      </header>

      <main className="m-1">
        <Card className=" mx-3">
          <CardHeader >
             <div className="flex items-center justify-between">
              <div className="space-y-3">
              <CardTitle>{data?.business_name}</CardTitle>
              <p className="text-sm text-muted-foreground">{data?.business_location}</p>
              {
          data?.business_notes ? (
            <div className="flex gap-2 items-center">
              <p className="text-sm text-gray-500">Description: {notes}</p>
              <Button variant="ghost" onClick={() => setShowNotesModal(true)}><PencilIcon className="h-4 w-4"/></Button>
            </div> ) : (
            <Button variant="ghost"  onClick={() => setShowNotesModal(true)}>
              Add Description </Button>
            )
         }
             {showNotesModal && (
        <div className="flex gap-2">
          <Input 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add note here..."
          className="w-full"
        />
        <Button variant={"outline"} onClick={()=>handleSaveChanges()}>Add</Button>
        <Button variant={"ghost"} onClick={()=>setShowNotesModal(false)}><X/></Button>
        </div>
      )}
              </div>
             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowFilesModal(true)}>
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Share or copy link</span>
            </Button>
             </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <a href={(data?.business_url.startsWith("https://") ? data?.business_url : "https://"+data?.business_url) || ""} target="blank" className="text-sm text-blue-600 hover:underline">
                {shortenURL(data?.business_url || "")}
              </a>
              
                {
                  isUploading ? (
                    <Loader2 className="animate-spin" />
                  ):(
                    <Button disabled={isUploading} variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handleUploadClick}>
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload image</span>
                  </Button>
                  )
                }
                
            </div>
           
          </CardContent>
        </Card>
      </main>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: "none" }}
      />
      {showFilesModal && <FilesModal  files={data?.business_attachments} close={() => setShowFilesModal(false)} />}  
      
    </div>
  );
}

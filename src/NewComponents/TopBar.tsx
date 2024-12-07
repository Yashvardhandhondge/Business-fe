import React from "react";
import { ArrowLeft, LinkIcon, Pencil, Upload } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import useBusinessStore from "../store/buisnessSrore";
import FilesModal from "./FilesModal";

function shortenURL(url: string, maxLength = 30): string {
  return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
}

export default function TopBar({ data }: { data: any }) {
  const { fetchBusiness, uploadFile } = useBusinessStore();
  const [isUploading, setIsUploading] = React.useState(false);
  const [showFilesModal, setShowFilesModal] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const response = await uploadFile(data?._id, file);
        toast.success("File uploaded successfully!");
        await fetchBusiness(data?._id);
      } catch (error) {
        toast.error("Failed to upload file. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="bg-blue-50">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-white px-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-base font-normal">{data?.business_name}</h1>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowFilesModal(true)}>
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only">Share or copy link</span>
        </Button>
      </header>

      <main className="m-1">
        <Card className="relative">
          <CardHeader>
            <CardTitle>{data?.business_name}</CardTitle>
            <p className="text-sm text-muted-foreground">{data?.business_location}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Link to={data?.business_url || ""} className="text-sm text-blue-600 hover:underline">
                {shortenURL(data?.business_url || "")}
              </Link>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handleUploadClick}>
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload image</span>
              </Button>
            </div>
            {/* {data?.business_attachments && data?.business_attachments.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold">Attachments</h2>
                <ul className="list-disc pl-4">
                  {data?.business_attachments.map((attachment: string, index: number) => (
                    <li key={index}>
                      <a
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {shortenURL(attachment)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
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

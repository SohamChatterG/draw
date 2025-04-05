import Image from "next/image";
import logo from "@/public/draw.jpg";
import { Link, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileData {
  _id: string;
  name: string;
  content: string;
  createdAt: Date;
  fileName: string
}

interface WorkSpaceHeaderProps {
  onSave: () => void;
  fileData?: FileData | null;
}

function WorkSpaceHeader({ onSave, fileData }: WorkSpaceHeaderProps) {
  const handleShareImage = (imageBlob: Blob) => {
    const file = new File([imageBlob], "file.jpg", { type: "image/jpeg" });
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this file",
          files: [file],
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing not supported on this device/browser.");
    }
  };

  const handleCanvasToImage = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const imageDataUrl = canvas.toDataURL("image/png");
    fetch(imageDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        handleShareImage(blob);
      });
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b backdrop-blur-md bg-white/60 shadow-md rounded-b-xl relative">
      {/* Logo (left) */}
      <div className="flex gap-3 items-center">
        <Image src={logo} alt="logo" height={40} width={40} className="rounded-md shadow" />
      </div>

      {/* File Name (center) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <FileText className="h-5 w-5 text-indigo-600" />
        <h2 className="text-md sm:text-lg font-semibold text-indigo-800 px-3 py-1 rounded-md bg-indigo-100 shadow-inner max-w-[250px] truncate">
          {fileData?.fileName ?? "Untitled File"}
        </h2>
      </div>

      {/* Buttons (right) */}
      <div className="flex items-center gap-3">
        <Button
          className="h-9 text-sm font-medium px-4 gap-2 bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-sm"
          onClick={onSave}
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
        <Button
          className="h-9 text-sm font-medium px-4 gap-2 bg-green-500 hover:bg-green-600 transition-colors shadow-sm"
          onClick={handleCanvasToImage}
        >
          Share
          <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default WorkSpaceHeader;

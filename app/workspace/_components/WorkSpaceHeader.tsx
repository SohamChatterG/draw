import Image from "next/image";
import logo from "@/public/logo-1.png";
import { Link, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileData {
  _id: string;
  name: string;
  content: string;
  createdAt: Date;
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
    <div className="flex p-3 border-b justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image src={logo} alt="logo" height={40} width={40} />
        {fileData ? <h3>{fileData?.fileName}</h3> : <h2>File Name</h2>}
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600"
          onClick={() => onSave()}
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
        <Button
          className="h-8 text-[12px] gap-2 bg-green-500 hover:bg-green-600"
          onClick={handleCanvasToImage}
        >
          Share <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default WorkSpaceHeader;

import { createContext, useContext } from "react";
import { FILE } from "@/app/dashboard/_components/FileList"


type FileListContextType = {
  fileList_: FILE[];
  setFileList_: (files: FILE[]) => void;
};

export const FileListContext = createContext<FileListContextType | null>(null);

export const useFileListContext = () => {
  const context = useContext(FileListContext);
  if (!context) {
    throw new Error(
      "useFileListContext must be used within FileListContext.Provider"
    );
  }
  return context;
};

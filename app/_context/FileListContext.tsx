import { createContext, useContext } from "react";

export const FileListContext = createContext<any>(undefined);

export const useFileListContext = () => {
  const context = useContext(FileListContext);
  if (!context) {
    throw new Error(
      "useFileListContext must be used within FileListContext.Provider"
    );
  }
  return context;
};

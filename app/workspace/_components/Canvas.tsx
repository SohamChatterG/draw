// import { Excalidraw } from "@excalidraw/excalidraw";

// function Canvas(){
//   return (
//     <Excalidraw
//       theme="light"
//       onChange={(excalidrawElements, appState, files)=>console.log(excalidrawElements)}
//       UIOptions={{
//         canvasActions : {
//           saveToActiveFile : true,
//           loadScene : false,

//         }
//       }}
//     />
//   )
// }

// export default Canvas

import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
function Canvas({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE | null;
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();

  const updateWhiteboard = useMutation(
    api.functions.files.updateWhiteboard
  ).withOptimisticUpdate((localStore, args) => {
    const currentFile = localStore.getQuery(api.functions.files.getFileById, {
      _id: args._id,
    });
    if (currentFile) {
      localStore.setQuery(
        api.functions.files.getFileById,
        { _id: args._id },
        {
          ...currentFile,
          whiteboard: args.whiteboard,
        }
      );
    }
  });
  const saveWhiteboard = () => {
    if (whiteBoardData) {
      updateWhiteboard({
        _id: fileId,
        whiteboard: JSON.stringify(whiteBoardData),
      })
        .then((resp) => console.log("canvas", resp))
        .catch((error) => console.error("Error updating whiteboard:", error));
    } else {
      console.log("No whiteboard data to save");
    }
  };

  // Add the useEffect hook to trigger save when onSaveTrigger changes
  useEffect(() => {
    if (onSaveTrigger) {
      saveWhiteboard();
    }
  }, [onSaveTrigger]);

  return (
    <div style={{ height: "670px", overflow: "hidden" }}>
      {fileData && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
}

export default Canvas;

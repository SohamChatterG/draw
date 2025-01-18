"use client";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import Editor from "../_components/Editor";
import { useState, useEffect, use } from "react";
import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/app/dashboard/_components/FileList";

import Canvas from "../_components/Canvas";
function WorkSpace({ params: paramsPromise }: any) {
  const params = use(paramsPromise); // Use use() to unwrap the params promise
  const [triggerSave, setTriggerSave] = useState(false);
  // const [fileData, setFileData] = useState<FILE | null>(null);
  const [loading, setLoading] = useState(false);
  const convex = useConvex();
  const [viewMode, setViewMode] = useState("both"); // Possible values: "editor", "both", "canvas"

  // useEffect(() => {
  //   //@ts-ignore
  //   if (params.field) {
  //     getFileData();
  //   }
  //   //@ts-ignore
  // }, [params.field]);

  // const getFileData = () => {
  //   try {
  //     //@ts-ignore
  //     const result = useQuery(api.functions.files.getFileById, {
  //       //@ts-ignore
  //       _id: params.field,
  //     });
  //     console.log("result", result);
  //     setFileData(result);
  //   } catch (error) {
  //     console.error("Error fetching file data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fileData = useQuery(api.functions.files.getFileById, {
    //@ts-ignore
    _id: params?.field,
  });

  useEffect(() => {
    console.log("File data updated:", fileData);
  }, [fileData]);

  return (
    <div>
      <WorkSpaceHeader
        onSave={() => setTriggerSave(!triggerSave)}
        fileData={fileData}
      />

      {/* Top navigation for switching views */}
      <div className="flex justify-center space-x-4 mb-4 mt-2">
        <button
          className={`px-4 py-2 border rounded ${viewMode === "editor" ? "bg-gray-300" : ""}`}
          onClick={() => setViewMode("editor")}
        >
          Editor
        </button>
        <button
          className={`px-4 py-2 border rounded ${viewMode === "both" ? "bg-gray-300" : ""}`}
          onClick={() => setViewMode("both")}
        >
          Both
        </button>
        <button
          className={`px-4 py-2 border rounded ${viewMode === "canvas" ? "bg-gray-300" : ""}`}
          onClick={() => setViewMode("canvas")}
        >
          Canvas
        </button>
      </div>

      {/* Layout based on the selected viewMode */}
      <div className="grid">
        {viewMode === "editor" && (
          <div className="h-screen">
            {loading ? (
              <div>Loading...! Wait bro! What's the rush?</div>
            ) : (
              fileData && (
                // @ts-ignore
                <Editor
                  onSaveTrigger={triggerSave}
                  //@ts-ignore
                  fileId={params.field}
                  fileData={fileData}
                />
              )
            )}
          </div>
        )}

        {viewMode === "both" && (
          <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <div>
              {loading ? (
                <div>Loading...! Wait bro! What's the rush?</div>
              ) : (
                fileData && (
                  // @ts-ignore
                  <Editor
                    onSaveTrigger={triggerSave}
                    //@ts-ignore

                    fileId={params.field}
                    fileData={fileData}
                  />
                )
              )}
            </div>
            <div className="border-l">
              {/* @ts-ignore */}
              <Canvas
                onSaveTrigger={triggerSave}
                //@ts-ignore

                fileId={params?.field}
                fileData={fileData}
              />
            </div>
          </div>
        )}

        {viewMode === "canvas" && (
          <div className="h-screen">
            {/* @ts-ignore */}
            <Canvas
              onSaveTrigger={triggerSave}
              //@ts-ignore

              fileId={params?.field}
              fileData={fileData}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default WorkSpace;

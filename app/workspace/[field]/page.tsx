


"use client";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import Editor from "../_components/Editor";
import { useState, useEffect,use } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/app/dashboard/_components/FileList";
import dynamic from 'next/dynamic';
import { Excalidraw } from "@excalidraw/excalidraw";
// import Canvas from "../_components/Canvas";
// Dynamically import the Canvas component with no SSR
const Canvas = dynamic(() => import('../_components/Canvas'), { ssr: false });
function WorkSpace({ params: paramsPromise }: any) {
 
  const params = use(paramsPromise); // Use use() to unwrap the params promise
  const [triggerSave, setTriggerSave] = useState(false);
  const [fileData, setFileData] = useState<FILE | null>(null);
  const [loading, setLoading] = useState(true);
  const convex = useConvex();

  useEffect(() => {
    //@ts-ignore
    if (params.field) {
      getFileData();
    }
    //@ts-ignore
  }, [params.field]);

  const getFileData = async () => {
    try {
      //@ts-ignore
      const result = await convex.query(api.functions.files.getFileById, { _id: params.field });
      console.log("result", result);
      setFileData(result);
    } catch (error) {
      console.error("Error fetching file data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          {loading ? (
            <div>Loading...! Wait bro!   What's the rush?</div>
          ) : (
            fileData && (
              // @ts-ignore
              <Editor onSaveTrigger={triggerSave} fileId={params.field} fileData={fileData} />
            )
          )}
        </div>
        <div className="h-screen w-screen">
          <Canvas />
          
          {/* <Excalidraw /> */}
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;



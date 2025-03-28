import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import SideNavTopSection, { TEAM } from "./SideNavTopSection"
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";
function SideNav() {
    const { user } = useKindeBrowserClient();
    const [activeTeam, setActiveTeam] = useState<TEAM>()
    const [totalFiles, setTotalFiles] = useState<Number>()
    const createFile = useMutation(api.functions.files.createFile)
    const { fileList_, setFileList_ } = useContext(FileListContext);

    useEffect(() => {
        activeTeam && getFiles();

    }, [activeTeam])

    const convex = useConvex();
    const onFileCreate = (fileName: string) => {
        console.log(fileName);
        if (fileName && activeTeam && user) {
            createFile({
                fileName: fileName,
                //@ts-expect-error
                teamId: activeTeam._id ?? "",  // Use default value if null
                createdBy: user.email ?? "",
                archieve: false,
                document: '',
                whiteboard: ''
            })
                .then(resp => {
                    if (resp) {
                        getFiles()
                        toast('File Created Successfully');
                    }
                })
                .catch(e => {
                    toast('Error while creating file');
                });
        }
    };

    const getFiles = async () => {
        // @ts-expect-error
        const result = await convex.query(api.functions.files.getFiles, { teamId: activeTeam?._id });
        console.log('fileList from side nav ', result)
        setFileList_(result)
        setTotalFiles(result?.length)
    }

    return (
        <div className="flex flex-col h-screen fixed w-72 border-r p-6">
            <div className="flex-1">
                <SideNavTopSection user={user}
                    setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
                />
            </div>

            <div>
                <SideNavBottomSection onFileCreate={onFileCreate} totalFiles={totalFiles} />
            </div>

        </div>
    )
}

export default SideNav

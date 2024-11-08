import { Archive, Flag, Github } from "lucide-react";
import {Button} from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
  
function SideNavBottomSection({onFileCreate,totalFiles}:any) {

    const menuList = [
        {
            id:1,
            name:'Getting Started',
            icon:Flag,
            path:''
        },
        {
            id:2,
            name:'Archive',
            icon:Archive,
            path:''
        },
        {
            id:3,
            name:'Github',
            icon:Github,
            path:''
        }
    ]
    const [fileInput,setFileInput] = useState('')
    
  return (
    <div>
        {menuList.map((menu)=>
            <h2 key={menu.id} className="flex gap-2 p-2 px-2
            text-[14px] hover:bg-gray-300 rounded-md cursor-pointer">
                <menu.icon  className="h-5 w-5"/>
                {menu.name}
            </h2>
        )}
        {/* Add new file button */}



        <Dialog>
            <DialogTrigger className="w-full" asChild>
                <Button className="w-fulll bg-blue-600 hover:bg-blue-700 justify-start mt-3 mb-2" >
                    New File
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create New File</DialogTitle>
                <DialogDescription>
                    <Input placeholder="Enter File Name" className="mt-3" onChange={(e)=>{
                        setFileInput(e.target.value)
                    }} />
                </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                        <Button type="button" className="bg-blue-600 hover:bg-blue-700" disabled={!(fileInput&&fileInput.length>0)}
                            onClick={()=>onFileCreate(fileInput)}>
                            Create
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>




        

        {/* progress bar */}
        <div className="h-4 w-full bg-gray-300 rounded-full mb-5">
            <div className="h-4 w-full bg-blue-600 rounded-full">

            </div>
            <div className="pt-2">
                <strong>No. of files used {totalFiles}</strong>
            </div>
        </div>
    </div>
  )
}

export default SideNavBottomSection

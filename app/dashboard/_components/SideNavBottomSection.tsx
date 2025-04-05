import { Archive, Flag, Github } from "lucide-react";
import { Button } from '@/components/ui/button'
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

function SideNavBottomSection({ onFileCreate, totalFiles }: any) {

    const menuList = [
        {
            id: 1,
            name: 'Getting Started',
            icon: Flag,
            path: ''
        },
        {
            id: 2,
            name: 'Archive',
            icon: Archive,
            path: ''
        },
        {
            id: 3,
            name: 'Github',
            icon: Github,
            path: 'https://github.com/SohamChatterG/draw/'
        }
    ]
    const [fileInput, setFileInput] = useState('')

    return (
        <div>
            {menuList.map((menu) => (
                <h2
                    key={menu.id}
                    className="flex gap-2 p-2 px-2 text-[14px] hover:bg-gray-300 rounded-md cursor-pointer"
                    onClick={() => {
                        if (menu.path) {
                            window.open(menu.path, "_blank"); // Opens in a new tab
                        }
                    }}
                >
                    <menu.icon className="h-5 w-5" />
                    {menu.name}
                </h2>
            ))}
            {/* Add new file button */}



            <Dialog>
                <DialogTrigger className="w-full" asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start mt-3 mb-4">
                        + New File
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-6"
                >
                    <DialogHeader>
                        <DialogTitle className="text-lg">Create New File</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground mt-1 mb-3">
                            Enter a name to create a new file in your project.
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        placeholder="e.g., MyFile.txt"
                        className="mb-4"
                        onChange={(e) => setFileInput(e.target.value)}
                    />
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={!(fileInput && fileInput.length > 0)}
                                onClick={() => onFileCreate(fileInput)}
                            >
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

import Image from "next/image"
import logo from '@/public/logo-1.png'
import { Link, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
function WorkSpaceHeader({onSave}:any) {
  return (
    <div className="flex p-3 border-b justify-between items-center">
        <div className="flex gap-2 items-center">
            <Image src={logo} alt='logo' height={40} width={40} />
            <h2>File Name</h2>
        </div>
        <div className="flex items-center gap-4">
            <Button className="h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600" onClick={()=>onSave()}><Save className="h-4 w-4"/>Save</Button>
            <Button className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700">Share <Link className="h-4 w-4"/></Button>

        </div>
    </div>
  )
}

export default WorkSpaceHeader

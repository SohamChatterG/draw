import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import Image from "next/image"
function Header() {
    const {user} : any = useKindeBrowserClient()
  return (
    <div className="flex justify-end w-full gap-2 p-4 items-center">
      <div className="flex gap-2 items-center border rounded-md p-4">
        <Search className="h-4 w-4 "/>
        <input type="text" placeholder='Search' />
      </div>
      <div>
       {user?.picture&&<Image src={user?.picture || null} alt='user-picture'
        width={30} height={30}
        className="rounded-full"/>}
      </div>
      <Button
         className='gap-2 flex h-8 hover:bg-blue-700 '
      >
        <Send />
        Invite
      </Button>
    </div>
  )
}

export default Header

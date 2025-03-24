"use client"
import { useAppSelector } from "@/redux/hooks"
import { Button } from "@/components/ui/Button/button"
import Link from "next/link"


const Navigation = () => {
    const { isAuthenticated } = useAppSelector(state => state.user)
    return (
        <nav className="flex w-full items-center  justify-between md:max-w-[80vw] p-4 rounded-full bg-white relative">
            <div className="font-bold text-xl lg:text-2xl  font-caveat text-primary-green">Hub.com</div>
            <div className="flex items-center gap-1 md:gap-2">
                {isAuthenticated ? <Button>Logout</Button> : <div>
                    <Link href="/login" >
                        <Button className="mr-2" variant={"outline"}>Login</Button>
                    </Link>
                    <Link href="/register" >
                        <Button className="bg-primary-green text-black hover:bg-green-500">Signup</Button>
                    </Link>
                </div>}
                {
                    <Link href={isAuthenticated ? "/listing-create" : "/login?redirectTo=listing-create"} >
                        <Button variant={"ghost"} >List it</Button>
                    </Link>
                }
            </div>

        </nav>
    )
}
export default Navigation
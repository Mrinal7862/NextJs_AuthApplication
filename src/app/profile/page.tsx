"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast"
import {useState} from "react"

export default function profilePage(){

    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout  = async ()=>{
        try {
            
            await axios.get('/api/users/logout');
            toast.success("logout successful")
            router.push('/login')
            console.log("logout successfull")

        } catch (error: any) {
            console.log("error: ", error.message)
            toast.error
        }
    }

    const getUserDetails = async ()=>{
        const res = await axios.get('/api/users/meUser')
        console.log(res.data);
        setData(res.data.data.email)
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile page</p>
            <hr/>
            <h2 className="p-3 rounded bg-orange-500 ">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 hover:cursor-pointer">
                Logout
            </button>

            <button
            onClick={getUserDetails}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 hover:cursor-pointer">
                Get User Details
            </button>
        </div>
    )
}
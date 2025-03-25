"use client";
import Link from "next/link";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios  from "axios";
import {toast} from "react-hot-toast";

export default function Signup() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false)

    const [loading, setLoading] = React.useState(false) 

    const onSignUp = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)

            console.log("signup success", response.data);

            router.push("/login")

        } catch (error:any) {
            console.log("Signup failed", error.message)
            
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Sign-up"}</h1>
            <hr />
            <label htmlFor="username">User Name</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-300 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
            />

            <label htmlFor="Email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-300 text-black"
                id="Email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="E-mail"
            />

            <label htmlFor="Password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder-gray-300 text-black"
                id="Password"
                type="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            
            <button
            onClick={onSignUp} 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:cursor-pointer">{buttonDisabled ? "No Signup" : "Sign up"}</button>
            
            <Link href="/login">Visit Login page</Link>
        </div>
    )
}
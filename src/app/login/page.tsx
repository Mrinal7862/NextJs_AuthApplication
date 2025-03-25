"use client";
import Link from "next/link";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast"

export default function loginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        // username: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false)

    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        console.log("Logged In")
        try {

            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("login succesful", response.data);
            toast.success("Login Success");
            router.push("/profile");

        } catch (error: any) {
            console.log("Some error caught", error.message);
            toast.error(error.message);

        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length >0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "processing": "Logged In"}</h1>
            <hr />

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
            onClick={onLogin} 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:cursor-pointer">{buttonDisabled ? "No-login" : "Login"}</button>
            
            <Link href="/signup">Don't have account: <h3>Sign-Up</h3></Link>
        </div>
    )
}
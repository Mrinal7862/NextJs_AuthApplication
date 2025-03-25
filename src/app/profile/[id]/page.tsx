export default function userProfile({params}: any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p className="text-4xl ">Profile page 
                <span className="text-2xl bg-blue-300 text-white p-2 rounded-lg">{params.id}</span>
                
            </p>
        </div>
    )
}
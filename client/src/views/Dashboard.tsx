import {NavBar} from "../components/nav/NavBar.tsx";

export const Dashboard = () => {
    return (
        <>
            <NavBar/>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Welcome to Trade Mate</h1>
            </div>
        </>
    )
}
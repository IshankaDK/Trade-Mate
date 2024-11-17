import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Login} from "./views/Login.tsx";
import {Signup} from "./views/Signup.tsx";
import {Dashboard} from "./views/Dashboard.tsx";
import {NotFound} from "./views/NotFound.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;

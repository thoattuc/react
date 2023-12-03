import {Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NotFound from "./pages/NotFound";
import Education from "./pages/Education";
import Login from "./pages/Login";

function App() {
    const user = useSelector((state) => state.loginSlice.user);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login/>}/>
                {
                    user.email && <Route path='/education' element={<Education/>}/>
                }
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App;
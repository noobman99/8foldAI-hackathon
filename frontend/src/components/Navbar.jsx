import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="h-20 flex justify-items-start items-center bg-slate-50 mb-5 sticky top-0 w-full z-10" style={{boxShadow: "0 0 20px rgba(0,0,0,0.2)"}}>
            <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google Logo" height="50" width="80" className="mx-5" onClick={() => navigate("/")} />
        </nav>
    )
}

export default Navbar;
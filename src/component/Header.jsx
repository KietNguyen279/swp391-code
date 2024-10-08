import  { useState, useEffect } from 'react';
import useRegister from '../zustand/authRegister';
import "../assets/css/style.css"
import "../assets/css/bootstrap.css"
import { FaCartPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function BannerHeader() {

    const toggleRegisterForm = useRegister((state) => state.toggleRegisterForm);
  
    const [isSticky, setSticky] = useState(false);
    const [logoutDropdownVisible, setLogoutDropdownVisible] = useState(false);
    const name = localStorage.getItem("name");

    const toggleLogoutDropdown = () => {
        setLogoutDropdownVisible(!logoutDropdownVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem("name");
        window.location.reload();
    }

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 100) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSticky]);

    return (
        <div>
            <div className="bannerbg-w3l">
                <header>
                    <div className="header_topw3layouts_bar">
                        <div className="container">
                            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                                <div className="container-fluid" style={{ background: "white" }}>
                                    


                                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                                        <div className="col-xl-5 col-lg-6 header_right text-center mt-lg-0 mt-2">

                                        <a className="navbar-brand" href="/">KoiCare</a>


                                        </div>
                                        <div className="col-xl-5 col-lg-6 header_right text-center mt-lg-0 mt-2">
                                            <div className="row">
                                                <div className="col-4 w3social-icons" ></div>

                                                <div className="col-4 header-loginw3ls text-lg-center text-center position-relative">
                                                            <p onClick={toggleLogoutDropdown} className="log" style={{ color: "white", cursor: "pointer" }}>
                                                                <FaUser style={{ fontSize: "20px", transform: "translateY(5px)", color: "red" }} /> {name}
                                                            </p>
                                                            {logoutDropdownVisible && (
                                                                <div className="dropdown-menu show position-absolute" style={{ top: "100%", right: 0 }}>
                                                                    <span className="dropdown-item" onClick={handleLogout}>
                                                                        Logout
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="col-4 header-loginw3ls">
                                                            <p onClick={toggleRegisterForm} className="log" style={{ color: "white", cursor: "pointer" }}>
                                                                <Link to="/cart" className="nav-link">
                                                                    <FaCartPlus style={{ fontSize: "20px", transform: "translateY(5px)", color: "red" }} />
                                                                </Link>
                                                                
                                                            </p>
                                                        </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}

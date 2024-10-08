import { Link } from 'react-router-dom';
import "../assets/css/style.css"
import "../assets/css/bootstrap.css"

export default function NavBar() {


    return (
        <div>
            <div className="bannerbg-w3l">
                <header >
                    <div className="header_topw3layouts_bar">
                        <div className="container">

                            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: "transparent", color: "white" }}>
                                <a className="navbar-brand" href="#">Koi Care</a>
                                
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item active">
                                            <Link to="/" className="nav-link">Home</Link>
                                        </li>
                                        <li className="nav-item mx-xl-4 mx-lg-3 my-lg-0 my-3">
                                            <Link to="/Blog" className="nav-link">Blog</Link>
                                        </li>
                                        <li className="nav-item mx-xl-4 mx-lg-3 my-lg-0 my-3">
                                            <Link to="/product" className="nav-link">Product</Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <p className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                Dropdown
                                            </p>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/contact">Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>

                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
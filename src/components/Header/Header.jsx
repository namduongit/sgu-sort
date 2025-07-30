import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import LoginForm from "../LoginForm/LoginForm";

const Header = () => {
    const [isOpenFeatures, setIsOpenFeatures] = useState(false);
    const [isOpenActions, setIsOpenActions] = useState(false);

    const toggleFeatures = () => {
        setIsOpenFeatures(!isOpenFeatures);
        if (isOpenActions) setIsOpenActions(false);
    };
    const toggleActions = () => {
        setIsOpenActions(!isOpenActions);
        if (isOpenFeatures) setIsOpenFeatures(false);
    };

    const [openLogin, setOpenLogin] = useState(false); 
    // const location = useLocation();
    // const query = new URLSearchParams(location.search);

    // useEffect(() => {
    //     if (query.get("auth") === "login") {
    //         setOpenLogin(true);
    //     }
    // }, [query]);


    return (
        <div className="header p-3 mb-2 bg-light text-dark">
            <div className="header-wrapper container d-flex justify-content-between align-items-center">
                <div className="header-logo" style={{ width: "50px"}}>
                    <a href="/" className="header-logo-link">
                        <img src="./logo.png" alt="SGU Sort Logo" className="header-logo-img" style={{
                            width: "100%",
                            height: "auto"
                        }} />
                    </a>
                </div>
                <div className="header-features d-flex">
                    <div className="header-features-list position-relative me-3">
                        <p onClick={toggleFeatures} style={{
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}>Feature</p>
                        <ul className={`header-features-list-items position-absolute ${isOpenFeatures ? "d-block" : "d-none"}`}
                        style={{
                            listStyle: "none",
                            backgroundColor: "#fff",
                            padding: "10px",
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        }}>
                            <li className="header-features-item mb-2">
                                <a href="/" className="header-features-link d-flex align-items-center" style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    <i class="fa-solid fa-house-user me-2"></i>
                                    <p style={{
                                        margin: "0",
                                    }}>Home</p>
                                </a>
                            </li>
                            <li className="header-features-item mb-2">
                                <a href="/sort" className="header-features-link d-flex align-items-center" style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    <i class="fa-solid fa-filter me-2"></i>
                                    <p style={{
                                        margin: "0",
                                    }}>Sort</p>
                                </a>
                            </li>
                            <li className="header-features-item mb-2">
                                <a href="/list" className="header-features-link d-flex align-items-center" style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    <i class="fa-solid fa-list me-2"></i>
                                    <p style={{
                                        margin: "0",
                                    }}>List</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="header-features-actions position-relative">
                        <p onClick={toggleActions} style={{
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}>Actions</p>
                        <ul className={`header-features-list-items position-absolute ${isOpenActions ? "d-block" : "d-none"}`} 
                        style={{
                            listStyle: "none",
                            backgroundColor: "#fff",
                            padding: "10px",
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            }}
                            > 
                            <li className="header-features-item mb-2">
                                <a href="/?auth=login" className="header-features-link d-flex" style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    <i class="fa-solid fa-right-to-bracket me-2"></i>
                                    <p style={{
                                        margin: "0",
                                    }}>Login</p>
                                </a>
                            </li>
                            <li className="header-features-item mb-2">
                                <a href="/?auth=register" className="header-features-link d-flex" style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    <i class="fa-solid fa-user-plus me-2"></i>
                                    <p style={{
                                        margin: "0",
                                    }}>Register</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;



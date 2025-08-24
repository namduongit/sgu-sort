import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../../common/LoginForm/LoginForm";
import { isLoggedIn, getUserInfo, removeLocationToken } from "../../../utils/tokenManager";

import headerImage from "../../../images/logo.png";

import "./Header.css";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isOpenFeatures, setIsOpenFeatures] = useState(false);
    const [isOpenActions, setIsOpenActions] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);

    const toggleFeatures = () => {
        setIsOpenFeatures(prev => !prev);
        if (isOpenActions) setIsOpenActions(false);
    };
    const toggleActions = () => {
        setIsOpenActions(prev => !prev);
        if (isOpenFeatures) setIsOpenFeatures(false);
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setOpenLogin(query.get("auth") === "login");
    }, [location.search]);

    const updateSearchParam = (key, value) => {
        const params = new URLSearchParams(location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        navigate({ pathname: location.pathname, search: params.toString() });
    };

    const handleLogout = () => {
        removeLocationToken("CURRENT_USER");
        setUser(null);
        window.location.reload();
    };

    useEffect(() => {
        if (isLoggedIn()) {
            setUser(getUserInfo());
            const namePath = getUserInfo().split(" ");
            setUserName(namePath[namePath.length - 2] + " " + namePath[namePath.length - 1]);
        } else {
            setUser(null);
        }
    }, [openLogin]);

    return (
        <>
            <div className="header p-3 mb-2 bg-light text-dark">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="header-logo">
                        <a href="/" className="header-logo-link">
                            <img src={headerImage} alt="SGU Sort Logo" />
                        </a>
                    </div>

                    <div className="header-features d-flex">
                        <div className="header-features-item position-relative me-3">
                            <a href="/page/donate">
                                <p>Đóng góp</p>
                            </a>
                        </div>
                        <div className="header-features-item position-relative me-3">
                            <a href="/page/contact">
                                <p>Liên hệ</p>
                            </a>
                        </div>
                        <div className="header-features-item position-relative me-3">
                            <p onClick={toggleFeatures}>Chức năng</p>
                            <ul className={`list-features position-absolute ${isOpenFeatures ? "d-block" : "d-none"}`}>
                                <li className="mb-2 header-item">
                                    <a href="/" className="d-flex align-items-center text-decoration-none text-black mb-2">
                                        <i className="fa-solid fa-house-user me-2" />
                                        <p className="m-0">Trang chủ</p>
                                    </a>
                                </li>
                                <li className="mb-2 header-item">
                                    <a href="/feature/sort" className="d-flex align-items-center text-decoration-none text-black mb-2">
                                        <i className="fa-solid fa-filter me-2" />
                                        <p className="m-0">Sắp xếp</p>
                                    </a>
                                </li>
                                <li className="mb-2 header-item">
                                    <a href="/feature/list" className="d-flex align-items-center text-decoration-none text-black mb-2">
                                        <i className="fa-solid fa-list me-2" />
                                        <p className="m-0">Số lượng</p>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="header-features-item position-relative">
                            {!user ? (
                                <p onClick={toggleActions}>Tài khoản</p>
                            ) : (

                                <p onClick={toggleActions}>
                                    <i className="fa-solid fa-user-graduate me-1"></i>
                                    {userName}</p>
                            )}
                            <ul className={`list-features position-absolute ${isOpenActions ? "d-block" : "d-none"}`}>
                                {!user ? (
                                    <li className="mb-2 header-item">
                                        <div className="d-flex text-black align-items-center"
                                            style={{
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                updateSearchParam("auth", "login");
                                            }}>
                                            <i className="fa-solid fa-right-to-bracket me-2" />
                                            <p className="m-0">Đăng nhập</p>
                                        </div>
                                    </li>
                                ) : (
                                    <li className="mb-2 header-item">
                                        <div className="d-flex text-black align-items-center" style={{ cursor: "pointer" }} onClick={() => {
                                        }}>
                                            <i className="fa-solid fa-gear me-2" />
                                            <p className="m-0">Thông tin</p>
                                        </div>
                                    </li>
                                )}
                                <li className="mb-2 header-item">
                                    <div className="d-flex text-black align-items-center" style={{ cursor: "pointer" }} onClick={() => {
                                        handleLogout();
                                    }}>
                                        <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                                        <p className="m-0">Đăng xuất</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {openLogin && (
                <div className="position-fixed top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 100 }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="bg-white p-4 position-relative rounded shadow" style={{ minWidth: '300px' }}>
                            <h2 className="text-center mb-3">Đăng nhập hệ thống</h2>
                            <LoginForm onSuccess={() => updateSearchParam("auth", null)} />
                            <div className="position-absolute top-0 end-0 m-2" style={{ cursor: "pointer" }}
                                onClick={() => updateSearchParam("auth", null)}>
                                <i className="fa-solid fa-xmark fs-5" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;

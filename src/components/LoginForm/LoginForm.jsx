import { useState } from 'react';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-form position-fixed" style={{
            top: 0,
            right: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(80, 80, 80, 0.4)",
            opacity: 0.9,
            zIndex: 100
        }}>
            <div className="login-form-warpper position-relative d-flex justify-content-center align-items-center" style={{
                width: "100%",
                height: "100%"
            }}>
                <div className="login-form-content position-absolute bg-white p-4" style={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    minWidth: '300px',
                    borderRadius: '8px',
                }}
                >
                    <h2 className="login-form-title">Login</h2>
                    <form className="login-form-body">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
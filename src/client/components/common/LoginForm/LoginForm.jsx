import { useState } from 'react';
import { login } from '../../../services/authService';


const LoginForm = ({ onSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await login(username, password);
        console.log(result);
    }

    return (

        <form className="login-form-body position-relative" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Mã số sinh viên</label>
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
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='mb-3 d-flex align-items-center'>
                <input type="checkbox" id="show-password" checked={showPassword} onChange={togglePasswordVisibility} />
                <label htmlFor="show-password" className="form-label ms-2" style={{ margin: 0 }}>Show Password</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
    );
}

export default LoginForm;
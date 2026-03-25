import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer bg-light text-center text-lg-start py-3 mt-auto">
            <div className="container">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} SGU Sort. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
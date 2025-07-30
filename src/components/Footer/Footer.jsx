const Footer = () => {
    return (
        <footer className="footer bg-light text-center text-lg-start">
            <div className="container">
                <div className="footer-content">
                    <p style={{ margin: 0, padding: "10px 0" }}>&copy; {new Date().getFullYear()} SGU Sort. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
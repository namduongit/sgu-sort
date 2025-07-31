import "./Notification.css";
import { useEffect, useState } from "react";

const Notification = ({ time = 3000, messenger = "", type = 1 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), time);
        return () => clearTimeout(timer);
    }, [time]);

    if (!visible) return null;

    const typeConfig = {
        1: { icon: "fa-circle-check", color: "#4caf50" },
        2: { icon: "fa-triangle-exclamation", color: "#ff9800" },
        3: { icon: "fa-circle-xmark", color: "#f44336" },
        4: { icon: "fa-circle-info", color: "#2196f3" },
    };

    const { icon, color } = typeConfig[type] || typeConfig[4];

    return (
        <div className="notification-container">
            <div className="notification shadow" style={{ borderLeft: `5px solid ${color}` }}>
                <i className={`fa-solid ${icon} me-2`} style={{ color }}></i>
                <span>{messenger}</span>
            </div>
        </div>
    );
};

export default Notification;

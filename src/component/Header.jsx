import './Header.css';
import React from "react";

const Header = () => {
    console.log("Header 업데이트");
    return (
        <div className="Header">
            <div>오늘은 📅</div>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
};

export default React.memo(Header);
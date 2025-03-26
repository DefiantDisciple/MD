import React from "react";

const Card = ({ children }) => {
    return <div className="card">{children}</div>;
};

const CardContent = ({ children }) => {
    return <div className="card-content">{children}</div>;
};

export { Card, CardContent };

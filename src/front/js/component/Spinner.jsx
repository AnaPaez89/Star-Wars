import React from "react";


export const Spinner = () => {
    return (
        <div className="text-center">
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
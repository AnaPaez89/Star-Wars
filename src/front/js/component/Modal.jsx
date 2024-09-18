import React from "react";
import PropTypes from "prop-types";

const Modal = ({ show, onClose, onDelete }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure you want to leave the Light Side?</h5>
                    </div>
                    <div className="modal-body">
                        <p>Once you start down the Dark Path, forever will it dominate your destiny.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onClose}>Stay in the Light Side</button>
                        <button type="button" className="btn btn-danger" onClick={onDelete}>Doom your destiny forever</button>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Modal;

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
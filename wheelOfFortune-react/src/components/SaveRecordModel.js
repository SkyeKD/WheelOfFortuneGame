import React from 'react';
import Modal from '@mui/material/Modal';
const SaveRecordModel = ({ isOpen, onClose, onSave }) => {

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className="model-content" style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '2px solid white' }}>
                <h2>Game Over</h2>
                <p>Do you want to save your game record?</p>
                <div className="model-buttons">
                    <button onClick={onSave}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </Modal>
    );
};

export default SaveRecordModel;

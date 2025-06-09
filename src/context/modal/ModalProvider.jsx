import { useState } from "react";
import PropTypes from "prop-types";
import ModalContext from "./ModalContext";
import Modal from "react-modal";

export const ModalProvider = ({ children }) => {
    Modal.setAppElement("#root");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalContext, setModalContext] = useState(null);

    const openModal = (context) => {
        setModalContext(context);
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        setModalContext(null);
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '0',
          border: 'none',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }
      };
      
    return (
        <ModalContext.Provider value={{ modalIsOpen, openModal, closeModal }}>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" style={customStyles} >
            {modalContext}
            </Modal >
            {children}
        </ModalContext.Provider>
    )
}

ModalProvider.propTypes = {
    children: PropTypes.node.isRequired,
}


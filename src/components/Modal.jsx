import useModal from "../context/modal/UseModal"
import Button from "./Button";
import PropTypes from "prop-types";

const Modal = ({
  children,
  buttonText = "Open",
  modalTitle = "Dialog",
  modalAriaLabel
}) => {
  const { openModal } = useModal();

  const ModalContent = () => {
    return (
      <div
        className="p-4 justify-center flex flex-col text-center bg-(--bg-60) text-[color:var(--text-color)] rounded"
        role="dialog"
        aria-modal="true"
        aria-label={modalAriaLabel || modalTitle}
      >
        <h2 className="sr-only">{modalTitle}</h2>
        {children}
      </div>
    )
  }

  return (
    <Button
      onClick={() => openModal(ModalContent)}
      text={buttonText}
      aria-haspopup="dialog"
    />
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string,
  modalTitle: PropTypes.string,
  modalAriaLabel: PropTypes.string,
}

export default Modal

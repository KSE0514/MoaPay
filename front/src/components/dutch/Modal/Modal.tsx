import {ModalBox} from "./Modal.styles"

const Modal = 
({ isOpen, 
  onClose, 
  text, 
  lBtn, 
  rBtn, 
  isDutchOut=false}) =>{
    return (
      isOpen&&<ModalBox>
        <div>
          {text}
        </div>
        <button>{lBtn}</button>
        <button>{rBtn}</button>
      </ModalBox>
    )
}

export default Modal;

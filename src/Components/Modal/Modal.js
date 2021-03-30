import './Modal.css';

import ReactDOM from 'react-dom';

function Modal({ toggleModel, img }) 
{
    return ReactDOM.createPortal(
        <>
            <div className='overlay' onClick={ toggleModel }></div>
            <div className='modal' >
                <button className='exit-modal' onClick={ toggleModel }> X </button>
                <div className='image-container'>
                    <img src={ img }/>
                </div>
            </div>
        </>,
        document.getElementById( 'modal-root' )
    )
}

export default Modal;
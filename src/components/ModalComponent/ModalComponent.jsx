import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({ title = 'Modal', isOpen = false, children, ...rests }) => {
    return (
        <Modal style={{background:'rgba(0,0,255)'}} title={title} open={isOpen} {...rests}>
            {children}
        </Modal>
    )
}

export default ModalComponent
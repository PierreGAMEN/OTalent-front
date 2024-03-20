import React from 'react'
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  Button,
  Header,
  Modal,
} from 'semantic-ui-react'
import FormConnexion from './form'
import { useAppDispatch, useAppSelector } from '../../../../store/redux-hook/hook'
import { getStateModalForm } from '../../../../store/actions/modalActions'

function ModalForm() { 
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.modal.state)

  return (
    <>
      <Modal
        onClose={() => dispatch(getStateModalForm(false))}
        onOpen={() => dispatch(getStateModalForm(true))}
        trigger={<Button positive>Connexion</Button>}
        open={isOpen} 
      >
        <ModalHeader>Bienvenue sur O'Talent</ModalHeader>
        <ModalContent image>
          <ModalDescription>
            <Header>Connexion / Inscription</Header>
            <FormConnexion />
          </ModalDescription>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalForm

import React from 'react'
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Modal,
} from 'semantic-ui-react'
import FormConnexion from './form'

function ModalForm() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button positive>Connexion</Button>}
    >
      <ModalHeader>Bienvenue sur O'Talent</ModalHeader>
      <ModalContent image>
      
        <ModalDescription>
          <Header>Connexion / Inscription</Header>
          <FormConnexion />
        </ModalDescription>
      </ModalContent>     
    </Modal>
  )
}

export default ModalForm
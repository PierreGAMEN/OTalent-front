import { Button, Form, FormField } from "semantic-ui-react";

export default function FormMember () {

    return (
        <div>
        <Form>
    <FormField required>
      <label>Prénom</label>
      <input placeholder='First Name' />
    </FormField>
    <FormField required>
      <label>Nom</label>
      <input placeholder='Last Name' />
    </FormField>
    <FormField>
      <label>Ville</label>
      <input placeholder='Last Name' />
    </FormField>
    <FormField>
      <label>Code postal</label>
      <input placeholder='Last Name' />
    </FormField>
    <FormField required>
    <label>Adresse e-mail</label>
      <input type="email" placeholder='florian@exemple.com' /> 
    </FormField>
    <FormField required>
    <label>Mot de passe</label>
      <input type="password" placeholder='Mot de passe' /> 
    </FormField>
    <FormField required>
    <label>Confirmez votre mot de passe</label>
      <input type="password" placeholder='Confirmer' /> 
    </FormField>
    <Button type='submit'>Submit</Button>
  </Form>
  </div>
    )
}
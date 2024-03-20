import { Button, Form, FormField } from "semantic-ui-react";

export default function FormOrganization () {

    return (
        <div >
        <Form>
    <FormField required>
      <label>Raison sociale</label>
      <input required placeholder='First Name' />
    </FormField>
    <FormField>
    <FormField required>
      <label>Adresse</label>
      <input placeholder='First Name' />
      <label>Code postale</label>
      <input placeholder='First Name' />
      <label>Ville</label>
      <input placeholder='First Name' />
    </FormField >
    <FormField required>
      <label>N° SIRET</label>
      <input placeholder='Last Name' />
      </FormField>
    </FormField>
    <FormField required>
    <label>Adresse e-mail</label>
      <input type="email" placeholder='florian@exemple.com' /> 
    </FormField>
    <FormField required>
    <label>Téléphone</label>
      <input type="email" placeholder='florian@exemple.com' /> 
    </FormField>
    <FormField required>
    <label>Mot de passe</label>
      <input type="password" placeholder='Mot de passe' /> 
    </FormField>
    <FormField required>
    <label>Confirmez votre mot de passe</label>
      <input type="password" placeholder='Confirmer' /> 
    </FormField >
    <Button type='submit'>Submit</Button>
  </Form>
  </div>
    )
}
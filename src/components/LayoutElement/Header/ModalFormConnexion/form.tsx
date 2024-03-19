import React, { useEffect, useState } from 'react'
import {
  GridColumn,
  FormInput,
  Button,
  Divider,
  Form,
  Grid,
  Segment,
} from 'semantic-ui-react'

const FormConnexion = () => {

    const [isLargeScreen, setIsLargeScreen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 768); // Par exemple, afficher l'élément si la largeur de l'écran est supérieure à 768 pixels
        };

        // Déclenche handleResize lorsqu'on redimensionne la fenêtre
        window.addEventListener('resize', handleResize);

        // Appelle handleResize une fois pour initialiser l'état
        handleResize();

        // Nettoie l'écouteur d'événement lors du démontage du composant
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <GridColumn>
        <Form>
          <FormInput
            icon='user'
            iconPosition='left'
            label='Email'
            placeholder='florian@exemple.com'
          />
          
          <FormInput
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
          />
        
          <Button content='Login' primary />
        </Form>
      </GridColumn>
        
      <GridColumn verticalAlign='middle'>
      {!isLargeScreen &&<Divider horizontal>Ou</Divider>}
        <Button content="S'inscrire" icon='signup' size='big' />
      </GridColumn>
    </Grid>

    {isLargeScreen &&<Divider vertical>Ou</Divider>}
  </Segment>
)}

export default FormConnexion
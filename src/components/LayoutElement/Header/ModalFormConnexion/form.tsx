import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import {
  GridColumn,
  FormInput,
  Button,
  Divider,
  Form,
  Grid,
  Segment,
} from 'semantic-ui-react'
import { useAppDispatch } from '../../../../store/redux-hook/hook';
import { getStateModalForm } from '../../../../store/actions/modalActions';
import { loginRequest } from '../../../../utils';

const FormConnexion = () => {

    const [isLargeScreen, setIsLargeScreen] = useState(true);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [wrongAuthentification, setWrongAuthentification] = useState(false)

    const dispatch = useAppDispatch()

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value)
    }

    const login = async () => {

      const variables = {
        email: email,
        password: password,
      };

      const logger = await loginRequest(variables)
      if(logger.errors) {
        setWrongAuthentification(true)
      } else if (logger.data) {
        setWrongAuthentification(false)
        location.reload();
      }
    }

    useEffect(() => {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth > 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      
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
            value={email}
            onChange={handleChangeEmail}
          />
          
          <FormInput
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
            value={password}
            onChange={handleChangePassword}
          />
        
          <Button onClick={login} content='Login' primary />
          {wrongAuthentification && <div>L'identifiant est incorrect</div>}
        </Form>
      </GridColumn>
        
      <GridColumn verticalAlign='middle'>
      {!isLargeScreen &&<Divider horizontal>Ou</Divider>}
      <NavLink to="/signup">
            <Button onClick={() => dispatch(getStateModalForm(false))} content="S'inscrire" icon='signup' size='big' />
        </NavLink>
      </GridColumn>
    </Grid>

    {isLargeScreen &&<Divider vertical>Ou</Divider>}
  </Segment>
)}

export default FormConnexion
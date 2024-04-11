import React, { ChangeEventHandler, FormEvent, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRequest, requestWithVariable } from "../../../utils";
import { queryAddMember } from "../../../query";
import MemberDataInputI from "../../../@Types/memberDataInputI";
import { confirmPasswordRegex, emailRegex, isNeeded, passwordRegex, postalCodeRegex } from "../../../regex";
import ImageUpload from "../Upload";
import { useAppSelector } from "../../../store/redux-hook/hook";

export default function FormMember() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const uploadImage = useAppSelector(state => state.idImage.id);
    

  interface InputData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    postalCode: string;
    avatar: string | null ;
    city?: string; // La propriété city est rendue facultative en ajoutant "?"
}

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<boolean> => {
    e.preventDefault();
    
    if (!validateFormData(firstName, lastName, email, password, confirmPassword, postalCode)) {
        return false;
    }

    const variables: { input: InputData } = {
      input: {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
          postalCode: postalCode,
      }
  };


    if (city.trim() !== '') {
      variables.input.city = city;
    }

    if(uploadImage) {
      variables.input.avatar = `https://res.cloudinary.com/dz5n3acae/image/upload/t_trainingcard/v1/otalent/${uploadImage}`
      console.log(variables.input.avatar)
    }
  

    try {
        const response = await requestWithVariable(queryAddMember, variables);
        if(response.errors && response.errors[0].message === 'duplicate key value violates unique constraint "member_email_key"')
        {toast.error('Oups, votre adresse est déjà utilisée.');}
        await login()
        return true;
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
        return false;
    }
};


const login = async () => {

  const variables = {
    email: email,
    password: password,
  };
  const logger = await loginRequest(variables)
  
}



function validateFormData(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, postalCode: string) {
  
  if(!isNeeded(firstName, "Le prénom")){toast.error("Le prénom est requis"); return false}
  if(!isNeeded(firstName, "Le nom")){toast.error("Le nom est requis"); return false}
  if(!postalCodeRegex(postalCode)){return false}
  if(!emailRegex(email)){toast.error("L'adresse email n'a pas le bon format"); return false}
  if(!passwordRegex(password)){ return false}
  if(!confirmPasswordRegex(password, confirmPassword)){return false}

 
  return true;
}
  

  return (
      
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
  
          <label className="input input-bordered flex items-center gap-2" htmlFor="firstName">Prénom
          <input className="grow"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          /></label>

          <label className="input input-bordered flex items-center gap-2" htmlFor="lastName">Nom
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          /></label>
       
    
          <label className="input input-bordered flex items-center gap-2" htmlFor="city">Ville
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          /></label>

          <label className="input input-bordered flex items-center gap-2" htmlFor="postalCode">Code postal
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Postal Code"
          /></label>
      

          <label className="input input-bordered flex items-center gap-2" htmlFor="email">Adresse e-mail
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="florian@exemple.com"
            required
          /></label>
   

          <label className="input input-bordered flex items-center gap-2" htmlFor="password">Mot de passe
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          /></label>

 
          <label className="input input-bordered flex items-center gap-2" htmlFor="confirmPassword">Confirmez votre mot de passe
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          /></label>

          <ImageUpload />

        <button className="btn bg-green-600 text-white" type="submit">Submit</button>
      </form>
  );
}

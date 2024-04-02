import React, { ChangeEventHandler, FormEvent, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { requestWithVariable } from "../../../utils";
import { queryAddMember } from "../../../query";
import MemberDataInputI from "../../../@Types/memberDataInputI";

export default function FormMember() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<boolean> => {
    e.preventDefault();
    
    if (!validateFormData(firstName, lastName, email, password, confirmPassword)) {
        return false;
    }

    const variables = {
        input: {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            city: city,
            postalCode: postalCode,
            avatar: null // Vous pouvez laisser null si vous n'envoyez pas d'avatar
        }
    };

    try {
        await requestWithVariable(queryAddMember, variables);
        toast.success("Le formulaire a été soumis avec succès !");
        return true;
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
        return false;
    }
};



  function validateFormData(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {

    if (!firstName) {
      toast.error("Le prénom est requis");
      return false
    }
    if (!lastName) {
      toast.error("Le nom de famille est requis");
      return false
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("L'adresse email doit respecter la forme suivant : exemple@domaine.com");
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(!passwordRegex.test(password)) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial");
      return false
    }
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return false;
    }
  

    return true;
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>
        <div>
          <label htmlFor="postalCode">Code postal</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Postal Code"
          />
        </div>
        <div>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="florian@exemple.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmez votre mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

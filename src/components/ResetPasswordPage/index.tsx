import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { changePassword } from "../../utils"
import { toast } from "react-toastify"
import { querySendNewPassword } from "../../query"

const ResetPassword = () => {

    const [newPassword, setPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>, setter) => {
        const value = e.target.value;
        setter(value);
    }

    const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        passwordAreSimilar()
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log('Token:', token);

        const variables = {
            updatedPassword: newPassword
        }
        
        changePassword(querySendNewPassword, variables, token)
    }

    const passwordAreSimilar = () => {
        if(newPassword === confirmNewPassword){
            return true 
        } else {
            toast.error("Les mots de passe ne correspondent pas")
            return false}
    }


    return <div>

        <form className="modal-box">
            <h4>Vous avez oublié votre mot de passe ?</h4>
            <div className="divider"></div>
        <label className="input input-bordered flex items-center gap-4 mb-5" htmlFor="">Mot de passe : 
        <input onChange={(e) => {handleChange(e, setPassword)}} type="email" value={newPassword}/>
        </label>
        <label className="input input-bordered flex items-center gap-4 mb-5" htmlFor="">Confirmer votre mot de passe : 
        <input onChange={(e) => {handleChange(e, setConfirmNewPassword)}} type="email" value={confirmNewPassword}/>
        </label>
        <button onClick={handleSubmit} className="btn bg-green-600 text-white">Changer votre mot de passe</button>
        </form>

    </div>
}

export default ResetPassword
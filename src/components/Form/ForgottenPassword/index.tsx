import { useState } from "react"
import { requestWithVariable } from "../../../utils"
import { querySendEmailToRecoverPassword } from "../../../query"
import { toast } from "react-toastify"

export const ForgottenPassword = () => {

    const [email, setEmail] = useState('')

    const handleChange = (e) => {
        const value = e.target.value
        setEmail(value)
    }

    const sendEmailToRecoverPassword = async (e) => {
        e.preventDefault()
        const variables = {
            input :{
                email: email
            }
        }

       const response = await requestWithVariable(querySendEmailToRecoverPassword ,variables)
       if(response.requestPasswordReset === null) {
        toast.error("Nous n'avons pas pu retrouvé votre email en base de données")
       }
    }

    return (
    <form action="">
        <label className="input input-bordered flex items-center gap-4" htmlFor="">Email: 
        <input onChange={handleChange} type="email" value={email}/>
        </label>
        <button className="btn mb-5 mt-5 bg-blue-600 text-white" onClick={sendEmailToRecoverPassword}>Envoyez un email de récupération</button>
    </form>)
}
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../store/redux-hook/hook';
import { getImageUpload } from '../../../store/actions/getImageUpload';



const ImageUpload = () => {
    const [image, setImage] = useState<File | null>(null);
    const dispatch = useAppDispatch();

    /**
     * Uploads the selected image to Cloudinary.
     * @returns {Promise<any>} A promise that resolves to the uploaded image data.
     */
    const uploadImage = async () => {
        if(!image) {
            toast.error("Nous n'avons pas réussi à télécharger l'image, vérifier que vous avez bien choisi une image")
            return false
        }

        const data = new FormData();
        if (image) {
            data.append('file', image);
        }
        data.append('upload_preset', import.meta.env.VITE_CDNY_PRESET);
        data.append('cloud_name', import.meta.env.VITE_CDNY_CLOUDNAME);
        data.append('api_key', import.meta.env.VITE_CDNY_APIKEY);
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${
                    import.meta.env.VITE_CDNY_CLOUDNAME
                }/image/upload`, 
                {
                    method: 'post',
                    body: data,
                }
            );
            const result = await response.json();
            if(result.error && result.error.message === "Invalid image file") {
                toast.error("Le type de fichier est invalide, merci de choisir une image (jpg, jpeg, png, svg, webp etc.)")
            }
            if(result.public_id) 
            {dispatch(getImageUpload(result.public_id.slice(8, result.public_id.length)))
                toast.success("L'image a correctement été importée, enregistrez les modifications pour valider votre choix")
            return result;}
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <label className='input input-bordered flex items-center gap-2'>Choisissez une image
            <input
                type="file"
                onChange={
           
                    e => setImage(e.target.files ? e.target.files[0] : null)
                }
                placeholder='Vous pouvez choisir une image'
                accept="image/*"
            />
            </label>
            <button className="btn "type="button" onClick={uploadImage}>Télécharger l'image</button>
            </>
    );
};

export default ImageUpload;

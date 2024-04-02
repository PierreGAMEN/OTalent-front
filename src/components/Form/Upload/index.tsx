import { useState } from 'react';

/**
 * Component for uploading an image to Cloudinary.
 */
const ImageUpload = () => {
    const [image, setImage] = useState<File | null>(null);

    /**
     * Uploads the selected image to Cloudinary.
     * @returns {Promise<any>} A promise that resolves to the uploaded image data.
     */
    const uploadImage = async () => {
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
                }/image/upload`, // The Cloudinary upload URL
                {
                    method: 'post',
                    body: data,
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={
                    // Get the first file from the selected files
                    e => setImage(e.target.files ? e.target.files[0] : null)
                }
            />
            <button onClick={uploadImage}>Upload</button>
        </div>
    );
};

export default ImageUpload;

import { useEffect, useState } from 'react';

const Guide = () => {
    return (
        <div
            className="p-10 min-h-60 bg-secondary-background bg-texture bg-center bg-cover bg-no-repeat bg-opacity-5"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(244, 230, 188, 0.7), rgba(244, 230, 188, 0.7)), url('/src/assets/Texture 7.png')",
            }}
        >
            <h3 className="text-center pt-10 pb-10 uppercase">
                La route vers le succès
            </h3>
        </div>
    );
};

export default Guide;

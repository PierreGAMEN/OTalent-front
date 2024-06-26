import React from 'react';
import ServerError from '/public/assets/Server-Error-bro';

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center">
            <h3>404 : Page not found</h3>
            <img
                src="/public/assets/m12EDnP8xGLy8.webp"
                className="squircle w-96 h-96 mb-10 rounded-2xl"></img>
        </div>
    );
}

function ServerErrorPage() {
    return (
        <div className="flex justify-center">
                <div className="modal-box">
                    <h4 className='text-center'>
                        Erreur interne ...
                    </h4>
                    <div alt="Server error"><ServerError/></div>
                    <div className="divider"></div>
                    <div className="flex flex-col justify-center">
                        Une erreur interne s'est produite sur notre serveur. Notre équipe technique travaille à résoudre ce problème. Nous nous excusons pour la gêne occasionnée, veuillez réessayer ultérieurement, 
                        <span className='mt-5'>L'équipe O'Talent.</span>
                    </div>
                </div>
            </div>
    )
}

export {NotFoundPage, ServerErrorPage};

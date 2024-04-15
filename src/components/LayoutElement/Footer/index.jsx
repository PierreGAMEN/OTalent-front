import LogoTitle from '../../../assets/LogoTitle';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => (
    <>
        <footer className="p-10 text-white bg-primary-color bottom-0">
            <div className="flex flex-row items-center justify-center gap-10">
                <div className="flex flex-col w-2/3 gap-10 md:flex-row justify-evenly">
                    <Link
                        to="/"
                        aria-label="Accueil"
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}>
                        <LogoTitle />
                        <p>© 2024 O'Talent. Tous droits réservés</p>
                    </Link>

                    <div className="flex flex-col items-center leading-7">
                        <p className="mb-5 uppercase">Services</p>
                        <Link to="/" aria-label="Formations">
                            Formations
                        </Link>
                        <Link to="/" aria-label="Organismes">
                            Organismes
                        </Link>
                        <Link to="/" aria-label="Catégories">
                            Catégories
                        </Link>
                    </div>
                    <div className="flex flex-col items-center leading-7">
                        <p className="mb-5 uppercase">Contact</p>
                        <a href="mailto:otalentoclock@gmail.com">
                            Nous contacter
                        </a>
                        <Link to="/" aria-label="Nous rejoindre">
                            Nous rejoindre
                        </Link>
                        <Link to="/" aria-label="Aide">
                            Aide
                        </Link>
                    </div>
                    <div className="flex flex-col items-center leading-7">
                        <p className="mb-5 uppercase">A propos</p>
                        <Link to="/team" aria-label="Notre équipe">
                            Notre équipe
                        </Link>
                        <Link to="/" aria-label="Avis clients">
                            Avis clients
                        </Link>
                        <Link to="/" aria-label="FAQ">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full mt-5 gap-5 items-center justify-center lg:flex-row">
                <Link to="/" aria-label="Conditions générales d’utilisation">
                    Conditions générales d’utilisation
                </Link>
                <Link to="/" aria-label="Charte de confidentialité">
                    Charte de confidentialité
                </Link>
                <Link to="/" aria-label="Mentions légales">
                    Mentions légales
                </Link>
                <Link to="/" aria-label="Réclamations">
                    Réclamations
                </Link>
            </div>
        </footer>
    </>
);

export default Footer;

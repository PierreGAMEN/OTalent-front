export default function Footer() {
    return (
        <footer>
            <div className="p-5 bg-primary-color text-white">
                <div>
                    <div className="flex flex-col lg:flex-row justify-evenly items-center">
                        <div className="flex flex-col w-1/2 items-center gap-5">
                            <a href="/" className="flex flex-row items-center">
                                <img
                                    src="/src/assets/otalent.svg"
                                    alt="Logo"
                                    className="w-12"
                                />
                                <h1 className="ml-5">O'Talent</h1>
                            </a>
                            <div className="flex flex-col gap-2 items-center">
                                <p className="">
                                    © 2024 O'Talent. Tous droits réservés
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-evenly">
                            <div className="flex flex-col items-start leading-7">
                                <p className="mb-5 uppercase">Services</p>
                                <a href="/" className="">
                                    Formations
                                </a>
                                <a href="/" className="">
                                    Organismes
                                </a>
                                <a href="/" className="">
                                    {' '}
                                    Catégories
                                </a>
                            </div>
                            <div className="flex flex-col items-start leading-7">
                                <p className="mb-5 uppercase">Contact</p>
                                <a href="/" className="">
                                    Nous contacter
                                </a>
                                <a href="/" className="">
                                    Nous rejoindre
                                </a>
                                <a href="/" className="">
                                    {' '}
                                    Aide
                                </a>
                            </div>
                            <div className="flex flex-col items-start leading-7">
                                <p className="mb-5 uppercase">A propos</p>
                                <a href="/" className="">
                                    Notre histoire
                                </a>
                                <a href="/" className="">
                                    Avis clients
                                </a>
                                <a href="/" className="">
                                    {' '}
                                    FAQ
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-full mt-5 gap-5 items-center justify-center">
                        <a href="/" className="">
                            Conditions générales d’utilisation
                        </a>
                        <a href="/" className="">
                            Charte de confidentialité
                        </a>
                        <a href="/" className="">
                            {' '}
                            Mentions légales
                        </a>
                        <a href="/" className="">
                            {' '}
                            Réclamations
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

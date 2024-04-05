import { useState } from 'react';
import TrainingDataI from '../../../@Types/training';
import './style.scss';
import { addReview, requestWithVariable } from '../../../utils';
import { useAppSelector } from '../../../store/redux-hook/hook';
import { queryAddReview } from '../../../query';

// TODO : Améliorer l'interface gestion de la note
// TODO : l'affichage d'un nouveau commentaire, ne met pas à jour le nombre de commentaire dans le header

export default function ReviewTrainingPage({ data }: { data: TrainingDataI }) {
    const [modalAddCommentIsOpen, setModalAddCommentIsOpen] = useState(false);
    const [selectedNote, setNoteSelected] = useState('');
    const [comment, setComment] = useState('');
    const [currentComment, setCurrentComment] = useState(data.reviews);

    const user = useAppSelector(state => state.token.user);

    const openModalAddComment = () => {
        setModalAddCommentIsOpen(true);
    };

    const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setComment(value);
    };

    const handleChangeNote = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setNoteSelected(value);
    };

    const addComment = async () => {

        const variables = {
            input: {
            comment: comment,
            memberId: user.id,
            rating: selectedNote,
            trainingId: data.id
            }
        };

        // Attention mettre la fonction dans un useState
        
        const newcomment = await requestWithVariable(queryAddReview, variables)
        console.log(newcomment)
        setCurrentComment([newcomment.addReview, ...currentComment]);
        setComment('');
        setNoteSelected('');
    };


    return (
        <section className="reviews-section">
            <h2 className="reviews-section-title">
                Ce qu'en pense la communauté
            </h2>
            {user.id !== null && user.member === true && <button
                onClick={openModalAddComment}
                className="reviews-section-button"
            >
                Je donne mon avis
            </button>}

            {
                user.id === null && user.member === null && 
                <div className='p-10 text-center text-l border border-gray-300 bg-yellow-100 w-[90%] m-auto mb-5'>Vous devez vous connecter pour pouvoir commenter</div>
            }
            

            {modalAddCommentIsOpen && (
                <div className="modal-add-comment">
                    <div className="modal-add-comment-input">
                        <label
                            className="modal-add-comment-input-label"
                            htmlFor="note"
                        >
                            Attribuez une note :{' '}
                        </label>
                        <select
                            value={selectedNote}
                            onChange={handleChangeNote}
                            name="note"
                            id=""
                        >
                            <option value="">
                                --Please choose an option--
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="modal-add-comment-input">
                        <label
                            className="modal-add-comment-input-label"
                            htmlFor="comment"
                        >
                            Commentaire
                        </label>
                        <textarea
                            onChange={e => onChangeComment(e)}
                            value={comment}
                            placeholder="Notez votre commentaire ici"
                            name="comment"
                            id=""
                            cols={40}
                            rows={10}
                        ></textarea>
                    </div>

                    <div className="modal-add-comment-button">
                        <button
                            onClick={addComment}
                            className="modal-add-comment-button-button"
                        >
                            Ajouter le commentaire
                        </button>
                        <button
                            className="modal-add-comment-button-button"
                            onClick={() => {
                                setModalAddCommentIsOpen(false);
                            }}
                        >
                            Fermer l'espace commentaire
                        </button>
                    </div>
                </div>
            )}

            {currentComment.length > 0 && (
                <>
                    {currentComment.map((review, index) => (
                        <div
                            className={`review ${
                                index === 0 ? 'first-review' : ''
                            }`}
                            key={review.id}
                        >
                            <div className="review-containerImage">
                                {review.member.avatar ? (
                                    <img
                                        className="review-containerImage-image"
                                        src={review.member.avatar}
                                        alt=""
                                    />
                                ) : (
                                    <div className="review-containerImage-image">
                                        {review.member.firstname.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="review-containerText">
                                <span>{review.rating} </span>
                                <i
                                    className={
                                        review.rating >= 1
                                            ? 'star yellow icon'
                                            : 'star icon'
                                    }
                                ></i>
                                <i
                                    className={
                                        review.rating >= 2
                                            ? 'star yellow icon'
                                            : 'star icon'
                                    }
                                ></i>
                                <i
                                    className={
                                        review.rating >= 3
                                            ? 'star yellow icon'
                                            : 'star icon'
                                    }
                                ></i>
                                <i
                                    className={
                                        review.rating >= 4
                                            ? 'star yellow icon'
                                            : 'star icon'
                                    }
                                ></i>
                                <i
                                    className={
                                        review.rating >= 5
                                            ? 'star yellow icon'
                                            : 'star icon'
                                    }
                                ></i>

                                <p>
                                    {review.member.firstname}{' '}
                                    {review.member.lastname}
                                </p>
                                <p>
                                    {review.comment
                                        ? review.comment
                                        : 'Pas de commentaire disponible sur cet avis'}
                                </p>
                            </div>
                        </div>
                    ))}
                </>
            )}
            {currentComment.length < 1 && (
                <p>Il n'y a pas encore de commentaire sur cette formation</p>
            )}
        </section>
    );
}

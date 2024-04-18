import { useState } from 'react';
import { handleDateFormat, requestWithVariable } from '../../../utils';
import { useAppSelector } from '../../../store/redux-hook/hook';
import { queryAddReview } from '../../../query';
import React from 'react';

export default function ReviewTrainingPage({ data }) {
    const [selectedNote, setNoteSelected] = useState('');
    const [comment, setComment] = useState('');
    const [currentComment, setCurrentComment] = useState(data.reviews);
    const [activeStar, setActiveStar] = useState(0);
    const [modalAddCommentIsOpen, setModalAddCommentIsOpen] = useState(false);

    const user = useAppSelector((state) => state.token.user);

    const onChangeComment = (e) => {
        const value = e.target.value;
        setComment(value);
    };

    const handleStarClick = (star) => {
        setActiveStar(star);
        setNoteSelected(star);
    };

    const addComment = async () => {
        const variables = {
            input: {
                comment: comment,
                memberId: user.id,
                rating: selectedNote,
                trainingId: data.id,
            },
        };

        const response = await requestWithVariable(queryAddReview, variables);
        const newcomment = response.data;
        setCurrentComment([newcomment.addReview, ...currentComment]);
        setComment('');
        setNoteSelected('');
        setModalAddCommentIsOpen(false);
    };

    return (
        <section className="flex flex-col items-center justify-center">
            <h3>Ce qu'en pense la communauté</h3>
            {user.id !== null && user.member === true && (
                <div>
                    <button
                        onClick={() => {
                            setModalAddCommentIsOpen(true);
                        }}
                        className="button filled">
                        <h5>Je donne mon avis</h5>
                    </button>

                    {modalAddCommentIsOpen && (
                        <dialog id="my_modal_1" className="modal" open>
                            <div className="modal-box flex flex-col gap-5">
                                <h4 className="font-bold text-lg">
                                    Votre évaluation :
                                </h4>
                                <div className="rating">
                                    {[1, 2, 3, 4, 5].map((star, index) => (
                                        <input
                                            key={index}
                                            type="radio"
                                            name="rating-2"
                                            className={`mask mask-star-2 ${
                                                star <= activeStar
                                                    ? 'bg-orange-400'
                                                    : 'bg-gray-300'
                                            }`}
                                            checked={star === activeStar}
                                            onChange={() =>
                                                handleStarClick(star)
                                            }
                                        />
                                    ))}
                                </div>
                                <textarea
                                    className="textarea textarea-bordered"
                                    placeholder="Votre commentaire"
                                    value={comment}
                                    onChange={(e) =>
                                        onChangeComment(e)
                                    }></textarea>
                                <div className="modal-action">
                                    <form
                                        method="dialog"
                                        className="flex flex-row justify-between w-full">
                                        <button
                                            onClick={() => {
                                                setModalAddCommentIsOpen(false);
                                            }}
                                            className="btn">
                                            Fermer
                                        </button>
                                        <button
                                            onClick={addComment}
                                            className="btn hover:bg-green-600 hover:text-white">
                                            Ajouter le commentaire
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    )}
                </div>
            )}

            {user.id === null && user.member === null && (
                <div className="p-10 text-center text-l border border-gray-300 bg-yellow-100 w-[90%] m-auto mb-5">
                    Vous devez vous connecter pour pouvoir commenter
                </div>
            )}

            {currentComment.length > 0 && (
                <div className="flex flex-col md:flex-row gap-5 flex-wrap w-full justify-center m-5">
                    {currentComment.map((review, index) => {
                        return (
                            <div
                                className={`justify-start items-start w-9/10 lg:w-1/3 gap-5 p-1 sm:p-3 rounded-2xl border-4 border-primary-color md:w-2/3 m-3 ${
                                    index % 2 === 0
                                        ? 'bg-secondary-color'
                                        : 'bg-transparent'
                                }`}
                                key={review.id}>
                                <div className="flex w-full">
                                    <img
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-primary-color"
                                        src={`https://res.cloudinary.com/${
                                            import.meta.env.VITE_CDNY_CLOUDNAME
                                        }/image/upload/c_scale,w_150,h_150/v1/otalent/${
                                            review.member.avatar
                                        }`}
                                        alt="Avatar"
                                    />
                                    <div className="flex lg:flex-col xl:flex-row justify-between w-full lg:justify-center xl:justify-between items-start pl-2">
                                        <div>
                                        <h5 className='md:text-md'>
                                            {review.member.firstname}
                                        </h5>
                                        <p className='md:text-xs italic'>
                                            Le{' '}
                                            {handleDateFormat(
                                                review.created_at ||
                                                Date.now().toString()
                                            )}
                                        </p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="rating rating-md flex items-center">
                                                <h5 className="mr-1 hidden sm:inline-block">
                                                    {review.rating}/5
                                                </h5>
                                                {[...Array(5)].map((_, i) => (
                                                    <input
                                                        key={i}
                                                        className={
                                                            review.rating >=
                                                            i + 1
                                                                ? 'mask mask-star-2 bg-orange-400 cursor-default'
                                                                : "mask mask-star-2 bg-orange-400' checked bg-gray-300 cursor-default"
                                                        }
                                                        disabled></input>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg text-left m-2 md:m-5">
                                    {review.comment
                                        ? review.comment
                                        : 'Pas de commentaire disponible sur cet avis'}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
            {currentComment.length < 1 && (
                <p>Il n'y a pas encore de commentaire sur cette formation</p>
            )}
        </section>
    );
}
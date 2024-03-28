import { useState } from "react";
import { deleteReview, modifyReview } from "../../../../utils";

export default function ReviewsEditProfilPageMember({ data }) {
  const [memberReviews, setMemberReviews] = useState(data.reviews);
  const [editModeId, setEditModeId] = useState(null);



  const deleteComment = (idToDelete) => {
    const newComments = memberReviews.filter((comment) => comment.id !== idToDelete);
    setMemberReviews(newComments);
    deleteReview(idToDelete);
  };

  const handleChange = (e, id) => {
    const value = e.target.value;

    const updatedReviews = memberReviews.map((review) => {
      if (review.id === id) {
        return { ...review, comment: value };
      }
      return review;
    });
    setMemberReviews(updatedReviews);
  };

  const handleEditMode = (id) => {

    setEditModeId(id);
  };
  

  const saveChanges = async (id, newComment) => {
    try {
      await modifyReview(id, { comment: newComment });
     
      const updatedReviews = memberReviews.map((review) => {
        if (review.id === id) {
          return { ...review, comment: newComment };
        }
        return review;
      });
      setMemberReviews(updatedReviews);
 
      setEditModeId(null);
    } catch (error) {
      console.error('Erreur lors de la modification du commentaire :', error);

    }
  };

  return (
    <section>
      {memberReviews && memberReviews.map((review) => (
        <div key={review.id}>
          <h2>{review.training.label}</h2>
          {editModeId === review.id ? (
            <>
              <input type="text" value={review.comment} onChange={(e) => handleChange(e, review.id)} />
              <button onClick={() => saveChanges(review.id, review.comment)}>Enregistrer</button>
            </>
          ) : (
            <>
              <p>{review.comment}</p>
              <button onClick={() => handleEditMode(review.id)}>Modifier le commentaire</button>
            </>
          )}
          <button onClick={() => deleteComment(review.id)}>Supprimer le commentaire</button>
        </div>
      ))}
    </section>
  );
}

import { useState } from "react";
import { deleteReview, modifyReview, requestWithVariable } from "../../../../utils";
import { queryDeleteReview, queryModifyReview } from "../../../../query";

export default function ReviewsEditProfilPageMember({ data }) {
  const [memberReviews, setMemberReviews] = useState(data.reviews);
  const [editModeId, setEditModeId] = useState(null);



  const deleteComment = async(idToDelete) => {
    const newComments = memberReviews.filter((comment) => comment.id !== idToDelete);
    setMemberReviews(newComments);
    const variables= {
      deleteReviewId: idToDelete
    }
    await requestWithVariable(queryDeleteReview, variables)
  };

  const handleChange = async (e, id) => {
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
      const variables = {
        modifyReviewId: id,
        input: {
          comment: newComment
        }
      };
  
      await requestWithVariable(queryModifyReview, variables);
  
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
          <h4>{review.training.label}</h4>
          {editModeId === review.id ? (
            <>
              <input type="text" value={review.comment} onChange={(e) => handleChange(e, review.id)} />
              <button onClick={() => saveChanges(review.id, review.comment)}>Enregistrer</button>
            </>
          ) : (
            <>
              <p>{review.comment}</p>
              <button className="btn  bg-blue-600 text-white" onClick={() => handleEditMode(review.id)}>Modifier le commentaire</button>
            </>
          )}
          <button className="btn ml-2 bg-red-600 text-white" onClick={() => deleteComment(review.id)}>Supprimer le commentaire</button>
        </div>
      ))}
    </section>
  );
}

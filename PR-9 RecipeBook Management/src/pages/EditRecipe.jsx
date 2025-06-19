import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateRecipe } from '../redux/actions';
import RecipeForm from '../components/RecipeForm';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipes } = useSelector(state => state);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const foundRecipe = recipes.find(r => r.id === id);
    if (!foundRecipe) {
      setError('Recipe not found');
      return;
    }
    setRecipe({
      ...foundRecipe,
      ingredients: foundRecipe.ingredients.length > 0
        ? foundRecipe.ingredients
        : ['']
    });
  }, [id, recipes]);

  const handleSubmit = (updatedRecipe) => {
    dispatch(updateRecipe(updatedRecipe));
    navigate(`/recipe/${id}`);
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="mb-4">Edit Recipe</h2>
      <RecipeForm
        recipe={recipe}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </>
  );
}
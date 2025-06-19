import { useState } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function AddRecipe() {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [''],
    instructions: '',
    image: '',
    category: 'main'
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!recipe.title.trim()) {
      setError('Recipe title is required');
      return;
    }

    const validIngredients = recipe.ingredients.filter(ing => ing.trim());
    if (validIngredients.length === 0) {
      setError('At least one ingredient is required');
      return;
    }

    // Dispatch action with cleaned data
    dispatch(addRecipe({
      ...recipe,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ingredients: validIngredients
    }));

    navigate('/');
  };

  return (
    <div className="recipe-form-container">
      <h2 className="mb-4">Add New Recipe</h2>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Recipe Title*</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            placeholder="Enter recipe name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ingredients*</Form.Label>
          {recipe.ingredients.map((ingredient, index) => (
            <InputGroup key={index} className="mb-2">
              <Form.Control
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
              />
              {recipe.ingredients.length > 1 && (
                <Button
                  variant="outline-danger"
                  onClick={() => removeIngredient(index)}
                >
                  <FaMinus />
                </Button>
              )}
            </InputGroup>
          ))}
          <Button
            variant="outline-primary"
            type="button"
            onClick={addIngredient}
            className="mt-2"
          >
            <FaPlus /> Add Ingredient
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={recipe.category}
            onChange={handleChange}
          >
            <option value="main">Main Course</option>
            <option value="appetizer">Appetizer</option>
            <option value="dessert">Dessert</option>
            <option value="breakfast">Breakfast</option>
            <option value="beverage">Beverage</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            placeholder="Step-by-step instructions..."
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            placeholder="https://example.com/recipe-image.jpg"
          />
          <Form.Text className="text-muted">
            Optional - paste a direct image link
          </Form.Text>
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            Save Recipe
          </Button>
        </div>
      </Form>
    </div>
  );
}
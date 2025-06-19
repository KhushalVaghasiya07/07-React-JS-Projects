import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

export default function RecipeForm({ recipe, onSubmit, isEditing = false }) {
  const [formData, setFormData] = useState(recipe || {
    title: '',
    ingredients: [''],
    instructions: '',
    image: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Recipe title is required');
      return;
    }
    if (formData.ingredients.filter(i => i.trim()).length === 0) {
      setError('At least one ingredient is required');
      return;
    }
    setError('');
    onSubmit({
      ...formData,
      ingredients: formData.ingredients.filter(i => i.trim())
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Recipe Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter recipe title"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ingredients</Form.Label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="d-flex mb-2">
            <Form.Control
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
            />
            {formData.ingredients.length > 1 && (
              <Button
                variant="outline-danger"
                className="ms-2"
                onClick={() => removeIngredient(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline-primary"
          type="button"
          onClick={addIngredient}
          className="mt-2"
        >
          Add Ingredient
        </Button>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Enter cooking instructions"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {isEditing ? 'Update Recipe' : 'Save Recipe'}
      </Button>
    </Form>
  );
}
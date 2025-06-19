import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';

export default function RecipeList() {
  const { recipes, searchTerm } = useSelector(state => state);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing =>
      ing.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {filteredRecipes.map(recipe => (
        <Col key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </Col>
      ))}
    </Row>
  );
}
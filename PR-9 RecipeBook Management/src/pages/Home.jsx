import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import RecipeCard from '../components/RecipeCard'
import SearchFilter from '../components/SearchFilter'

export default function Home() {
  // Safely access Redux state
  const { recipes, searchTerm } = useSelector((state) => ({
    recipes: state.recipes || [],
    searchTerm: state.searchTerm || ''
  }))

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (recipe.ingredients && recipe.ingredients.some(ing =>
      ing.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  )

  return (
    <>
      <SearchFilter />
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredRecipes.map(recipe => (
          <Col key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </>
  )
}
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, Button, ListGroup, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaClock, FaEdit } from 'react-icons/fa'

export default function RecipeDetail() {
  const { id } = useParams()
  const { recipes } = useSelector((state) => state)
  const recipe = recipes.find((r) => r.id === id)

  if (!recipe) return <div className="text-center mt-5">🥲 Recipe not found</div>

  return (
    <div className="container p-4 mx-auto" style={{ maxWidth: '800px' }}>
      <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
        {recipe.image && (
          <Card.Img
            variant="top"
            src={recipe.image}
            alt={recipe.title}
            className="recipe-detail-img"
          />
        )}

        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-semibold mb-0">{recipe.title}</h2>
            <Badge bg="info" className="text-capitalize fs-6 px-3 py-2">
              {recipe.category || 'Uncategorized'}
            </Badge>
          </div>


          <section className="mb-4">
            <h5 className="fw-bold mb-2">🧂 Ingredients</h5>
            <ListGroup variant="flush">
              {recipe.ingredients.map((ingredient, index) => (
                <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
              ))}
            </ListGroup>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold mb-2">📝 Instructions</h5>
            <Card.Text style={{ whiteSpace: 'pre-line' }}>
              {recipe.instructions}
            </Card.Text>
          </section>

          <div className="d-flex gap-3">
            <Button
              as={Link}
              to={`/edit/${recipe.id}`}
              variant="primary"
              className="d-flex align-items-center"
            >
              <FaEdit className="me-2" /> Edit
            </Button>
            <Button as={Link} to="/" variant="outline-secondary">
              Back to Recipes
            </Button>
          </div>
        </Card.Body>
      </Card>

      <style jsx>{`
        .recipe-detail-img {
          height: 350px;
          object-fit: cover;
        }

        h5 {
          border-bottom: 1px solid #eee;
          padding-bottom: 4px;
        }
      `}</style>
    </div>
  )
}

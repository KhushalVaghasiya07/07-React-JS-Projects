import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaClock, FaEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../redux/actions';

export default function RecipeCard({ recipe }) {
  const dispatch = useDispatch();

  const getCategoryColor = () => {
    switch (recipe.category) {
      case 'main': return 'primary';
      case 'dessert': return 'danger';
      case 'appetizer': return 'success';
      case 'breakfast': return 'warning';
      default: return 'secondary';
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      dispatch(deleteRecipe(recipe.id));
    }
  };

  return (
    <Card className="recipe-card shadow-sm border-0 h-100">
      <div className="recipe-img-wrapper">
        <Card.Img
          variant="top"
          src={recipe.image || '/placeholder-food.jpg'}
          alt={recipe.title}
          className="recipe-img"
        />
        <Badge
          pill
          bg={getCategoryColor()}
          className="position-absolute top-2 end-2 m-1 text-capitalize px-3 py-2 fs-6 fw-normal shadow-sm"
        >
          {recipe.category || 'Uncategorized'}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="fw-semibold fs-5 text-dark mb-0 line-clamp-2">
            {recipe.title}
          </Card.Title>
        </div>

        <div className="d-flex align-items-center mb-3">
          <FaClock className="text-muted me-2" size={14} />
          <span className="text-muted small">{recipe.cookingTime || 'N/A'} mins</span>
        </div>

        <Badge bg="light" text="dark" className="mb-3 w-fit px-3 py-2 fs-6 fw-normal border">
          {recipe.ingredients.length} ingredient{recipe.ingredients.length > 1 ? 's' : ''}
        </Badge>

        <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
          <div className="d-flex gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              className="rounded-circle p-2 d-flex align-items-center justify-content-center"
              onClick={handleDelete}
            >
              <FaTrash size={14} />
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              className="rounded-circle p-2 d-flex align-items-center justify-content-center"
              as={Link}
              to={`/edit/${recipe.id}`}
            >
              <FaEdit size={14} />
            </Button>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="px-3 d-flex align-items-center rounded-pill shadow-sm"
            as={Link}
            to={`/recipe/${recipe.id}`}
          >
            <FaEye className="me-2" size={14} /> View Recipe
          </Button>
        </div>
      </Card.Body>

      <style jsx>{`
        .recipe-card {
          border-radius: 12px;
          transition: all 0.3s ease;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .recipe-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.12);
        }

        .recipe-img-wrapper {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .recipe-img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .recipe-card:hover .recipe-img {
          transform: scale(1.08);
        }

        .w-fit {
          width: fit-content;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </Card>
  );
}
import { InputGroup, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../redux/actions';

export default function SearchFilter() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector(state => state);

  return (
    <InputGroup className="mb-4">
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
      <Form.Control
        placeholder="Search recipes by title or ingredients..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </InputGroup>
  );
}
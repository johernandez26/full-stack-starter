import { Link } from 'react-router-dom';

function Item({ id, title, text }) {
  return (
    <div className="col-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          <Link to={`/detail/${id}`} className="btn btn-primary">
            Go somewhere
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Item;

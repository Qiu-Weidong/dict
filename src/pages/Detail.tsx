import { useLocation } from 'react-router-dom';

function Detail() {
  const location = useLocation();

  let query: string = location.state.query;
  query = query.trim();

  return (
      <div></div>
  );
}


export default Detail;
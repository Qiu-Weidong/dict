import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

function Detail() {
  const location = useLocation();

  let query: string = location.state.query;
  query = query.trim();

  return (
      <Layout>
        {/* <MdictComponent data={{ prefix: ['~汉'], related: ['~韓'] }}/> */}
      </Layout>
  );
}


export default Detail;
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Fragment } from 'react';
import sqlite from '../sqlite';
import { Mdict, MdictUI } from '../components/Mdict';


function Detail() {
  const location = useLocation();
  
  let query: string = location.state.query;
  query = query.trim();
  const mdicts: Mdict[] = [];

  sqlite.select<{json: string}[]>("select json from Dictionary where character = '"+ query +"';").then(datas => {
    for(const data of datas) {
      const obj: Mdict = JSON.parse(data.json);
      mdicts.push(obj);
    }
  });
  return (
    <Fragment >
      <Layout>
        <MdictUI data={mdicts[0]} />
      </Layout>
    </Fragment>
  );
}


export default Detail;
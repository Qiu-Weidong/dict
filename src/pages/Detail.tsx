import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
// import BackgroundImage from '../components/Background';
import { Fragment } from 'react';


function Detail() {
  const location = useLocation();
  console.log(location.state);

  // const drawer_bg_url = 'https://cdn.jsdelivr.net/gh/Qiu-Weidong/blog/resources/images/%E5%A3%81%E7%BA%B8/%E5%93%88%E5%B0%94%E6%96%BD%E5%A1%94%E7%89%B9.jpg';
  const main_bg_url = 'https://cdn.jsdelivr.net/gh/Qiu-Weidong/blog/resources/images/%E5%A3%81%E7%BA%B8/wallhaven-g7g8rd.jpg';

  return (
    <Fragment >
      <Layout>
        layout
      </Layout>
      {/* <BackgroundImage url={main_bg_url} /> */}
    </Fragment>
  );
}


export default Detail;
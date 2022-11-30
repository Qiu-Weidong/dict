import { Container } from "@mui/material";
import Search from "../components/Search";
import Title from "../components/Title";


function Home() {

  return (
    <Container className="container">
      {/* <Link to={'/test'}>点击跳转</Link> */}
      <Title></Title>
      <Search></Search>
    </Container>
  );
}

export default Home;
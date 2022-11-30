import { Container } from "@mui/material";
import Search from "../components/Search";
import Title from "../components/Title";


function Home() {

  return (
    <Container className="container">
      <Title></Title>
      <Search></Search>
    </Container>
  );
}

export default Home;
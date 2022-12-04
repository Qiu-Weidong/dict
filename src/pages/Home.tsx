import { Button, Container, Divider, Stack } from "@mui/material";
import Search from "../components/Search";
import Typewriter from 'typewriter-effect';
import './Home.css';


function Home() {
  const strings: string[] = ["我见青山多妩媚，", "料青山见我应如是。", "情与貌，略相似。"];
  return (
    <Container className="container">
      <h1 id="site-title" >古汉语词典</h1>
      <Search></Search>
      <Typewriter
        options={{
          strings: strings,
          autoStart: true,
          loop: true,
          wrapperClassName: "subtitle"
        }}
      />
      <Divider variant="middle" />

      <Stack direction="row" spacing={12} >
        <Button variant="contained" color="secondary" style={{fontWeight: 'bold'}} >部首检字</Button>

        <Button variant="contained" style={{fontWeight: 'bold'}}>反查文言</Button>
      </Stack>
    </Container>
  );
}

export default Home;
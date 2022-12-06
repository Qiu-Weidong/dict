import { Button, Container, Divider, Stack } from "@mui/material";
import Search from "../components/Search";
import Typewriter from 'typewriter-effect';
import './Home.css';
import { useNavigate } from "react-router-dom";


function Home() {
  const strings: string[] = ["我见青山多妩媚，", "料青山见我应如是。", "情与貌，略相似。"];
  const navgate = useNavigate();


  return (
    <Container className="container">
      <h1 id="site-title" >古汉语词典</h1>
      <Search search={(value) => navgate('/detail', { state: { query: value} } )}/>
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

// function search(value: string) {
//     console.log('输入内容', value);
//     // todo 增加跳轉
//     navgate('/detail', {
//       state: { query: value }
//     });

//     // 可以使用 navagate(-1)來回退
//   }


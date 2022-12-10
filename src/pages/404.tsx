import { Container, Button } from "@mui/material";
import NotFound from "../components/404";
import './Home.css';



export function NotFoundPage(props: any) {
  return (
    <Container className="container">
      <NotFound />
      <Button variant="contained" style={{
        fontWeight: 'bold',
        margin: '10px'
      }}
      onClick={() => props.history.push('/home') }
      >回首页</Button>
    </Container>
  );
}

export default NotFoundPage;

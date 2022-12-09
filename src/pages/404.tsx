import { Container } from "@mui/material";
import NotFound from "../components/404";
import './Home.css';



export function NotFoundPage() {
  return (
    <Container className="container">
      <NotFound />
    </Container>
  );
}

export default NotFoundPage;

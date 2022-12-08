import Card from "@mui/material/Card";
import './404.css';


export default function NotFound() {
  return (<Card raised>
    <div className="error-content">
      <div className="error-img">
        <img src="https://i.loli.net/2020/05/19/aKOcLiyPl2JQdFD.png" alt="Page not found" width="100%"
        />
      </div>
      <div className="error-info" >
        <div>
          <h1 className="error_title">404</h1>
          <p className="error_subtitle">你仿佛来到了没有知识的荒原。</p>
        </div>
      </div>
    </div>
  </Card>);
}




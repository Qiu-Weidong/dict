import './Background.css'


const BackgroundImage : React.FunctionComponent<{url: string}> = (props) => {
  return (
    <img src={props.url} alt="" className="background-img" />
  );
}


export default BackgroundImage;



import './Title.css';
import Typewriter from 'typewriter-effect';


function Title() {

  const strings: string[] = ["我见青山多妩媚，", "料青山见我应如是。", "情与貌，略相似。"];

  return (
    <div style={{ 'textAlign': 'center' }} >
      <h1 id="site-title" >古汉语词典</h1>
      <div id="site-subtitle">
        <Typewriter
          options={{
            strings: strings,
            autoStart: true,
            loop: true,
            wrapperClassName: "subtitle"
          }}
        />
      </div>
    </div>
  );
}

export default Title;

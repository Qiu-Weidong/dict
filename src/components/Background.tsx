// import logo from '../assets/Sakura.js';
import React from "react";


export class Background extends React.Component {
  bg_url = 'https://cdn.jsdelivr.net/gh/Qiu-Weidong/blog/resources/images/%E5%A3%81%E7%BA%B8/brige.jpg';

  render(): React.ReactNode {
    return (<div className="sakura" id="sakura-container">
      <img src={this.bg_url} alt="" className="background-img" />
    </div>);
  }

  // componentDidMount() {
  //   const container = document.getElementById('sakura-container');

  //   const children = container?.getElementsByTagName('script');
  //   if (children == undefined || children.length <= 0) {
  //     let script: any = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src = 'https://cdn.jsdelivr.net/gh/Qiu-Weidong/blog/resources/js/sakura.js';
  //     container?.appendChild(script);
  //   }
  //   // 

  //   // document.getElementById('sakura-container')?.appendChild(script);
  //   // document
  // }
}


export default Background;


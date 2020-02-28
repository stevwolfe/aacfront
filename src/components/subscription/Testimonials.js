import React from "react";
import '../../assets/subscription.css'



export default class Testimonials extends React.Component {

  render = () => {

    return (
      <div className="col-sm-10 col-sm-offset-1">
        <h3 className="text-center" style={{margin: "50px"}}> What People Say About Us </h3>
        <div className="container-sub" >
          <div className="col-sm-3">
            <div className="flex-sub">
              <img src={require('../../assets/woman-head.jpg')} />
              <p>I was sceptical at first. I have tried many other platforms without much success. Fuckbook is different - they really care about the people!Robin</p>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="flex-sub">
              <img src={require('../../assets/head-man.jpg')} />
              <p>I usually don't write reviews, but my experience so far has been a real pleasure. I felt very welcome and there are a lot of handsome people on here.♥Francis69</p>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="flex-sub">
              <img src={require('../../assets/head-man.jpg')} />
              <p>I use Fuckbook to clear my head after a hard day work. It's just fun to talk and exchange fantasies with strangers. For me it's the best way to relax.AngelWings</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

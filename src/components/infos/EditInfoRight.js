import React from 'react';
import CheckboxSought from '../home/CheckboxSought'

class EditInfoRight extends React.Component   {
  state = {
    active: "greeting"
  };

  render = () =>
    (
      <div>
          <div className='title-box-infos'>
            <img src={require('../../assets/protect.png')} />
            <h4>TYPE OF RELATIONSHIPS SOUGHT</h4>
          </div>
          <CheckboxSought />
      </div>
    )
}


export default EditInfoRight

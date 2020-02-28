import React from 'react';
import {Form} from 'react-bootstrap';
import DayPicker from '../home/DayPicker'
import TextField from '../home/TextField'
import MaritalStatusSelector from '../home/MaritalStatusSelector'
import UploadButton from '../home/UploadButton'

class EditInfoLeft extends React.Component   {
  state = {
    active: "greeting"
  };

  render = () =>
    (
      <div>
          <div className='title-box-infos'>
            <img src={require('../../assets/resume.png')} />
            <h4>PERSONAL INFORMATIONS</h4>
          </div>
          <div className="flex-box-infos" style={{alignItems: 'baseline'}}>
            <TextField description={this.props.description}/>
            <DayPicker age={this.props.age} />
            <MaritalStatusSelector maritalStatus={this.props.maritalStatus}/>
          </div>
      </div>
    )
}


export default EditInfoLeft

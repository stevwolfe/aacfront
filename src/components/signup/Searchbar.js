import React from "react";
import { connect } from "react-redux";
import { newStep,zipcodeMember } from "../../redux/actions";


/* global google */

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={ zipcode: ''}
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    // this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
    //     {"types": ["geocode"]});

    // this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handleChange = (event) => {
    this.setState({zipcode: event.target.value})

  }

  handleSubmit = (event) => {
    this.props.zipcodeMember(this.state.zipcode)
    this.props.newStep()

  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    this.props.onPlaceLoaded(place);
  }



  render() {
    return (
        <div className="flex-search-city">
          <input className="input-step8" ref={this.autocompleteInput}  
            onChange={(event) => this.handleChange(event)}
            id="autocomplete" placeholder="Enter city"
           type="text"></input>
          <button onClick={() => this.handleSubmit()}  className="button-step8">Enter</button>
        </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  newStep: () => {
    dispatch(newStep());
  },
  zipcodeMember: (zipcode) => {
    dispatch(zipcodeMember(zipcode))
  }
});

export default connect(null, mapDispatchToProps)(SearchBar);

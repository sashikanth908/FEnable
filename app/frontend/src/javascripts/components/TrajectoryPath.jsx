import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Polyline} from 'react-google-maps';


const latlngs = [];
let map;

class TrajectoryPath extends Component {
  constructor(props) {
    super(props);
  }
  preparePolylineData(dataObj) {
    //console.log(dataObj);
    const featureArr = [];
    _.each(dataObj, (path) => {
      featureArr.push({lat:path.lat,lng:path.lng});
    });   
    return featureArr;
  }   
  render() {
    return (
        <div> 
        {
            (this.props.pathData.length > 0) &&
              <Polyline
              path={this.preparePolylineData(this.props.pathData)}
              options={{
              strokeColor: '#479ada',
              strokeOpacity: '0.8',
              strokeWeight: 2,
              }}
              />
        }
        </div>
    );
  }
}

TrajectoryPath.propTypes = {
  pathData: PropTypes.arrayOf(PropTypes.shape()),
};

export default TrajectoryPath;

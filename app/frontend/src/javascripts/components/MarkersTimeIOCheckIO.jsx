import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

export default class MarkersTimeIOCheckIO extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
           
            props.markersArr.map(marker => (
            <Marker
              position={{ lat: marker.latitude, lng: marker.longitude }}
              key={marker.id}
            />
            ))
    
    );
  }
}

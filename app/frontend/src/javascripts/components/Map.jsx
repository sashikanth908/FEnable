import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,Marker,InfoWindow, Polyline
} from "react-google-maps";
import MapCustomControl from './MapCustomControl';
import MapDatePicker from './MapDatePicker';
import checkIOImg from '../../images/group-2.png';
import timeInImg from '../../images/group-3.svg';
import timeOutImg from '../../images/group-4.svg';
import { Spin,Row,Col } from '../common/UIComponents';

let getImg,atttributeInfo,getSize;
const lineSymbol = {
  path: 'M 0,-1 0,1',
  strokeOpacity: 1,
  strokeColor: '#479ada',
  strokeWeight: 2,
  scale: 4
};

const MainMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCru0ORtGcKd89U3VpdJAwbRh3IGOtiq8E&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ position:'relative',height:'87vh' }} />,
    mapElement: <div style={{ height: `100%`}} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  //<GoogleMap defaultZoom={5} defaultCenter={{ lat: 20.593683, lng: 78.962883 }}24.493397 80.419922
  <Spin spinning={props.inProgress} delay={1000}>
  <GoogleMap 
  {...props}
  //center={props.centerObjValue}
  defaultZoom={8} 
  defaultCenter={{ lat: 17.6868, lng: 83.2185 }}
  defaultOptions={{
    streetViewControl: false,
    scaleControl: false,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControl: true,
    fullscreenControl: true,
    fullscreenControlOptions:{
      position: google.maps.ControlPosition.TOP_RIGHT
    },
  }} 
  ref={(c) => {
    props.onMapMount && props.onMapMount(c, props);
  }}
  >
 <div >
    <MapCustomControl position={google.maps.ControlPosition.TOP_LEFT}>
              <MapDatePicker
                handleChange={props.handleChange}
                mapLoader={props.mapLoader}
              />
    </MapCustomControl>
 </div>
        {
           
          props.markersArr2.map((marker,i) => {
           // console.log( marker);
           /*  const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(new window.google.maps.LatLng(
              marker.latitude,marker.longitude
            )); */
              if(marker.id == "PI" || marker.id == "PO"){
                if(marker.id == "PI"){
                  atttributeInfo = <div className='popUpInfoStyle'>{"Time In: "+marker.timeIn}</div>;
                  getImg = timeInImg;
                  getSize = {width:60,height:70}
                }
                else{
                  atttributeInfo = <div className='popUpInfoStyle'>{"Time Out: "+marker.timeOut}</div>;
                  getImg = timeOutImg;
                  getSize = {width:60,height:70}
                }
              }
              else{
                getImg = checkIOImg;
                getSize = {width:40,height:40}
                atttributeInfo = <div style={{fontSize:12,height:140,width:276,padding:15}}><Row style={{padding:5,backgroundColor:'blue',color:'white'}}><Col span={24}>{marker.uniqueID != undefined ? "( "+marker.uniqueID +" )  " + marker.buisness_name: marker.buisness_name}</Col></Row>
                                 <Row><Col span={4} style={{padding:5,paddingTop:10}}>Address</Col></Row>
                                 <Row><Col span={20} style={{padding:5,color:'grey'}}>{marker.address_info}</Col></Row><Row style={{padding:5}}><Col span={12}> {marker.checkIn ? ' Check In: ':''}{marker.checkOut ? ' Check Out: ': ''}<span style={{color:'grey'}}> {marker.checkIn} {marker.checkOut} </span></Col></Row>
                                 </div>;
              }
              return(
                <Marker
                  label={i == 0 || i == props.markersArr2.length-1 ? '': marker.id === 'CO' ? '': marker.id === 'CI' ? marker.uniqueID.toString():i.toString()}
                  position={{ lat: marker.latitude, lng: marker.longitude }}
                  key={i}
                  options={{ icon:{url:getImg, scaledSize:marker.id =='PI' || marker.id =='PO' ? new google.maps.Size(20, 40):new google.maps.Size(35,35), anchor: marker.id =='PI' || marker.id =='PO' ? new google.maps.Point(10,30):new google.maps.Point(8,25)}}}
                 // onClick={() => props.markerClick(i)}
                  onMouseOver={() => props.markerClick(i)}
                 // onMouseOut={() => props.handleCloseAll()}
                >
                {
                   (props.isVisible === true  && props.markerIndex == i) &&
                  <InfoWindow key={i} onCloseClick={() => props.handleCloseAll()}>
                  <h1>{atttributeInfo}</h1>
                  </InfoWindow>  
                }
                </Marker>
              )
              {
                //this.refs.map.fitBounds(bounds)
              }
          })

        }
        {
             props.polygonArr.length > 0 &&
             
                <Polyline
                path= {props.polygonArr}
                options={{
                strokeOpacity: 0,
                icons: [{
                  icon: lineSymbol,
                  offset: '0',
                  repeat: '20px'
                }]
                }}
            />  
        }
        }
  </GoogleMap>
  </Spin>
   
));

MainMap.propTypes = {
  mapData: PropTypes.arrayOf(PropTypes.shape()),
  onMarkerClick: PropTypes.func,
  markerId: PropTypes.string,
};

export default MainMap;

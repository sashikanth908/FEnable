import React, { Component } from 'react';
import MainMap from '../components/Map';
import {fetchFieldVisits} from '../api/fieldVisitsApi';
import {alertMessage } from '../common/Common';
import moment from 'moment';
import ActiveUser from '../components/ActiveUser';

const today = moment();

export default class FieldVisitsMap extends Component{
    constructor(props) {
        super(props);
        this.center = '';
        this.state = {
            id_user:'',
            user_name:'',
            map:'',
            mapViewArr:[],
            mapViewPolylineArr:[],
            centerLatLng:[],
            isOpen: false,
            inProgress:false,
            markerIndex:'',
            isMapLoading:true,
            getDate:'2018-8-21',
            todayDate: today.format('YYYY/MM/DD')
        }
        this.markerClick = this.markerClick.bind(this);
        this.handleCloseAll = this.handleCloseAll.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onMapMount = this.onMapMount.bind(this);
        
    }
    componentWillMount(){
        let mapDate = this.state.todayDate;
        this.setState({
            id_user:this.props.location.search.split('=')[1]
        });
        this.setState({
            user_name:decodeURIComponent(this.props.location.search.split('=')[2])
        });
        
        this.getMapViewVisitInfo(this.state.todayDate,this.state.id_user)
       // console.log('cwm',mapDate);
        this.onMapMount();
    }
    markerClick(val){
        this.setState({
            isOpen: !false
        });
        this.setState({
            markerIndex: val
        });
       
    }
    handleCloseAll(){
        this.setState({
            isOpen: false
        });
    }
    onMapMount = (map, props) => {
        if(map){
            this.map = map;
        }
        if(this.state.map === '' && map){
        this.setState({map :map});
       // console.log(map);
        }
    }
    getMapViewVisitInfo(dd,userID){
        this.setState({inProgress:true, isMapLoading:true})
        fetchFieldVisits(dd,userID)
        .then((result) => {
            if (result.success) {
                this.setState({
                    isOpen: false,
                });
                let arrData = [];
                let temp = 1;
               // console.log(result);
                if(result.checks_io.length>0){
                    result.checks_io.map(data =>{
                        let getCheckin = data.check_in_datetime,
                            getCheckout = data.check_out_datetime;
                        
                        let getHoursNminutes_checkIn = moment(getCheckin),
                            getHoursNminutes_checkOut = moment(getCheckout);

                        let check_in = getHoursNminutes_checkIn.format("hh:mm A"),
                            check_out = getHoursNminutes_checkOut.format("hh:mm A");

                        if(data.check_in_latitude !=0 || data.check_in_longitude !=0){
                            if(data.check_in_latitude != null || data.check_in_longitude != null){
                                arrData.push({latitude:data.check_in_latitude,longitude:data.check_in_longitude,id:"CI",uniqueID:temp,buisness_name:data.business.name,address_info:data.business.address.address_line1,checkIn:check_in})
                                temp = temp +1;
                            }
                            else{

                            }
                        }
                        if(data.check_out_latitude !=0 || data.check_out_longitude !=0){
                            if(data.check_out_latitude != null || data.check_out_latitude != 0 || data.check_out_longitude != null || data.check_out_longitude != null){
                               arrData.push({latitude:data.check_out_latitude,longitude:data.check_out_longitude,id:"CO",buisness_name:data.business.name,address_info:data.business.address.address_line1,checkOut:check_out})
                            }
                            else{

                            }
                        }

                    });
                    
                } else {
                   // this.setState({ mapViewArr: ''});
                    arrData=[];
                    alertMessage('Check In and Check Out data not found.', 'error', 1);
                   
                }
                if(result.punches_io.length>0){
                    result.punches_io.map(data =>{
                        let getTimein = data.punch_in_datetime,
                            getTimeout = data.punch_out_datetime;
                        /* let getHoursNminutes_timeIn = new Date(getTimein),
                            getHoursNminutes_timeOut = new Date(getTimeout);
                        let time_in = (getHoursNminutes_timeIn.getUTCHours()+5)+":"+(getHoursNminutes_timeIn.getUTCMinutes()+30),
                            time_out = (getHoursNminutes_timeOut.getUTCHours()+5)+":"+(getHoursNminutes_timeOut.getUTCMinutes()+30); */
                        
                        let getHoursNminutes_timeIn = moment(getTimein),
                            getHoursNminutes_timeOut = moment(getTimeout);

                        let time_in = getHoursNminutes_timeIn.format("hh:mm A"),
                            time_out = getHoursNminutes_timeOut.format("hh:mm A");

                        if(data.punch_in_latitude != 0 || data.punch_in_longitude != 0){

                            if(data.punch_in_latitude != null || data.punch_in_longitude != null){
                               // console.log(data);
                                arrData[0]={latitude:data.punch_in_latitude,longitude:data.punch_in_longitude,id:"PI",timeIn:time_in};
                            }
                            else{
                                
                            }
                        }
                        if(data.punch_out_latitude != 0 || data.punch_out_longitude != 0){
                            
                            if(data.punch_out_latitude != null || data.punch_out_latitude != 0 || data.punch_out_longitude !=null || data.punch_out_longitude !=0){
                                arrData[arrData.length -1]={latitude:data.punch_out_latitude,longitude:data.punch_out_longitude,id:"PO",timeOut:time_out};
                            }
                            else{
                                
                            } 

                        }
                
                    });
                } else {
                    arrData=[];
                    //this.setState({ mapViewArr: ''});
                    alertMessage('Time In and Time Out data not found.', 'error', 1);
                }
                this.setState({ mapViewArr: arrData });
                const featureArr = [];
                for(var t in arrData){
                    if(arrData[t].latitude != null && arrData[t].longitude != null){
                        featureArr.push({lat:arrData[t].latitude,lng:arrData[t].longitude});
                    }
                }
                this.setState({ mapViewPolylineArr: featureArr , isMapLoading:false});
                const bounds = new google.maps.LatLngBounds();
                if(this.state.mapViewArr.length>0){
                    this.state.mapViewArr.map((data) => {
                    const loc = new google.maps.LatLng(data.latitude, data.longitude);
                    bounds.extend(loc);
                    });
                    this.state.map.fitBounds(bounds);
                    this.center = bounds.getCenter();
                }
                else{

                }
                
            } else {
            alertMessage(result.errors[0], 'error', 10);
            }
            if(result.checks_io.length === 0 && result.punches_io.length === 0){
                this.setState({
                  centerLatLng:{latitude:24.493397,longitude:80.419922}
                });
            }
            else{
                this.setState({
                    centerLatLng:this.state.mapViewArr[this.state.mapViewArr.length-1]
                }); 
            }
            
            //console.log(this.state.centerLatLng);
        });
        this.setState({inProgress:false})  
        
       

    }
    handleChange(event){
        let setDate = event.year()+"-"+(event.month()+1)+"-"+event.date();
        console.log(setDate);
        
        this.getMapViewVisitInfo(setDate,this.state.id_user);
       // console.log(this.state.map);
       
       // this.state.map.fitBounds([[24.493397,80.419922],[20.593683,78.962883]])
    }

    render() {
        //console.log(this.props.history.location);
        return(
            <div>
            <div>
             {
                //console.log(this.state.mapViewArr);
               // console.log(this.state.mapViewPolylineArr)
                
             }
             </div>
            <div>
                <MainMap 
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCru0ORtGcKd89U3VpdJAwbRh3IGOtiq8E&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: '100%', width: '100%'}} />}
                containerElement={<div style={{ width: '100%', height: '100%' }} />}
                mapElement={<div style={{ width: '100%', height: '100%' }} />}
                mapLoader={this.state.isMapLoading}
                markersArr2={this.state.mapViewArr}
                polygonArr={this.state.mapViewPolylineArr}
                centerObjValue ={this.center}
                inProgress = {this.state.inProgress}
                markerClick={(val) => this.markerClick(val)}
                handleCloseAll={() => this.handleCloseAll()}
                handleChange={(e) => this.handleChange(e)}
                onMapMount={this.onMapMount}
                isVisible={this.state.isOpen}
                markerIndex={this.state.markerIndex}
                centerLatLng = {this.state.centerLatLng}
                {...this.props}
                />
                {
                  <ActiveUser
                  activeUserName={this.state.user_name}
                  /> 
                }
            </div>
            </div>

        )
    }
}
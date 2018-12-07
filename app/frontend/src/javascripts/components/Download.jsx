import React, { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { Col, Row, Spin , Button} from '../common/UIComponents';
import excelImg from '../../images/excel1.jpg';


class Download extends Component {
    constructor(props){
        super(props)
    }
    render() {
     const getLocation = window.location.pathname;
        return (
            <div style={{position:'absolute', top:getLocation.includes('users') ? -18:130,right:50,width:200,zIndex:999 }}>
            
            <Button type="primary" >
            <CSVLink 
            
            data={this.props.data}
            filename={getLocation.includes('users') ? 'users.xls':getLocation.includes('punches') ? 'punches.xls' : getLocation.includes('check_ins') ? 'checkIns.xls' :'download.xls'}
            >
             <img id="myimage" src={excelImg} width="30" height="30"></img> &nbsp;  
                        <b>Export-To-Excel</b>
             </CSVLink>
             </Button>
            </div>
            
        );
    }
}
export default Download
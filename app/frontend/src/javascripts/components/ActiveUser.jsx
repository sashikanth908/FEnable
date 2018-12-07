import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row} from '../common/UIComponents';

class ActiveUser extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        
    }
    render(){
        return (
        <div style={{position:'absolute', top:30,left:250,width:200}}>
            <Row>
                <Col span={8}><Link to='/users' style={{color:'white'}}><b>Visits &nbsp; ></b></Link></Col><Col span={1}/><Col span={15}><div  style={{color:'white'}}>{this.props.activeUserName}</div></Col>
            </Row>
        </div>
        );
    }
}
export default ActiveUser
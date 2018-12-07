import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from '../common/UIComponents';
import { I18n } from '../common/Common';
import shapeImg from '../../images/shape.png';
import reportImg from '../../images/report-1.png';
import trackImg from '../../images/track-2.png';
import timeIOImg from '../../images/clock-1.png';
import checkIOImg from '../../images/point.png';
import usersImg from '../../images/admin.svg';

const SubMenu = Menu.SideMenu;
const SideMenu = () => {
  return (
    <div>
      <Menu 
      mode='inline'  
      defaultSelectedKeys={ ['field-visits'] }
      >
        <Menu.Item key='1'  >
        </Menu.Item>
        <Menu.Item key='field-visits'
        style={{paddingTop:20,paddingLeft:60,height:100}}>
            <NavLink to='/users'>
            <img style={{paddingLeft:20}} src={trackImg}/><br/>
              <span style={{color:'#FFFF',paddingLeft:15}}>
              {I18n.t('general.fieldVisits')}
              </span>
            </NavLink>
        </Menu.Item>
        <div style={{paddingTop:40,paddingLeft:60,height:100}}>
        <img  src={reportImg} height='30'/><br/>
        </div>
        <div style={{paddingLeft:50,paddingBottom:15}}>
        <span style={{color:'#FFFF',paddinTop:5}}>Reports</span>
        </div>
        <Menu.Item key='time-in-reports'>
            <NavLink to='/punches'>
            <img style={{paddingLeft:15}} src={timeIOImg}/>&nbsp;&nbsp;
              <span style={{color:'#FFFF',paddingLeft:1}}>
                { I18n.t('menu.punches') }
              </span>
            </NavLink>
        </Menu.Item>
        <Menu.Item key='check-in-reports'>
            <NavLink to='/check_ins'>
            <img style={{paddingLeft:15}} src={checkIOImg}/>&nbsp;&nbsp;
              <span style={{color:'#FFFF',paddingLeft:1}}>
                { I18n.t('menu.check_ins') }
              </span>
            </NavLink>
        </Menu.Item>
        <Menu.Item key="users-full-list" style={{height:100,paddingLeft:70,paddingTop:20}}>
          <NavLink to='/usersFullList'>
            <img style={{paddingLeft:35}} src={usersImg}/><br/>
              <span style={{paddingLeft:32,color:'#FFFF'}}>
              {I18n.t('general.users')}
              </span>
          </NavLink>

        </Menu.Item>
        <Menu.Item key="5" style={{marginTop:140}}>

        </Menu.Item>
        <Menu.Item key="6" style={{marginTop:90}}>
           
        </Menu.Item>         
      </Menu>
    </div>
  );
};

export default SideMenu;

import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import 'core-js/es6';
import 'antd/dist/antd.css';
import { Avatar, Content, Dropdown, Header,Footer, Icon, Layout, Menu, Sider } from './common/UIComponents';
import '../stylesheets/application.scss';
import minLogo from '../images/Logo.png';
import AppRoutes from './config/Routes';
import SideMenu from './components/SideMenu';
import logoImg from '../images/logo.png';
import { Link } from 'react-router-dom';
import MemoryRouter from "react-router/MemoryRouter";

const menu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="/users/sign_out">Sign Out</a>
    </Menu.Item>
  </Menu>
);
class App extends Component {
  constructor() {
    super();
    this.state = { collapsed: false };
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { collapsed } = this.state;
    return (
      <div>
        <div style={{ float: 'left', position: 'absolute', left: 4, top: 60 }}>Company Name</div>
        
        <Router>
          <Layout hasSider className='main-layout' style={{ height: '100vh', overflow: 'hidden' }}>
            <Header className='header' style={{ position: 'fixed', width: '100%', height: '90px' }}>
              <div className='header-logo' style={{ width: collapsed ? 60 : 150 }}>
                <div style={{ color: '#FFFF', fontSize: 20, paddingTop: 10 }}><img src={minLogo} width={60} height={70} /></div>
                {/* <img src={logoImg} width={60} height={60} /> */}
              </div>
              {/* <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggleSideBar}
          /> */}
              {/*           <div style={{ display: 'inline-block',float:'center', paddingLeft:50,color:'#FFFFFF',textDecoration: 'none'}}>
          <ActiveUser/>
          </div> */}
              <div style={{ display: 'inline-block', float: 'right', paddingLeft: 20 }}>
                <Dropdown overlay={menu} placement="bottomRight">
                  <Avatar icon='user' />
                </Dropdown>
              </div>
              <div style={{ display: 'inline-block', color: '#FFFF', fontSize: 23, float: 'right' }}><b>Company Name</b></div>

            </Header>
            
            <Layout className='main-layout' style={{ height: '100vh', overflow: 'hidden' }}>
              <Sider
                style={{ marginTop: 90 }}
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={this.toggleSideBar}
              >
             {/*        <div style={{ position: 'absolute', width: 155 }}> */}
                  <SideMenu />
               {/*  </div> */}
              </Sider>
              <Content style={{ color: 'rgba(255, 255, 255, .9)', marginTop: 90 }}>
                <Switch>
                  <div className='animated fadeIn'>
                    {
                      AppRoutes.map((route) => {
                        return (
                          <Route
                            exact={route.exact}
                            path={route.path}
                            component={route.component}
                            key={route.key}
                          />
                        );
                      })
                    }
                  </div>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;

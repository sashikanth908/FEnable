import React, { Component } from 'react';
import { Avatar, Content, Dropdown, Header, Icon, Layout, Menu, Sider } from '../common/UIComponents';
import logo from '../../images/ic_truwood_logo.jpeg';
import minLogo from '../../images/ic_truwood_logo_small.jpeg';
import App from '../App';
import SideMenu from './SideMenu';

const menu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" href="/users/sign_out">Sign Out</a>
      </Menu.Item>
</Menu>
);

class ReactLayout extends React.Component {
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
        <Layout hasSider className='main-layout' style={{ height: '100vh' }}>
          <Header className='header' style={{ position: 'fixed', width: '100%' }}>
            <div className='header-logo' style={{ width: collapsed ? 100 : 200 }}>
              <img src={minLogo} alt='Logo' />
            </div>
            <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggleSideBar()}
            />
            <div style={{ display: 'inline-block', float: 'right' }}>
              <Dropdown overlay={menu} placement="bottomRight">
                <b>{this.state.currentUser}</b>
                <Avatar icon='user' />
              </Dropdown>
            </div>
          </Header>
          <Layout>
            <Sider
                style={{ marginTop: 64 }}
                className='sider'
                collapsible
                collapsed={collapsed}
                onCollapse={this.toggleSideBar}
            >
              {!collapsed &&
              <div className='logo'>
                <img src={logo} alt='Logo' />
              </div>
              }
              <div className='divider' />
              <SideMenu />
            </Sider>
            <Content style={{ marginTop: 64 }}>
              <App />
           </Content>
          </Layout>
        </Layout>
    );
  }
}

export default ReactLayout;
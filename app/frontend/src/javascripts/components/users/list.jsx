import React from 'react';
import BaseList from '../BaseList';
import { I18n } from '../../common/Common';
import { Button } from '../../common/UIComponents';
import { Link } from 'react-router-dom'

class UserList extends BaseList {
  constructor() {
    console.log('user list');
    super();
    this.state={
      redirect: false
    }
    this.columns = [
      {
        key: 'user_name',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.name')}</div>,
        dataIndex: 'full_name',
        width:150
      },
      {
        key: 'mobile_no',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.mobile_number')}</div>,
        dataIndex: 'mobile_number',
        width:150
      },
      {
        key: 'designation',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.designation')}</div>,
        dataIndex: 'designation',
        width:160
      },
      {
        key: 'work_location',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.workLocation')}</div>,
        dataIndex: 'work_location',
        width:140
      },
      {
        key: 'actions',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.actions')}</div>,
        dataIndex: 'mobile_number',
        render: (text, row) => {
          return <div><Link to={`/map?userid=${row.id}&username=${row.full_name}`}><Button>Map View</Button></Link><Link to={`/fieldVisitsList?userid=${row.id}&username=${row.full_name}`}><Button>List View</Button></Link></div>
          
        },
        width:200

      }

    ];
  }
}

export default UserList;

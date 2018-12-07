import moment from 'moment';
import BaseList from '../BaseList';
import { I18n } from '../../common/Common';
import AppConfig from '../../config/AppConfig';
import React from 'react';

class PunchList extends BaseList {
  constructor() {
    super();
    this.columns = [
      {
        key: 'user_name',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.user_name')}</div>,
        dataIndex: 'user.full_name',
        width:200
      },
      {
        key: 'punch_in_datetime',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('punches.punch_in')}</div>,
        dataIndex: 'punch_in_datetime',
        render: (text) => {
          return moment(text).isValid() ? moment(text).format('DD-MMM-YYYY hh:mm A') : '';
        },
        width:200
      },
      {
        key: 'punch_out_datetime',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('punches.punch_out')}</div>,
        dataIndex: 'punch_out_datetime',
        render: (text) => {
          return moment(text).isValid() ? moment(text).format('DD-MMM-YYYY hh:mm A') : '';
        },
        width:200
      },
      // {
      //   key: 'Map',
      //   title:  <div style={{color:'#2e97d8'}}>{I18n.t('punches.map')}</div>,
      //   dataIndex: 'user_id',
      //   render: (text, row) => {
      //     let map = `https://www.google.com/maps/dir/?api=1&origin=${row.punch_in_latitude},${row.punch_in_longitude}`;
      //     if(row.punch_out_latitude != null && row.punch_out_longitude != null){
      //       map = map + `&destination=${row.punch_out_latitude},${row.punch_out_longitude}`;
      //     }
      //     return <a target='_blank' href={map} style={{color:'blue'}}>Link</a>;
      //   },
      //    width:200
      // },
    ];
  }
}

export default PunchList;

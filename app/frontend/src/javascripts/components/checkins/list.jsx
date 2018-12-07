import BaseList from '../BaseList';
import { I18n } from '../../common/Common';
import moment from "moment/moment";
import AppConfig from '../../config/AppConfig';
import React from 'react';

class CheckInList extends BaseList {
  constructor() {
    super();
    this.columns = [
      {
        key: 'user_name',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.user_name')}</div>,
        dataIndex: 'user.full_name',
        width:100
      },
      {
        key: 'check_in_datetime',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('check_ins.check_in_datetime')}</div>,
        dataIndex: 'check_in_datetime',
        render: (text) => {
          return moment(text).isValid() ? moment(text).format('DD-MMM-YYYY hh:mm A') : '';
        },
        width:150
      },
      {
        key: 'check_out_datetime',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('check_ins.check_out_datetime')}</div>,
        dataIndex: 'check_out_datetime',
        render: (text) => {
          return moment(text).isValid() ? moment(text).format('DD-MMM-YYYY hh:mm A') : '';
        },
        width:150
      },
      {
        key: 'duration',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('check_ins.duration')}</div>,
        dataIndex: 'user_id',
        render: (text, row) => {
          if(row.check_in_datetime != '' && row.check_out_datetime != '') {
            let in_time = moment(row.check_in_datetime);
            let out_time = moment(row.check_out_datetime);
            if (in_time.isValid() && out_time.isValid()) {
              let diffTime = out_time.diff(in_time);
              diffTime = moment.duration(diffTime, 'milliseconds');
              let hours = Math.floor(diffTime.asHours());
              let mins = Math.floor(diffTime.asMinutes() - hours * 60);
              return hours + ' hrs ' + mins + ' mins';
            }
            else {
              return '';
            }
          }
          else {
            return '';
          }
        },
        width:100
      },
      {
        key: 'business_id',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.business_id')}</div>,
        dataIndex: 'business.name',
        render: (text, row) => {
          return <div>{row.business.name || row.business.nickname}</div>;
        },
        width:200
      },
      // {
      //   key: 'Map',
      //   title: <div style={{color:'#2e97d8'}}>{I18n.t('punches.map')}</div>,
      //   dataIndex: 'user_id',
      //   render: (text, row) => {
      //     let map = `https://www.google.com/maps/dir/?api=1&origin=${row.check_in_latitude},${row.check_in_longitude}`;
      //     if(row.check_out_latitude != null && row.check_out_longitude != null){
      //       map = map + `&destination=${row.check_out_latitude},${row.check_out_longitude}`;
      //     }
      //     return <a target='_blank' href={map} style={{color:'blue'}}>Link</a>;
      //   },
      //   width:100
      // },
      // {
      //   key: 'check_in_id',
      //   title: I18n.t('general.check_in_id'),
      //   dataIndex: 'check_in_id',
      // },
    ];
  }
}

export default CheckInList;

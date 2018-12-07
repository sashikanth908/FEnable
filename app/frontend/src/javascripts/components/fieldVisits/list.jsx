import React from 'react';
import BaseList from '../BaseList';
import { I18n } from '../../common/Common';
import moment from 'moment';
import { Tooltip } from '../../common/UIComponents';

class FieldVisitsListData extends BaseList {
  constructor() {
    //console.log('field visits list');
    super();
    this.columns = [
      {
        key: 'buisness_concernedPerson',
        title:  <span style={{color:'#2e97d8'}}>{I18n.t('fieldVisits.buisness_concernedPerson')}</span>,
        dataIndex: 'business.username',
        width:125
      },
      {
        key: 'buisness_nickname',
        title:  <span style={{color:'#2e97d8'}}>{I18n.t('fieldVisits.buisness_nickname')}</span>,
        dataIndex: 'business.nickname',
        width:100
      },
      {
        key: 'buisness_name',
        title:  <span style={{color:'#2e97d8'}}>{I18n.t('fieldVisits.buisness_name')}</span>,
        dataIndex: 'business.name',
        width:125
      },
      {
        key: 'check_in_time',
        title:  <span style={{color:'#2e97d8'}}>{I18n.t('fieldVisits.check_in_time')}</span>,
        dataIndex: 'check_in_datetime',
        render: (text) => {
          return moment(text).isValid() ? moment(text).format('hh:mm A') : '';     
        },
        width:100

      },
      {
        key: 'check_out_time',
        title: <span style={{color:'#2e97d8'}}>{I18n.t('fieldVisits.check_out_time')}</span>,
        dataIndex: 'check_out_datetime',
        render: (text) => {
          return moment(text).isValid() ? moment(text).format('hh:mm A') : '';      
        },
        width:100
      },
      {
        key: 'visit_result',
        title:  <span style={{color:'#2e97d8'}}>{I18n.t('fieldVisits.visit_result')}</span>,
        dataIndex: 'call_result_value',
        width:100
      },
      {
        key: 'comments',
        title:  <span style={{color:'#2e97d8'}}>{I18n.t('fieldVisits.notes')}</span>,
        dataIndex: 'comments',
        render: (text,row) => {
          const content = (
            <div>
              <p>{text !=null ? text.slice(0, 21) + (text.length > 21 ? "..." : ""):''}</p>
            </div>
          );
          return <div ><Tooltip title={text}><span>{content}</span></Tooltip></div>
        },
        width:150
      },
    ];
  }
}

export default FieldVisitsListData;

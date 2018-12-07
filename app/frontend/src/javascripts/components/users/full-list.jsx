import React from 'react';
import BaseList from '../BaseList';
import { I18n } from '../../common/Common';
import { Icon, Popconfirm } from '../../common/UIComponents';


class FullList extends BaseList {
  constructor() {
    console.log('user list');
    super();
    this.columns = [
      {
        key: 'full_name',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.name')}</div>,
        dataIndex: 'full_name',
        width:200
      },
      {
        key: 'email',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.email')}</div>,
        dataIndex: 'email',
        width:200
      },
      
      {
        key: 'mobile_number',
        title:<div style={{color:'#2e97d8'}}>{I18n.t('general.mobile_number')}</div>,
        dataIndex: 'mobile_number',
        width:200
      },
      {
        key: 'actions_edit',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.Edit_User')}</div>,
        dataIndex: 'id',
        render: (id) => {
          return (
            <div>
              <Icon
                type='edit'
                onClick={() => this.props.editClick(id)}
              />
            </div>
          );
        },
        width:100
      },
      {
        key: 'actions_delete',
        title: <div style={{color:'#2e97d8'}}>{I18n.t('general.Delete_User')}</div>,
        dataIndex: 'id',
        render: (id) => {
          return (
            <div>
              <Popconfirm
                placement="topRight"
                title={I18n.t('general.are_you_sure')}
                onConfirm={() => this.props.deleteClick(id)}
                  okText="Yes"
                cancelText="No"
              >
                <Icon
                  type='delete'
                />
              </Popconfirm>
            </div>
          );
        },
        width:100
      }
    ];
  }
}

export default FullList;

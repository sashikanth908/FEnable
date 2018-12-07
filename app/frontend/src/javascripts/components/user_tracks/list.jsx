import BaseList from '../BaseList';
import moment from 'moment';
import { I18n } from '../../common/Common';

class UserTrackList extends BaseList {
  constructor() {
    super();
    this.columns = [
      {
        key: '_id',
        title: I18n.t('general.user_id'),
        dataIndex: '_id',
      },
      {
        key: 'latitude',
        title: I18n.t('general.latitude'),
        dataIndex: 'latitude',
      },
      {
        key: 'logitude',
        title: I18n.t('general.longitude'),
        dataIndex: 'longitude',
      },
      {
        key: 'date_time',
        title: I18n.t('general.date_time'),
        dataIndex: 'date_time',
        render: (text) => {
          return moment(text).isValid() ? moment(text).format('YYYY-MM-DD hh:mm A') : '';
        },
      },
    ];
  }
}

export default UserTrackList;

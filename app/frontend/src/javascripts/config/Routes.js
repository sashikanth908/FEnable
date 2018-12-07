import Users from '../containers/Users';
import Punches from '../containers/Punches';
import CheckIns from '../containers/CheckIns';
import UserTracks from '../containers/UserTracks';
import FieldVisitsMap from '../containers/FieldVisitsMap';
import FieldVisitsList from '../containers/FieldVisitsList';
import ListUsers from '../containers/ListUsers';

const AppRoutes = [
  {
    key: '001', exact: true, path: '/users', component: Users,
  },
  {
    key: '002', exact: true, path: '/punches', component: Punches,
  },
  {
    key: '003', exact: true, path: '/check_ins', component: CheckIns,
  },
  {
    key: '004', exact: true, path: '/user_tracks', component: UserTracks,
  },
  {
    key: '008', exact: true, path: '/map', component: FieldVisitsMap,
  },
  {
    key: '009', exact: true, path: '/', component: Users,
  },
  {
    key: '010', exact: true, path: '/fieldVisitsList', component: FieldVisitsList,
  },
  {
    key: '011', exact: true, path: '/fieldVisitsList/:userid/:username', component: FieldVisitsList,
  },
  {
    key: '012', exact: true, path: '/map/:userid/:username', component: FieldVisitsList,
  },
  {
    key: '005', exact: true, path: '/usersFullList', component: ListUsers,
  },
  
];

export default AppRoutes;

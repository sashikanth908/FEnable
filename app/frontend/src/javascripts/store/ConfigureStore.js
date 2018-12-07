import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-thunk';
import RootReducer from '../reducers/RootReducer';

export default function ConfigureStore() {
  return createStore(
    RootReducer,
    applyMiddleware(promise),
  );
}

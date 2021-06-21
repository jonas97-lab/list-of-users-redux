import { createStore, combineReducers } from 'redux'
import homePage from './containers/Homepage/reducer'
import userPage from './containers/Userpage/reducer'

const reducers = combineReducers({ homePage, userPage })

export default createStore(reducers)

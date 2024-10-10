import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from '../../src/redux/features/counterSlice'
import useReducer from '../redux/features/userSlice'
import cartReducer from '../redux/features/cartSlice'

export const rootReducer = combineReducers({
    counter: counterReducer,
    user: useReducer,
    cart: cartReducer,
});
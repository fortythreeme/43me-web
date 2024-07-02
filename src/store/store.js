import { configureStore,combineReducers } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
import CustomizerReducer from './customizer/CustomizerSlice'
import userReducer from './user/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  user:userReducer,
  customizer: CustomizerReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer ,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== "production",
});
// export default () => {
//   let store =  configureStore({
//     reducer: persistedReducer ,
//     devTools: process.env.NODE_ENV !== "production",
//   });
//   return { store, persistor }
// }
export const persistor = persistStore(store)
// const rootReducer = combineReducers({
//   counter: counterReducer,
//   customizer: CustomizerReducer,
//   ecommerceReducer: EcommerceReducer,
//   chatReducer: ChatsReducer,
//   emailReducer: EmailReducer,
//   notesReducer: NotesReducer,
//   contactsReducer: ContactsReducer,
//   ticketReducer: TicketReducer,
//   userpostsReducer: UserProfileReducer,
//   blogReducer: BlogReducer,
// });

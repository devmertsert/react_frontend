import { configureStore } from "@reduxjs/toolkit";
import Authenticate from "./Authenticate";

export default configureStore({
    reducer: {
        authenticate: Authenticate
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage } from "../Services/user";

export const Authenticate = createSlice({
    name: 'authenticate',
    initialState: {
        isLogged: false,
        user: {
            id: '',
            name: ''
        }
    },
    reducers: {
        log_in: (state, action) => {
            state.isLogged = true;
            const newObj = action.payload;
            for (const element in newObj) {
                if (newObj.hasOwnProperty.call(newObj, element)) {
                    state.user[element] = newObj[element];
                }
            }
        },
        log_out: (state) => {
            state.isLogged = false;
            for (const element in state.user) {
                if (Object.hasOwnProperty.call(state.user, element)) {
                    state.user[element] = '';
                }
            }
            clearLocalStorage();
        }
    }
});

export const { log_in, log_out } = Authenticate.actions;
export default Authenticate.reducer;
import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    isLoggedIn:false,
    email:null,
    idToken:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true;
            state.idToken = action.payload.idToken;
            state.email = action.payload.email;
            localStorage.setItem('token',action.payload.idToken);
            localStorage.setItem('email',action.payload.email);
        },
        logout:(state)=>{
            state.isLoggedIn = false;
            state.idToken = null;
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('cart');
            localStorage.removeItem('userId');
        },
       
    }
})

export const {login,logout} = authSlice.actions;

export const loginStatus=()=>(dispatch)=>{   
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if(token && email){
        dispatch(login({idToken:token,email}))
    }
}

export default authSlice.reducer;
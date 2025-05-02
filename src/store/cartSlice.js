import { createSlice } from "@reduxjs/toolkit";


const savedCart = JSON.parse(localStorage.getItem("cart"));

const initialState = savedCart || {
    cart:[],
    totalQuantity:0,
    totalAmount:0,
}

const saveToLocalStorage = (state)=>{
    localStorage.setItem("cart",JSON.stringify(state));
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const newItem = action.payload;
            const existingItem = state.cart.find(item=>item.id === newItem.id);

            if(existingItem){
                existingItem.quantity += 1;
            }
            else{
                state.cart.push({...newItem,quantity:1})
            }

            state.totalQuantity = state.cart.reduce((sum,item)=>sum+item.quantity,0);
            state.totalAmount = state.cart.reduce((sum,item)=>sum+item.quantity * item.price,0);
            saveToLocalStorage(state);
        },
        deleteCart:(state,action)=>{
            const id = action.payload;
           const item = state.cart.find(i=>i.id === id);
           if(item.quantity > 1){
            item.quantity -=1;
            state.totalAmount  -= item.price; 
           }
           else{
            state.cart = state.cart.filter(i=>i.id !==id);
           }

            state.totalQuantity = state.cart.reduce((sum,item)=>sum+item.quantity,0);
            state.totalAmount = state.cart.reduce((sum,item)=>sum+item.quantity * item.price,0);
            saveToLocalStorage(state);
        },
        clearCart:(state)=>{
            state.cart=[];
            state.totalAmount =0;
            state.totalQuantity = 0;
            saveToLocalStorage(state);
        }
    }
})


export const {addToCart, deleteCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
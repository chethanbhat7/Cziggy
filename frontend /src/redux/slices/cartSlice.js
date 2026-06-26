import { createSlice } from '@reduxjs/toolkit'

const initialState={
    cartItems:[],
    restaurant:{},
    loading:false,
    error:null
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        cartRequest:(state)=>{
            state.loading=true
        },
        cartSuccess:(state,action)=>{
            state.loading=false;
            state.cartItems=action.payload.items;
            state.restaurant=action.payload.restaurant;
        },
        cartFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateCartSuccess:(state,action)=>{
            state.loading=false;
            state.cartItems=action.payload.items;
            state.restaurant=action.payload.restaurant;
        },
        removeCartSuccess:(state,action)=>{
            state.loading=false;
            state.cartItems=action.payload?.cart?.items|| [];
        },
        clearCart:(state)=>{
            state.cartItems=[];
        },
        clearError:(state)=>{
            state.error=null;
        },
        saveDeliveryInfor:(state,action)=>{
            state.deliveryInfo=action.payload;
        }
    }
})


export const {
    cartRequest,
    cartFail,
    cartSuccess,
    updateCartSuccess,
    removeCartSuccess,
    clearCart,
    clearError,
    saveDeliveryInfor
} = cartSlice.actions;

export default cartSlice.reducer;
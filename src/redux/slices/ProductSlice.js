import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    productsData : []
}

export const getAllProducts = createAsyncThunk('/products/getAll',async () =>{
    try {
        const products = axiosInstance.get('/products/')
        toast.promise(products, {
            loading: 'Loading all the products',
            error: 'Something went cannot load products',
            success: 'Products loaded successfully',
        });
        const apiResponse = await products;
        return apiResponse;
    } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong")
    }
})

export const getProductDetails = createAsyncThunk('/products/getDetails',async (id) =>{
    try {
        const product = axiosInstance.get(`/products/${id}`);
        toast.promise(product, {
            loading: 'Loading the product',
            error: 'Something went cannot load product',
            success: 'Product loaded successfully',
        });
        const apiResponse = await product;
        return apiResponse;
    } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong")
    }
})


const productSlice = createSlice({
    name: 'product',
    initialState,
    redicers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            console.log(action.payload);
            state.productsData = action?.payload?.data?.data;
        });
    }
});

export default productSlice.reducer;
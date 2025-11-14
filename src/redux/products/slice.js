import { createSlice } from '@reduxjs/toolkit';
import { loadProducts } from './operations';

const initialState = {
    items: [],
    favoriteProducts: [],
    filter: {
        page: 1,
        perPage: 4,
        equipment: [],
        type: "",
    },
    filterVersion: 0,
    totalItems: 0,
    isLoading: false,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProducts(state) {
        state.items = [];
        state.totalItems = 0;
        },

        setFilter(state, action) {
        Object.assign(state.filter, action.payload);
        },
        applyFilters(state){
        state.filter.page = 1;
        state.filterVersion += 1;
        },

        removeFilter(state, action) {
        delete state.filter[action.payload];
        },

        incrementPage(state) {
        state.filter.page = state.filter.page + 1;
        },

        toggleFavoriteProduct(state, action) {
        const id = action.payload;

        if (state.favoriteProducts.includes(id)) {
            state.favoriteProducts = state.favoriteProducts.filter(
            (favId) => favId !== id
            );
            return;
        }

        state.favoriteProducts.push(action.payload);
        },

        removeFavoriteProduct(state, action) {
        state.favoriteProducts = state.favoriteProducts.filter(
            (p) => p !== action.payload
        );
        },
    },

    extraReducers: (builder) => {
        builder.addCase(loadProducts.pending, (state) => ({
        ...state,
        isLoading: true,
        }));
        builder.addCase(loadProducts.fulfilled, (state, action) => {
        const { total, items } = action.payload;
        state.totalItems = total;
        if (state.filter.page === 1) {
            state.items = items;
        } else {
            state.items = [...state.items, ...items];
        }

        state.isLoading = false;
        });
        builder.addCase(loadProducts.rejected, (state) => ({
        ...state,
        isLoading: false,
        }));
    },
});

export const {
    clearProducts,
    setFilter,
    applyFilters,
    removeFilter,
    incrementPage,
    toggleFavoriteProduct,
    removeFavoriteProduct,
} = productSlice.actions;

export default productSlice.reducer;

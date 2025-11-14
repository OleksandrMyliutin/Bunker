import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProducts } from '../../utils/api';
import { clearProducts } from './slice';

const buildQuery = (filter) => {
    const p = new URLSearchParams();

    p.append("page", String(filter.page || 1));
    p.append("limit", String(filter.perPage || 4));

    if (filter.location) p.append("location", filter.location);
    if (filter.type) p.append("form", filter.type);

    // equipment
    if (Array.isArray(filter.equipment)) {
        let transmission = null;

        filter.equipment.forEach(tok => {
        if (!tok) return;
        if (tok.startsWith("transmission=")) {
            transmission = tok.split("=")[1] || null;
        } else {
            p.append(tok, "true");
        }
        });

        if (transmission) p.append("transmission", transmission);
    }

    return `?${p.toString()}`;
};


export const loadProducts = createAsyncThunk(
    'products/load',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
        const { filter } = getState().products;

        if (filter.page === 1) dispatch(clearProducts());

        const qs = buildQuery(filter);
        const data = await fetchAllProducts(qs);

        return data;
        } catch (e) {
        console.log('Error caught in operations...', e);
        return rejectWithValue(e?.message || '');
        }
    }
);
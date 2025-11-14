export const selectIsLoading = (state) => state.products.isLoading;

export const selectAllProducts = (state) => state.products.items;

export const selectProduct = (state, id) => (state.products?.items ?? []).find(p => String(p.id) === String(id));

export const selectFilter = (state) => state.products.filter;

export const selectVehicleFormFilter = (state) => state.products.filter.form;

export const selectFavoriteProducts = (state) =>
    state.products.favoriteProducts;

export const selectHasNextPage = (state) => {
    const { page, perPage } = state.products.filter;
    const { totalItems } = state.products;

  return totalItems > page * perPage;
};
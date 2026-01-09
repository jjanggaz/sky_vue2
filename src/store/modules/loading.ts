interface LoadingState {
  isLoading: boolean;
  loadingCount: number;
}

export const loading = {
  namespaced: true,
  state: (): LoadingState => ({
    isLoading: false,
    loadingCount: 0,
  }),
  getters: {
    isLoading: (state: LoadingState) => state.isLoading,
    loadingCount: (state: LoadingState) => state.loadingCount,
  },
  mutations: {
    SET_LOADING(state: LoadingState, value: boolean) {
      if (value) {
        state.loadingCount++;
        state.isLoading = true;
      } else {
        state.loadingCount = Math.max(0, state.loadingCount - 1);
        if (state.loadingCount === 0) {
          state.isLoading = false;
        }
      }
    },
    RESET_LOADING(state: LoadingState) {
      state.loadingCount = 0;
      state.isLoading = false;
    },
  },
  actions: {
    setLoading({ commit }: any, value: boolean) {
      commit("SET_LOADING", value);
    },
    resetLoading({ commit }: any) {
      commit("RESET_LOADING");
    },
  },
};

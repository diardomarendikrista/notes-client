const initialState = {
  isDevelopment: true,
  loadingGlobal: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  if (type === "loadingGlobal/setLoadingGlobal")
    return { ...state, loadingGlobal: payload };
  if (type === "global/setIsDevelopment")
    return { ...state, isDevelopment: payload };
  return state;
}

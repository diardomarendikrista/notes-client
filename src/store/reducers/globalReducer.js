const initialState = {
  loadingGlobal: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  if (type === "loadingGlobal/setLoadingGlobal") return { ...state, loadingGlobal: payload };
  return state;
}

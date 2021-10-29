const initialState = {
  notes: false,
  note: false,
  originPage: "",
  loadingGlobal: false,
  loadingNote: false,
  loadingDetail: false,
  error: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  if (type === "notes/setNotes") return { ...state, notes: payload };
  if (type === "note/setNote") return { ...state, note: payload };
  if (type === "originPage/setOriginPage") return { ...state, originPage: payload };
  if (type === "loadingGlobal/setLoadingGlobal") return { ...state, loadingGlobal: payload };
  if (type === "loadingNote/setLoadingNote") return { ...state, loadingNote: payload };
  if (type === "loadingDetail/setLoadingDetail") return { ...state, loadingDetail: payload };
  if (type === "error/setError") return { ...state, error: payload };
  return state;
}

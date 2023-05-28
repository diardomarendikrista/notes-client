import Loader from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Loader
        type="Oval"
        color="#00BFFF"
        height={75}
        width={75}
        timeout={300000} //3 secs
      />
    </div>
  );
}

import Loader from "react-loader-spinner";
import { Wrapper } from "./styles";

export default function Loading({ center }) {
  return (
    <Wrapper center={center}>
      <Loader
        type="Oval"
        color="#00BFFF"
        height={75}
        width={75}
        timeout={300000} //3 secs
      />
    </Wrapper>
  );
}

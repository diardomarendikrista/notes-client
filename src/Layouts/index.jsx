import Navbar from "components/Navbar";

export default function Layout({ children, mainLoading }) {
  return (
    <>
      <Navbar mainLoading={mainLoading} />
      {children}
    </>
  );
}

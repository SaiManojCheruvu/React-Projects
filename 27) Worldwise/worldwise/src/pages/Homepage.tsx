import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

export default function Homepage() {
  return (
    <>
      <PageNav />
      <AppNav />
      <div>Worldwise!</div>
      <Link to="/App"> Go to APP</Link>
    </>
  );
}

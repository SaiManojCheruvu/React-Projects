import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
const AppLayout = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};
export default AppLayout;

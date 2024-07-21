import Routers from "../../routes/Routers";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <div>
      <Header />
      <Routers />
      <Footer />
    </div>
  );
}

export default Layout;

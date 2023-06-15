import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import MainNavBar from "../components/MainNavBar";

// const MainHeader = dynamic(() => import('../components/MainHeader'), {
//   ssr: false,
// });
// const MainFooter = dynamic(() => import('../components/Footer'), {
//   ssr: false,
// });
// const MainNavBar = dynamic(() => import('../components/MainNavBar'), {
//   ssr: false,
// });
// const MainContent = dynamic(() => import('../components/MainContent'), {
//   ssr: false,
// });

const MainLayout = ({ children }: any) => {
  return (
    <>
      <ToastContainer />
      <div className="main-body">
        <MainNavBar />
        {children}
      </div>
    </>
  );
};

export default MainLayout;

import styles from "./style";
import { Navbar, Hero, Footer } from "./components";
import { Link, useLocation } from "react-router-dom";


const App = () => {
  const {state}=useLocation();
  
  const user_name=state?.username
  return (
   

    <div>
      <div className="bg-teal-100 w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
      </div>

      <div className={` text-black ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero username={user_name} />
        </div>
      </div>

      <div className="">
        <div className="xl:w-max-[1280px] overflow-clip w-full sm:w-max-[1060px] md:w-max-[1200px] ss-w-max-[768px]">
          <Footer />
        </div>
      </div>
    </div>
  

  );
};

export default App;

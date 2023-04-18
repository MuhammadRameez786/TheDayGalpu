import "../styles/globals.css";
import { useRouter } from 'next/router';
import { Provider } from "react-redux";
import store from "../store";


//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <div>
      <Provider store={store}>
        <NFTMarketplaceProvider>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </NFTMarketplaceProvider>
      </Provider>  
    </div>
  );
};

export default MyApp;


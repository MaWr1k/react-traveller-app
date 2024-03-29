import {Provider} from "react-redux";

import '../styles/globals.css';
import Layout from "../components/common/UI/Layout";
import {store} from "../store/store";

function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>)
}

export default MyApp

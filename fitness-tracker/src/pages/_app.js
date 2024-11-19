import Layout from '../components/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps, router }) {
  // Login sayfasında Layout'u kaldırıyoruz
  const isLoginPage = router.pathname === '/login';

  return isLoginPage ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// import { Helmet } from 'react-helmet';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const PageContainer = ({ title, description, children }) => (
  <HelmetProvider>
    <div>
      <Helmet>
      <title>{title} By 43me</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </div>
  </HelmetProvider>
);

export default PageContainer;

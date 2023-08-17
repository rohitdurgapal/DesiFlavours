import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../common/LoadingSpinner";
import Footer from "./Footer";
const Layout = ({ children, title, description, keywords, author }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {isLoading ? <LoadingSpinner /> : ""}
      <div className="customer-panel">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title} - Desi Flavours</title>
          <link
            type="text/css"
            rel="stylesheet"
            href={`${process.env.REACT_APP_URL}/assets/css/plugin.css`}
          />
          <link
            type="text/css"
            rel="stylesheet"
            href={`${process.env.REACT_APP_URL}/assets/css/components.css`}
          />
          <link
            type="text/css"
            rel="stylesheet"
            href={`${process.env.REACT_APP_URL}/assets/css/style.css`}
          />
        </Helmet>
        <Header />
        <div className="customer-center-block">
          <Toaster />
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

Layout.defaultProps = {
  title: "HomePage",
  description: "mern stack project for billing management system",
  keywords: "mern,react,node,mongodb,express",
  author: "Rohit Durgapal",
};

export default Layout;

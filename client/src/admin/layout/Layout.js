import React from "react";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Container from "react-bootstrap/Container";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title} - Desi Flavours - Admin Panel</title>
      </Helmet>
      <Header />
      <Container fluid>
        <main>
          <Toaster />
          {children}
        </main>
      </Container>
    </div>
  );
};

Layout.defaultProps = {
  title: "HomePage",
  description: "mern stack project for billing management system",
  keywords: "mern,react,node,mongodb,express",
  author: "Rohit Durgapal",
};

export default Layout;

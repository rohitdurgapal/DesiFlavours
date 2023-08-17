import Layout from "../../layout/Layout";
const Home = () => {
  return (
    <Layout title="Home">
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        Welcome to Desi Flavours Admin Panel
      </h1>
    </Layout>
  );
};

export default Home;

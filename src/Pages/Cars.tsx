import Header from "../components/Common/Header";
import Layout from "../components/Common/Layout";
import DataTable from "../components/DataTable/DataTable";


const Cars = () => {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `Car${i + 1}`,
    email: `car${i + 1}@example.com`,
  }));

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
  ];

  return (
    <Layout>
      <Header heading="Cars" />
      <DataTable data={data} columns={columns} name="Cars" />
    </Layout>
  );
};

export default Cars;

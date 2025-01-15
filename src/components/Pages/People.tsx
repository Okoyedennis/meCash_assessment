import Layout from "../Common/Layout";
import Header from "../Common/Header";
import DataTable from "../DataTable/DataTable";

const People = () => {
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `People ${i + 1}`,
    email: `people${i + 1}@example.com`,
  }));

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
  ];

  return (
    <Layout>
      <Header heading="People"/>
      <DataTable data={data} columns={columns} name="People" />
    </Layout>
  );
};

export default People;

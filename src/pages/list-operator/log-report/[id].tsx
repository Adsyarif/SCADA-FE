// import { LogReportWrapper } from "@/views";

// export async function getServerSideProps(context: { params: { id: string } }) {
//   const { id } = context.params;

//   try {
//     const response = await fetch(`api/${id}`);
//     const data = await response.json();

//     return {
//       props: { data },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       notFound: true,
//     };
//   }
// }

// export interface DataProps {
//   name: string;
//   rtu: string;
//   report: OperatorDataProps[];
// }

// interface OperatorDataProps {
//   date: string;
//   reportTitle: string;
//   reportDetail: string;
// }

// const LogReport = ({ data }: { data: DataProps }) => {
//   const { name, rtu, report } = data;
//   return (
//     <>
//       <div>
//         <LogReportWrapper name={name} rtu={rtu} report={report} />
//       </div>
//     </>
//   );
// };

// export default LogReport;

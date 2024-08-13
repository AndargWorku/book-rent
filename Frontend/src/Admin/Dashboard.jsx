



import Header from "../components/Header";
import Chart from "../components/ux/Chart";
import Erraing from "../components/ux/Erraing";
import LiveBook from "../components/ux/LiveBook";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 -mt-10  ">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3 h-full">
        {/* Flexbox container for equal height */}
        <div className="flex flex-col h-full -mt-3 ">
          <Chart className="flex-grow" />
        </div>
        <div className="md:col-span-2 flex flex-col h-full">
          <div className="flex flex-col h-full gap-3">
            <LiveBook className="flex-grow"  />
            <Erraing className="flex-grow"  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





// import Header from "../components/Header";
// import Chart from "../components/ux/Chart";
// import Erraing from "../components/ux/Erraing";
// import LiveBook from "../components/ux/LiveBook";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8 ">
//             <Header />
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 ">
              
//                 <Chart className="h-96" />
                
//                 <div className="md:col-span-2 h-96">
//                     <LiveBook />
//                     <Erraing  />
//                 </div>
//             </div>
//         </div>
//   );
// }

// export default Dashboard;







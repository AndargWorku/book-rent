import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { useState, useEffect } from 'react';

const Chart = () => {
  const [datas, setDatas] = useState({});
  const [datass, setDatass] = useState({});
  const data = {
    labels: ['Fiction', 'Self Help', 'Business'],
    datasets: [
      {
        data: [54, 20, 26],
        backgroundColor: ['#3b82f6', '#10b981', '#ef4444'],
        hoverBackgroundColor: ['#2563eb', '#059669', '#dc2626'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };

  const fetchDatas = async () => {
    const response = await fetch("https://book-rent-delta.vercel.app/categories-count",{
      method : "GET",
      headers : {
        "Content-Type": "application/json"},
  });
  const data = await response.json();
    await setDatas(data);
  }

  const fetchDatass = async () => {
    const response = await fetch("https://book-rent-delta.vercel.app/sum",{
      method : "GET",
      headers : {
        "Content-Type": "application/json"},
  });
  const data = await response.json();
    await setDatass(data);
  }

  useEffect(() => {
    fetchDatas();
    fetchDatass();
  })

  return (
    <div className="max-h-full bg-gray-100 flex items-center justify-center py-4 ">
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-xl">
        <div className="mb-6">
          <h2 className="text-gray-600">This Month Statistics</h2>
          <p className="text-sm text-gray-400">Tue, 14 Nov, 2024, 11:30 AM</p>
          <div className="mt-4 shadow-md p-6  ">
            <div className=' flex flex-row justify-between'>
            <h3 className="text-gray-600  justify-between">Income </h3>
            <button className='  bg-slate-100  text-sm text-gray-600'>this month</button>
            </div>
            <div className=' flex flex-row '>
            <h3 className="text-2xl font-semibold mt-2 justify-between">ETB <span>{datass.this_month - datass.last_month}</span></h3>
          
              <h4 className="text-red-500 mt-1 flex items-end">↓ 1.5%</h4>
              </div>
            <p className="text-gray-500 text-sm mt-2">Compared to ETB <span>{datass.this_month}</span> last month</p>
            <p className="text-gray-500 text-sm font-semibold">Last Month Income ETB <span>{datass.last_month}</span></p>
          </div>
        </div>
        <div className=' shadow-md p-8 mb-32'>
          <div className=' flex flex-row justify-between'>
          <h3 className="text-gray-600 mb-4">Available Books</h3>
          <h6 className=' text-sm bg-slate-50 text-gray-500'>today</h6>
          </div>
          <div className="relative w-full h-full ">
            <Doughnut data={data} options={options} />
          </div>
          <div className="mt-4">
            <ul className="flex flex-col sm:flex-col justify-between text-sm gap-4 ">
              <li className="flex items-center mb-2 sm:mb-0 ">
                <span className="inline-block w-3 h-3 mr-2 bg-blue-500 rounded-full "></span>
                Fictions <span className='ml-11 '>{datas.fiction}</span>
              </li>
              <li className="flex items-center mb-2 sm:mb-0">
                <span className="inline-block w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
                Self Help <span className=' ml-11'>{datas.selfhelp}</span>
              </li>
              <li className="flex items-center mb-2 sm:mb-0 ">
                <span className="inline-block w-3 h-3 mr-2  bg-red-500 rounded-full"></span>
                Business <span className=' ml-11'>{datas.business}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;



import { Line } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';

const EarningSummary = () => {
  const data = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Last 6 months',
        data: [230, 130, 280, 170, 300, 280,200,180],
        fill: true,
        backgroundColor: 'rgba(66, 153, 225, 0.2)',
        borderColor: 'rgba(66, 153, 225, 1)',
        tension: 0.4,
      },
      {
        label: 'Same period last year',
        data: [170, 130, 140, 190, 270, 260,200,180],
        fill: false,
        borderColor: 'rgba(107, 114, 128, 1)',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + ' Birr';
          },
        },
      },
    },
  };

  return (
    <div className="p-4 w-full bg-white rounded-xl shadow-md ">
  <div className="flex justify-between items-center mb-4">
    <div className="text-lg font-medium text-gray-900">Earning Summary</div>
    <div className="text-gray-500">Mar 2022 - Oct 2024</div>
  </div>
  <div className="flex justify-center w-full">
    <div className="w-full max-w-4xl"> {/* Adjust max-width as needed */}
      <Line data={data} options={options} />
    </div>
  </div>
</div>


  );
};

export default EarningSummary;


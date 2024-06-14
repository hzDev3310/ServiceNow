// src/DonutChart.js


import Chart from 'react-apexcharts';

function DonutChart({ series, colors }) {


  const options = {
    chart: {
      width: 300,
      type: 'donut',
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: 'gradient',
      gradient: {
     
        type: 'horizontal',
        shadeIntensity: 0,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 0],
      },
    },
    stroke: {
      show: false,
    },
    colors: colors,
    legend: {
      show: false,
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      width={options.chart.width}
    />
  );
}

export default DonutChart;

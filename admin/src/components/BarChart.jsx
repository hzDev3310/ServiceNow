// src/BarChart.js

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function BarChart({ series, categories, lightColors, darkColors }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    darkModeQuery.addEventListener('change', handleChange);
    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  const colors = isDarkMode ? darkColors : lightColors;
  const labelColor = isDarkMode ? '#FFFFFF' : '#000000'; 

  const options = {
    chart: {
      type: 'bar',
      height: 500,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
  
   
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: labelColor,
        },
      },
    },
    yaxis : {
      labels: {
        style: {
          colors: labelColor,
        },
      },
    }
    ,

    fill: {
      opacity: 1,
      colors: colors,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return  val  ;
        },
      },
      labels: {
        style: {
          colors: labelColor,
        },
      },
    },
    
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={500}
      />
    </div>
  );
}

export default BarChart;

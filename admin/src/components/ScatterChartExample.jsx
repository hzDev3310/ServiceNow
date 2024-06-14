
import { Bar ,Pie} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend ,ArcElement ,BarElement } from "chart.js"

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,ArcElement,BarElement
)
const ScatterChartExample = ({citys}) => {
  const labels = []
  const values = [];
  let count = 0;
  citys?.forEach(item => {
      if (item.value > 0 && count < 10) {
          labels.push(item.label);
          values.push(item.value);
          count++;
      }
  });
  
  const data = {
    labels : [ "" , "sousa"],
    datasets: [
      {
        label: 'most users per citys',
        data: [20 , 80],
        backgroundColor: ["#2563eb","#93c5fd"],
      
      },
    ],
  };


  return (
   <div>
   
<Pie data={data} />
   </div>
      
  );
};

export default ScatterChartExample;

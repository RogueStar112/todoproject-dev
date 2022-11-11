import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Tasks completed',
      },
    },
    scale: {
        ticks: {
          precision: 0
        }
      }
  };


const ToDoStatistics = ({data}) => {

    const labels = Object.keys(data);

    let data_values = Object.values(data);

    let data_values_complete = [];

    let data_values_onTime = [];
    data_values_complete = data_values.map(value => {
        return value.complete;
    })

    data_values_onTime = data_values.map(value => {
        return value.onTime;
    })

    const data_to_add = {
        labels: labels,
        datasets: [{
          label: 'Completed',
          backgroundColor: 'rgb(35, 35, 175)',
          borderColor: 'rgb(255, 99, 132)',
          data: data_values_complete
        },
    
        {
            label: 'On time',
            backgroundColor: 'rgb(35, 175, 35)',
            borderColor: 'rgb(255, 99, 132)',
            data: data_values_onTime
        }]
      };

    return (
        <Bar options={options} data={data_to_add} />
    )
}

export default ToDoStatistics;

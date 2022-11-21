import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

import ToDoTaskHistory from "./ToDoTaskHistory.js";

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


const ToDoStatistics = ({data, clearStatistics, clearStatistics_history, taskLog}) => {

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
        <>
         <h3 className="text-center mt-3 superbold">Statistics</h3>
         <p className="mt-3 text-center">Click on the tabs below to get various stats!</p>
        <Tabs defaultActiveKey="bar_frequency" id="statistics-tabs" className="mb-3" fill>
        
        <Tab eventKey="bar_frequency" title="Tag Frequency">

        <div className='chart-container'>
        <Bar options={options} data={data_to_add}/>
        </div>
        <Button variant="danger" onClick={() => clearStatistics()} style={{width: "100%"}}>Clear Statistics</Button>
        </Tab>

        <Tab eventKey="task_log" title="Task Log">
            <h4 className="text-center">Most recently completed tasks</h4>

            <Table>

                <thead className="mt-3">
                    <tr>
                        <th style={{maxWidth: "10%"}}>ID</th>
                        <th style={{width: "90%", textAlign: "left"}}>Task</th>
                    </tr>
                </thead> 

                <tbody>               
                {[...taskLog].reverse().map(taskCollection => {
                    return (
                        <tr>
                            <td>{taskCollection.history_id}</td>
                            <td>{taskCollection.data.map(task => {
                               return (
                                <>
                                {<ToDoTaskHistory key={task.id+task.task} todo={task} />}
                                </>
                               ) 
                            })}

                            Finished at {taskCollection.timeLogged.slice(0, -3)}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>

            <Button variant="danger" onClick={() => clearStatistics_history()} style={{width: "100%"}}>Clear History</Button>
        </Tab>

        </Tabs>

        </>

    )
}

export default ToDoStatistics;

import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const Stat = () => {
  const [nmapResults, setNmapResults] = useState({});
  const [analysisDate, setAnalysisDate] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get_nmap')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setNmapResults(data);
        const currentDate = new Date();
        setAnalysisDate(currentDate.toLocaleString());
      });
  }, []);

  useEffect(() => {
    if (!Object.keys(nmapResults).length) {
      return;
    }

    const openCount = Object.values(nmapResults).filter(service => service.state === 'open').length;
    const closedCount = Object.values(nmapResults).filter(service => service.state === 'closed').length;
    const filteredCount = Object.values(nmapResults).filter(service => service.state === 'filtered').length;

    const ctx1 = document.getElementById('protocolStatsChart').getContext('2d');
    new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: ['Ouverts', 'Fermés', 'Filtrés'],
        datasets: [{
          label: 'Protocoles',
          data: [openCount, closedCount, filteredCount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: 'Protocol Statistics'
          }
        }
      }
    });

    const ctx2 = document.getElementById('foundProtocolsChart').getContext('2d');
    new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ['HTTP', 'FTP', 'SSH', 'SMTP', 'DNS'],
        datasets: [{
          label: 'Protocols Found',
          data: [25, 20, 15, 10, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: 'Found Protocols'
          }
        }
      }
    });
  }, [nmapResults]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '100vh' }}>
      <div style={{ margin: '20px' }}>
        <canvas id="protocolStatsChart" width="350" height="200"></canvas>
      </div>
      <div style={{ margin: '20px' }}>
        <canvas id="foundProtocolsChart" width="350" height="200"></canvas>
      </div>
      <div style={{ margin: '20px' }}>
        <p>Analysis Date and Time: {analysisDate}</p>
      </div>
    </div>
  );
};

export default Stat;

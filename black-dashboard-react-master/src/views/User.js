import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const User = () => {
  const [fileStats, setFileStats] = useState({});
  const [protocolStats, setProtocolStats] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/scans')
      .then(response => response.json())
      .then(data => {
        const fileStatsData = processData(data);
        setFileStats(fileStatsData);
        renderFileStatsChart(fileStatsData);
      })
      .catch(err => console.error('Error fetching file statistics:', err));

    fetch('http://localhost:5000/scan')
      .then(response => response.json())
      .then(data => {
        const protocolStatsData = processProtocolData(data);
        setProtocolStats(protocolStatsData);
        renderProtocolStatsChart(protocolStatsData);
      })
      .catch(err => console.error('Error fetching protocol statistics:', err));
  }, []);

  const processData = (data) => {
    const fileTypesCount = data.reduce((acc, file) => {
      acc[file.fileName] = acc[file.fileName] ? acc[file.fileName] + 1 : 1;
      return acc;
    }, {});
    return fileTypesCount;
  };

  const processProtocolData = (data) => {
    const protocolCount = Object.entries(data).reduce((acc, [protocol, count]) => {
      acc[protocol] = count;
      return acc;
    }, {});
    return protocolCount;
  };

  const renderFileStatsChart = (stats) => {
    const ctx = document.getElementById('fileStatsChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(stats),
        datasets: [{
          label: 'File Types',
          data: Object.values(stats),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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
            text: 'File Statistics'
          }
        }
      }
    });
  };

  const renderProtocolStatsChart = (stats) => {
    const ctx = document.getElementById('protocolStatsChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(stats),
        datasets: [{
          label: 'Protocols',
          data: Object.values(stats),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ margin: '20px', maxWidth: '50%' }}>
        <h2>File Statistics User</h2>
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
          <canvas id="fileStatsChart" width="600" height="600"></canvas>
        </div>
      </div>
      <div style={{ margin: '20px', maxWidth: '50%' }}>
        <h2>Protocol Statistics User</h2>
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
          <canvas id="protocolStatsChart" width="600" height="600"></canvas>
        </div>
      </div>
    </div>
  );
  
};

export default User;

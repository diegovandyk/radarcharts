const dscc = require('@google/dscc');
const Chart = require('chart.js');

function drawViz(data) {
    const parsedData = transformData(data);
  
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: parsedData.labels,
            datasets: parsedData.datasets
        },
        options: {
            responsive: true,
            scale: {
                ticks: { beginAtZero: true }
            }
        }
    });
}

function transformData(data) {
    const labels = data.tables.DEFAULT.map(row => row.dimensions[0]);
    const datasets = [{
        label: "Values",
        data: data.tables.DEFAULT.map(row => row.metrics[0])
    }];
    
    return { labels, datasets };
}

// Listen for changes from Looker Studio
dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });

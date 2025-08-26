import Chart from 'chart.js/auto';

const ctx = document.getElementById('myAreaChart');
if (ctx) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{
        label: 'Vendas',
        data: [10, 20, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

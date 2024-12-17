// Array untuk menyimpan data latency dan tabel
let latencies = [];
let timestamps = [];
let tableData = [];

// Fungsi utama untuk mengecek latency
function checkLatency() {
    const url = document.getElementById('serverUrl').value;
    const resultDiv = document.getElementById('result');

    if (!url) {
        resultDiv.innerHTML = "<span style='color: red;'>Masukkan URL yang valid!</span>";
        return;
    }

    resultDiv.innerHTML = "<span style='color: gray;'>Mengukur...</span>";
    const startTime = new Date().getTime();

    fetch(url)
        .then(response => {
            const endTime = new Date().getTime();
            const latency = endTime - startTime;
            const currentTime = new Date().toLocaleTimeString();

            latencies.push(latency);
            timestamps.push(currentTime);
            tableData.push({
                url: url,
                latency: latency,
                time: currentTime
            });

            resultDiv.innerHTML = `<strong>Latency:</strong> ${latency} ms`;

            updateChart();
            updateTable();
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = `<span style='color: red;'>Gagal menghubungi server!</span>`;
        });
}

// Fungsi untuk memperbarui tabel
function updateTable() {
    const tableBody = document.querySelector("#latencyTable tbody");
    tableBody.innerHTML = ""; // Kosongkan isi tabel

    tableData.forEach((data, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${data.url}</td>
                <td>${data.latency}</td>
                <td>${data.time}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Inisialisasi grafik Chart.js
let ctx = document.getElementById('latencyChart').getContext('2d');
let latencyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timestamps,
        datasets: [{
            label: 'Latency (ms)',
            data: latencies,
            borderColor: 'rgba(214, 41, 118, 1)',
            backgroundColor: 'rgba(214, 41, 118, 0.2)',
            borderWidth: 2,
            fill: true,
            pointRadius: 4,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Waktu' }},
            y: { title: { display: true, text: 'Latency (ms)' }}
        }
    }
});

function updateChart() {
    latencyChart.update();
}

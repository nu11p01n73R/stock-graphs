function get(url) {
        return new Promise((resolve, reject) => {
                var req = new XMLHttpRequest()
                req.open('GET', url)

                req.onload = () => {
                        if (req.status == 200) {
                                resolve(JSON.parse(req.response))
                        } else {
                                reject(Error(req.statusText))
                        }
                }

                req.onerror = () => {
                        reject(Error("Network error"))
                }

                req.send();
        });
}

function drawChart(labels, data) {
        console.log(labels, data)
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
                labels: labels,
                datasets: [{
                label: '# of Votes',
                data: data,
                borderWidth: 1
                }]
        },
        options: {
                responsive: false,
                scales: {
                yAxes: [{
                        ticks: {
                        beginAtZero: false
                        }
                }]
                }
        }
        });
}

var url = 'pe?scid=FB&scid=HDF01'
get(url).then(data => {
        console.log(data, typeof data)
        drawChart(data.labels, data.pe)
        }).catch(console.log)
        


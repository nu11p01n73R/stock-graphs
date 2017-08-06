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

function getRandomColor() {
        return Math.floor(Math.random() * 256)
}

function getColors(length) {
        var colors = []
        for (var i = 0; i < length; i++) {
                colors.push(
                      'rgba(' + getRandomColor() + ', ' + getRandomColor() + ', ' + getRandomColor() + ', 0.5)'
                )
        }
        return colors
}

function drawChart(chart, labels, data, mixed) {
        var colors = getColors(labels.length)
        var datasets = [{
                label: 'P/E Ratio',
                data: data,
                borderWidth: 1,
                backgroundColor: colors
        }]

        if (typeof mixed !== 'undefined') {
                datasets.push({
                        label: 'Industry P/E',
                        data: mixed,
                        type: 'line',
                        backgroundColor: ['rgba(0, 0, 0, 0.6)'],
                        fill: false
                })
        }

        chart.data = {
                labels: labels,
                datasets:  datasets
        };
        chart.update();
}

function getChart() {
        var ctx = document.getElementById("myChart").getContext('2d');
        return new Chart(ctx, {
                type: 'bar',
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
        })
}

const analyse = document.getElementById('analyse')
const input = document.getElementById('scid')
var chart = getChart()

analyse.addEventListener('click', () => {
        var scids = input.value.toUpperCase()
        if (scids.length > 0) {
                var params = 'scid=' + scids.split(',').join('&scid=')
                var url = 'pe?' + params

                get(url).then(data => {
                        console.log(data, typeof data)
                        drawChart(chart, data.labels, data.pe, data.industry_pe)
                        }).catch(console.log)
        }
})
        

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
        var ctx = document.getElementById("chart").getContext('2d');
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

function initialiseChart() {
        const analyse = document.getElementById('analyse')
        const input = document.getElementById('scid')
        var chart = getChart()

        analyse.addEventListener('click', () => {
                var scids = input.value.toUpperCase().replace(/ /g, '')
                if (scids.length > 0) {
                        var params = 'scid=' + scids.split(',').join('&scid=')
                        var url = 'pe?' + params

                        get(url).then(data => {
                                console.log(data, typeof data)
                                drawChart(chart, data.labels, data.pe, data.industry_pe)
                                }).catch(console.log)
                }
        })
}


function search() {
        console.log("here")
        var query = elements.input.value

        filtered = []
        if (query.length) {
                var filtered = Object.keys(stocks)
                        .filter(name => name.toLowerCase().indexOf(query) != -1)
        }

        listSuggestions(filtered)
}

function listSuggestions(filtered) {
        while (elements.sugg.firstChild) {
                elements.sugg.removeChild(
                        elements.sugg.firstChild
                )
        }

        for (var i in filtered) {
                var div = document.createElement('div')
                div.innerHTML = filtered[i]
                div.addEventListener('click', select)

                elements.sugg.appendChild(div)
        }
}

function select(e) {
        var name = e.target.innerHTML
        if  (!selected.hasOwnProperty(name)) {
                var div = document.createElement('div')
                div.innerHTML = name
                elements.select.appendChild(div)
                div.addEventListener('click', remove)

                selected[name] = stocks[name]
        }
}

function remove(e) {
        var name = e.target.innerHTML
        delete selected[name]

        elements.select.removeChild(e.target)
}

function analyse() {
        var params = Object.values(selected)
        if (params.length) {
                var url = 'pe?scid=' + params.join('&scid=')
                get(url).then(data => {
                        drawChart(elements.chart, data.labels, data.pe, data.industry_pe)
                })
        }
}

function bind() {
        elements.input.addEventListener('keyup', search)
        elements.submit.addEventListener('click', analyse)
}
        
var elements = {
        submit: document.getElementById('analyse'),
        input: document.getElementById('scid'),
        sugg: document.getElementById('suggestions'),
        select: document.getElementById('scid-input'),
        chart: getChart()
}

var stocks = {}
var selected = {}
get('list').then(data => {
        stocks = data
})
bind()
//initialiseChart()

const main = 
    `<!doctype html>
    <html>
      <head>
        <title>Stock Graphs</title>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js" ></script>
      </head>
      <body>
                <div class="analyse-form">
                        <input id="scid" type="text"> 
                        <button id="analyse">Analyse</button>
                        <h3>Suggestions</h3>
                        <div id="suggestions">
                        </div>
                        <h3>Selected</h3>
                        <div id="scid-input">
                        </div>
                </div>
                <canvas id="chart" width="1000" height="500"></canvas>
      </body>
      <script type="text/javascript" src="static/app.js"></script>
      <link href="static/app.css" rel="stylesheet">
    </html>`
export default main

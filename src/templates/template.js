const main = 
    `<!doctype html>
    <html>
      <head>
        <title>Stock Graphs</title>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js" ></script>
      </head>
      <body>
                <input type="text" id="scid">
                <button id="analyse">Analyse</button>
                <canvas id="myChart" width="1000" height="500"></canvas>
      </body>
      <script type="text/javascript" src="static/app.js"></script>
    </html>`
export default main

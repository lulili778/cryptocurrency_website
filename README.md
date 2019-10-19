# cryptocurrency_website

Update:

The graph issue had been solved with storing the live data to a localStorage place then retrive the data from the localstorage. Code updated


Bug: 

Prices.jsx :

{/* <Line options={{responsive: true}} data={this.getChartData(this.state.todayDataLow,this.state.todayDataHigh,this.state.todayTime)} /> */}

Uncomment this line of code to view the graph, however the graph is having the following error:
TypeError: Cannot read property 'length' of undefined

Refreshing the page serveral times will able to get the graph. I belived it was due to synchronizing error. Still in the process of solving this.


![Graph](/graph.png)





<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/6.2.0/d3.js" integrity="sha512-I54fxhTJwRigWTc3uNjgDzgii7LW+WJuyyA8kc6WaaZ7RQQNAf8bOEJLRNav7n/ca09MUwl5FptUukvqrOTUvQ==" crossorigin="anonymous"></script>

	<script type="text/javascript">
	google.charts.load('current', {packages: ['corechart', 'table']});
	google.charts.setOnLoadCallback(initialize);
	google.charts.setOnLoadCallback(drawChart);

	function initialize() {
	  var opts = {sendMethod: 'auto'};
	  // Replace the data source URL on next line with your data source URL.
	  //var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/109yAcrMQEAlPiUZV6nRR130hOfqBlP5dW_GpBCvezrk/edit?usp=sharing', opts);
	  //var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1J-BujYJivMxrmb8j-v_9X7MzMIvEzLGam7Gio2jzPlg/edit?usp=sharing', opts);
	  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1cDLpZxcve0YaiOMJfpZMJZJga8IahigszxvWHk3fChc/edit?usp=sharing', opts);
      
	  // Optional request to return only column C and the sum of column B, grouped by C members.
	  query.setQuery('select *');

	  // Send the query with a callback function.
	  query.send(handleQueryResponse);
	}

	function handleQueryResponse(response) {

	  if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	  }

	  var data = response.getDataTable();
	  var table = new google.visualization.Table(document.getElementById('table_div'));
	  table.draw(data, {showRowNumber: true, width: '100%', height: '100%', page: 'enable', pageSize: 10});

	}
	
	function drawChart() {
	  var opts = {sendMethod: 'auto'};
	  // Replace the data source URL on next line with your data source URL.
	  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1TnE_GrKrtR5xt33AbNjtfnA16Xuvg2AJJFLrG8nb8_w/edit?usp=sharing', opts);

	  // Optional request to return only column C and the sum of column B, grouped by C members.
	  query.setQuery('SELECT *');

	  // Send the query with a callback function.
	  query.send(handleQueryResponse2);
	}

	function handleQueryResponse2(response) {

	  if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	  }

	  var data2 = response.getDataTable();
	  
 	  var options = {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          }
        };

      //var chart = new google.charts.Bar(document.getElementById('chart_div'));
      //chart.draw(data2, google.charts.Bar.convertOptions(options)); 
	  
	  var chart = new google.visualization.ColumnChart(document.getElementById("chart_div"));
      chart.draw(data2, options);
	  
	  
	  //var table = new google.visualization.Table(document.getElementById('chart'));
	  //table.draw(data2, {showRowNumber: true, width: '100%', height: '100%', page: 'enable', pageSize: 10});


	}

	</script>

	<title>Kapsarc Assessment</title>
</head>
<body>
	<div class="container-fluid" style="margin:20px">
		<div class="jumbotron">
		  <h1 class="display-4">Data Report</h1>
		  <p class="lead">This page represent the data fetched from jodidb as part of kapsarc assessment</p>

		</div>

		<div class="card" style="">
		  <div class="card-header">
			
		  </div>
		  <div class="card-body">
			<h5 class="card-title">Data Table</h5>
			<p class="card-text">Thousand Barrels per day for number of countries.</p>
			<div id="table_div" style="width:60%"></div>
		  </div>
		</div>
		</br>
		</br>
		
		<div class="card" style="">
		  <div class="card-header">
			
		  </div>
		  <div class="card-body">
			<h5 class="card-title">BarChart - Canada</h5>
			<p class="card-text">Thousand Barrels per day for <strong>Canada</strong>, for selected Months.</p>
			<div id="chart_div"></div>
			<div id="chart"></div>

		  </div>
		</div>
		
		<div class="container">
		  
		</div>
		
	</div>


</body>
</html> 
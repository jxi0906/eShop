// Student Name: Junhui Xie
// Student ID: 991338100
// File Name: myscript.js

var rowID; 	
var xmlData; 	

$(function() {
	$('#signBtn').click(function() {
		var user = $('#user').val();
		var pass = $('#pass').val();
		if(user == "admin" && pass == "1234")
		{
			alert("Login successfully!");
			window.location = "#products";
		}
		else
		{	
			alert("Login failed, please try again!");
		}
	});
	
	$("#canvas1").hide();
	$("#canvas2").hide();
	$("#table1").hide();
	$("#table2").hide();
	$('#chart1').click(draw1);
	$('#chart2').click(draw2);
	$('#btnTable1').click(draw3);
	$('#btnTable2').click(draw4);
});

function draw1() {
	$("#canvas2").hide();
	$("#table1").hide();
	$("#table2").hide();
	$("#canvas1").toggle();
		
	var context1 = $('canvas').get(0).getContext('2d');
	var Bose_Sales = localStorage.getItem('Bose Quantity');
	var Beats_Sales = localStorage.getItem('Beats Quantity');
	var Monster_Sales = localStorage.getItem('Monster Quantity');
	data = {
		labels: ['Bose Quantity', 'Beats Quantity', 'Monster Quantity'],
		datasets: [ 
		{
			label: 'Product Sales',
			fill: false,
			backgroundColor: 'rgb(121, 210, 121)',
			data: [Bose_Sales, Beats_Sales, Monster_Sales],					
		}]
	}
	var chart1 = new Chart(context1, {type:'bar', data:data});
}

function draw2() {
	$("#canvas1").hide();
	$("#table1").hide();
	$("#table2").hide();
	$("#canvas2").toggle();
	
	var context2 = $('canvas').get(1).getContext('2d');
	var Bose_Rate = localStorage.getItem('Bose Rating');
	var Beats_Rate = localStorage.getItem('Beats Rating');
	var Monster_Rate = localStorage.getItem('Monster Rating');
	data = {
		labels: ['Bose Rating', 'Beats Rating', 'Monster Rating'],
		datasets: [ 
		{
			label: 'Product Rate',
			fill: false,
			backgroundColor: 'rgb(153, 51, 255)',
			data: [Bose_Rate, Beats_Rate, Monster_Rate],					
		}]
	}
	var chart2 = new Chart(context2, {type:'line', data:data});
}

function draw3() {
	$("#canvas1").hide();
	$("#canvas2").hide();
	$("#table2").hide();
	$("#table1").toggle();
	
	var Bose_Sales = localStorage.getItem('Bose Quantity');
	var Beats_Sales = localStorage.getItem('Beats Quantity');
	var Monster_Sales = localStorage.getItem('Monster Quantity');
	$('#row1').text(Bose_Sales);
	$('#row2').text(Beats_Sales);
	$('#row3').text(Monster_Sales);
}

function draw4() {
	$("#canvas1").hide();
	$("#canvas2").hide();
	$("#table1").hide();
	$("#table2").toggle();
	
	var Bose_Rate = localStorage.getItem('Bose Rating');
	var Beats_Rate = localStorage.getItem('Beats Rating');
	var Monster_Rate = localStorage.getItem('Monster Rating');
	$('#row4').text(Bose_Rate);
	$('#row5').text(Beats_Rate);
	$('#row6').text(Monster_Rate);
}

$(document).on("pagecreate", "#home", function() {
	// use ajax to retrieve xml data
	$.ajax({
		type: "GET", url: "project.xml", dataType: "xml",
		success: function(xml) {
			getXML(xml);
		},
		// show error message when the page loads wrong 
		error: function(e) {
			alert(e.status + "-" + e.statusText);
		}
	});
	
	$.ajax({
		url:"project.json",
		type:"GET",
		dataType:"json",
		success: function(data){
			var student = data.student;
			$(".footer").append("Student Name: " + student.name + "<br>" +
								"Student ID: " + student.ID + "<br>" +
								"Program: " + student.program);
			$(".footer").css("text-align", "center").css("font-family", "Arial").css("font-size", "15px");
		}
	});
});

function getXML(xml) {
	console.log("in getXML");
	console.log(xml);
	var n=0;
	// store xml data to xmlData
	xmlData = xml;
		
	$(xml).find("product").each(function() {
		// find the product name 
		$("#b"+n).append("<p class='productName'>" + $(this).find("name").text() + "</p>");
		// display the picture and link to another page
		$("#b"+n).append("<a href='#product'>" +
						 "<p>" + "<img src='images/" + 
						 $(this).find("name").attr("image") + 
					     "' width='150'>" + "</p>" + "</a>");
		$(".product"+n).html($(this).find("name").text());
		n++;
	});	// end of the loop	
}

$(document).on("pageshow", "#product", function() {
	console.log(xmlData);
	// show which row is selected in the console
	console.log(rowID);  
	parseXML(xmlData, rowID);
});

// store the value to rowID when user clicks the button
$(document).on("click", "section >div", function() {
	rowID = $(this).closest("div").attr("value");
});

function parseXML(xml, rowID) {
	// retrieve the information based on the rowID
	$("div#img").html("<img src='images/" + 
							$(xml).find("product:nth(" + rowID + ")").find("name").attr("image") +
						"' width='270'>");
	$("div#image").html("<img src='images/" + 
							$(xml).find("product:nth(" + rowID + ")").find("name").attr("image") +
						"' width='120'>");					
	$("div#name").html("<b>Product Name:</b> " + 
							$(xml).find("product:nth(" + rowID + ")").find("name").text());
	$("div#price").html("<b>Current Price:</b> " + 
							$(xml).find("product:nth(" + rowID + ")").find("currentPrice").text() +
						"<br>" +
						"<b>Product Type:</b> " + 
							$(xml).find("product:nth(" + rowID + ")").find("type").text());
	$("div#spec").html("<b>Product Style:</b> " + 	
							$(xml).find("product:nth(" + rowID + ")").find("specification").find("style").text() +
						"<br>" + 
						"<b>Length:</b> " + 
							$(xml).find("product:nth(" + rowID + ")").find("specification").find("cordLength").text() +
						"<br>" + 
						"<b>Ear Cushion:</b> " + 
							$(xml).find("product:nth(" + rowID + ")").find("specification").find("earCushion").text() +
						"<br>" + 
						"<b>Product Color:</b> " + 
							$(xml).find("product:nth(" + rowID + ")").find("specification").find("color").text());
	$("div#desc").html("<b>Description:</b> " + 
							$(xml).find("product:nth(" + rowID + ")").find("description").text());
							
	$('#submit').click( function() {
		var quantity = $('#quantity').val();
		var product = $(xml).find("product:nth(" + rowID + ")").find("name").text();
	
		if(product == 'Bose') {
			var prevQuantity = localStorage.getItem('Bose Quantity');
			var total =  Number(prevQuantity) + Number(quantity);
			localStorage.setItem('Bose Quantity',total);
			location.reload();
		}
		
		if(product == 'Beats') {
			var prevQuantity = localStorage.getItem('Beats Quantity');
			var total =  Number(prevQuantity) + Number(quantity);
			localStorage.setItem('Beats Quantity',total);
			location.reload();
		}

		if(product == 'Monster') {
			var prevQuantity = localStorage.getItem('Monster Quantity');
			var total =  Number(prevQuantity) + Number(quantity);
			localStorage.setItem('Monster Quantity',total);
			location.reload();
		}
	});
	
	$('#rate').click( function() {
		var rating = $('#rating').val();
		var product = $(xml).find("product:nth(" + rowID + ")").find("name").text();
	
		if(product == 'Bose') {
			var prevRate = localStorage.getItem('Bose Rating');
			var total =  Number(prevRate) + Number(rating);
			localStorage.setItem('Bose Rating',total);
			location.reload();
		}
		
		if(product == 'Beats') {
			var prevRate = localStorage.getItem('Beats Rating');
			var total =  Number(prevRate) + Number(rating);
			localStorage.setItem('Beats Rating',total);
			location.reload();
		}

		if(product == 'Monster') {
			var prevRate = localStorage.getItem('Monster Rating');
			var total =  Number(prevRate) + Number(rating);
			localStorage.setItem('Monster Rating',total);
			location.reload();
		}
	});
}

// parse xml data from navigation bar
$(document).on("click", ".product0", function() {
	rowID = 0; 
	parseXML(xmlData, rowID);
});
$(document).on("click", ".product1", function() {
	rowID = 1; 
	parseXML(xmlData, rowID);
});
$(document).on("click", ".product2", function() {
	rowID = 2; 
	parseXML(xmlData, rowID);
});
























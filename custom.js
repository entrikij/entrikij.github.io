var state = 0; //starting state with spread lines
var globalInterval;
var svgContainer;
var startingSectionArr = [];
var endingSectionArr = [];
var numLines = 8;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function sendLine(id, lineString, duration) {
	console.log("line");

	var myPolygon = d3.select(document.getElementById(id));
	myPolygon
	  .transition()
	  .ease("quadOut")
	  .duration(duration)
	  .attr('points',lineString);
}

function sendLineDouble(id, lineString1, lineString2, duration) {
    console.log("line");

    var myPolygon = d3.select(document.getElementById(id));
    myPolygon
        .transition()
        .ease("linear")
        .duration(duration)
        .attr('points',lineString1)
		.transition()
        .ease("cubicOut")
        .duration(duration)
        .attr('points',lineString2);
}

function alterGutterInitial(duration){
    state = 1;

    for(var i = 0; i < numLines; i++){
        var line = $("#line-" + i);

        var lineGutterPosition = $("#line-gutter").position();
        var lineGutterLeft = lineGutterPosition.left;
        var lineGutterTop = lineGutterPosition.top;
        var lineGutterHeight = $("#line-gutter").height();
        var lineGutterWidth = $("#line-gutter").width();
        var height = $(document).height();
        var width = $(document).width();

        var startingPoint = getRandomInt(lineGutterTop, lineGutterTop + lineGutterHeight);
        var midPoint = {"x": getRandomInt(0, lineGutterWidth), "y":getRandomInt(lineGutterTop, lineGutterTop + lineGutterHeight)};
        var endingPoint = getRandomInt(lineGutterTop, lineGutterTop + lineGutterHeight);

        var lineString1 = "", lineString2 = "";

        if(startingSectionArr[i] == 2){
        	if(endingSectionArr[i] == 2){
                lineString1 = 	Math.round(0) + ',' + Math.round(height) + ' ' +
								Math.round(midPoint['x']) + ',' + Math.round(midPoint['y']) + ' ' +
                    			Math.round(width) + ',' + Math.round(height);

                lineString2 = 	Math.round(0) + ',' + Math.round(startingPoint) + ' ' +
                    			Math.round(midPoint['x']) + ',' + Math.round(midPoint['y']) + ' ' +
                    			Math.round(lineGutterWidth) + ',' + Math.round(endingPoint);
			}
			else{
                lineString1 = 	Math.round(0) + ',' + Math.round(height) + ' ' +
                    			Math.round(midPoint['x']) + ',' + Math.round(midPoint['y']) + ' ' +
                    			Math.round(lineGutterWidth) + ',' + Math.round(endingPoint);

                lineString2 = 	Math.round(0) + ',' + Math.round(startingPoint) + ' ' +
                    			Math.round(midPoint['x']) + ',' + Math.round(midPoint['y']) + ' ' +
                    			Math.round(lineGutterWidth) + ',' + Math.round(endingPoint);
			}
		}
		else{
        	if(endingSectionArr[i] == 2){
                lineString1 = 	Math.round(0) + ',' + Math.round(startingPoint) + ' ' +
                    			Math.round(midPoint['x']) + ',' + Math.round(midPoint['y']) + ' ' +
                    			Math.round(width) + ',' + Math.round(height);

                lineString2 = 	Math.round(0) + ',' + Math.round(startingPoint) + ' ' +
                    			Math.round(midPoint['x']) + ',' + Math.round(midPoint['y']) + ' ' +
                    			Math.round(lineGutterWidth) + ',' + Math.round(endingPoint);
			}
			else{
                lineString1 = 	Math.round(0) + ',' + Math.round(startingPoint) + ' ' +
                    			Math.round(midPoint['x']) + ',' + Math.round(midPoint['y']) + ' ' +
                    			Math.round(lineGutterWidth) + ',' + Math.round(endingPoint);
			}
		}

		console.log("LineStrings:");
        console.log(lineString1);
        console.log(lineString2);

        var lineId = "line-" + i;

		if(lineString2 == ""){
            sendLine(lineId, lineString1, duration);
            //alert();
		}else{
            sendLineDouble(lineId, lineString1, lineString2, Math.round(duration/2.5));
		}
    }
}

function alterGutter(duration){
	state = 1;

	for(var i = 0; i < numLines; i++){
		var line = $("#line-" + i);

		var lineGutterPosition = $("#line-gutter").position();
		var lineGutterLeft = lineGutterPosition.left;
		var lineGutterTop = lineGutterPosition.top;
		var lineGutterHeight = $("#line-gutter").height();
		var lineGutterWidth = $("#line-gutter").width();

		var startingPoint = getRandomInt(lineGutterTop, lineGutterTop + lineGutterHeight);
		var midPoint = {"x": getRandomInt(0, lineGutterWidth), "y":getRandomInt(lineGutterTop, lineGutterTop + lineGutterHeight)};
		var endingPoint = getRandomInt(lineGutterTop, lineGutterTop + lineGutterHeight);

		var lineString = 	Math.round(0) + ',' + Math.round(startingPoint) + ' ' +
							Math.round(midPoint['x']) + ',' + Math.round(midPoint['y']) + ' ' +
							Math.round(lineGutterWidth) + ',' + Math.round(endingPoint);

		sendLine("line-" + i, lineString, duration);
	}
}

function initMoveLines(duration, type){
	var height = $(document).height();
	var width = $(document).width();
	
	var landingZoneWidth = $("#landing-zone").width();
	$("#landing-zone").css({"height":landingZoneWidth});
	
	landingZoneHeight = landingZoneWidth;
	
	var startingRange = 2*height + width;
	console.log(height);	
	
	for(var i = 0; i < numLines; i++){
		//Choose starting point on left, bottom, or right
		var startingPoint = getRandomInt(0, startingRange);
		var startingSection;
		
		if(startingPoint < height) startingSection = 1;
		else if(startingPoint < height + width) startingSection = 2;
		else startingSection = 3;
		
		var endingPoint, endingSection, coinflip;
		
		//Choose ending point on side other than starting point
		if(startingSection == 1){
			endingPoint = getRandomInt(height, startingRange);
		}
		else if(startingSection == 2){
			coinflip = getRandomInt(0, 2);
			if(coinflip == 0)
				endingPoint = getRandomInt(0, height);
			else
				endingPoint = getRandomInt(height + width, startingRange);
		}
		else{
			endingPoint = getRandomInt(0, height + width);
		}
		
		if(endingPoint < height) endingSection = 1;
		else if(endingPoint < height + width) endingSection = 2;
		else endingSection = 3;

		//Choose junction point within landing zone div
		
		var landingLeft = getRandomInt(0, landingZoneWidth);
		var landingTop = getRandomInt(0, landingZoneWidth);
		
		var landingZonePosition = $("#landing-zone").position();
		var landingZoneLeft = landingZonePosition.left;
		var landingZoneTop = landingZonePosition.top;
		
		var lineData;
		
		if(startingSection == 1){
			if(endingSection == 2){
				startingSectionArr[i] = 1;
				endingSectionArr[i] = 2;
				lineData = [ { "x": 0,   "y": startingPoint},  
							{ "x": landingZoneLeft + landingLeft,  "y": landingZoneTop + landingTop},
							{ "x": endingPoint - height,  "y": height}];
			}
			else{ //3
                startingSectionArr[i] = 1;
                endingSectionArr[i] = 3;
				lineData = [ { "x": 0,   "y": startingPoint},  
							{ "x": landingZoneLeft + landingLeft,  "y": landingZoneTop + landingTop},
							{ "x": width,  "y": endingPoint - height - width}];
			}
		}
		else if(startingSection == 2){
			if(endingSection == 1){
                startingSectionArr[i] = 1;
                endingSectionArr[i] = 2;
				lineData = [ { "x": 0,  "y": endingPoint},
							{ "x": landingZoneLeft + landingLeft,  "y": landingZoneTop + landingTop},
                    		{ "x": startingPoint - height,   "y": height}];
			}
			else{ //3
                startingSectionArr[i] = 2;
                endingSectionArr[i] = 3;
				lineData = [ { "x": startingPoint - height,   "y": height},  
							{ "x": landingZoneLeft + landingLeft,  "y": landingZoneTop + landingTop},
							{ "x": width,  "y": endingPoint - height - width}];
			}
		}
		else{ //3
			if(endingSection == 1){
                startingSectionArr[i] = 1;
                endingSectionArr[i] = 3;
				lineData = [ { "x": 0,  "y": endingPoint},
							{ "x": landingZoneLeft + landingLeft,  "y": landingZoneTop + landingTop},
                    		{ "x": width,   "y": startingPoint - height - width}];
			}
			else{ //2
                startingSectionArr[i] = 2;
                endingSectionArr[i] = 3;
				lineData = [ { "x": endingPoint - height,  "y": height},
							{ "x": landingZoneLeft + landingLeft,  "y": landingZoneTop + landingTop},
                    		{ "x": width,   "y": startingPoint - height - width}];
			}
		}
		
		var lineString = 	Math.round(lineData[0]['x']) + ',' + Math.round(lineData[0]['y']) + ' ' +
							Math.round(lineData[1]['x']) + ',' + Math.round(lineData[1]['y']) + ' ' +
							Math.round(lineData[2]['x']) + ',' + Math.round(lineData[2]['y']);

        console.log("Starting and Ending Sections");
        console.log(startingSectionArr[i] + " : " + endingSectionArr[i]);

		console.log("Initial LineString");
		console.log(lineString);

		var color = "#242038";
					
		if(i < 2) color = "#242038";
		else if(i < 4) color = "#9067C6";
		else if(i < 6) color = "#CAC4CE";
		else color = "#F7ECE1";
							
		if(type == "init"){
			var lineGraph = svgContainer.append("polyline")
								.attr("fill", "none")
								.attr("points",lineString)
								.attr("id","line-" + i)
								.style({"stroke":color,
										"stroke-width":"3"});
		}		
		else if(type == "move"){
			sendLine("line-" + i, lineString, duration)
		}
	}				
}

$(window).on('resize', function(){
	if(state == 0)
		initMoveLines(750, "move");
	else{
		alterGutter(750);
		setTimeout(function(){
			alterGutter(10000);
		}, 750);
		
		clearInterval(globalInterval);
		
		globalInterval = setInterval(function(){
			alterGutter(10000);
		}, 10000);
	}
});

$( document ).ready(function() {
	
	svgContainer = 	d3.select('#svg-zone').append('svg');
	
	initMoveLines(0, "init");
	
	$("#content").click(function(){
        var gutter = $("#line-gutter");
        var offset = gutter.offset();
        var width = gutter.width();
        var height = gutter.height();

        var centerX = offset.left + width / 2;
        var centerY = offset.top + height / 2;

		$("#initials").animate({'height':2*centerY,'opacity':'0'},750);
		//$("#content").animate({'font-size':'5rem'},750);
		
		alterGutterInitial(750);
		setTimeout(function(){
			alterGutter(10000);
			$("#initials").hide();
		}, 750);

		clearInterval(globalInterval);

		globalInterval = setInterval(function(){
			alterGutter(10000);
		}, 10000);
		
		$("#svg-zone").unbind("click");
	});
	
	
});
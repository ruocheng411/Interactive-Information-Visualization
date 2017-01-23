// This is a JavaScript document with library p5.js for the Assignment 1 of
// Interactive Information Visualization
// The fucntion of setup() is for loading data and initialization
// The function of draw() is for dawing and updating 
// In the part of Visualization
// part one
// I used the size of rectangle to present how many pages for a paper(normal)
// For the case special, like paper has more than 10 pages; lack of data;data not clear,
// I use different value to present. 
// more than 10 pages(150); lack of data (0);data not clear (100)
// four different color present 4 conferences
// part two
// a pieChart (Shape and Orientation)
// present each conference has presented how many papers during 26 years in the format percentage
// and the percentage of the number of papers in every five years
// also, use the value to present the different items


var w = 2000;
var h = 2000;
var table;
var yearCol;
var conferenceCOl;
var titleCol;
var DOICol;
var linkCol;
var firstPageCol;
var lastPageCol;
var typeCol;
var abstractCol;
var authorNames;
var firstAuthorAffiliation;
var minYear;
var maxYear;
var years = [maxYear - minYear + 1] ;
var pages = [];

var minWidth = 1;
var maxWidth = 5;

var fills = [0,50,100,150,200];
var conferences = ["VAST","InfoVis","SciVis","Vis"];


function preload(){
  table = loadTable("data/vispubdata-grobid-min.csv","csv","header");
}

function setup() {
  createCanvas(w,h);
  noLoop();
  background(255,255,255);

  yearCol = table.getColumn("Year");
  minYear = min(yearCol);
  maxYear = max(yearCol);

  conferenceCol = table.getColumn("Conference");
  titleCol = table.getColumn("Paper.Title");
  DOICol = table.getColumn("Paper.DOI");
  LinkCol = table.getColumn("Link");
  firstPageCol = table.getColumn("First.page"); 
  lastPageCol = table.getColumn("Last.page"); 
  typeCol = table.getColumn(7);
  abstractCol = table.getColumn("Abstract");
  authorNames = table.getColumn("Author.Names");
  firstAuthorAffiliation = table.getColumn("First.Author.Affiliation");

}
  
function draw(){
  var spacing = 60;
  var lineheight = 30;
  var x,y;
  var totalYears = maxYear - minYear +1; // 
  var totalConference = conferences.length;
  
  textSize(26);
  text("Year",15, 30)
  
  textSize(30);
  for(var i=0; i< totalYears;++i){
    fill(0,102,153);
    text(minYear + i ,10, 80 + i * spacing); 
    years[i] = 0;
  }

  var confs = [0,0,0,0];
  for (var i = 0 ;i < table.getRowCount(); ++i) {

    pages[i] = lastPageCol[i] - firstPageCol[i] + 1;
    var totalPages = lastPageCol[i] - firstPageCol[i] + 1;
    var index =  yearCol[i]% minYear;
    years[index] += 1;
    var conf = conferenceCol[i];

    strokeWeight(1);
    noFill();

    switch(conf){
      case "VAST":
        stroke(255,0,0);
        confs[0] +=1;
        break;
      case "InfoVis":
        stroke(0,255,255);
        confs[1] +=1;
        break;
      case "Vis":
        stroke(127,0,255);
        confs[2] +=1;
        break;
      case "SciVis":
        stroke(255,255,10);
        confs[3] +=1;
        break;
      default:
        break;
    }
    if(totalPages == min(pages)){
      fill(100);
      lineheight = 30;
      x = 80 + 10*years[index];
      y = 50 + index * spacing;
      rect(x,y,10,lineheight);
    } 
    else {
      if(totalPages >10){
        lineheight = 50;
        fill(150);
      }else if (totalPages >0){
        lineheight = 40* totalPages / 10;
      }else if(totalPages<0){
        fill(0);
        lineheight = 4;
      }

      x = 80 + 10*years[index];
      y = 50 + index * spacing;
      rect(x,y,10,lineheight);
    }
  }

  var angles = [];
  angles = calculAnglesYears(years);
  pieChart(400, 250+ years.length * spacing, 300 ,angles);
  addLegendYears(400, 250+ years.length * spacing, 300 ,angles);
  
  var angles2 = calculAnglesConference(confs);
  pieChart(1100, 250+ years.length * spacing, 300 ,angles2);
  addLegendConference(1100, 250+ years.length * spacing, 300 ,angles2)
}


function calculAnglesYears(years){
  var angle = [];
  var j=0;
  for (var i = 4; i < years.length; i+=5) {
    angle[j] = years[i] + years[i-1] + years[i-2] + years[i-3] + years[i-4];
    angle[j] =  angle[j] / table.getRowCount()*360;
    j++;
  }
  var yearsmod5 = years.length%5;
  angle[j] = 0;
  if(yearsmod5>0){
    for(var i=0;i<yearsmod5;i++){
      angle[j] += years[years.length-1-i];
    }
    angle[j] = angle[j] / table.getRowCount()*360;
  }
  return angle;
}

function calculAnglesConference(confs){
  var angle = [];
  var j=0;
  for (var i = 0; i < confs.length; i++) {
   angle[i] = confs[i]/table.getRowCount()*360;
  }
  return angle;
}

//idea from https://p5js.org/examples/form-pie-chart.html
function pieChart(x,y,diameter, data) {
  var lastAngle = 0;
  for (var i = 0; i < data.length; i++) {
    var gray = map(i, 0, data.length, 0, 255);
    fill(gray);
    noStroke();
    arc(x, y, diameter, diameter, lastAngle, lastAngle+radians(data[i]));
    lastAngle += radians(data[i]);
    // console.log(lastAngle);
    
    rect(x-diameter-30,y-diameter/2 + 50*i,45,25);
    
  }
  
}

function addLegendYears(x,y,diameter,data){
  for (var i = 0; i < data.length; i++) {
    fill(0,0,125);
    textSize(15);
    var d = (data[i]/3.6).toFixed(2);
    text(d+"%",x-diameter-85,y-diameter/2+20+ 50*i);
    var a = x-diameter+20;
    var b = y-diameter/2+20+ 50*i;
    if((minYear+4+i*5)<maxYear){
      text((minYear+i*5) + " - "+(minYear+4+i*5) ,a,b); 
    }else if((minYear+i*5) != maxYear){
      text((minYear+i*5) + " - "+(maxYear) ,a,b); 
    }else{
      text(maxYear ,a,b); 
    }
  }
  textSize(18);
  var str = "Percentage of every year's conference papers between 1990 and 2015";
  text(str,x-diameter/2-180,y-diameter/2-20)
}


function addLegendConference(x,y,diameter,data){
  for (var i = 0; i < data.length; i++) {
    fill(0,0,125);
    textSize(15);
    var d = (data[i]/3.6).toFixed(2);
    text(d+"%",x-diameter-85,y-diameter/2+20+ 50*i);
    var a = x-diameter+20;
    var b = y-diameter/2+20+ 50*i;
    text(conferences[i],a,b);
  }
  textSize(18);
  var str = "Percentage of papers from different conferences between 1990 and 2015";
  text(str,x-diameter/2-180,y-diameter/2-20)
  
}









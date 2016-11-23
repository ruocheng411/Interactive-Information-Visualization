var w = 1300;
var h = 900;
var table;
var yearCol;
var conferenceCOl;
var minYear;
var maxYear;

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
  background(255,204,0);
  
  console.log(table.getRowCount() + " total rows in table");
  console.log(table.getColumnCount() + " total columns in table");
  
  yearCol = table.getColumn("Year");
  minYear = min(yearCol);
  maxYear = max(yearCol);
}

function draw() {
  var spacing = 10;
  var x = 0;
  var y = 5;
  var length = 10;
  var lineheight = 30;
  
  for(var i = 0; i<table.getRowCount(); i++)
  {
    x = x + spacing;
    
    if(x > w - spacing)
    {
      x = x % w + spacing;
      // x = spacing;
      y = y + lineheight + 10;
    }
    
    currentYear = yearCol[i];
    currentWidth =(currentYear - minYear)/(maxYear- minYear)*(maxWidth -minWidth)+minWidth;
    strokeWeight(currentWidth);
    line(x, y ,x, y + lineheight )
  }
  
  
}
var table1,table2;
var keyword1,keyword2;
var times1,times2;
var percentage1,percentage2;
var pos1,pos2;

var w = 800;
var h = 800;
function preload(){
  table1 = loadTable("data/keyword-citation.csv","csv","header");
  table2 = loadTable("data/keyword-orginal-paper.csv","csv","header");
}

function setup() {
  createCanvas(w,h);

  keyword1 = table1.getColumn("keyword");
  keyword2 = table2.getColumn("keyword");
  times1 = table1.getColumn("times");
  times2 = table2.getColumn("times");
  percentage1 = table1.getColumn("percentage");
  percentage2 = table2.getColumn("percentage");
  

  // set drawing parameters
  background(50);
  textAlign(CENTER, CENTER);
  textSize(18);
  noStroke();
  fill(255);
  noLoop();
  
  
}

function draw() {
  var angles = [];
  angles = calculAngles(percentage1);
  pieChart(500, 250, 300 ,angles);
  addLegend(500, 250, 300,keyword1,angles);

}

function calculAngles(data){
  var angle = [];
  var j=0;
  
  for (var i = 0; i < 7; i++) {
    angle[i] =  data[i] * 3.6;
    j += angle[i]; 
  }
  angle[7] = 360-j;
  return angle;
}


function pieChart(x,y,diameter, data) {
  var lastAngle = 0;
  for (var i = 0; i < 8; i++) {
    var gray = map(i, 0, 8, 0, 255);
    fill(gray);
    noStroke();
    arc(x, y, diameter, diameter, lastAngle, lastAngle+radians(data[i]));
    lastAngle += radians(data[i]);
    rect(x-diameter-100,y-diameter/2 + 50*i,45,25);
    
  }
  
}


function addLegend(x,y,diameter,data,data2){
  textAlign(LEFT);
  for (var i = 0; i < 8; i++) {
    fill(0,0,125);
    textSize(15);
    var d = parseInt(data2[i])/3.6;
    d = d.toFixed(2);
    text(d+"%",x-diameter-155,y-diameter/2+20+ 50*i);
    if(i < 7){
    text(data[i],x-diameter-45,y-diameter/2+20+ 50*i);
    }else{
      text("Others",x-diameter-45,y-diameter/2+20+ 50*i);
    }
  }
  
  textSize(18);
  // var str = "The most widely cited papers' keyword";
  text(str,x-diameter/2-180,y-diameter/2-20)
}


function triangleVis(x,y,data){
  for(var i = 0; i<5;++i){
    textSize(28);
  }
}
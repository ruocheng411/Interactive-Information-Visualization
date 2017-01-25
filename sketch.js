var table1,table2;
var keyword1,keyword2;
var times1,times2;
var percentage1,percentage2;
var pos1,pos2;

var w = 990;
var h = 1200;
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
  background(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  noStroke();
  fill(255);
  noLoop();
  
  // // set position
  // for(var i=0; i<10;++i){

  //   width = random(400)+50;
  //   height = random(400)+50;
  // }
  
}

function draw() {
  
  addLegend2(50.00,40.00,percentage1,keyword1);
  
  drawCircle(50.00,40.00,percentage1,times2,keyword1,keyword2);
  addGrid(50);
  addText();
  // var angles = [];
  // angles = calculAngles(percentage1);
  // pieChart(500, 250, 300 ,angles);
  // addLegend(500, 250, 300,keyword1,angles);
  // var index = searchOriginalKeyWord(keyword2,keyword1[2]);
  

}


function searchOriginalKeyWord(keywordO,word){
  // console.log(keywordO.length);
  for(var i=0;i<keywordO.length;i++)
  {
     if(keywordO[i] === word){
       return i;
     }
  }
  return null;
}

function addLegend2(a,b,datah,datav){
  // var a = w/((parseInt(datah).max()/5+1)*5);
  fill(125);
 
  // var a = 50;
  // var b = 40;
  textSize(15);
  for(var i=0;i<w/a;i++){
    text(i+"%",a*i+160,10);
  } 
  textAlign(LEFT);
  for(var i=0;i<20;i++){
    text(datav[i],5,b*i+b);
  }
}

function drawCircle(a,b,datas,datas2,keyword1,keyword2){
  var dataMax = datas[0];
  var radiusMax = datas2[0];
  for(var i=0;i<20;i++){
    var data = datas[i];
    var index = searchOriginalKeyWord(keyword2,keyword1[i]);
    var radius = datas2[index]/radiusMax*15;
    console.log(radius)
    fill(200*data/dataMax);
    var x = data*a+160;
    var y = i*b+b;
    stroke(255);
    ellipse(x,y,radius*2+10,radius*2+10);
    // stroke(0);
    point(x,y);
  }
}

function addGrid(a){
  stroke(255);
  for(var i=0;i<w/a;i++){
    line(a*i+160,20,a*i+160,h);
  }
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
  var str = "The most widely cited papers' keyword";
  text(str,x-diameter/2-180,y-diameter/2-20)
}


function triangleVis(x,y,data){
  for(var i = 0; i<5;++i){
    textSize(28);
  }
}


function addText(){
  var x = 20, y = h - 300;
  textSize(15);
  stroke(50);
  // fill(0);
  text("MyKeywordTool - A tool to visualize the keywords of the most-cited 21 papers in the field of visualization from 1990 to 2015",x,y-10);
  text("-  Task: The frequency of keywords",x,y+20);
  text("-  Position: Each circle is located in the corresponding position",x,y+40);
  text("   Area: The size of each circle is related to its frequency in all the papers(1990-2015)",x,y+60);
  text("   Staturation/Color: The Staturation of each circle represents the frequency in the most-cited 21 papers.",x,y+80);
  text("-  The left column is the top 20 keywords come from the most-cited 21 papers",x,y+100);
  text("   The firest line at the top is the percentage of each keyword within the most-cited 21 papers",x,y+120);
  text("-  In the future, add zooming to make the visualization more clealy than now.",x,y+140) ;
  text("                        And change the meaning of circle's color to add some more information",x,y+160);
  text("-  Pros: Tried a set of visualization tools; Cons: repeat some data, not quite clear",x,y+180);
  
  
  
  
}
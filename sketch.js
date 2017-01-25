var Tcitation,Toriginal,Tyears,Tconference;
var keywordC,keywordO;
var timesC,timesO;
var percentageC,percentageO;
var pos1,pos2;
var input, buttonC,buttonO,buttonY,buttonJ,buttonE;
var ySlider,checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,checkbox6,radio;
var enableC = 0,enableO = 0;
var bug;

var w = 1200;
var h = 1200;
function preload(){
  Tcitation = loadTable("data/keyword-citation.csv","csv","header");
  Toriginal = loadTable("data/keyword-original-paper.csv","csv","header");
  Tyears = loadTable("data/keyword-years.csv","csv","header");
  Tconference = loadTable("data/keyword-conference.csv","csv","header");
}

function setup() {
  createCanvas(w,h);

  keywordC = Tcitation.getColumn("keyword");
  keywordO = Toriginal.getColumn("keyword");
  timesC = Tcitation.getColumn("times");
  timesO = Toriginal.getColumn("times");
  percentageC = Tcitation.getColumn("percentage");
  percentageO = Toriginal.getColumn("percentage");

  buttonC = createButton('Top Keyword (Most Citation)');
  buttonC.position(50, 5);
  buttonO = createButton('Top Keyword (Total)');
  buttonO.position(250, 5);
  buttonY = createButton('Top Keyword (Years)');
  buttonY.position(400,5);
  // ySlider = createSlider(1990,2015,5);
  // ySlider.position(400,5);
  checkbox1 = createCheckbox('90-94', false);
  checkbox1.position(540,5);
  checkbox2 = createCheckbox('95-99', false);
  checkbox2.position(600,5);
  checkbox3 = createCheckbox('00-04', false);
  checkbox3.position(660,5);
  checkbox4 = createCheckbox('05-09', false);
  checkbox4.position(720,5);
  checkbox5 = createCheckbox('10-14', false);
  checkbox5.position(780,5);
  checkbox6 = createCheckbox('2015', false);
  checkbox6.position(840,5);

  radio = createRadio();
  radio.option("InfoVis");
  radio.option("SciVis");
  radio.option("VAST");
  radio.option("Vis")
  radio.style('hight', '60px');
  buttonJ = createButton('Top Keyword (Conference)');
  buttonJ.position(50,30);
  radio.position(250,30);
  buttonE = createButton('Explanation');
  buttonE.position(540,30);
  // set drawing parameters
  background(255);
  textAlign(CENTER);
  textSize(18);
  noStroke();
  fill(255);

  bug = new Jitter();
  // noLoop();
  addText();
  

}

function draw() {

  buttonC.mousePressed(funcCitation);
  buttonO.mousePressed(funcOriginal);
  buttonY.mousePressed(funcYears);
  buttonJ.mousePressed(funcConfenrence);
  buttonE.mousePressed(addText);
  if(enableC ==1)
  {
    bug.move(1000,700,percentageC[0],percentageO[0]);
    // bug.display();
  }
  // console.log(enableC);

  // addLegend2(50.00,40.00,percentageC,
  // addLegend2(50.00,40.00,percentageC,keywordC);
  
 
  // addGrid(50);

  // addText();
  // var angles = [];
  // angles = calculAngles(percentageC);
  // pieChart(500, 250, 300 ,angles);
  // addLegend(500, 250, 300,keywordC,angles);
  // var index = searchOriginalKeyWord(keywordO,keywordC[2]);
  

}

function Jitter(){
  this.x =0;
  this.y =0;
  this.diameter =0;
  this.i=0;
  this.speed = 1;

  this.move = function(xMax,yMax,dataMax,radiusMax){
    var a = xMax/20;
    var b = yMax/dataMax;
    var i = Math.floor((mouseX - 50 + a/2)/a) ;  
    var x = i*a+50;
    var data = percentageC[i];
    var y = yMax - data*b+100;
    var num =20;
    if(num > keywordC.length){
      num = keywordC.length;
    }
    if((i != this.i)&&(i<num)&&(i>-1)){
      clear();
      drawCircle(1000,700,percentageC,timesO,keywordC,keywordO,15);
      addLegend2(700,percentageC[0]);
      this.x = x;
      this.y = y;
      this.diameter = a;
      this.i = i;
      this.display();
    }
  };
  this.display = function(){

    fill( 255, 250, 0,50);
    ellipse(this.x,this.y,this.diameter,this.diameter);
    fill(0, 102, 153);
    noStroke();
    textAlign(CENTER);
    text(keywordC[this.i],this.x,this.y+20,0,this.y+100);
    textAlign(LEFT);
    var s = 'In the top citation: ';
    s = s + percentageC[this.i] + '%'
    text(s,500,250);
  };
};


function funcCitation() {
  clear();
  drawCircle(1000,700,percentageC,timesO,keywordC,keywordO,15);
  addLegend2(700,percentageC[0]);
  enableC = 1;
  enableO = 0;
  redraw();
}



function funcOriginal() {
  clear();
  redraw();
}

function funcYears() {
  clear();
  redraw();
}

function funcConfenrence() {
  clear();
  redraw();
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

function addLegend2(yMax,dataMax){
  var a = yMax/dataMax;
  fill(125);
 
  // var a = 50;
  // var b = 40;
  textAlign(LEFT);
  textSize(15);
  for(var i=0;i<w/a;i++){
    text(i+"%",0,yMax-a*i+100);
  } 
}

function drawCircle(xMax,yMax,datas,datas2,keywordC,keywordO,d){
  var dataMax = datas[0];
  var radiusMax = datas2[0];
  var a = xMax/20;
  var b = yMax/dataMax;

  textSize(10);
  var num =20;
  if(num > keywordC.length){
    num = keywordC.length;
  }
  // console.log(keywordC.length);
  for(var i=0;i<num;i++){
    var data = datas[i];
    var index = searchOriginalKeyWord(keywordO,keywordC[i]);
    var diameter = datas2[index]/radiusMax*30;


    fill(200*data/dataMax);
    var y = yMax - data*b+100;
    var x = i*a+50;
    textAlign(CENTER, TOP);
    
    stroke(255);
    ellipse(x,y,diameter+d,diameter+d);
    stroke(255,0,0);
    point(x,y);
    fill(0, 102, 153, 51);
    noStroke();
    textAlign(CENTER);
    text(keywordC[i],x,y+20,0,y+100);
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
  clear();
  enableC = 0;
  enableO = 0;
  var x = 100, y = 300;
  textSize(15);
  // stroke(50);
  // fill(0);
  textAlign(LEFT);
  noStroke();
  fill(100,149,237);
  text("MyKeywordTool - A tool to visualize the keywords of the most-cited 21 papers in the field of visualization from 1990 to 2015",x,y-10);
  text("-  Task: Understanding the Field of Visualization(The frequency of keywords)",x,y+20);
  text("-  Position: Each circle is located in the corresponding position",x,y+40);
  text("   Area: The size of each circle is related to its frequency in all the papers(1990-2015)",x,y+60);
  text("   Staturation/Color: The Staturation of each circle represents the frequency in the most-cited 21 papers.",x,y+80);
  text("-  For now, only the first button works: Top Keyword(most citation)",x,y+100);
  text("   The left column is the percentage of each keyword within the most-cited 21 papers",x,y+120);
  text("-  Move the mouse, the item which has been selected will highlight and show detail information",x,y+140) ;
  text("                        And the other buttons will work in the future",x,y+160);
  text("-  Pros: Tried a set of visualization tools; Cons: not enought interaction/data and the layout is not pretty",x,y+180);
  
  
  
  
}
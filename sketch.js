var Tcitation,Toriginal,Tyears,Tconference;
var keywordC,keywordO;
var timesC,timesO;
var percentageC,percentageO;
var pos1,pos2;
var input, buttonC,buttonY,buttonJ,buttonE;
var y = new Array(6);
var k = new Array(6);
var n = new Array(6); 
var confrence = new Array(4);
var cNum = new Array(4);
var enableC = 0,enableY = 1;
var bug;
var graphe;

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

  
  for (var i = 0; i < 6; i++) {
    y[i] = Tyears.getColumn(i*3);
    k[i] = Tyears.getColumn(i*3+1);
    n[i] = Tyears.getColumn(i*3+2);
  }
  
  for(var i =0; i < 4 ; i++){
    confrence[i] = Tconference.getColumn(i*2);
    cNum[i] = Tconference.getColumn(1+i*2);
  }

  buttonC = createButton('Top Keywords (Most Citation)');
  buttonC.position(50, 5);
  buttonY = createButton('Top Keywords (Years)');
  buttonY.position(250,5);

  // buttonJ = createButton('Top Keywords (Conference)');
  // buttonJ.position(410,5);
  buttonE = createButton('Explanation');
  buttonE.position(600,5);
  // set drawing parameters
  background(255);
  textAlign(CENTER);
  textSize(18);
  noStroke();
  fill(255);

  bug = new Jitter();
  graphe = new Graphe();
  // noLoop();
  // addText();
  

}

function draw() {

  buttonC.mousePressed(funcCitation);
  buttonY.mousePressed(funcYears);
  // buttonJ.mousePressed(funcConfenrence);
  buttonE.mousePressed(addText);
  if(enableC ==1)
  {
    bug.move(1000,700,percentageC[0],percentageO[0]);
  }
  if(enableY == 1)
  {
    graphe.move();
  }
    if(enableY == 2)
  {
    graphe.select();
    graphe.display();
  }
  
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
      drawCircle(1000,700,percentageC,timesO,keywordC,keywordO,5);
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
    var s = 'In the most citation: ';
    s = s + percentageC[this.i] + '%' + ' , Top ' + this.i;
    text(s,500,250);
    var s2 = 'In all the papers: ';
    var index = searchOriginalKeyWord(keywordO,keywordC[this.i]);
    s2 = s2 + percentageO[index] + '%' + ' , Top ' + index;
    text(s2,500,300);
  };
};

function Graphe(){
  this.i = 0;
  this.j = 0;
  this.ki = 0;
  this.move = function(){
    var a = 150;
    if((mouseY >50)&&(mouseY<700)&&(mouseX<950)&&(mouseX>30)){
      var i = Math.floor((mouseX - 50 )/a) ; 
      clear();
      drawtotalYears(5,10);
      fill( 255, 250, 0,50);
      rect(50+i*150,50,150,700);
      this.i = i;
    }else{
      this.i = -2;
    }
  };
  this.select = function(){
    if((mouseY >600)&&(mouseY<700)&&(mouseX<950)&&(mouseX>30)){
      var a1 = 50, a2 = 900;
      var b1 = 600, b2 = 700;
      var c = 150;
      var i = Math.floor((mouseX - 50 )/c) ; 
      clear();
      fill( 255, 250, 0,50);
      rect(50+i*150,600,150,100);
      drawtotalYears(1,5);
      drawSeveralYears(y[graphe.j],k[graphe.j],n[graphe.j]);
      this.i = i;
    }else{
      this.i = -1;
    }
  };
  this.display = function(){
    if((mouseY > 50)&&(mouseY<600)&&(mouseX<950)&&(mouseX>30)){
      clear();
      drawtotalYears(1,5);
      drawSeveralYears(y[graphe.j],k[graphe.j],n[graphe.j]);
      textSize(14);
      fill( 255, 250, 0,50);
      var numsMax = n[this.j][0];
      var totalNum = y[this.j][1];
      var a = 900 / totalNum;
      var b = 500 / numsMax;
      var index = Math.floor((mouseX - 50 )/a) ;  
      var p1 = 50 + index * a;
      var p2 =  600 - b*n[this.j][index];   
      ellipse(p1,p2,30,30);
      fill(0,0,0);
      noStroke();
      textAlign(CENTER);
      text(k[this.j][index],p1,p2+20,0,p2+100);
      textAlign(LEFT);
      var s0 = String(index+1);
      s1 = 'Top ' + s0 + ' in this period';
      text(s1, 300, 120);

      var indexO = searchOriginalKeyWord(keywordO,k[this.j][index]);
      s1 = String(indexO);
      s = 'Top '+s1 + ' in all the papers from 1990 to 2015';
      text (s,300,150);

      var pos = 180;
      var s2 = ['InfoVis','SciVis', 'VAST','Vis']
      for (var i = 0; i < confrence.length; i++) {
        var indexC = searchOriginalKeyWord(confrence[i],k[this.j][index])
        if(indexC != null){
          s1 = String(indexC);
          s = 'Top '+s1 + ' in '+ s2[i];
          text(s,300,pos);
          pos = pos + 30;
      
        }
      }

      for (var i = 0; i < y.length; i++) {
        var indexY = searchOriginalKeyWord(k[i],k[this.j][index])
        if(indexY){
          var a = 150 / y[i][1];
          var p1 = a * indexY + 50+150*i;
          var p2 = 700-1 * n[i][indexY]; 
          fill(255,0,0);
          ellipse(p1,p2,5,5);
          
        }
     }

     }
  };

}

function funcCitation() {
  enableY = 0;
  clear();
  drawCircle(1000,700,percentageC,timesO,keywordC,keywordO,5);
  addLegend2(700,percentageC[0]);
  enableC = 1;
  redraw();
}

function funcYears() {
  enableC = 0;
  clear();
  drawtotalYears(5,10);
  enableY = 1;
  redraw();
}

function drawtotalYears(b,diameter){
  fill(0, 102, 153);
  for (var i = 0; i < 6; i++) {
    var a = 150 / y[i][1];
    for (var j = 0; j < y[i][1]; j++) {
      var p1 = a * j + 50+150*i;
      var p2 = 700-b * n[i][j]; 
      ellipse(p1,p2,diameter,diameter);
    }
    textAlign(LEFT);
    textSize(10);
    text(1990+5*i,50 + 150*i,700);
  }
  text(2015,900,700);
}

function mousePressed() {
  if(enableY == 1){
    if((mouseY >50)&&(mouseY<700)&&(graphe.i>-1)){
      enableY = 2;
      clear();
      drawtotalYears(1,5);
      drawSeveralYears(y[graphe.i],k[graphe.i],n[graphe.i]);
      graphe.j = graphe.i;
      // console.log(y[graphe.i]);
    }
  }
  if(enableY == 2){
    if((mouseY >600)&&(mouseY<700)&&(graphe.i>-1)){
      enableY = 2;
      clear();
      drawtotalYears(1,5);
      drawSeveralYears(y[graphe.i],k[graphe.i],n[graphe.i]);
      graphe.j = graphe.i;
    }
  }
}



function drawSeveralYears(years,keys,nums){
  var numsMax = nums[0];
  var totalNum = years[1];
  var a = 900 / totalNum;
  var b = 500 / numsMax;
  var diameterMax = numsMax;
  var p = Math.ceil(numsMax/totalNum);
  var diameter;
  for (var i = 0; i < totalNum; i++) {
    fill(135, 206, 250);
    diameter = nums[i] / diameterMax * 30;
    ellipse(50+i*a,600 - b*nums[i],diameter,diameter);
    textAlign(LEFT);
    fill( 30 ,144 ,255);
    text(p*i,0,600 - 500/numsMax*p*i);
    fill(139 ,137 ,137,50);
    // noStroke();
    textSize(10);
    textAlign(CENTER);
    text(keys[i],50+i*a,600 - b*nums[i]+20,0,600 - b*nums[i]+100);
  }  
    pieChart(1100,150,150, years);

    fill(0, 104, 139);
    textSize(26);
    if(graphe.j<5){
      var s1 = graphe.j *5 + 1990;
      var s2 = s1 +4;
      var s = 'High-frequency keywords in '+s1+' - '+s2;
      text(s, 350,80);
    }else if(graphe.j == 5){
      var s = 'High-frequency keywords in 2015';
      text(s, 350,80);
    }
}

function searchOriginalKeyWord(key,word){
  for(var i=0;i<key.length;i++)
  {
     if(key[i] === word){
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
    var diameter = datas2[index]/radiusMax*40;


    fill(200*data/dataMax);
    var y = yMax - data*b+100;
    var x = i*a+50;
    textAlign(CENTER, TOP);
    
    stroke(255);
    // ellipse(x,y,diameter+d,diameter+d);
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
  // console.log(data);
  var lastAngle = 0;
  var angle,numC;
  var t0 = data[3];
  var t1 = data[5];
  var t2 = data[7];
  var t3 = data[9];
  var totalC = t0*1+t1*1+t2*1+t3*1;
  for (var i = 0; i < 8; i+=2) {
    angle = data[3+i]/ totalC * 360;
    var gray = 50+50 *i/3;
    fill(gray);
    if(angle*1 > 0){
      arc(x, y, diameter, diameter, radians(lastAngle), radians(lastAngle*1+angle*1));
      lastAngle = lastAngle*1 + angle*1;
      textAlign(LEFT);
      rect(x-diameter-30,y-diameter/2 + 30*i,20,20);
      text(data[2+i],x-diameter-10,y-diameter/2 +30*i);
      text(data[3+i],x-diameter-8,y-diameter/2+20 +30*i);
    }   
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
  text("TopKeywordsTool - A tool to Understand the Field of Visualization",x,y-10);
  text("-  Task:  Present the top keywords of different period",x,y+20);
  text("-  Position: Each circle is located in the corresponding position (period/items - number of appearance)",x,y+40);
  text("   Area: The size of each circle is related to its frequency in a certain period",x,y+60);
  text("   Staturation/Color: The Staturation of each circle represents the frequency in a certain period.",x,y+80);
  text("-  Fisrt page: Overview of the keywords in different period",x,y+100);
  text("   Move the cursor to choose the period, then clicked to choose",x,y+120);
  text("-  The details have been showed. In the middle of the page: Present details information with hover. Such as the ranking",x,y+140) ;
  text("                        In the right side of the page: a Pie Graph to show the percentage of different conference",x,y+160);
  text("-                       In the bottom of the page: when the cursor hover over certain keyword, all the cercle with the same keyword turn to red",x,y+180);
  text("-  The buttons in the top of page are for choosing different visulazation module",x,y+200);
  text("-  When click the 'Top Keywords', it will go turn to another module. That module has already show in the assignement 5", x,y + 220);
}
let taustakuva;
let leipakuva;
let taustan_korkeus = 400;
let taustan_leveys = 800;

let lautan_leveys = 800;
let lautanY = 350;

var leipAlista = [];
var leipA_ajastin;
var elamia_jaljella = 1000;
var pelastetut_leivAt = 0;

function preload() {
  taustakuva = loadImage('https://igno.cc/opetus/kuvat/tausta.png');
  leipAkuva = loadImage('https://igno.cc/opetus/kuvat/cat.png');
}
function setup(){
  var canvas = createCanvas(taustan_leveys,taustan_korkeus);
  canvas.parent("leipA_peli");
  angleMode(DEGREES);
  //luo_leipiA();
}

  function AloitaPeli()
  {
    leipAlista = [];
    elamia_jaljella = 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
    pelastetut_leivAt = 0;
    clearTimeout(leipA_ajastin);
    loop();
    luo_leipiA();
  }

function draw(){
  image(taustakuva,0,0,taustan_leveys,taustan_korkeus);
  luo_lautta();

  leipAlista.forEach(function(leipA_olio,monesko) {
    leipA_olio.liikuta();

    if(leipA_olio.Ypo > taustan_korkeus)
    {
      leipAlista.splice(monesko,1);
      elamia_jaljella = elamia_jaljella -1;
    }

    if(leipA_olio.Xpo > taustan_leveys)
    {
      leipAlista.splice(monesko,1);
      pelastetut_leivAt = pelastetut_leivAt +1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
    }

  });
  textSize(40);
  textAlign(LEFT,TOP);
  text("Elämät: " + elamia_jaljella + "\npelastetut leivAt: " + pelastetut_leivAt,5,5);
  if(elamia_jaljella <= 0)
  GameOver();

}

function luo_lautta(){
  fill('#ffe6e6');
  rect(mouseX,taustan_korkeus -50,lautan_leveys,30,20,20,0,0);
}

function luo_leipiA()
{
  let uusi_leipA = new LeipA();
  leipAlista.unshift(uusi_leipA);
  timer = setTimeout(luo_leipiA);

}

class LeipA {
  constructor() {
    this.Xpo = 30;
    this.Ypo = 200;
    this.Xno = 2;
    this.Yno = -2;
    this.ko = 50;
    this.le = 50;
    this.ku = 0;

  }
  liikuta(){
    this.Xpo = this.Xpo + this.Xno;
    this.Yno = this.Yno + 0.05;

    //tähän tulee: Osuiko leipA lautaan ja APUA
    if(this.Ypo + this.ko / 2 > lautanY)
    {
      if(this.Xpo > mouseX && this.Xpo < mouseX + lautan_leveys)
      {
        this.Yno = -abs(this.Yno);
      }
    }

    this.Ypo = this.Ypo + this.Yno;


    this.ku = this.ku +10;
    push();
    translate(this.Xpo,this.Ypo);
    rotate(this.ku);
    imageMode(CENTER);
    image(leipAkuva,0,0,this.le,this.ko);
    pop();
  }
}

function GameOver()
{
  noLoop()
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", taustan_leveys/2,taustan_korkeus/2);
}

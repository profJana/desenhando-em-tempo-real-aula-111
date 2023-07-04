noseX=0;
noseY=0;
diferenca = 0;
pulsoDireito = 0;
pulsoEsquerdo = 0;

  function setup() {
  video = createCapture(VIDEO);
  video.size(550, 500);
  video.position(100,150);

  canvas = createCanvas(550, 550);
  canvas.position(700,150);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

}

function modelLoaded() {
  console.log('poseNet inicializou!');
}


function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    noseX = results[0].pose.nose.x - 100;
    noseY = results[0].pose.nose.y - 150;

    pulsoEsquerdo = results[0].pose.leftWrist.x;
    pulsoDireito = results[0].pose.rightWrist.x;
    diferenca = floor(pulsoEsquerdo - pulsoDireito);

  }
}

function draw() {
background('#969A97');
  frameRate(20)
  document.getElementById("square_side").innerHTML = "Largura e altura serão = " + diferenca +"px";
  fill('#F90093');
  stroke('#F90093');
  square(noseX, noseY, diferenca);
}

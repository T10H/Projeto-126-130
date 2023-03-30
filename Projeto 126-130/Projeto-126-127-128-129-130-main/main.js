song1= "";
song2= "";
scoreLeftWrist= 0;
scoreRightWrist= 0;
musicStatus= "";
leftWristY= "";
leftWristX= "";
rightWristY= "";
rightWristX= "";
function preload() {
     song1= loadSound("echo.mp3");
     song2= loadSound("jackpot sad girl.mp3");
}
function setup() {
     canvas= createCanvas(600, 500);
     canvas.center();
     video= createCapture(VIDEO);
     video.hide();
     poseNet= ml5.poseNet(video, modelLoaded);
     poseNet.on("pose", gotPoses);
}
 function modelLoaded() {
     console.log("pose net 👍");
}
function gotPoses(results) {
     if(results.length > 0) {
         console.log(results);
         scoreRightWrist= results[0].pose.keypoints[10].score;
         scoreLeftWrist= results[0].pose.keypoints[9].score;
         rightWristX= results[0].pose.rightWrist.x;
         rightWristY= results[0].pose.rightWrist.y;
         console.log("rightWristX= " + rightWristX + "rightWristY= " + rightWristY);
         leftWristX= results[0].pose.leftWrist.x;
         leftWristY= results[0].pose.leftWrist.y;
         console.log("leftWristX= " + leftWristX + "leftWristY= " + leftWristY);
     }
 }
function draw() {
     image(video, 0, 0, 600, 500);
     fill("#a600ff");
    stroke("#ff00f2");
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song1.isPlaying() == false) {
          song1.play();
          document.getElementById("playing").innerHTML= "Música tocando: Echo";
        }
    }
    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song2.isPlaying() == false) {
          song2.play();
          document.getElementById("playing").innerHTML= "Música tocando: Jackpot Sad Girl";
        }
    }
}

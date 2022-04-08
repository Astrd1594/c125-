song = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet model initialized');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log('left wrist score: ' + leftWristScore);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y
        console.log('Right wrist x: ' + rightWristX + ". Right wrist y:" + rightWristY);
        console.log('Left wrist x: ' + leftWristX + ". Left wrist y: " + leftWristY);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#DC143C');
    if(leftWristScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        leftWristYNumber = Number(leftWristY);
        remove_decimals = floor(leftWristYNumber);
        volume = remove_decimals / 500;
        document.getElementById('volumedisplay').innerHTML = 'Volume: ' + volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(volume);
    song.rate(1);
}
function stop(){
    song.stop();
}
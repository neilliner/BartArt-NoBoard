var ww, wh;
var x, z, pot, ping;

var chessFloor, floorScale, floorVector;
var rose, roseScale, roseRotation, rs;
var mouthClose, mouthCloseScale, mouthOpen, mouthOpenScale,ms;
var cloud, cloudScale, cloudX1, cloudX2, cloudX3;
var handLeft08, handLeft09, handLeft1, handLeft2, handLeft3, handLeft4, handleft5, handLeftFist, 
	handRight08, handRight09, handRight1, handRight2, handRight3, handRight4, handRight5, handRightFist, 
	handScale;
var h1x, h2x, h3x, h4x;
var northSign, southSign, signScale, northVector, southVector;
var crowLeft, crowRight, crowScale, crowLeftVector, crowRightVector;
var crowRange, crowLeftTheta = 0.0, crowRightTheta = 0.0;

var heart, heartScale, hs;
var bga;
var pastSecond;
var secCounter = 0;

var hand1 = 1, hand2 = 1, hand3 = 1, hand4 = 1;
var cloudThetaY1 = 0.0, cloudThetaY2 = 0.0, cloudThetaY3 = 0.0, cloudRange;
var shouldFlip = false;
var shouldFly = false;
var shouldZoom = false;
var shouldShowClock = false;

var sstw1, sstw2;
var nstw1, nstw2;
var hTween1, hTween2;
var signIsShowing = false;


var north = {}, south = {};
// socket will listen for the data from the hardware components and twitter
var socket = io.connect('//localhost:3000');

/*
socket.on('data', function(data) {
	
	if(data.val.x){
		shouldFlip = true;
		x = data.val.x;
		secCounter = 0;
    	console.log("X = " + x);
	}
	if(data.val.z){
		z = data.val.z;
		if(z >= 120){
			//shouldFlip = false;
		}
		if(z > 120){
			z = 120;
		}
		shouldZoom = true;
		//console.log("Z = " + z);
	}
	// if(data.val.ping){
	// 	ping = data.val.ping;
	// 	if(ping > 60){
	// 		shouldFlip = false;
	// 	}

	// 	console.log("Ping = " + ping);
	// }
});
*/

socket.on('north', function(data) {
	north = data.est;
	//console.log(north);
});

socket.on('south', function(data) {
	south = data.est;
	//console.log(south);
});

function preload(){

    // load all images here
    chessFloor = loadImage("images/chess-floor.png");
    rose = loadImage("images/black-rose.png");
    mouthClose = loadImage("images/mouth-close.png");
    mouthOpen = loadImage("images/mouth-open.png");
    cloud =  loadImage("images/red-cloud.png");
    handLeft08 = loadImage("images/hand-left-008.png");
    handLeft09 = loadImage("images/hand-left-009.png");
    handLeft1 = loadImage("images/hand-left-01.png");
    handLeft2 = loadImage("images/hand-left-02.png");
    handLeft3 = loadImage("images/hand-left-03.png");
    handLeft4 = loadImage("images/hand-left-04.png");
    handLeft5 = loadImage("images/hand-left-05.png");
    handRight08 = loadImage("images/hand-right-008.png");
    handRight09 = loadImage("images/hand-right-009.png");
    handRight1 = loadImage("images/hand-right-01.png");
    handRight2 = loadImage("images/hand-right-02.png");
    handRight3 = loadImage("images/hand-right-03.png");
    handRight4 = loadImage("images/hand-right-04.png");
    handRight5 = loadImage("images/hand-right-05.png");
    handLeftFist = loadImage("images/hand-left-fist.png");
    handRightFist = loadImage("images/hand-right-fist.png");
    northSign = loadImage("images/north.png");
    southSign = loadImage("images/south.png");
    crowLeft = loadImage("images/crow-left.png");
    crowRight = loadImage("images/crow-right.png");
    heart = loadImage("images/heart.png");

}

function setup(){
	ww = windowWidth;
	wh = windowHeight;

	floorScale = 1;
	roseScale = 2;
	mouthCloseScale = 3;
	mouthOpenScale = 3;
	cloudScale = 1.75;
	handScale = 2.75;
	signScale = 2;
	crowScale = 2;
	heartScale = 2;

	roseRotation = 0;
	cloudRange = 15.0;
	crowRange = 80.0

	//northX = northSign.width/signScale;
	//southX = -southSign.width/signScale;
    createCanvas(ww,wh);

    floorVector = createVector(0,0);
    crowLeftVector = createVector(ww,0);
    crowRightVector = createVector(0,0);
    cloudX1 = cloud.width/(cloudScale*1.15);
    cloudX2 = 0;
    cloudX3 = -cloud.width/(cloudScale*1.15);
    h1x = 0;
    h2x = handLeft1.width/(handScale*1.25);
    h3x = 0;
    h4x = -handRight1.width/(handScale*1.25);

    rx = 1;
    ms = 1;
    hs = {s:1};

    bga = 0;


    southVector = createVector(-southSign.width/signScale,southSign.height/(signScale*3));
    northVector = createVector(ww,northSign.height/(signScale*3));

    sstw1 = new TWEEN.Tween( southVector );
    sstw1.to({x:0,y:southSign.height/(signScale*3)}, 2000).onComplete(function(){
    	sstw2.start();
    });
    sstw1.easing( TWEEN.Easing.Exponential.Out );
    sstw2 = new TWEEN.Tween( southVector );
    sstw2.to({x:-southSign.width/signScale,y:southSign.height/(signScale*3)}, 2000).onComplete(function(){
    	// do when finish tween
    	//sstw1.start()
    	signIsShowing = false;
    });
    sstw2.easing( TWEEN.Easing.Exponential.In );

    nstw1 = new TWEEN.Tween( northVector );
    nstw1.to({x:ww - northSign.width/signScale,y:northSign.height/(signScale*3)}, 2000).onComplete(function(){
    	nstw2.start();
    });
    nstw1.easing( TWEEN.Easing.Exponential.Out );
    nstw2 = new TWEEN.Tween( northVector );
    nstw2.to({x:ww,y:northSign.height/(signScale*3)}, 2000).onComplete(function(){
    	// do when finish tween
    	//nstw1.start();
    	signIsShowing = false;
    });
    nstw2.easing( TWEEN.Easing.Exponential.In );

    hTween1 = new TWEEN.Tween( hs );
    hTween1.to({s:1.15},250).onComplete(function(){
    	hTween2.start();
    });
    hTween1.easing( TWEEN.Easing.Elastic.InOut);
    
    hTween2 = new TWEEN.Tween( hs );
    hTween2.to({s:1},750).onComplete(function(){
    	hTween1.start();
    });
    hTween2.easing( TWEEN.Easing.Elastic.InOut);
    hTween1.start();

    //sstw1.start();
	//nstw1.start();
}

function randomVector() {
        return createVector(random(width), random(height));
    }

function draw(){
    background(0);

    if(shouldZoom){
      z = mouseY;
    	var maxRange = wh;
    	floorVector.y = -map(z,0,maxRange,-chessFloor.height/floorScale,0);
    	cloudX1 = map(z,0,maxRange,ww-cloud.width/(cloudScale*1.15)/2,cloud.width/(cloudScale*1.15));
    	cloudX2 = map(z,0,maxRange,ww-cloud.width/(cloudScale*1.15)/2,0);
    	cloudX3 = map(z,0,maxRange,-cloud.width/(cloudScale*1.15)*2,-cloud.width/(cloudScale*1.15));
    	h1x = map(z,0,maxRange,-(handLeft1.width/handScale*1.25),0);
    	h2x = map(z,0,maxRange,-handLeft1.width/handScale,handLeft1.width/(handScale*1.25));
    	h3x = map(z,0,maxRange,handRight1.width/handScale*1.25,0);
    	h4x = map(z,0,maxRange,handRight1.width/handScale*1.25,-handRight1.width/(handScale*1.25));

    	rs = map(z,0,maxRange,20,1);
    	ms = map(z,0,maxRange,20,1);

    	bga = map(z,0,maxRange,255,0);
    }
    //var mapY = map(mouseY,0,wh,0,1000);
 	
    imageCenterBottom(chessFloor,floorVector.x,floorVector.y,floorScale);
   	//floorVector.y = -map(mouseY,0,wh,-chessFloor.height/floorScale,0);
   	floorVector.y -= 1;
   	//if(floorVector.y > floorVector.height/floorScale) floorVector.y > floorVector.height/floorScale;
   	if(floorVector.y < 0) floorVector.y = 0;

   	
   	imageCenterForRotate(rose,0,0,roseScale,roseRotation,rs);
   	roseRotation += 0.1;
   	rs -=0.1;
   	if(rs < 1){
   		rs = 1;
   	}
   	if(ms < 3){
   		imageCenterScale(mouthClose,0,0,mouthCloseScale,ms);
   	}
   	else{
   		//filter(BLUR,5);
   		imageCenterScale(mouthOpen,0,0,mouthOpenScale,ms);
   	}
   	ms -=0.11;
   	if(ms < 1){
   		ms = 1;
   	}

   	// cloud movement ----------
   	cloudThetaY1 += 1; //random(0.5,1.5);
   	cloudThetaY2 += 1; //random(0.5,1.5);
   	cloudThetaY3 += 1; //random(0.5,1.5);

   	var cloudY1 = sin(cloudThetaY1)*cloudRange;
   	var cloudY2 = cos(cloudThetaY2)*cloudRange;
   	var cloudY3 = sin(cloudThetaY3)*cloudRange;

    imageCenterTop(cloud,cloudX1,cloudY1,cloudScale);
    imageCenterTop(cloud,cloudX2,cloudY2,cloudScale);
    imageCenterTop(cloud,cloudX3,cloudY3,cloudScale);

    cloudX3 += 1;
    cloudX2 -= 2;
    cloudX1 -= 1;
    if(cloudX3 > -cloud.width/(cloudScale*1.15)){
    	cloudX3 = -cloud.width/(cloudScale*1.15);
    }
    if(cloudX2 < 0){
    	cloudX2 = 0;
    }
    if(cloudX1 < cloud.width/(cloudScale*1.15)){
    	cloudX1 = cloud.width/(cloudScale*1.15);
    }
    // --------------------------

    // hands open and close randomly ----------
    var shouldRandom = secondChanged();
    var h1,h2,h3,h4;
    
    h1 = handLeft1;
    h2 = handLeft1;
    h3 = handRight1;
    h4 = handRight1;

    if(shouldRandom){	    
	    hand1 = random(0,1);
	    hand2 = random(0,1);
	    hand3 = random(0,1);
	    hand4 = random(0,1);
	}

	if(shouldFlip){

		if(shouldRandom){
			secCounter++;
			if(secCounter >= 5){
				shouldFlip = false;
				secCounter = 0;
			}
			console.log(secCounter);
		}
		mapX = map(x,0,240,0,ww);
		if(mapX < ww/2 && mapX > (ww/2) - ((ww/2)/5)*1){
			h1 = handLeft09;
			h2 = handLeft09;
			h3 = handRight2;
			h4 = handRight2;
		}
		else if(mapX < ww/2 && mapX > (ww/2) - ((ww/2)/5)*2){
			h1 = handLeft09;
			h2 = handLeft09;
			h3 = handRight3;
			h4 = handRight3;
		}
		else if(mapX < ww/2 && mapX > (ww/2) - ((ww/2)/5)*3){
			h1 = handLeft08;
			h2 = handLeft08;
			h3 = handRight4;
			h4 = handRight4;
		}
		else if(mapX < ww/2 && mapX > (ww/2) - ((ww/2)/5)*4){
			h1 = handLeft08;
			h2 = handLeft08;
			h3 = handRight5;
			h4 = handRight5;
		}
		else if(mapX > ww/2 && mapX < (ww/2) + ((ww/2)/5)*1){
			h1 = handLeft2;
			h2 = handLeft2;
			h3 = handRight09;
			h4 = handRight09;			
		}
		else if(mapX > ww/2 && mapX < (ww/2) + ((ww/2)/5)*2){
			h1 = handLeft3;
			h2 = handLeft3;
			h3 = handRight09;
			h4 = handRight09;			
		}
		else if(mapX > ww/2 && mapX < (ww/2) + ((ww/2)/5)*3){
			h1 = handLeft4;
			h2 = handLeft4;
			h3 = handRight08;
			h4 = handRight08;			
		}
		else if(mapX > ww/2 && mapX < (ww/2) + ((ww/2)/5)*4){
			h1 = handLeft5;
			h2 = handLeft5;
			h3 = handRight08;
			h4 = handRight08;			
		}
	}
	else{
	    if(hand1 < 0.15) h1 = handLeftFist;
	    else h1 = handLeft1;
	    if(hand2 < 0.15) h2 = handLeftFist;
	    else h2 = handLeft1;
	    if(hand3 < 0.15) h3 = handRightFist;
	    else h3 = handRight1;
	    if(hand4 < 0.15) h4 = handRightFist;
	    else h4 = handRight1;
	}

    imageCornerLeft(h1,h1x,bottom(h1,handScale),handScale);
    imageCornerRight(h3,h3x,bottom(h3,handScale),handScale);
    
    imageCornerLeft(h2,h2x,bottom(h2,handScale),handScale);
    imageCornerRight(h4,h4x,bottom(h4,handScale),handScale);

    h1x += 1;
    h2x += 1;
    h3x -= 1;
    h4x -= 1;
    if(h1x > 0){
    	h1x = 0;
    }
    if(h2x > handLeft1.width/(handScale*1.25)){
    	h2x = handLeft1.width/(handScale*1.25);
    }
    if(h3x < 0){
    	h3x = 0;
    }
    if(h4x < -handRight1.width/(handScale*1.25)){
    	h4x = -handRight1.width/(handScale*1.25);
    }

    // ----------------------------------------
    
    // hidden scene ----------------------------
    background(0,bga);

    if(bga > 200) shouldShowClock = true;
    else shouldShowClock = false;

    if(shouldShowClock){
    	imageCenterScale(heart,0,0,heartScale,hs.s);
    	var d = new Date();
    	var hrs = d.getHours();
		var min = d.getMinutes();
		var	sec = d.getSeconds();
		var delim;

		if(isSameSecond(sec)){
			
			delim = " : ";
		
		}else{
			delim = "   ";		
		}
    	var time = hrs + delim + min + delim + sec;
    	fill(255);
		textFont('Futura-light-Condensed');
		textSize(60);
		textAlign(CENTER);
		text(time,ww/2,(wh/2)/2.5);
		isSameSecond(sec);
        if(isEmpty(north) == false  && isEmpty(south) == false){
            var textSouth = "Next train to " + south.destination + " in " + south.minutes + " minutes.";
            var textNorth = " And next train to " + north.destination + " in " + north.minutes + " minutes.";
    		textSize(30);
    		text(textSouth + textNorth,ww/2,wh-(wh/6));
            //text(textNorth,ww/2,wh-(wh/10));
        }
    }
    // -----------------------------------------

    // handle crow flying -----------------------------------------------
    checkForBeginFly();

    imageCornerLeft(southSign,southVector.x,southVector.y,signScale);
    imageCornerLeft(northSign,northVector.x,northVector.y,signScale);

    if(north.minutes <= 3 || south.minutes <= 3 ){
    	shouldFly = true;
    	southVector.x = -southSign.width/signScale;
    	northVector.x = ww;
    	
	}
	else{
		shouldFly = false;
	}

    var northStop = ww + crowRight.width/crowScale;
	var southStop = 0 - crowLeft.width/crowScale;

    if(shouldFly){
   		
   		if(signIsShowing == false){
   			beginFly = true;
   			signIsShowing = true;
   		}

     	if(south.minutes <= 3){
	     	crowFly(crowLeft,crowLeftVector.x,crowLeftVector.y,crowScale,30,south.destination,south.minutes);
	     	crowLeftTheta += 1;
	   		var crowLeftY = sin(crowLeftTheta)*crowRange;
	     	crowLeftVector.x -= 5;
	     	crowLeftVector.y = crowLeftY;
     	}
     	if(north.minutes <= 3){
	     	crowFly(crowRight,crowRightVector.x,crowRightVector.y,crowScale,-30,north.destination,north.minutes);
	     	crowRightTheta += 1;
	     	var crowRightY = sin(crowRightTheta)*crowRange;
	     	crowRightVector.x +=5;
	     	crowRightVector.y = crowRightY;
     	}
    }
    if(crowLeftVector.x <= southStop){
     	shouldFly = false;
     	crowLeftVector.x = ww;
     	crowLeftVector.y = 0;
     	//console.log("STOP!!!");
    }
    if(crowRightVector.x >= northStop){
     	shouldFly = false;
     	crowRightVector.x = 0;
     	crowRightVector.y = 0;
     	//console.log("STOP!!!");
    }

    // ------------------------------------------------------------------

    TWEEN.update();
    //shouldZoom = false;
	
}

function windowResized(){
	ww = windowWidth;
	wh = windowHeight;
  	resizeCanvas(ww, wh);
}

function mouseMoved(){
	shouldFlip = true;
	shouldZoom = true;
}

function mousePressed(){
	//shouldFly = true;
	//clicked = true;
	//hTween1.start();
	console.log("pressed");
}

// ********** custom functions **********

function right(img,sc){
	return ww-img.width/sc;
}

function bottom(img,sc){
	return wh-img.height/sc;
}

function bottomCenter(img,sc){
	return wh-(img.height/sc)/2;
}

function imageCenterScale(img,x,y,sc){
	imageMode(CENTER);
	image(img,0,0,img.width,img.height,(ww/2)+x,(wh/2)+y,img.width/sc,img.height/sc);
}

function imageCenterScale(img,x,y,sc,s){
	push();
		translate((ww/2)+x,(wh/2)+y)
		imageMode(CENTER);
		scale(s);
		image(img,0,0,img.width,img.height,0,0,img.width/sc,img.height/sc);
	pop();
}

function imageCenterTop(img,x,y,sc){
	imageMode(CENTER);
	image(img,0,0,img.width,img.height,(ww/2)+x,((img.height/sc)/2)+y,img.width/sc,img.height/sc);
}

function imageCenterBottom(img,x,y,sc){
	imageMode(CENTER);
	image(img,0,0,img.width,img.height,(ww/2)+x,wh-((img.height/sc)/2)+y,img.width/sc,img.height/sc);
}

function imageCornerLeft(img,x,y,sc){
	imageMode(CORNER);
	image(img,0,0,img.width,img.height,x,y,img.width/sc,img.height/sc);
}

function imageCornerRight(img,x,y,sc){
	imageMode(CORNER);
	image(img,0,0,img.width,img.height,right(img,sc)+x,y,img.width/sc,img.height/sc);
}

function imageCenterForRotate(img,x,y,sc,r,s){
	push();
    	translate(ww/2,wh/2);
    	angleMode(DEGREES);
    	rotate(r);
    	scale(s);
		imageMode(CENTER);
		image(img,0,0,img.width,img.height,x,y,img.width/sc,img.height/sc);
	pop();
}

function crowFly(img,x,y,sc,r,t,m){
	var size = 50;
	if(t.length > 15 && t.length <= 20){
		size = 35;
	}
	else if(t.length > 20 && t.length <= 30){
		size = 20;
	}
	else if(t.length > 30){
		size = 10;
	}
	push();
    	translate(x,((img.height/sc)/2)+y);
    	angleMode(DEGREES);   	
		imageMode(CENTER);
		rotate(r);
		image(img,0,0,img.width,img.height,0,y,img.width/sc,img.height/sc);
		fill(139,137,74);
		textFont('Futura-Medium-Condensed');
		textSize(size);
		textAlign(CENTER);
		text(t,0,y+135);
		fill(255);
		textSize(80)
		text(m,0,y-20);
	pop();
}

var beginFly = false;
function checkForBeginFly(){
	if(beginFly){
		sstw1.start();
		nstw1.start();
		beginFly = false;
		//console.log("beginFly");
	}
}

var secChanged = 0;
function secondChanged(){	
	var sec = Math.floor(millis()/1000);
    if(sec > secChanged){
     	secChanged = sec;
     	//console.log(secChanged);
     	return true;
    }else{
    	return false;
    }
}

function isSameSecond(s){
	if(pastSecond != s){
		//console.log("tick!");
		pastSecond = s;
		return false;
	}else{
		//console.log("same!");
		return true;
	}
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

// test function
// function doThisForMillis(f,mil){
// 	var done = millis() + mil;
// 	while(millis() < done){
// 		f();
// 	}
// }

// var done;
// var isTrue = true;
// function trueForMillis(mil){
// 	if(isTrue){
// 		done = millis() + mil;
// 		isTrue = false;
// 	}
// 	if(millis() < done){
// 		console.log(done);
// 		return true;
// 	}
// 	isTrue = true;
// 	return false;
// }
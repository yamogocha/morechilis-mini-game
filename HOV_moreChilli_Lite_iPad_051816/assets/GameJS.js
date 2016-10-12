/********** GAMEPLAY SPECIFIC JAVASCRIPT **********/
//This function resets the entire game and includes everything that needs to be reset, including updating the numbers. This will be different for each game
var restartGame = function() {
	totalSpin = 0;
	spinClickable = true;
	mNectarGame.totalNum = 5000000;
	mNectarGame.betNum = 12000;
	mNectarGame.winNum = 0;
	mNectarGame.bigWin=0;
	mNectarGame.animationTime = 3000;
	mNectarGame.animationSteps = 50;
	updateNum();
	slightOfHand(spin1);
	clearTimeout(mNectarGame.bigwinscreen);
	clearTimeout(mNectarGame.endscreen);
	document.getElementById("effect1").style.display = "none";
	document.getElementById("bigWin").style.display = "none";
	document.getElementById("spin").className = "spin";
	document.getElementById("outro-container").style.display = 'none';
}

// CALL THIS WHEN THE USER FINISHES PLAYING YOUR BUILD
// this sends the user to the end of the game if the retry is clicked and the dl is not clicked
var finishGameplay = function() {
	if (typeof gotoEndScreen != 'undefined') {
		//this is a function in the engineering templates and will only work once this project is uploaded to the UI
		gotoEndScreen();
		//report that the user has finished the game
		if (typeof mn != 'undefined'){mn("play","100%");}
	}
	else {
		displayInstallScreen();
	}
}

/********** EXAMPLE JAVASCRIPT **********/


var spin1 = [
				[9,16,11,4,4,3,2,8,5,8,9,3,5,5,5,1,11,9], //reel1
				[4,11,8,9,6,7,2,8,5,3,5,3,5,10,11,2,3,11],  //reel2
				[5,8,11,2,6,5,2,8,5,6,9,10,5,5,1,11,13,12], //reel3
				[8,10,3,8,3,7,2,8,10,5,9,3,5,10,2,12,1,3], //reel4
				[2,3,14,2,9,7,2,5,5,10,9,3,5,5,12,5,2,4] //reel5
			];

var spin2 = [
				[8,3,5,13,9,7,2,7,7,5,9,3,5,2,9,16,11,4],
				[2,7,11,2,3,7,2,8,10,2,9,3,5,6,4,11,8,9],
				[4,13,4,3,4,7,10,8,5,8,9,3,5,8,5,8,11,2],
				[11,14,5,9,5,7,2,8,4,10,2,3,5,1,8,10,3,8],
				[3,10,6,14,6,7,10,8,7,4,9,3,5,5,2,3,14,2]
			];

var spin3 = [
				[9,4,9,15,2,7,2,8,2,5,10,3,5,3,8,3,5,13],
				[2,15,7,13,2,7,10,8,7,8,9,3,5,4,2,7,11,2],
				[3,14,9,15,5,6,2,8,3,8,9,3,5,2,4,13,4,3],
				[6,16,9,6,3,7,2,8,2,3,10,3,5,7,11,14,5,9],
				[2,5,3,15,6,2,10,8,2,6,9,3,5,2,3,10,6,14]
			];

var spin4 = [
				[3,11,11,11,5,7,2,8,6,6,9,3,5,3,9,4,9,15],
				[1,7,4,1,4,1,10,8,7,2,9,3,5,6,2,15,7,13],
				[4,11,6,11,3,7,2,8,8,4,9,8,5,5,3,14,9,15],
				[6,2,13,6,3,10,2,8,3,10,10,3,5,2,6,16,9,6],
				[1,11,11,11,6,7,2,8,3,6,9,10,6,7,2,5,3,15]
			];


var totalSpin = 0;
var spinClickable = true;
var mNectarGame = {};
	mNectarGame.firstwinscreen;
	mNectarGame.bigwinscreen;
	mNectarGame.endscreen;
	mNectarGame.betNum = 12000;
	mNectarGame.winNum = 0;
	mNectarGame.bigWin=0;
	mNectarGame.totalNum = 5000000;
	mNectarGame.animationTime = 3000;
	mNectarGame.animationSteps = 50;


function delimitNumbers(str) {
return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
  return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
});
}

var updateNum = function(){
	var bet = delimitNumbers(mNectarGame.betNum);
	document.getElementById("betNum").innerHTML = bet;
	var won = delimitNumbers(mNectarGame.winNum);
	document.getElementById("winNum").innerHTML = won;
	var totalNum = delimitNumbers(mNectarGame.totalNum);
	document.getElementById("totalNum").innerHTML = totalNum;
	var bigWin = delimitNumbers(mNectarGame.winNum);
	document.getElementById("Point").innerHTML = bigWin;
}
updateNum();

function betIncrease(){
	document.getElementById("betDe").style.pointerEvents="auto";
	document.getElementById("betIn").className += " betclick";
	mNectarGame.betNum *=6
	var bet = delimitNumbers(mNectarGame.betNum);
	document.getElementById('betNum').innerHTML=bet
	setTimeout(function(){
		document.getElementById("betIn").className = "betIn";
	}, 100)
	
	if(mNectarGame.betNum===432000){
		document.getElementById("betIn").style.pointerEvents="none";
	}
}

document.getElementById("betDe").style.pointerEvents="none";
function betDecrease(){
	document.getElementById("betIn").style.pointerEvents="auto";
	document.getElementById("betDe").className += " betclick";
	mNectarGame.betNum /=6
	var bet = delimitNumbers(mNectarGame.betNum);
	document.getElementById('betNum').innerHTML=bet
	setTimeout(function(){
		document.getElementById("betDe").className = "betDe";
	}, 100)
	if(mNectarGame.betNum===12000){
		document.getElementById("betDe").style.pointerEvents="none";
	}
}

var animateNum = function(winValues){
	//time per step
	var duration = mNectarGame.animationTime / mNectarGame.animationSteps;
	// value of each step
	var singleAmount = winValues / mNectarGame.animationSteps;

	incrementNum(duration, singleAmount, winValues);
}

var incrementNum = function(duration, singleAmount, winValues){
	mNectarGame.bigWin += singleAmount;
	mNectarGame.winNum += singleAmount;
	mNectarGame.totalNum += singleAmount;
	updateNum();
	setTimeout(function(){
		if (mNectarGame.winNum != winValues){
			incrementNum(duration, singleAmount, winValues);
		}
	}, duration);
}


var replaceImages = function (reelInfo){
	for (var r = 1; r <= 5; r++) {
		var currentReel = reelInfo[r-1];
		for (var e = 1 ; e <=18 ; e++) {
			var element = "reel" + r + "-" + e;  
			document.getElementById(element).className = "image" + currentReel[e-1];
		};
	};
}
replaceImages(spin1);

//set top px
for (var r = 1; r <= 5; r++) {
	for (var e = 1 ; e <=18 ; e++) {
		var element = "reel" + r + "-" + e;  
		// var currentReel
		document.getElementById(element).style.top =(e-1)*152 + "px" ;
	};
};

document.getElementById("spin").className = "spin";
var spin = function (){
	totalSpin++;
	setTimeout(function(){
		document.getElementById("spin").className = " "
	 }, 150);
	mNectarGame.winNum=0;
	mNectarGame.totalNum -= mNectarGame.betNum;
	updateNum();

	document.getElementById("reel1").className = "reel-spin";
	setTimeout(function(){
		document.getElementById("reel2").className = "reel-spin";
	 }, 200);
	setTimeout(function(){
		document.getElementById("reel3").className = "reel-spin";
	 }, 400);
	setTimeout(function(){
		document.getElementById("reel4").className = "reel-spin";
	 }, 600);
	setTimeout(function(){
		document.getElementById("reel5").className = "reel-spin";
	 }, 800);

	setTimeout(function(){
		if(totalSpin===1){
		 	slightOfHand(spin2);
		 	document.getElementById("reel1-16").className += " manSP";
			document.getElementById("reel1-17").className += " blinkimage";
			document.getElementById("reel2-16").className += " blinkimage";
			document.getElementById("reel3-17").className += " blinkimage";
			document.getElementById("effect1").style.display="block";

		 	var winAmount = mNectarGame.betNum*1.5;
		 	mNectarGame.totalNum +=winAmount;
		 	animateNum(winAmount);

			setTimeout(function(){
				spinClickable=true;
				clearEffect1();
				document.getElementById("spin").className = "spin";
		 	}, 8000);	
		 }
	 }, 1800);

	setTimeout(function(){
		if(totalSpin===2){
		 	slightOfHand(spin3);
		 	
			setTimeout(function(){
				spinClickable=true;
				document.getElementById("spin").className = "spin";
			}, 1000);
		}
	}, 1800);

	setTimeout(function(){
		if (totalSpin===3){
		 	slightOfHand(spin4);
		 	document.getElementById("reel1-18").className += " chilliSP";
		 	document.getElementById("reel2-16").className += " chilliSP";
			document.getElementById("reel3-18").className += " chilliSP";
			document.getElementById("reel4-16").className += " manSP";
			document.getElementById("reel5-18").className += " chilliSP";

		 	mNectarGame.bigwinscreen=setTimeout(function(){
					document.getElementById("bigWin").style.display = "block";
			 		var winAmount = mNectarGame.betNum*4.5;
			 		mNectarGame.totalNum +=winAmount;
			 		animateNum(winAmount);
		    }, 800);
			 	
			mNectarGame.endscreen=setTimeout(function(){
				if (typeof gotoEndScreen != 'undefined') {
					gotoEndScreen();
					if(typeof mn != 'undefined'){mn("play","100%");}
				}
				else {
					displayInstallScreen();
				}
			}, 10000);
		}
	}, 1800);

	if (totalSpin === 1){
		if (typeof mn != 'undefined'){mn("play","25%");}
	}

	if (totalSpin === 2){
		if (typeof mn != 'undefined'){mn("play","50%");}
	}
	
	if (totalSpin === 3){
		if (typeof mn != 'undefined'){mn("play","75%");}
	}
}

var slightOfHand = function(reelInfo){

	document.getElementById("reel1").className = "reel-top";
	document.getElementById("reel2").className = "reel-top";
	document.getElementById("reel3").className = "reel-top";
	document.getElementById("reel4").className = "reel-top";
	document.getElementById("reel5").className = "reel-top";
	replaceImages(reelInfo);
}

var clickSpin = function(){
	if(spinClickable===true){
		spin();
		spinClickable=false;
	}
}

var clearEffect1 = function(){
 	document.getElementById("reel1-16").className = "image16";
	document.getElementById("reel1-17").className = "image11";
	document.getElementById("reel2-16").className = "image11";
	document.getElementById("reel3-17").className = "image11";
	document.getElementById("effect1").style.display="none";
}

// var clearEffect2 = function(){
//  	document.getElementById("reel1-16").className = "image11";
//  	document.getElementById("reel1-17").className = "image11";
// 	document.getElementById("reel1-18").className = "image11";
// 	document.getElementById("reel3-16").className = "image11";
// 	document.getElementById("reel3-18").className = "image11";
// 	document.getElementById("effect2").style.display="none";
// }


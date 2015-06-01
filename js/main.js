var kc=0;
var X_MAX = 800;
var Y_MAX = 600;

var P_EXP_CHICKEN=20;
var P_EXP_SPACECRAFT=50;
var SPEED_CHICKEN=2;
var SPEED_SPACECRAFT=3;
var SPEED_BULLET=3;
var CHICKEN_FLAG=0;
var SPACECRAFT_FLAG=0;

var BULLET_FLAG=0;
var kc;
var BLOOD=10;
var bum_img=[];
var bullet_img=null;
var chicken_img=null;
var egg_img=null;
var spacecraft_img=null;
var spacecraft_img_left=null;
var spacecraft_img_right=null;
var HUONG=0;
var BUM_X=0;
var BUM_Y=0;

var EGG_FLAG=0;
var P_EXP_EGG=50;
var GAMEOVER=0;
var score=0;



window.onload=function()
{
	waitload();
}

function waitload () {
	bullet_img = new Image();
	bullet_img.src='Images/bullet.png';
	
	chicken_img = new Image();
	chicken_img.src='Images/chicken.png';
	
	egg_img= new Image();
	egg_img.src="Images/egg.png"
	
	spacecraft_img=new Image();
	spacecraft_img.src="Images/Spacecraft.png";

	spacecraft_img_left=new Image();
	spacecraft_img_left.src="Images/turn_left.png";	

	spacecraft_img_right=new Image();
	spacecraft_img_right.src="Images/turn_right.png";
	
	bum_img[0]= new Image();
	bum_img[0].src='Images/bum.png';

	bum_img[1]= new Image();
	bum_img[1].src='Images/bum1.png';
	
	bum_img[2]= new Image();
	bum_img[2].src='Images/bum2.png';
	
	bum_img[3]= new Image();
	bum_img[3].src='Images/bum3.png';


	bum_img[4]= new Image();
	bum_img[4].src='Images/bum4.png';

	bum_img[5]= new Image();
	bum_img[5].src='Images/bum5.png';

	bum_img[5].addEventListener('load', main_game);
}
	
function main_game()
		{
			var c=document.getElementById('gameboard');
			var ctx=c.getContext("2d");	
			var _chicken=new chicken_obj(400,40);
			var _spacecraft=new spacecraft_obj(400,500);
			_spacecraft.show();
			document.onkeydown= function(e){
				kc=e.keyCode;
			}

			animate();
			function animate()
			{
				frames();
				if(GAMEOVER==0)
				{

					reqAnimFrame(animate);		
				}
				
				_chicken.move();
				if(kc==37||kc==39)
				{
					HUONG=kc;
				}
				if(HUONG==37){
					_spacecraft.move_left();	
				}
				else if(HUONG==39)
				{
					_spacecraft.move_right();
				}
				if(kc==38)
				{

					
						_spacecraft.fire();
					kc=null;
				}
				
			}

			function bullet_obj (x,y) {
				this.x=x+33;
				this.y=y-30;
				this.show=function () {
					
					ctx.drawImage(bullet_img,this.x,this.y,10,37);		
				}
				this.hide=function  () {
					
					ctx.clearRect(this.x,this.y,10,37);

				}
				this.move=function  () {
					if(Math.sqrt(Math.pow(this.x+5-_chicken.x-25,2)+Math.pow(this.y+18-_chicken.y-55,2))< P_EXP_CHICKEN)
					{
						console.log('da xoa bullet');
						console.log(this.x);
						this.hide();
						BULLET_FLAG=1;

						_chicken.dead();
					}
					else
					{
						this.hide();
						this.y-=SPEED_BULLET;
						this.show();
					}	
					
				}
			}

			function spacecraft_obj (x,y) {
				this.x=x;
				this.y=y;
				var i=0;
				this.show=function () {
					ctx.drawImage(spacecraft_img,this.x,this.y);
					i++;
					console.log( "left "+i);
						if(i==60){
						_chicken.born();
						i=0;	
						}
				}
				this.show_left=function(){
					ctx.drawImage(spacecraft_img_left,this.x,this.y);
					
					i++;
					console.log( "left "+i);
						if(i==60){
						_chicken.born();
						i=0;	
						}
						
					
				}
				this.show_right=function(){
					ctx.drawImage(spacecraft_img_right,this.x,this.y);
					
					i++;
					console.log( "right "+i);

						if(i==60){
						_chicken.born();
						i=0;	
						}
				}
				this.hide=function  () {
					ctx.clearRect(this.x,this.y,80,105);
	
				}
 
				this.move_left=function () {
						if(this.x>-20)
						{

							this.hide();
							this.x-=SPEED_SPACECRAFT;
							this.show_left();
						}
					}
				this.move_right=function(){
						if(this.x<X_MAX-60)
						{

							this.hide();
							this.x+=SPEED_SPACECRAFT;
							this.show_right();
						}
				}
				
				this.dead=function  () {
					console.log('ga da chet');
					this.hide();
					GAMEOVER=1;
					bum_obj(this.x, this.y);


					
				}
				this.fire=function  () {



					var _bullet=new bullet_obj(this.x,this.y);
					var _spacecraft_fire_timing=setInterval(function(){
						_bullet.move();
						if (_bullet.y<-105||BULLET_FLAG==1)
						{	_bullet.hide();
							clearInterval(_spacecraft_fire_timing);

						}
					},2);
					BULLET_FLAG=0;

				}
				this.injured=function()
				{

				}
			}
			function chicken_obj (x,y) {
				this.x=x;
				this.y=y;
				this.show=function () {
					ctx.drawImage(chicken_img,this.x,this.y);		

				}
				this.hide=function  () {
					ctx.beginPath();
					ctx.clearRect(this.x,this.y,50,54);
				}
				this.move=function  () {
					
				
						_chicken.hide();

						if(_chicken.x<=0||_chicken.x>=X_MAX -50) {
							SPEED_CHICKEN=-SPEED_CHICKEN;
						}
						_chicken.x+=SPEED_CHICKEN;
						_chicken.show();    
				}
				this.dead=function  () {
					console.log('ga da chet');
					// this.hide();
					bum_obj(this.x, this.y);

					this.x=10;
					score++;
					document.getElementById('score').innerHTML=score;
				}
				this.born=function  () {
						var	_egg= new egg_obj(this.x, this.y)
			
						var chicken_born_timing=setInterval(function(){

							_egg.move();
							if(_egg.y>Y_MAX+50){
								clearInterval(chicken_born_timing);
								console.log('da xoa trung'+ _egg.y)
							}
							if(Math.sqrt(Math.pow(_egg.x+15-_spacecraft.x-35,2)+Math.pow(_egg.y+18-_spacecraft.y-55,2))< P_EXP_SPACECRAFT)
							{
								clearInterval(chicken_born_timing);
								_egg.hide();
								_spacecraft.dead();
								setTimeout(function(){
									ctx.clearRect(0,0,800,600);


									alert("GAMEOVER")
									},6000);

							}
						},2);
						
				}
			}
			
			function egg_obj (x,y) {
				this.x=x;
				this.y=y;
				var delta_x=(_spacecraft.x-this.x)/1000;
				var delta_y=(_spacecraft.y-this.y)/1000;
				this.show=function () {
					ctx.drawImage(egg_img,this.x,this.y,30,36);
				}
				this.hide=function  () {
					ctx.beginPath();
					
					ctx.clearRect(this.x-delta_x,this.y-delta_y,30,36);
									
				}
				this.move=function  () {
					
						
						this.hide();

						this.x+=delta_x;
						this.y+=delta_y
						this.show();
					}
			}
			function bum_obj (x,y) {
				
				BUM_X=x+25;
				BUM_Y=y+25;
				console.log('this.x'+this.x);
					var i=70;
					var j=0;
					var ve_exm=setInterval(function  () {

						console.log(' da show bum');
						if(i<=100)
						{
							ctx.clearRect(BUM_X-(i-10)/2,BUM_Y-(i-10)/2,i,i);
							ctx.drawImage(bum_img[0],BUM_X-(i/2),BUM_Y-i/2,i,i);
										
							console.log('da chay ' +i + "this.x"+BUM_X )
							i+=10;
						}
						else
						{
							ctx.clearRect(BUM_X-(i-10)/2-j*5,BUM_Y-(i-10)/2-j*5,i+j*10,i+j*10);
							ctx.drawImage(bum_img[j],BUM_X-(i-10)/2-j*5-5,BUM_Y-(i-10)/2-j*5-5,i+j*10,i+j*10);
								
							console.log('da chay ' +bum_img.src + "||||" +j)
								j++;
							if(j===6){
								ctx.clearRect(BUM_X-(i-10)/2-j*5,BUM_Y-(i-10)/2-j*5,i+j*10,i+j*10);
								clearInterval(ve_exm);
							}
						}
					},80);
												
			}
		}

function frames() {
	reqAnimFrame = window.mozRequestAnimationFrame    ||
					                window.webkitRequestAnimationFrame ||
					                window.msRequestAnimationFrame     ||
					                window.oRequestAnimationFrame;
}


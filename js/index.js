class Game{
    constructor() {
        this.scene=document.querySelector(".scene");
        this.scorEle=document.querySelector(".scor");
        this.scor=0;
        this.stateEle=document.querySelector(".state");
        this.state=1;
        this.lifeEle=document.querySelector(".life");
        this.life=5;
        this.num=3;
        this.obj={};
        this.speed=5;
        this.h=window.innerHeight;
        this.t=0;
        this. flag2=true;
        console.log(this.scene,this.scorEle,this.stateEle,this.lifeEle);
    }

    start(){                                //开始界面
        for(let i=0;i<this.num;i++){
            this._createLetter();           //执行
        }
        this._move();
        this._keydown();
    }

    //创建字母
    _createLetter(){
        let newdiv=document.createElement("div");
        newdiv.className="letter";
        do{
            var randomNum=Math.floor(Math.random() * 26 + 65);
            var randomLetter=String.fromCharCode(randomNum);
        }while(this.obj[randomLetter])
        newdiv.innerHTML=randomLetter;
        do{
            var randomLeft=Math.floor(Math.random() * 900);
            newdiv.style.left=randomLeft + "px";
        }while(this._checkleft(randomLeft));
        let randomTop=-Math.floor(Math.random() * 100);
        newdiv.style.top=randomTop + "px";
        this.scene.appendChild(newdiv);
        this.obj[randomLetter]={left:randomLeft,top:randomTop,ele:newdiv};
    }

    _checkleft(newleft){
        for(let i in this.obj){
            if(newleft > this.obj[i].left - 100 && newleft < this.obj[i].left + 100){
                return true;
            }
        }
    }

    _move(){
        this.t=setInterval(function(){
            for(let i in this.obj){
                let top=this.obj[i].top;
                top+=this.speed;
                this.obj[i].ele.style.top=top + 'px';
                this.obj[i].top=top;
                if(this.obj[i].top > this.h){
                    this.life--;
                    this.lifeEle.innerHTML=this.life;
                    this.scene.removeChild(this.obj[i].ele);
                    delete this.obj[i];
                    this._createLetter();
                    if(this.life===0){
                        if(confirm("游戏结束，得分为" +this.scor+ "是否继续")){
                            history.go(0);
                        }
                    }
                }
            }
        }.bind(this),50);
    }

    _keydown(){
        document.onkeydown=function(e){
            let kc=e.keyCode;
            let letter=String.fromCharCode(kc);
            if(this.obj[letter]){
                this.scene.removeChild(this.obj[letter].ele);
                delete this.obj[letter];
                this._createLetter();
                this.scor++;
                this.scorEle.innerHTML=this.scor;
                if(this.scor%10===0){
                    this._nextState();
                }
            }
        }.bind(this);
    }

    _nextState(){
        this.state++;
        this.stateEle.innerHTML=this.state;
        if(this.state <= 3){
            this._createLetter();
        }else{
            this.speed+=2;
        }
    }

    pause(){
        clearInterval(this.t);
    }

    running(){
        this._move();
    }
    gameover(){
        this.scor=0;
        this.scorEle.innerHTML=0;
        this.state=1;
        this.stateEle.innerHTML=1;
        this.life=5;
        this.lifeEle.innerHTML=5;
        this.num=3;
        this.obj={};
        this.speed=5;
        clearInterval(this.t);
        this.scene.innerHTML="";
    }
}
let game=new Game();
let startBtn=document.querySelector(".start");
startBtn.onclick=function(){
    if(game.flag2){
        game.start();
        game.flag2=false;
    }
    pauseBtn.style.display="block";
};
let pauseBtn=document.querySelector(".pause");
let flag=true;
pauseBtn.onclick=function(){
    if(flag){
        game.pause();
        pauseBtn.innerHTML="继续";
    }else{
        game.running();
        pauseBtn.innerHTML="暂停";
    }
    flag=!flag;
};
let over=document.querySelector(".over");
over.onclick=function(){
    pauseBtn.style.display="none";
    game.flag2=true;
    game.gameover();

}
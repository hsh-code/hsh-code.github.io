
    //宣告變數
    const start = document.getElementById('random_num');
    const _value = document.querySelectorAll(".value"); //所有數字按紐
    const myanswer=document.getElementById("myanswer");
    const submitanswer=document.getElementById("submitanswer");
    const deletebtn = document.getElementById("deleteanswer");
    const newgame = document.querySelector('.clearfix .new');
    const what = document.querySelector('.clearfix .what');
    const close = document.querySelector('.close')
    let answer= Math.floor(Math.random()*100)+0;
    const guess=document.getElementById("guess");
    const range=document.getElementById("range");
    let countspan=document.getElementById('count');
    let maxValue =100;
    let minValue =0;
    let Count=0;
    
    window.onload=function(){
        setInterval(changeColor,200);
        myanswer.disabled=true;
        //_value.forEach(x=>x.disabled=true);
        submitanswer.disabled=true;
        what.addEventListener('click',Show);
        start.addEventListener('click',()=>{
            randomNum();
            _value.forEach(x=>x.disabled=false)
        })
        _value.forEach(btninput=>btninput.addEventListener('click',(e)=>{
            if(myanswer.disabled==true){
                alert('還沒按開始啦哭哭')
            }
            else{
                myanswer.value+=e.target.textContent;
            }
        }));
        submitanswer.addEventListener('click',()=>{
            CheckAnswer();
            myanswer.value='';
        });
        deletebtn.addEventListener('click',Delete);
        
    }
    
    //產生亂數
    function randomNum(){
        document.getElementById('random_num').disabled=true;
        console.log(`%c偷看答案!!!是${answer}唷^.<`,'color:red;font-size:20px');
        
        myanswer.disabled=false;
        submitanswer.disabled=false;
        guess.textContent='遊戲開始啦~GO!GO!GO!';
    }
    
    //判斷答案
    function CheckAnswer(){
        let _userguess= Number(myanswer.value);
        if( _userguess>=maxValue ||  _userguess<=minValue){
            guess.innerHTML="請輸入正確範圍的數字!<br>(╬￣皿￣)";
            myanswer.setAttribute('placeholder','我要討厭你ㄌ喔!');
        }
        else{
            if(_userguess == ""){
                guess.innerHTML="請輸入數字!<br>(╬￣皿￣)";
            }
            else if(_userguess == answer){
                range.textContent='你是通靈王!';
                guess.innerHTML='恭喜答對~~<br>3秒後遊戲重新開始!';
                myanswer.setAttribute('placeholder','您真內行!');
                Count++;
                countspan.textContent=Count;
                setTimeout(Reset,3000);
            }
            else{
                Count++;
                countspan.textContent=Count;
                guess.textContent="您通靈的數字：";
                guess.textContent+=_userguess+'';

                if(_userguess<answer){
                    minValue=_userguess;
                    range.innerHTML=`${_userguess+1}~${maxValue-1}`;
                    guess.innerHTML+="<br>太小了喔喔喔"
                    myanswer.setAttribute('placeholder','哈哈母丟喔~');
                }
                else if(_userguess>answer){
                    maxValue=_userguess;
                    range.innerHTML=`${(minValue+1)}~${_userguess-1}`;
                    guess.innerHTML+="<br>太大了啊啊啊"
                    myanswer.setAttribute('placeholder','哈哈母丟喔~');
                }
                if (maxValue - 1 == minValue + 1)
                {
                    range.innerHTML=`你只剩${answer}能猜了啊!!!`;
                    myanswer.setAttribute('placeholder','真相只有一個!');
                }
            }
        }
    }
    //顯示規則
    function Show(){
        document.querySelector('.overlay').removeAttribute("style");
    }
    //關閉
    close.addEventListener('click',()=>{
        document.querySelector('.overlay').style.display='none';
    })
    //刪除按鈕
    function Delete(){
        if(myanswer.value!=''){
            let inputValue = myanswer.value;
            //console.log(typeof inputValue)
            //console.log(inputValue.length)
            inputValue.substring(0,inputValue.length-1);
            console.log(inputValue.substring(0,inputValue.length-1));
            myanswer.value=inputValue.substring(0,inputValue.length-1);
        }
    }
    //重置
    newgame.addEventListener('click',Reset);
    function Reset(){
        window.location.reload();
    }
    //其他功能--文字顏色閃爍
    function changeColor(){
        const colors =["green", "blue", "yellow", "orange", "pink", "purple", "white", "black"];
        range.style.color=colors[parseInt(Math.random()*colors.length)];
    }
let lock = false;

const authSend = () => {

    if(lock === false){
        lock = true;
    
        var num = String(Math.floor(1000000 * Math.random())).padStart(6,"0");
        document.getElementById("auth_send").innerText = num;
        
        var time = 180;
        
        setInterval(function(){

            if(time >= 0){
                var min = Math.floor(time / 60);
                var sec = String(time % 60).padStart(2,"0");
                document.getElementById("auth_done").innerText = min + ":" + sec;
                time = time - 1;
            }else{
                lock = false;
                clearInterval(send)
            }

        },1000)
    }

}

const authDone = () => {
    alert("가입을 축하합니다.");
}

const changeFocus1 = () =>{
    document.getElementById("")
}
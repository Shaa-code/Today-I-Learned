let lock = false;

const authSend = () => {

    if(ph1.length === 3 && ph2.length === 4 && ph3.length === 4){
        document.getElementById("send_auth_button").disabled = false;
        document.getElementById("send_auth_button").style.color = "#0068FF"

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

    }else{
        alert("비어있는 번호가 있습니다.")
    }

    

    

}

const authDone = () => {
    alert("가입을 축하합니다.");
}

const changeFocus1 = () =>{
    var ph1 = document.getElementById("ph1").value;
    if(ph1.length === 3){
        document.getElementById("ph2").focus();
    }
}

const changeFocus2 = () =>{
    var ph1 = document.getElementById("ph2").value;
    if(ph1.length === 4){
        document.getElementById("ph3").focus();
    }
}

const checkFullPhone = () =>{
    
}
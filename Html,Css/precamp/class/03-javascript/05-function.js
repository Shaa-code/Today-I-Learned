let isStarted = false;

const send = () => {

    if(isStarted === false){
        isStarted = true;
        let num = String(Math.floor(1000000 * Math.random())).padStart(6,"0");
        document.getElementById("target").innerText = num;
        document.getElementById("target").style.color = "#" + num;
    
        let time = 10;
    
        setInterval( function(){
            if(time >= 0){
                let min = Math.floor(time / 60);
                let sec = String(time % 60).padStart(2,"0");
                document.getElementById("time").innerText = min + ":" + sec;
                time = time - 1;
            }else{
                document.getElementById("authDone").disabled = true;
                isStarted = false;
                clearInterval(timer);
            }

        },1000)
        
    }

}
const startWord = () => {

    let myWord = document.getElementById("myWord").value;
    let word = document.getElementById("word").innerText
    
    lastWord = word[word.length - 1];
    firstWord = myWord[0];
    
    if(lastWord === firstWord){
        document.getElementById("result").innerText = "정답!"
        document.getElementById("word").innerText = myWord;
        document.getElementById("myWord").value = "";
    }else{
        document.getElementById("result").innerText = "틀림!"
        document.getElementById("myWord").value = "";
    }
}

const authSend = () => {
    let num = StringMath.floor(1000000 * Math.random());
    document.getElementById("auth_send").getElementsByTagName("span").value = num;
}
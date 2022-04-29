```
<!DOCTYPE html>
<html lang="en">
  <head>

    <meta charset="utf-8" />
    <title>twittler</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />

  </head>

  <body>
    
    <!-- 전체적인 틀을 의미합니다 -->
    <div id = "outframe"> 
      
      <!-- 유저네임과 Massage를 담당합니다! -->
      <div id="greeting">Twittler</div>


      <!-- 글을 쓰는 부분입니다! -->
      <div id = "component1">

        <div id = "Username">Username</div>
        <input id="usernameInput" type="text"></input>

        <div id = "Massage">Message</div>
        <textarea id ="messageInput"></textarea> <!--새로 구현해야함.-->
        
        <div class="white"><button id="tweetButton">Tweet!</button></div>

      </div>

      <div></div>


      <!-- 글을 읽는 부분입니다. -->
      <div id = "component2">

        <div id = "block">
          <button id="randomButton"><!--<span><img src="recycle"></span>-->check new tweet</button>
        </div>

          <!-- Tweet lists -->
        <section id="tweetlist" class="white"></section>
        <script src="script.js"></script>
      </div>
    
    </div>

  </body>

</html>
```

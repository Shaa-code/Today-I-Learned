type Admin = {
    tag:"ADMIN";
    name: string;
    kickCount: number;
}

type Number = {
    tag: "MEMBER";
    name: string;
    point: number;
}

type Guest = {
    tag: "GUEST";
    name: string;
    visitCount: number;
}

type User = Admin | Member | Guest

// 만약 로그인 코드를 작성했을 때, 아래와 같은 코드로 나타난다면
// 다른 사람이 보았을 때는 항상 위로 올라가서 'kickCount'가 뭐지? 하면서 찾아봐야한다.

function login(user: User) {
    if('kickCount' in user) {
        console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`);
    }else if ("point" in user) {
        console.log(`${user.name}님 현재까지 ${user.point}모았습니다.`)
    }else {
        console.log(`${user.name}님 현재까지 ${user.visitCount}번 방문하셨습니다.`)
    }
}

//이때, 서로소 Union Type을 활용하면 좋다.
function login(user: User) {
    if(user.tag === "ADMIN") {
        console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`);
    }else if (user.tag === "MEMBER") {
        console.log(`${user.name}님 현재까지 ${user.point}모았습니다.`)
    }else {
        console.log(`${user.name}님 현재까지 ${user.visitCount}번 방문하셨습니다.`)
    }
}


//더 쉽게 이렇게도 표현이 가능하다.
function login(user: User) {
    switch(user.tag){
        case "ADMIN":{
            console.log(`${user.name}님 현재까지 ${user.kickCount}명 강퇴했습니다.`);
            break;
        }
        case "MEMBER":{
            console.log(`${user.name}님 현재까지 ${user.point}모았습니다.`)
            break;
        }
        case "GUEST":{
            console.log(`${user.name}님 현재까지 ${user.visitCount}번 방문하셨습니다.`)
        }

}
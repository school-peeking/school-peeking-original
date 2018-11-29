var qparam;
function userSessionCheck_quiz(param) {
    firebaseEmailAuth.onAuthStateChanged(function(user) {
        if (user) {
            qparam = param;
            firebaseDatabase.ref("users/" + user.uid).once('value').then(function (snapshot) {
                name = snapshot.child("name").val();
                loginUserKey = snapshot.key;
                userInfo = snapshot.val();

                user_item = userInfo.items;
                user_coupon = userInfo.coupon;
                user_exp = userInfo.exp;
                user_quiz = userInfo.quiz;
                user_current = userInfo.current_img;

                quizList();
                return true;
            });
        } else {
        }
    });
}

function quizList() {
    if(loginUserKey){
        var quizsRef = firebaseDatabase.ref('quizs/');

        for(var i = 0; i < user_quiz.length; i++) {
            if(qparam == user_quiz[i]) {
                alert("이미 푼 문제에는 다시 도전할 수 없어요!");
                window.location.href = "roadview.html";  
                return;              
            }
        }

        user_quiz.push(qparam);
        var ref = firebaseDatabase.ref("users/"+loginUserKey);
    
        var obj = {
            name: name,
            exp: user_exp,
            items: user_item,
            coupon: user_coupon,
            quiz: user_quiz,
            current_img: user_current
        };
        
        ref.set(obj);

        quizsRef.on('child_added', function(data) {
            var key = data.key; 
            console.log("들어옴");
            dataList.push(data.val());
        }); // 퀴즈 목록 가져오기

        setTimeout(function() {
            console.log("set");
            var title = dataList[qparam].place + " : " + dataList[qparam].title;
            var exams = dataList[qparam].exam;
            var exam = "";

            for(var i = 0; i < exams.length; i++) {
                exam += "<li class='quiz-li' onclick='qcheck(" + (i+1) + ")'>" + exams[i] +"</li>";
            }

            document.getElementById("quiz-title").innerHTML = title;
            document.getElementById("loading").style.display = "none";
            document.getElementById("quiz-ul").innerHTML = exam;
        }, 1500);
    } else{
        console.log("else");
      return;
    }
}

function qcheck(num) {
    if(dataList[qparam].answer == num) {
        alert("정답을 맞히셨습니다! :)\n" + name + "님의 경험치가 " + dataList[qparam].exp +"점 상승하셨습니다!");
        user_exp += dataList[qparam].exp;

        console.log(qparam);
        if(qparam == 0 || qparam == 2 || qparam == 4) 
            user_coupon.push([qparam, dataList[qparam].place]);

        if(user_exp >= 300 && user_exp < 1000) listchk(300);
        else if(user_exp >= 1000 && user_exp < 2000) listchk(1000);
        else if(user_exp >= 2000 && user_exp < 3400) listchk(2000);
        else if(user_exp >= 3400 && user_exp < 4200) listchk(3400);
        else if(user_exp >= 4200) listchk(4200);

        console.log(user_item);

        var ref = firebaseDatabase.ref("users/"+loginUserKey);
            
        var obj = {
            name: name,
            exp: user_exp,
            items: user_item,
            coupon: user_coupon,
            quiz: user_quiz,
            current_img: user_current
        };
        
        ref.set(obj);
    }
    else{
        alert("앗! 이건 정답이 아니예요!\n정답은 " + dataList[qparam].answer + "번입니다!\n다음 번에는 꼭 맞히길 바랄게요 :)");
    }
    window.location.href = "roadview.html"
}

function listchk(num) {
    for(var i = 0; i < user_item.length ; i++) {
        if(user_item[i] == num) return;
    }

    user_item.push(num);
}
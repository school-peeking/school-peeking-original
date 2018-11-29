window.onload = userSessionCheck;

var firebaseEmailAuth;
var firebaseDatabase;
var name;
var loginUserKey;
var userInfo;

var dataList = [];

firebaseEmailAuth = firebase.auth();
firebaseDatabase = firebase.database();

// sessionCheck
function userSessionCheck() {
    document.getElementsByClassName("mainNav")[0].style.display = "none";
    firebaseEmailAuth.onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById("loginmenu").style.display = "none";
            document.getElementById("signup").style.display = "none";

            document.getElementById("roadviewmenu").style.display = "block";
            document.getElementById("inventorymenu").style.display = "block";
            document.getElementById("logoutmenu").style.display = "block";
            document.getElementById("couponmenu").style.display = "block";
            document.getElementById("rankmenu").style.display = "block";
            firebaseDatabase.ref("users/" + user.uid).once('value').then(function (snapshot) {
                console.log(snapshot);
                name = snapshot.child("name").val();
                loginUserKey = snapshot.key;
                userInfo = snapshot.val();
                document.getElementsByClassName("mainNav")[0].style.display = "block";

                return true
            });
        } else {
            document.getElementsByClassName("mainNav")[0].style.display = "block";
        }
    });
}

// login
$(document).ready(function(){
    $(document).on('click','.login-btn',function(){
          
        var email = $('#email').val();
        var password = $('#pwd').val();
      
        firebaseEmailAuth.signInWithEmailAndPassword(email, password)
            .then(function(firebaseUser) {
              loginSuccess(firebaseUser.user);
            }).catch(function(error) {
            alert("아이디 혹은 비밀번호가 올바르지 않습니다!");
        });
    });
});
    
function loginSuccess(firebaseUser) {
    window.location.href = "index.html"
}

// join
$(document).ready(function(){
    $(document).on('click','.join',function(){ 
        var email = $('#email').val();
        var password = $('#pwd').val();
        name = $('#name').val();
      
        firebaseEmailAuth.createUserWithEmailAndPassword(email, password).then(function(user) {
            userInfo = user.user;
            
            logUser(); 
        }, function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
        
        function logUser(){
            var ref = firebaseDatabase.ref("users/"+userInfo.uid);

            console.log(userInfo.uid);
            
            var obj = {
                name: name,
                exp: 0,
                items: [0],
                coupon: {
                    0: ["999", "기본인증서"]
                },
                quiz: [-1],
                current_img: 0
            };
        
            ref.set(obj);
            alert("가입에 성공하셨습니다!");

            window.location.href = "index.html"
        }
    });
});

// logout
$(document).ready(function(){
    $(document).on('click','#logoutmenu',function(){      
        firebaseEmailAuth.signOut().then(function() {
            window.location.href = "index.html"
            }).catch(function(error) {
            if(error){
               alert("로그아웃 실패 ㅠㅠ");
            }
        });
    });
});
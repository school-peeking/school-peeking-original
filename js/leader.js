var qparam;

var sort_img = [];
var sort_name = [];
var sort_exp = [];
var sort_coupon = [];

var chk = 0;

var clud_name = ['기본인증서', '알파반', '앱앤미', '게임메이커'];

function userSessionCheck_leader(param) {
    console.log("gg");
    qparam = param;
    firebaseEmailAuth.onAuthStateChanged(function(user) {
        if (user) {
            firebaseDatabase.ref("users/").once('value').then(function (snapshot) {
                name = snapshot.child("name").val();
                loginUserKey = snapshot.key;
                userInfo = snapshot.val();

                user_item = userInfo.items;
                user_coupon = userInfo.coupon;
                user_exp = userInfo.exp;
                user_quiz = userInfo.quiz;
                user_current = userInfo.current_img;

                firebaseDatabase.ref("users/").orderByChild('coupon/').on('child_added', function(data) {
                    sort_img.push(data.val().current_img);
                    sort_name.push(data.val().name);
                    sort_exp.push(data.val().exp);
                    sort_coupon.push(data.val().coupon);

                    console.log(sort_coupon);
                }); 

                setTimeout(function() {
                    var ranking_list = "";
                    for(var i = sort_name.length - 1, j=1; i >= 0; i--) { // 사람 수만큼 돌기
                        for(var k=0; k < sort_coupon[i].length; k++) {
                            console.log(k + " " + i);
                            console.log(sort_coupon[i][k] + " " + qparam);
                            if(sort_coupon[i][k][0] == qparam) {
                                console.log("들어옴");
                                ranking_list += "<tr><th scope='row'>" + j + "</th><td><img class='rank-img' src='img/item" + sort_img[i] + ".png'></td><td>"+ sort_name[i] +"</td><td>" + sort_exp[i] + "</td></tr>"
                                j++;
                            }
                        }
                    }

                    if(ranking_list == "") ranking_list = "아직 퀴즈를 푼 학생이 없습니다!"
                    document.getElementById("rankTable").innerHTML = ranking_list;
                }, 1000);
                return true;
            });
        } else {
        }
    });
}
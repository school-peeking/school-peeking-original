var qparam;

var sort_img = [];
var sort_name = [];
var sort_exp = [];
function userSessionCheck_rank() {
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

                firebaseDatabase.ref("users/").orderByChild('exp').on('child_added', function(data) {
                    sort_img.push(data.val().current_img);
                    sort_name.push(data.val().name);
                    sort_exp.push(data.val().exp);
                }); 

                setTimeout(function() {
                    var ranking_list = "";
                    for(var i = sort_name.length - 1, j=1; i >= 0; i--, j++) {
                        ranking_list += "<tr><th scope='row'>" + j + "</th><td><img class='rank-img' src='img/item" + sort_img[i] + ".png'></td><td>"+ sort_name[i] +"</td><td>" + sort_exp[i] + "</td></tr>"
                    }

                    document.getElementById("rankTable").innerHTML = ranking_list;
                }, 1000);
                return true;
            });
        } else {
        }
    });
}
// user

function userSessionCheck_inven() {
    firebaseEmailAuth.onAuthStateChanged(function(user) {
        if (user) {
            firebaseDatabase.ref("users/" + user.uid).once('value').then(function (snapshot) {
                console.log(snapshot);
                name = snapshot.child("name").val();
                loginUserKey = snapshot.key;
                userInfo = snapshot.val();

                user_item = userInfo.items;
                user_coupon = userInfo.coupon;
                user_exp = userInfo.exp;
                user_quiz = userInfo.quiz;
                user_current = userInfo.current_img;

                chkItem();
                return true
            });
        } else {
        }
    });
}

var itemList = "";
var itemName = ['', ];
var itemName = ["기본인증서", "알파반", "앱앤미", "게임메이커"];
function chkItem() {
    itemList += "<div class='row'>";
    for(var j = 0; j < user_coupon.length; j++) {
        console.log(user_coupon[j]);
        itemList += "<div class='col-sm'><div class='inven-item'><img class='item-img' src='img/coupon" + user_coupon[j][0] + ".PNG' id='img" + (j+1) + "' sytle=' width: 240px; object-fit: contain;'><div class='inven-item-name'>" + user_coupon[j][1] + "</div></div></div>";
    }
    itemList += "</div>";

    console.log(itemList);
    document.getElementById("inven-inst").innerHTML = "인증서의 진위여부는 동아리부장들이 확인할 수 있습니다!";
    document.getElementById("inven-list").innerHTML = itemList;
}

// function chgItem(num) {
//     var ref = firebaseDatabase.ref("users/"+loginUserKey);

//     console.log(loginUserKey);

//     var obj = {
//         name: name,
//         exp: user_exp,
//         items: user_item,
//         coupon: user_coupon,
//         quiz: user_quiz,
//         current_img: user_current
//     };
    
//     ref.set(obj);
// }
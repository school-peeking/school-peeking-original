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
var itemName = ["신입생", "미림의 정석", "뼈개발자", "세바스찬", "양갈래", "숏컷", "과제중"];
function chkItem() {
    // for(var i = Math.round(user_item.length / 3); i > 0; i--) {
        console.log(user_item.length);
        itemList += "<div class='row'>";
        for(var j = 0; j < user_item.length; j++) {
            // if(user_item[j] == 9999) {
            //     itemList += "<div class='col-sm' onclick='chgItem(" + (j+1) + ")'><div class='inven-item'><img class='item-img' src='img/item" + user_item[j] + ".png' id='img" + (j+1) + "'><div class='inven-item-name'>퀸 래빗</div></div></div>";
            //     continue;
            // }

            itemList += "<div class='col-sm' onclick='chgItem(" + (j+1) + ")'><div class='inven-item'><img class='item-img' src='img/item" + user_item[j] + ".png' id='img" + (j+1) + "'><div class='inven-item-name'>" + itemName[j] + "</div></div></div>";
        }
        itemList += "</div>";
    // }   

    console.log(itemList);
    console.log(user_current);
    document.getElementById("inven-me").src = "img/item"+user_current+".png";
    document.getElementById("inven-inst").innerHTML = "원하는 아이템을 클릭하면, 현재 모습이 바뀝니다!";
    document.getElementById("inven-list").innerHTML = itemList;
}

function chgItem(num) {
    console.log(num);
    document.getElementById("inven-me").src = document.getElementById('img'+num).src;

    var a = document.getElementById("inven-me").src;

    var b = (a.substring(a.indexOf("item",0)+4));
    var b = b.substring(0, b.indexOf("."));

    var ref = firebaseDatabase.ref("users/"+loginUserKey);

    console.log(loginUserKey);

    var obj = {
        name: name,
        exp: user_exp,
        items: user_item,
        coupon: user_coupon,
        quiz: user_quiz,
        current_img: b
    };
    
    ref.set(obj);
}
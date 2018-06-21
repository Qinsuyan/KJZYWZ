const server = "";
var LoginUserId = 0;
var AlreadyLogin = false;
var datatest = {
    LoginUserId:0
}

function getPath(file) {
    var url=null
    if(window.createObjectURL!=undefined){ // basic
        url=window.createObjectURL(file)
    }else if(window.URL!=undefined){ // mozilla(firefox)
        url=window.URL.createObjectURL(file)
    } else if(window.webkitURL!=undefined){ // webkit or chrome
        url=window.webkitURL.createObjectURL(file)
    }
    return url  ;
}

$(document).ready(function () {
    var userid = 3;
    userid = localStorage.getItem("LoginIN");
    if(userid==null){
        AlreadyLogin = false;
    }else{
        AlreadyLogin = true;
    }
    if(AlreadyLogin){
        $("#Nav_Bar_UnLogin").removeClass("hidden");
        $("#Nav_Bar_Logined").removeClass("hidden");
        $("#Nav_Bar_UnLogin").addClass("hidden");
        Vue.set(datatest,'LoginUserId',userid);
    }else{
        $("#Nav_Bar_UnLogin").removeClass("hidden");
        $("#Nav_Bar_Logined").removeClass("hidden");
        $("#Nav_Bar_Logined").addClass("hidden");
    }
    console.log(LoginUserId);
    console.log("reamklkljkljkljjkljklkldy");

    $("#image_upload").bind("input propertychange",function () {
        //console.log(getPath(document.getElementById("image_upload")));
        $("#image_paint").html(
            "<img style='max-height: 100%' src="+getPath(document.getElementById("image_upload").files[0])+">"
        );

    })
});
function LogOut(){
    localStorage.removeItem("LoginIN");
}


function Register(){
    var successflag = 1;
    var data = $("input[type='checkbox']").is(":checked");//返回结果：1
    if(data == false){
        $(" p[ id='warning-text'] ").css("visibility","visible");
        return;
    }
    var UserName = $(" input[ id='UserName_R'] ").val();
    var PassWord = $(" input[ id='PassWord_R'] ").val();
    var SelfDescription = $(" textarea[ id='SelfDescription'] ").val();
    if(UserName==""||UserName==null){
        alert("用户名不能为空！");
        successflag = 0;
    }
    else{
        if(PassWord==""||PassWord==null){
            alert("密码不能为空！");
            successflag = 0;
        }
    }
    var Image = document.getElementById("image_upload").files[0];
    console.log(Image);
    var formData = new FormData();
    formData.append("name",UserName);
    formData.append("passwd",PassWord);
    formData.append("introduction",SelfDescription);
    formData.append("file_data",Image);

    $.ajax({
        type: 'POST',
        url: 'http://149.28.199.19:8888/user/User/',
        data:formData,
        contentType: false,
        async: false,
        cache: false,
        processData: false,
        success:function(data){
            if(data.user_id!=null){
                alert("success");
            }else{
                alert("failed");
            }
            window.location.replace("index.html");
        }
    })
}


function checkAgree(){
    if( $(" p[ id='warning-text'] ").css("visibility") == "visible"){
        $(" p[ id='warning-text'] ").css("visibility", "hidden");
    }
}

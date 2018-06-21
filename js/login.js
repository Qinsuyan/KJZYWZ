const server = "";
var LoginUserId = 0;
var AlreadyLogin = false;
var datatest = {
    LoginUserId:0
}
new Vue({
    el: '#Bar_UserId',
    data: datatest,
})
$(document).ready(function () {
    var userid = 3;
    userid = localStorage.getItem("LoginIN");


    if(userid==null){
        AlreadyLogin = false;
    }else{
        AlreadyLogin = true;
    }


    if(AlreadyLogin){
        $("#Nav_Bar_Logined").removeClass("hidden");
        $("#Nav_Bar_UnLogin").addClass("hidden");
        Vue.set(datatest,'LoginUserId',userid);
    }else{
        $("#Nav_Bar_Logined").addClass("hidden");
        $("#Nav_Bar_UnLogin").removeClass("hidden");
    }

    console.log(LoginUserId);

    console.log("reamklkljkljkljjkljklkldy");

});
function LogOut(){

}
function Login()
{
    var UserName = $(" input[ id='UserName'] ").val();
    var PassWord = $(" input[ id='PassWord'] ").val();
    console.log(UserName+PassWord);
    var flag = 1;
    if(UserName==""||UserName==null){
        alert("用户名不能为空！");
        flag = 0;
    }
    else{
        if(PassWord==""||PassWord==null){
            alert("密码不能为空！");
            flag = 0;
        }
    }

    if(flag == 1) {
        var formData = new FormData();
        formData.append("user_name", UserName);
        formData.append("passwd", PassWord);
        $.ajax({
            type: 'POST',
            url: 'http://149.28.199.19:8888/user/User/Login/',
            data: formData,
            contentType: false,
            async: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log(data);
                if (data.status == "0") {
                    alert("SUcces.");
                    var AlreadyLoginUserId = data;
                    localStorage.setItem("LoginIN",data);

                }
                else if (data.status == "-1") {
                    alert("Error");s
                }
                return true;

            }
        });
    }
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
    console.log(UserName);
    console.log(PassWord);
    console.log(SelfDescription);



    $("#image_upload").fileinput({
        uploadUrl:"http://149.28.199.19:8888/user/",
        allowedFileExtensions: ['jpg', 'png'],//接收的文件后缀
        uploadExtraData:{"name": UserName, "passwd":PassWord},
        uploadAsync:true,
        browseClass: "btn btn-primary", //按钮样式
        showCaption: false,//是否显示标题
        maxFileCount: 1, //表示允许同时上传的最大文件个数
        enctype: 'multipart/form-data',
        validateInitialCount:true,
    })
}
$("#image_upload_area").on("fileuploaded", function (event, data, previewId, index) {


});

function SetImage(){
    $("#image_upload_area").removeClass("hidden");
}
function NotSetImage(){
    $("#image_upload_area").addClass("hidden");
}
function checkAgree(){
    if( $(" p[ id='warning-text'] ").css("visibility") == "visible"){
        $(" p[ id='warning-text'] ").css("visibility", "hidden");
    }
}

function changeSearchKey(e) {
    $("[role='presentation']").removeClass('active');
    /*$('#SearchBar').find('li').each(function(){
        console.log("1");
        $(this).removeClass("active");
    })*/
    $(e).addClass("active");
}

function Search() {
    var i = 1;
    var target = 0 ;
    /*$('#SearchBar').find('li').each(function () {
        if ($(this).hasClass("active")) {
            target = i;
        }
        i++;
    })*/

    //console.log(target);
    var keyword = $(" input[ id='SearchText'] ").val();
    var type = $("[role='presentation'].active").text();
    console.log(type);
    var typenum;
    switch(type){
        case '科技成果':
            typenum = 1;
            searchByResourceName(keyword);
            break;
        case '专家':
            typenum = 2;
            break;
        case '科研机构':
            typenum = 3;
            break;
        case '标签':
            typenum = 4;
            break;
    }
}


function searchByResourceName(keyword){

}

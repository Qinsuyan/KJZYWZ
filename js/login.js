const server = "";
$(document).ready(function () {
    /*$.get(server + keyword, function (data, status) {
        if (data.ItemsCount == 0) {
            $.alert("We are broken!");
        }
        else {
            for (i = 0; i < 20; i++)//for (i=0;i<data.ItemsCount;i++)
            {

                str1 = data.Items[i].ItemName;
                if (str1.length > 10) {
                    str1 = str1.slice(0, 9) + "...";
                }
                str3 = data.Items[i].Description;
                if (str3.length > 20) {
                    str3 = str3.slice(4, 19) + "...";
                }
                str5 = data.Items[i].Image;
                str7 = "￥" + data.Items[i].Price / 100;
                $("#hometable").append(str_start_0 + data.Items[i].ItemID + str_start_1 + str1 + str2 + str3 + str4 + str5 + str6 + str7 + str8);
            }
        }
    })*/
});

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
        formData.append("UserName", UserName);
        formData.append("Password", PassWord);
        $.ajax({
            type: 'POST',
            url: server,
            data: formData,
            contentType: false,
            async: false,
            cache: false,
            processData: false,
            success: function (data) {

                if (data.status == "0") {
                    alert("SUcces.");

                    var exp = new Date();
                    exp.setHours(exp.getHours()+24*7);
                    document.cookie = 'KJZYToken' + "=" +  data.SmartChainToken + ";expires="+ exp.toUTCString();

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
    var type = $("[role='presentation'].active").text();
    console.log(type);
    var typenum;
    switch(type){
        case '科技成果':
            typenum = 1;
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




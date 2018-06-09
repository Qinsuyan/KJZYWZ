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
                    document.cookie = 'SmartChainToken' + "=" +  data.SmartChainToken + ";expires="+ exp.toUTCString();

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
        flag = 0;
    }
    else{
        if(PassWord==""||PassWord==null){
            alert("密码不能为空！");
            flag = 0;
        }
    }
    console.log(UserName);
    console.log(PassWord);
    console.log(SelfDescription);
    var formData = new FormData();
    formData.append("user_name",UserName);
    formData.append("user_passwd",PassWord);
    formData.append("")

    /*$.ajax({
        type: 'POST',
        url: server,
        data: formData
        contentType: false,
        async: false,
        cache: false,
        processData: false,s
        success: function (data) {

            if (data.status == "0") {
                alert("SUcces.");

            }
            else if (data.status == "-1") {
                alert("Error");
            }
            return true;
        }
    });*/

}

function checkAgree(){
    if( $(" p[ id='warning-text'] ").css("visibility") == "visible"){
        $(" p[ id='warning-text'] ").css("visibility", "hidden");
    }
}
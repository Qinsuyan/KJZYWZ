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
        formData.append("name", UserName);
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
                if (parseInt(data)!=NaN) {
                    alert("Success.");
                    var AlreadyLoginUserId = data;
                    localStorage.setItem("LoginIN",data);
                }
                else {
                    alert("Error");s
                }
                window.location.replace("index.html");
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
    var Image = document.getElementById("image_upload").files[0];
    console.log(Image);




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


var myList = [
    /*
    {
        id:1,
        name: 'test1',
        author: 'test1a',
        institution: 'test1t'
    },
    */
];

function Search() {
    myList.splice(0,myList.length);
    $("[id=SearchTitle]").removeClass("hidden");
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
            searchByExpertName(keyword);
            break;
        case '科研机构':
            searchByInstitution(keyword);
            typenum = 3;
            break;
        case '标签':
            typenum = 4;
            break;
    }
}


new Vue({
    el: '#SearchResultList',
    data: {
        url :'test',
        resultList: myList
    },
    created: function () {
        var url = "";
        for(result in myList){
            myList[result].id  = 'resource.html?resource_id='+ myList[result].id;
            console.log( myList[result].id);
        }
        /* $.get(url, function (data) {

         })*/
    }
})




function searchByResourceName(keyword){
    console.log(keyword);
    if(keyword==""){
        alert("不能为空！");
        return ;
    }

    $.ajax({
        type: 'GET',
        url: 'http://149.28.199.19:8888/resource/?name='+keyword,
        contentType: false,
        async: false,
        cache: false,
        processData: false,
        success: function (data) {
            for (index in data){
                console.log(data[index]);
                var resource_id = data[index].resource_id;
                var resource_name = data[index].name;
                var resource_type = data[index].type;
                var resource_labels = data[index].ownlabels;
                var resource_foucs = "Foucs:"

                for( indexx in resource_labels){
                    $.ajax({
                        type: 'GET',
                        url: 'http://149.28.199.19:8888/label/'+resource_labels[indexx]+'/',
                        contentType: false,
                        async: false,
                        cache: false,
                        processData: false,
                        success:function(data){
                            resource_foucs = resource_foucs + data.name+',';
                        }
                    })
                }
                var a={
                    id:resource_id,
                    name:resource_name,
                    type:resource_type,
                    focus:resource_foucs.substring(0,resource_foucs.length-1),
                }
                myList.push(a);
            }
        }
    });
}

function searchByExpertName(keyword){
    console.log(keyword);
    if(keyword==""){
        alert("不能为空！");
        return ;
    }

    $.ajax({
        type: 'POST',
        url: 'http://149.28.199.19:8888/user/Expert/?name='+keyword,
        contentType: false,
        async: false,
        cache: false,
        processData: false,
        success: function (data) {
            for(index in data.ownresources){
                var formdata = new FormData();
                formdata.append("id",data.ownresources[index]);
                $.ajax({
                    type: 'POST',
                    url: 'http://149.28.199.19:8888/resource/SearchExpert/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success:function(data){

                        var resource_id = data.ownresources[index];
                        var resource_name = data.name;
                        var resource_type = data.type;
                        var resource_labels = data.ownlabels;
                        var resource_foucs = "Focus:";

                        for( indexx in resource_labels){

                            $.ajax({
                                type: 'GET',
                                url: 'http://149.28.199.19:8888/label/'+resource_labels[indexx]+'/',
                                contentType: false,
                                async: false,
                                cache: false,
                                processData: false,
                                success:function(data){
                                    resource_foucs = resource_foucs + data.name+',';
                                }
                            })
                        }
                        var a={
                            id:resource_id,
                            name:resource_name,
                            type:resource_type,
                            focus:resource_foucs.substring(0,resource_foucs.length-1),
                        };
                        myList.push(a);
                    }


                })

            }
        }
    });
}


function searchByInstitution(keyWord){

}

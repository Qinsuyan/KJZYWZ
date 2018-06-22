var e_info = new Vue ({
    el: '#expert_info',
    data: {
        image_url: 'img/default.jpg',
        name: 'default',
        info: '这个人没有自我介绍',
        point: 0
    }
})

var e_res = new Vue ({
    el: '#expert_res',
    data: {
        resources: [
            {title:'', url:''}
        ]
    }
})

var datatest = {
    LoginUserId:0
}
new Vue({
    el: '#Bar_UserId',
    data: datatest,
})


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
var id = 0;
var type = '';
var res_paper = [];
var res_other = [];
var res_buy = [];
var rel_exp = [];
$(document).ready(function () {
    //登录相关
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
        $("#Nav_Bar_UnLogin").removeClass("hidden");
        $("#Nav_Bar_Logined").addClass("hidden");
    }
    //login end

    id = getParam('user_id');
    console.log(id);
    if(id != userid)
        $("[role='private']").addClass('hidden');
    var user_settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://149.28.199.19:8888/user/User/" + id + "/",
        "method": "GET",
        "headers": {}
    }
    $.ajax(user_settings).done(function (response) {
        console.log(response);
        e_info.name = response.name;
        e_info.info = response.introduction || '这个人没有自我介绍';
        e_info.image_url = response.image || 'img/default.jpg';
        e_info.point = response.point || 0;
        type = response.type || 'user';
        res_buy = response.buyresources;
    })
    console.log('type:'+type);
    if(type === 'user')
    {
        $("[name='expert_only']").addClass('hidden');
        $("#expert_btn").addClass('hidden');
        $('#graph-chart').addClass('invisible');
    }
    if (type === 'expert') {
        $("#user_btn").addClass('hidden');
        var temps =[];
        var expert_settings = {
            "async": false,
            "crossDomain": true,
            "url": "http://149.28.199.19:8888/user/Expert/" + id + "/",
            "method": "GET",
            "headers": {}
        };
        $.ajax(expert_settings).done(function (response) {
            console.log(response);
            temps = response.ownresources;
        });
        for(r_id in temps)
        {
            var res_settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://149.28.199.19:8888/resource/" + temps[r_id] + "/",
                "method": "GET",
                "headers": {}
            }
            $.ajax(res_settings).done(function (resp) {
                console.log(resp);
                if(resp.type === 'paper')
                {
                    res_paper.push({title: resp.name, url: 'resource.html?resource_id=' + temps[r_id]})
                }
                else
                {
                    res_other.push({title: resp.name, url: 'resource.html?resource_id=' + temps[r_id]})
                }
            });
        };

        var temp_url = "http://149.28.199.19:8888/user/Expert/Relation/?name=" + e_info.name;
        temp_url = temp_url.replace(/\s/g, '+');
        console.log(temp_url);
        var rel_settings = {
            "async": false,
            "crossDomain": true,
            "url": temp_url,
            "method": "GET",
            "headers": {}
        };
        $.ajax(rel_settings).done(function (response) {
            console.log(response);
            rel_exp = response;
        });
    }
    e_res.resources = res_buy;

    //echarts部分
    showGraph();
    //echarts end
});

var getParam = function (name) {
    var search = document.location.search;
    //alert(search);
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
};

/*var get_filename = new  Vue ({
    el: '#paper_upload',
    data: {
        filename: '???'
    },
    computed: {
        triggerfile: function () {
            var file = $('#paper_upload').val();
            console.log(file);
        },
        get_name: function () {
            return this.filename;
        }
    }
})*/

function change_show(e){
    $("[role='presentation']").removeClass('active');
    $(e).addClass("active");
    var type = $("[role='presentation'].active").text();
    if(type === '论文')
        e_res.resources = res_paper;
    else if (type === '其他成果')
        e_res.resources = res_other;
    else
        e_res.resources = res_buy;
}

function change_upload(e) {
    $("[role='pre_upload']").removeClass('active');
    $(e).addClass("active");
    var type = $("[role='pre_upload'].active").text();
    console.log(type);
    if (type === '其他成果')
        $("[role='other_res']").addClass('hidden');
    else
        $("[role='other_res']").removeClass('hidden');

}

function buy_point() {
    var point = $(" input[ id='point_num'] ").val();
    e_info.point = point || 0;
}

function change_info() {
    var info = $(" input[ id='user_info'] ").val();
    e_info.info = info;
}

function upload_sheet() {
    var reason = $("textarea[ id='reason']").val();
    var contact = $("textarea[ id='contact_num']").val();
    var form = new FormData();
    form.append("explain", reason);
    form.append("contact", contact);
    form.append("user_id", LoginUserId);
    console.log(form);

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://127.0.0.1:8000/applysheet/ExpertApplysheet/",
        "method": "POST",
        "headers": {},
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert('申请单已提交！');
    });
}

function upload_res() {
    var r_name = $(" input[ id='res_name'] ").val() || 'default';
    var r_info = $(" input[ id='res_info'] ").val() || 'default';
    var r_keyword = $(" input[ id='res_keyword'] ").val() || 'default';
    var r_value = $(" input[ id='res_val'] ").val() || 0;
    var r_path = $(" input[ id='paper_upload'] ").val() || '';
    var type = $("[role='pre_upload'].active").text();

    var form = new FormData();
    form.append("name", r_name);
    form.append("path", r_path);
    form.append("abstract", r_info);
    form.append("keyword", r_keyword);
    form.append("value", r_value);

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://149.28.199.19:8888/resource/paper/",
        "method": "POST",
        "headers": {},
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        if(!isNaN(response)) {
            alert('上传成功！');
            if (type === '论文')
                res_paper.push({title: r_name, url: 'resource.html?resource_id=' + response})
            else
                res_other.push({title: r_name, url: 'resource.html?resource_id=' + response})
        }
    });
}

function triggerfile() {
    var file = $('#paper_upload').val();
    var pos = file.lastIndexOf("\\");
    var filename = file.substring(pos+1);
    if(filename.length != 0)
        $('#file_label').html(filename);
    else
        $('#file_label').html('请选择文件');
}

function showGraph() {
    let graph_chart=echarts.init(document.getElementById("graph-chart"));
    var data = [{
        fixed: true,
        x: graph_chart.getWidth() / 2,
        y: graph_chart.getHeight() / 2,
        symbolSize: 20,
        id: '0',
        name: e_info.name
    }];

    var edges = [];
    var options = {
        series: [{
            type: 'graph',
            layout: 'force',
            animation: false,
            data: data,
            force: {
                repulsion: 100,
                edgeLength: 10
            },
            edges: edges
        }]
    };
    graph_chart.setOption(options);

    for(i in rel_exp) {
        data.push({
            name: rel_exp[i],
            id: data.length
        });
        var source = 0;
        var target = data.length - 1;
        if (source !== target) {
            edges.push({
                source: source,
                target: target
            });
        }
    }
    graph_chart.setOption({
        series: [{
            roam: "scale",
            data: data,
            edges: edges,
            label:{
                show:true,
                formatter:"{b}"
            },
            force:{
                edgeLength:50,
                gravity:0.05
            }
        }]
    });
}

const server='http://127.0.0.1:8000/resource/Search/?pk='; // 资源
const server2='http://127.0.0.1:8000/user/User/';  //用户
$(document).ready(function () {

    //var  resource_id=$.query.get("resource_id");
    var author_id;
    var host_id;

    /*var purchase_data={
        user_id:author_id,
        resource_id:resource_id
    }*/
    var vm=new Vue({
        el:'#infomation',
        data:{
            name:'区块链',
            abstract:'区块链是随着比特币等数字加密货币的日益普及而逐渐兴起的' +
            '一种全新的去中心化基础架构与分布式计算范式,目前已经引起政府部门、金融' +
            '机构、科技企业和资本市场的高度重视与广泛关注.区块链技术具有去中心化、时序数据' +
            '、集体维护、可编程和安全可信等特点,特别适合构建可编程的货币系统、金融系统乃至宏观社会系' +
            '统.本文通过解构区块链的核心要素,提出了区块链系统的基础架构模型,详细阐述了区块链及与之相关的' +
            '比特币的基本原理、技术、方法与应用现状,讨论了智能合约的理念、应用和意义,介绍了基于区块链的平行社会' +
            '发展趋势,致力于为未来相关研究提供有益的指导与借鉴. ',
            value:'100',
            resource_pdf:null,
            is_purchase:false,             //是否购买
            is_paper:false,                //是否论文
            not_paper:true,
            contact:'123456',
            author_name:'某教授',
            author_jpg:null,
            author_introduction:'BM认证AIX系统管理员，IBM认证DB2系统管理员。较丰富的MIS、GIS、网络通信和信息安全方面的开发经验。目前研究领域包括：嵌入式系统开发、信息安全、软件开发技术。\n' +
            '                        原仓周副教授在上课时很注重对学生理解能力的培养，而不是死记硬背；上课风趣幽默，被同学们亲切地称为“仓老师”。在考试的时候，也是着重理解，经常不按套\n' +
            '                        路出题，造成同学们在考试的时候很困惑（明明应该开卷的题却出成闭卷），考完试也有所不满，这种方法对培养学生的自主学习能力是没有裨益的。'

        },
        method:{
            purchase:function () {
                $.ajax({
                    type: 'GET',
                    url: server,
                    data: resource_id,
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        if(data.status== "0")
                        {

                        }
                    }
                });

            }
        }
    });
    $.ajax({             //获取资源信息
        type: 'GET',
        url: server,
        data: resource_id,
        contentType: false,
        async: false,
        cache: false,
        processData: false,
        success: function (data) {

            vm.$data.name=data.name;
            vm.$data.id=data.resource_id;
            vm.$data.abstract=data.abstract;
            vm.$data.value=data.value;
            author_id=data.user_id;
            if(data.type=="paper")
            {
                vm.$data.is_paper=true;
                vm.$data.resource_pdf=data.path;
            }
            else
            {
                vm.$data.is_paper=false;
            }
        }
    });
    $.ajax({          //获取专家信息
        type: 'GET',
        url: server2,
        data: author_id,
        contentType: false,
        async: false,
        cache: false,
        processData: false,
        success: function (data) {

            vm.$data.author_name=data.name;
            vm.$data.author_introduction=data.introduction;
            vm.$data.author_avatar=data.image;

        }
    });
    $.ajax({       //获取专家信息
        type: 'GET',
        url: server2,
        data: author_id,
        contentType: false,
        async: false,
        cache: false,
        processData: false,
        success: function (data) {

            vm.$data.author_name=data.name;
            vm.$data.author_introduction=data.introduction;

        }
    });
    $.ajax({      //获取用户购买列表
        type: 'GET',
        url: server2,
        data: host_id,
        contentType: false,
        async: false,
        cache: false,
        processData: false,
        success: function (data) {
            for(var index=0;index<data.buyresources.length();index++){
                if(resource_id===data.buyresources[index])
                {

                }
            }

        }
    });


    /*var vm=new Vue({
        el:'#resource_name',
        data:{name:'区块链'}
    })
    var vm2=new Vue({
        el:'#resource_abstract',
        data:{
            abstract:'区块链是随着比特币等数字加密货币的日益普及而逐渐兴起的' +
            '一种全新的去中心化基础架构与分布式计算范式,目前已经引起政府部门、金融' +
            '机构、科技企业和资本市场的高度重视与广泛关注.区块链技术具有去中心化、时序数据' +
            '、集体维护、可编程和安全可信等特点,特别适合构建可编程的货币系统、金融系统乃至宏观社会系' +
            '统.本文通过解构区块链的核心要素,提出了区块链系统的基础架构模型,详细阐述了区块链及与之相关的' +
            '比特币的基本原理、技术、方法与应用现状,讨论了智能合约的理念、应用和意义,介绍了基于区块链的平行社会' +
            '发展趋势,致力于为未来相关研究提供有益的指导与借鉴. '
        }
    })
    var vm3=new Vue({
        el:'#resource_time',
        data:{date:'2018-6-20'}
    })
    var vm4=new Vue({
        el:'r_1',
        data:{
            message:'hello'+new Date().toLocaleString()
        }
    })
    var vm5=new Vue({
        el:'#r_2',
        data:{
            x1:'hello',
            x2:'world'
        }
    })
    */
});
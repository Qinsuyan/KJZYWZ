/*
var myList = [
    {
        id:1,
        name: 'test1',
        author: 'test1a',
        institution: 'test1t'
    },
    {
        id:2,
        name: 'test2',
        author: 'test2a',
        institution: 'test2t'
    },
    {
        id:3,
        name: 'test3',
        author: 'test3a',
        institution: 'test3t'
    }
];

new Vue({
    el: '#SearchResultList',
    data: {
        url :'test',
        resultList: myList
    },
    created: function () {
        var url = "";
        var a = {
            id:4,
            name:'test4',
            author:'test4a',
            institution:'test4t'
        }
        myList.push(a);
        for(result in myList){
            myList[result].id  = 'resource.html?resource_id='+ myList[result].id;
            console.log( myList[result].id);
        }

    }
})
*/

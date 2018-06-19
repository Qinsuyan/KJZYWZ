new Vue({
    el: '#SearchResultList',
    data: {
        resultList: [
            {
                name: 'test1',
                author: 'test1a',
                institution: 'test1t'
            },
            {
                name: 'test2',
                author: 'test2a',
                institution: 'test2t'
            },
            {
                name: 'test3',
                author: 'test3a',
                institution: 'test3t'
            }
        ]
    },
    created: function () {
        var url = "";
        $.get(url, function (data) {

        })
    }
})
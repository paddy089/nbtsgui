console.log('main.js loaded')

$('#sendsms').on('click', function (event) {
    event.preventDefault();
    var element = $(this);
    console.log('button clicked')

    sendRequest(element);
})

function sendRequest(element) {
    $.ajax({
        url: '/get_subscribers/',
        type: 'GET',
        //data: element.attr('data-id')
        success: function (response) {
            var o = JSON.parse(response);
            console.log(o);
            renderAllSubscribers(o)
        }
    })
}

function renderAllSubscribers(subs) {

    // test print IMSI
    console.log(subs[1][3]);

    // for (var sub in subs) {
    //     $('#subs').append('<p>' + sub + '</p>');
    // }

    for (var i = 0; i < subs.length; i++) {
        $('#subs').append('<div id=" "+subs[i][1]+" ">' + subs[i][3] + '</div>');
    }
    // res.forEach(function (entry) {
    //     //console.log(res);
    //     $('#subs').append('<p>' + entry + '</p>');
    // })
}
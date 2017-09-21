'use strict';


function sendRequest(element) {
    $.ajax({
        url: '/get_subscribers/',
        type: 'GET',
        //data: element.attr('data-id')
        async: true,
        beforeSend: function () {
            //$('#ajaxGif').show();
        },
        complete: function () {
            //$('#ajaxGif').hide();
        },
        error: function () {
            alert("Request has failed");
        },
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

    var subsL = subs.length,
        indices = [0,3,5],
        tbody = document.createElement('tbody'),
        tr,
        td;


    for (var i = 0; i < subsL; i++) {

        var sub = subs[i];
        var id = sub[0];
        var imsi = sub[3];
        var number = sub[5]

        var strImsi = ' IMSI: ' + imsi;
        var strId = ' Id: ' + id;
        var strNumber = ' Extension: ' + number;

        tr = document.createElement('tr');

        for (var c = 0; c < 3; c++) {
            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = sub[indices[c]];
        }
        tbody.appendChild(tr);


        //$('#subs').append('<div id="\'' + id + '\'"></div>');

        //  $('#' + id).append('<div class="" id="\'' + id + '\'">' + strId + '</div>');


        //html += '<div class="" id="\'' + id + '\'">' + strId + strImsi + strNumber + '</div>';

    }
    document.getElementById('substable').appendChild(tbody);
}


$('#sendsms').on('click', function (event) {
    event.preventDefault();
    var element = $(this);
    console.log('button clicked');

    sendRequest(element);
});


console.log('main.js loaded')

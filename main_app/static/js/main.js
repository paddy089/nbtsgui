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
        indices = [0, 3, 5],
        tbody = document.createElement('tbody'),
        tr,
        td,
        sub,
        header = ' <thead>\n' +
        '            <tr>\n' +
        '                <th>Id</th>\n' +
        '                <th>IMSI</th>\n' +
        '                <th>Extension</th>\n' +
        '            </tr>\n' +
        '            </thead>';

    $('#substable').append(header);


    for (var i = 0; i < subsL; i++) {

        sub = subs[i];

        tr = document.createElement('tr');

        for (var c = 0; c < 3; c++) {
            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = sub[indices[c]];
        }
        tbody.appendChild(tr);
    }
    $('#substable').append(tbody);
}


function updateSubscriber() {
    $('#substable').empty();
    renderAllSubscribers();
}


function looper() {

    updateSubscriber();

    setTimeout(function () {
        looper();
    }, 60000)
}


$('#sendsms').on('click', function (event) {
    event.preventDefault();
    var element = $(this);
    console.log('button clicked');

    sendRequest(element);
});


console.log('main.js loaded')

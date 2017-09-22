'use strict';


function getSubscribers(element) {
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

function sendBroadcast(element) {
    $.ajax({
        url: '',
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
            //renderAllSubscribers(o)
        }
    })
}

function renderAllSubscribers(subs) {

    if ($('#substable').children().length > 0) {
         $('#substable').empty();
    }


    // test print IMSI
    console.log('test print imsi: ' + subs[1][3]);

    var subsL = subs.length,
        indices = [0, 3, 5, 4, 999],
        tbody = document.createElement('tbody'),
        tr,
        td,
        sub,
        header = ' <thead>\n' +
        '            <tr>\n' +
        '                <th>Id</th>\n' +
        '                <th>IMSI</th>\n' +
        '                <th>Extension</th>\n' +
        '                <th>Name</th>\n' +
        '                <th>Select</th>\n' +
        '            </tr>\n' +
        '            </thead>';

    $('#substable').append(header);


    for (var i = 0; i < subsL; i++) {

        sub = subs[i];

        tr = document.createElement('tr');

        for (var c = 0; c < indices.length; c++) {

            td = document.createElement('td');
            tr.appendChild(td);

            if (c < 4) {
                td.innerHTML = sub[indices[c]];
            }

            if (c === 4) {
                //$('<input id="\'' + 99 + '\'" type="checkbox" value="">');
                //td.innerHTML = document.createElement('<input id="\'' + 99 + '\'" type="checkbox" value="">');
                var box = document.createElement('input');
                box.setAttribute("id", sub[0]);
                box.setAttribute("type", "checkbox");
                box.setAttribute("value", "");
                //td.innerHTML = box;
                td.appendChild(box);

            }

            //td.innerHTML = document.createElement('<input type="checkbox" value="" id="\'' + sub[i] + '\'">');

            // $('#subs').append('<div id=" "+subs[i][1]+" ">' + subs[i][3] + '</div>');

             //  $('#' + id).append('<div class="" id="\'' + id + '\'">' + strId + '</div>');


        }
        tbody.appendChild(tr);
    }
    $('#substable').append(tbody);
}


function updateSubscriber() {
    renderAllSubscribers();
}


function looper() {

    updateSubscriber();

    setTimeout(function () {
        looper();
    }, 60000)
}


$('#showsubs').on('click', function (event) {
    event.preventDefault();
    var element = $(this);
    console.log('button clicked');

    getSubscribers(element);
});

$('#sendbroadcast').on('click', function (event) {
    event.preventDefault();
    var element = $(this);
    console.log('button clicked');

    //getSubscribers(element);
});


console.log('main.js loaded')

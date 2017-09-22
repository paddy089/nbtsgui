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
            alert("'getSubscribers' Request has failed");
        },
        success: function (response) {
            var o = JSON.parse(response);
            console.log(o);
            renderAllSubscribers(o)
        }
    })
}

function sendBroadcast(data) {
    $.ajax({
        url: '/send_broadcast/',
        type: 'GET',
        data: data,
        async: true,
        beforeSend: function () {
            //$('#ajaxGif').show();
        },
        complete: function () {
            //$('#ajaxGif').hide();
        },
        error: function () {
            alert("'sendBroadcast' Request has failed");
        },
        success: function (response) {
            console.log(response);
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
                box.setAttribute("id", "checkbox" + i);
                box.setAttribute("type", "checkbox");
                box.setAttribute("value", sub[0]);
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


function updateSubscribers() {
    getSubscribers();
}


// function looper() {
//
//     updateSubscriber();
//
//     setTimeout(function () {
//         looper();
//     }, 60000)
// }

function evaluateCheckboxes() {

    var boxes = getAllCheckboxes();
    console.log(boxes);

    var checkedBoxes = [];

    for (var i = 0; i < boxes.length; i++) {

        if (boxes[i].checked === true) {

            checkedBoxes.push(boxes[i].value);
        }

        //console.log(boxes[i].value);
    }
    console.log(checkedBoxes);

    return checkedBoxes;
}

function getAllCheckboxes() {
    return document.querySelectorAll('input[type=checkbox]');
}

function selectAllSubscribers() {
    var boxes = getAllCheckboxes();
    for (var i = 0; i < boxes.length; i++) {
        //boxes[i].checked = boxes[i].checked ? false : true;
        boxes[i].checked = true;
    }
}

function selectNoSubscribers() {
    var boxes = getAllCheckboxes();
    for (var i = 0; i < boxes.length; i++) {
        //boxes[i].checked = boxes[i].checked ? false : true;
        boxes[i].checked = false;
    }
}


$('#showsubs').on('click', function (event) {
    event.preventDefault();
    var element = $(this);
    console.log('showsubs button clicked');

    getSubscribers(element);
});

$('#selectall').on('click', function (event) {
    event.preventDefault();
    var element = $(this);
    console.log('selectall button clicked');

    selectAllSubscribers();
});

$('#selectnone').on('click', function (event) {
    event.preventDefault();
    var element = $(this);
    console.log('selectnone button clicked');

    selectNoSubscribers();
});

$('#sendbroadcast').on('click', function (event) {
    event.preventDefault();
    var element = $(this);
    console.log('broadcast button clicked');

    var message = document.getElementById("textArea").value;
    console.log(message);


    var selectedSubs = evaluateCheckboxes();
    console.log('selectedSubs: '+ selectedSubs);

    var data = [selectedSubs, message];
    console.log(data);

    var obj = {
        subs: selectedSubs,
        msg: message
    }

    obj = JSON.stringify(obj);

    //console.log(JSON.parse(obj));

    sendBroadcast(obj);
});

function init() {
    getSubscribers();
    // setTimeout(function () {
    //     console.log('init startet');
    //     getSubscribers();
    // }, 3000)
}

init();

console.log('main.js loaded')

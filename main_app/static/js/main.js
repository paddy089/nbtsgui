'use strict';


function getSubscribers() {
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
            getSubscribers()
        }
    })
}

function delete_subscriber(data) {
    $.ajax({
        url: '/del_sub/',
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
            alert("'delete subscriber' Request has failed");
        },
        success: function (response) {
            console.log(response);
        }
    })
}

function renderAllSubscribers(subs) {

    var table = $('#substable');

    // if ($('#substable').children.length > 0) {
    //      $('#substable').empty();
    // }

    if (table.children.length > 0)
        table.empty();

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

    //$('#substable').append(header);
    table.append(header);

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
                var box = document.createElement('input');
                box.setAttribute("id", "checkbox" + i);
                box.setAttribute("type", "checkbox");
                box.setAttribute("value", sub[0]);
                td.appendChild(box);

            }
        }
        tbody.appendChild(tr);
    }
    //$('#substable').append(tbody);
    table.append(tbody);
}


function evaluateCheckboxes() {

    var boxes = getAllCheckboxes(),
        checkedBoxes = [],
        length = boxes.length,
        i;

    //console.log(boxes);

    for (i = 0; i < length; i++) {

        if (boxes[i].checked === true) {

            checkedBoxes.push(boxes[i].value);
        }
    }
    //console.log(checkedBoxes);

    return checkedBoxes;
}


function getAllCheckboxes() {
    return document.querySelectorAll('input[type=checkbox]');
}


function selectSubscribers(_choice) {
    var boxes = getAllCheckboxes(),
        length = boxes.length,
        i;

    for (i = 0; i < length; i++) {
        boxes[i].checked = _choice;
    }
}

// ## Event listener ## //

$('#showsubs').on('click', function (event) {
    event.preventDefault();
    //var element = $(this);
    //console.log('showsubs button clicked');

    getSubscribers();
});

$('#selectall').on('click', function (event) {
    event.preventDefault();
    //var element = $(this);
    //console.log('selectall button clicked');

    selectSubscribers(true);

});

$('#selectnone').on('click', function (event) {
    event.preventDefault();
    //var element = $(this);
    //console.log('selectnone button clicked');

    selectSubscribers(false);
});

$('#sendbroadcast').on('click', function (event) {
    event.preventDefault();
    //var element = $(this);
    console.log('broadcast button clicked');

    var message = document.getElementById("textArea").value,
        selectedSubs = evaluateCheckboxes(),
        obj = {
        subs: selectedSubs,
        msg: message
        };

    console.log(obj);

    sendBroadcast(obj);
});

$('#delete_sub').on('click', function (event) {
    event.preventDefault();
    //var element = $(this);
    console.log('del sub button clicked');

    var selected = evaluateCheckboxes(),
        obj = {
            subs: selected
        }

    console.log(obj)
    delete_subscriber(obj);
});

// ## initialise ## //

function init() {
    getSubscribers();
    // setTimeout(function () {
    //     console.log('init startet');
    //     getSubscribers();
    // }, 3000)
}

init();

console.log('main.js loaded')

'use strict';

var currentSubscribers;

function getSubscribers() {
    $.ajax({
        url: '/get_subscribers/',
        type: 'GET',
        async: true,
        beforeSend: function () {
        },
        complete: function () {
        },
        error: function () {
            alert("'getSubscribers' Request has failed");
        },
        success: function (response) {
            var o = JSON.parse(response);
            currentSubscribers = o;
            console.log(o);
            renderAllSubscribers(o)
        }
    })
}


function showStatus() {
    $.ajax({
        url: '/show_status/',
        type: 'GET',
        async: true,
        beforeSend: function () {
            $('#ajaxGif').show();

        },
        complete: function () {
            $('#ajaxGif').hide();
        },
        error: function () {
            alert("'showStatus' Request has failed");
        },
        success: function (response) {
            var _response = JSON.parse(response);
            console.log(_response);
            renderStatus(_response);

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


function delete_subscriber(data) {
    $.ajax({
        url: '/del_sub/',
        type: 'GET',
        data: data,
        async: true,
        beforeSend: function () {
        },
        complete: function () {
        },
        error: function () {
            alert("'delete subscriber' Request has failed");
        },
        success: function (response) {
            console.log(response);
            getSubscribers();

        }
    })
}


function add_subscriber(data) {
    $.ajax({
        url: '/add_sub/',
        type: 'GET',
        data: data,
        async: true,
        beforeSend: function () {
            $('#ajaxGif').show();
        },
        complete: function () {
            $('#ajaxGif').hide();
        },
        error: function () {
            alert("'add subscriber' Request has failed");
        },
        success: function (response) {
            console.log(response);
            getSubscribers();

        }
    })
}


function renderAllSubscribers(subs) {

    var table = $('#substable'),
        timeDiv = $('#status-time'),
        subsL = subs.length,
        indices = [0, 3, 5, 4, 999, 999],
        tbody = document.createElement('tbody'),
        time = new Date().toLocaleString(),
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
            '                <th>Status</th>\n' +
            '            </tr>\n' +
            '            </thead>';

    if (table.children.length > 0)
        table.empty();

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
            if (c === 5) {
                td.setAttribute('id', sub[0]);
            }
        }
        tbody.appendChild(tr);
    }
    table.append(tbody);
    timeDiv.html(time);
}


function renderStatus(statusSubs) {

    var online = '<i class="glyphicon glyphicon-ok-circle text-success"></i>',
        offline = '<i class="glyphicon glyphicon-remove-circle text-danger"></i>';

    for (var i = 0; i < currentSubscribers.length; i++) {

        var sub = currentSubscribers[i],
            id = sub[0],
            cell = $('#' + id);

        var c = statusSubs[id] === 'online' ? online : offline;

        cell.html(c);
        //cell.html(statusSubs[id]);
    }
}


function evaluateCheckboxes() {

    var boxes = getAllCheckboxes(),
        checkedBoxes = [],
        length = boxes.length,
        i;

    for (i = 0; i < length; i++) {

        if (boxes[i].checked === true) {

            checkedBoxes.push(boxes[i].value);
        }
    }

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
    //console.log('showsubs button clicked');

    getSubscribers();
});

$('#showstatus').on('click', function (event) {
    event.preventDefault();
    //console.log('showsubs button clicked');

    //showStatus();
    renderStatus(zzz);
});

$('#selectall').on('click', function (event) {
    event.preventDefault();
    //console.log('selectall button clicked');

    selectSubscribers(true);

});

$('#selectnone').on('click', function (event) {
    event.preventDefault();
    //console.log('selectnone button clicked');

    selectSubscribers(false);
});

$('#sendbroadcast').on('click', function (event) {
    event.preventDefault();
    //console.log('broadcast button clicked');

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
    //console.log('del sub button clicked');

    var selected = evaluateCheckboxes(),
        obj = {
            subs: selected
        }

    console.log(obj);
    delete_subscriber(obj);
});

$('#add_sub').on('click', function (event) {
    event.preventDefault();
    //var element = $(this);
    console.log('add sub button clicked');

    var imsi = document.getElementById("textImsi").value,
        name = document.getElementById("textName").value,
        obj = {
            imsi: imsi,
            name: name
        };

    console.log(obj);
    add_subscriber(obj);
});

// ## initialise ## //

function init() {
    $('#ajaxGif').hide();
    getSubscribers();

    // setTimeout(function () {
    //     console.log('automatic refresh');
    //     getSubscribers();
    // }, 60000)

    setInterval(function(){
        console.log('automatic refresh');
        getSubscribers();
    }, 60000);

    console.log('init')
}

var zzz = {
    '1': 'offline',
    '9': 'online'
}

init();


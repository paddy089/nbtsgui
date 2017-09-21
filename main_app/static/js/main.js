console.log('main.js loaded')

$('#sendsms').on('click', function (event) {
    event.preventDefault();
    var element = $(this);
    console.log('button clicked')

    //sendRequest(element);
})

function sendRequest(element) {
    $.ajax({
        url: '',
        type: 'GET',
        data: element.attr('data-id')
    })
}
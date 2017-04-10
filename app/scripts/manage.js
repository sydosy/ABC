chrome.storage.local.get('whiteList', function (storage) {
    let whiteList = storage.whiteList;
    let list = $('#white-list');
    let selectList = $('<select></select>', {
        id: 'select-white-list',
        size: 10
    });
    whiteList.forEach(function (url) {
        selectList.append($('<option></option>', {
            value: url,
            text: url
        }));
    });
    list.append(selectList);
});

$(document).ready(function () {
    $('#del-button1').on('click', function () {
        $('#select-white-list').find('option:selected').remove();
    });
});
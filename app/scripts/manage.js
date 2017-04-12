chrome.storage.local.get('whiteList', function (storage) {
    let whiteList = storage.whiteList;
    let list = $('#white-list');
    let selectList = $('<select></select>', {
        id: 'select-white-list',
        size: 10
    });
    for (let url in whiteList) {
        selectList.append($('<option></option>', {
            value: url,
            text: url
        }));
    }
    list.append(selectList);

    $('#del-button1').on('click', function () {
        let removeUrl = $('#select-white-list').find('option:selected');
        delete whiteList[removeUrl.val()];
        chrome.storage.local.set({'whiteList': whiteList}, function () {
            console.log('save!');
        });
        removeUrl.remove();
        $('#del-button1').prop('disabled', true);
    });

    $('#select-white-list').change(function () {
        $('#del-button1').prop('disabled', false);
    });
});
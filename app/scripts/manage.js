chrome.storage.local.get(['whiteList', 'domainList'], function (storage) {
    let whiteList = storage.whiteList;
    let whiteListTbody = $('#white-list-table').find('tbody');
    setTable(whiteList, whiteListTbody);

    let domainList = storage.domainList;
    let domainListTbody = $('#domain-list-table').find('tbody');
    setTable(domainList, domainListTbody);

    $('#del-white-list-button').on('click', function () {
        let checkedRows = $('#white-list-table').find('tbody').find('input:checked').parents('tr');
        deleteURL(whiteList, checkedRows);

        chrome.storage.local.set({'whiteList': whiteList}, function () {
            console.log('save!');
        });
    });

    //ホワイトリストのURLが1つでもチェックされていればボタンを有効化
    $('#white-list-table').change(function () {
        if ($(this).find('tbody').find('input:checked').length > 0) {
            $('#del-white-list-button').prop('disabled', false);
        } else {
            $('#del-white-list-button').prop('disabled', true);
        }
    });

    $('#del-domain-list-button').on('click', function () {
        let checkedRows = $('#domain-list-table').find('tbody').find('input:checked').parents('tr');
        deleteURL(domainList, checkedRows);

        chrome.storage.local.set({'domainList': domainList}, function () {
            console.log('save!');
        });
    });

    //ドメインリストのURLが1つでもチェックされていればボタンを有効化
    $('#domain-list-table').change(function () {
        if ($(this).find('tbody').find('input:checked').length > 0) {
            $('#del-domain-list-button').prop('disabled', false);
        } else {
            $('#del-domain-list-button').prop('disabled', true);
        }
    });
});

function setTable(list, tbody) {
    for (let url in list) {
        tbody.append($('<tr></tr>').append($('<td></td>', {
            class: 'mdl-data-table__cell--non-numeric',
            text: url
        })));
    }
}

function deleteURL(list, tr) {
    $(tr.children('td')).each(function (i, url) {
        if (i % 2 === 1) {
            delete list[url.innerText];
        }
    });
    tr.remove();
}
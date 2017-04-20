chrome.storage.local.get(['whiteList', 'domainList'], function (storage) {
    let whiteList = storage.whiteList;
    let whiteListTbody = $('#white-list-table').find('tbody');
    setTable(whiteList, whiteListTbody);

    let domainList = storage.domainList;
    let domainListTbody = $('#domain-list-table').find('tbody');
    setTable(domainList, domainListTbody);

    $('#del-white-list-button').on('click', function () {
        let checkedRows = $('#white-list-table').find('tbody').find('input:checked').parents('tr');
        deleteDomain(whiteList, checkedRows);
        $('#del-white-list-button').prop('disabled', true);

        chrome.storage.local.set({'whiteList': whiteList}, function () {
            console.log('save whiteList!');
        });
    });

    //ホワイトリストのDomainが1つでもチェックされていればボタンを有効化
    $('#white-list-table').change(function () {
        if ($(this).find('tbody').find('input:checked').length > 0) {
            $('#del-white-list-button').prop('disabled', false);
        } else {
            $('#del-white-list-button').prop('disabled', true);
        }
    });

    $('#del-domain-list-button').on('click', function () {
        let checkedRows = $('#domain-list-table').find('tbody').find('input:checked').parents('tr');
        deleteDomain(domainList, checkedRows);
        $('#del-domain-list-button').prop('disabled', true);

        chrome.storage.local.set({'domainList': domainList}, function () {
            console.log('save domainList!');
        });
    });

    //ドメインリストのDomainが1つでもチェックされていればボタンを有効化
    $('#domain-list-table').change(function () {
        if ($(this).find('tbody').find('input:checked').length > 0) {
            $('#del-domain-list-button').prop('disabled', false);
        } else {
            $('#del-domain-list-button').prop('disabled', true);
        }
    });
});

function setTable(list, tbody) {
    for (let domain in list) {
        tbody.append($('<tr></tr>').append($('<td></td>', {
            class: 'mdl-data-table__cell--non-numeric',
            text: domain
        })));
    }
}

function deleteDomain(list, tr) {
    $(tr.children('td')).each(function (i, domain) {
        if (domain.getAttribute('class') === 'mdl-data-table__cell--non-numeric') {
            delete list[domain.innerText];
        }
    });
    tr.remove();
}

function addTestDomains() {
    let whiteList = {
        'http://www.hoge1.com': 1,
        'http://www.hoge2.com': 2,
        'http://www.hoge3.com': 3,
        'http://www.hoge4.com': 4,
        'http://www.hoge5.com': 5
    };
    chrome.storage.local.set({'whiteList': whiteList}, function () {
        console.log('save whiteList');
    });
    let domainList = {
        'http://www.hoge1.com': 1,
        'http://www.hoge2.com': 2,
        'http://www.hoge3.com': 3,
        'http://www.hoge4.com': 4,
        'http://www.hoge5.com': 5
    };
    chrome.storage.local.set({'domainList': domainList}, function () {
        console.log('save domainList');
    });
}

$(function () {
    $('#test-button').on('click', function () {
        addTestDomains();
    })
});

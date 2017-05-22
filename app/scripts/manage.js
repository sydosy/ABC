$(function () {
    chrome.storage.local.get(['whiteList', 'domainList'], function (storage) {
        let whiteList = storage.whiteList;
        let whiteListTable = $('#white-list-table');
        setTable(whiteList, whiteListTable);

        let domainList = storage.domainList;
        let domainListTable = $('#domain-list-table');
        setTable(domainList, domainListTable);

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
});


function setTable(list, table) {
    let columnClass = 'mdl-data-table__cell--non-numeric';
    //mdlを動的生成した要素に適用するためにtable要素の作り直し
    let newTable = $('<table></table>', {
        class: table.attr('class'),
        id: table.attr('id')
    });
    let thead = $('<thead></thead>').append($('<tr></tr>').append($('<th></th>', {
        class: columnClass,
        text: table.find('th').text()
    })));
    let tbody = $('<tbody></tbody>');

    //tbodyにドメインを列挙
    for (let domain in list) {
        tbody.append($('<tr></tr>').append($('<td></td>', {
            class: columnClass,
            text: domain
        })));
    }

    newTable.append(thead);
    newTable.append(tbody);
    table.replaceWith(newTable);

    //mdlの再適用
    componentHandler.upgradeDom();
}

function deleteDomain(list, tr) {
    $(tr.children('td')).each(function (i, domain) {
        if (domain.getAttribute('class') === 'mdl-data-table__cell--non-numeric') {
            delete list[domain.innerText];
        }
    });
    tr.remove();
}
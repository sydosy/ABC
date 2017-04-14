chrome.storage.local.get(['whiteList','domainList'], function (storage) {
    let whiteList = storage.whiteList;
    let whiteListTbody = $('#white-list-table').find('tbody');
    setTable(whiteList, whiteListTbody);

    let domainList = storage.domainList;
    let domainListTbody = $('#domain-list-table').find('tbody');
    setTable(domainList, domainListTbody);

    $('#del-button1').on('click', function () {
        let checkedBox = $('#white-list-table').find('tbody').find('input:checked');
        let removeURL = checkedBox.parents('tr');
        $(removeURL.children('td')).each(function (i, url) {
            if (i % 2 === 1) {
                delete whiteList[url.innerText];
            }
        });
        removeURL.remove();

        chrome.storage.local.set({'whiteList': whiteList}, function () {
            console.log('save!');
        });
    });

    $('#white-list-table').change(function () {
        if ($(this).find('tbody').find('input:checked').length > 0) {
            $('#del-button1').prop('disabled', false);
        } else {
            $('#del-button1').prop('disabled', true);
        }
    });

    $('#del-button2').on('click', function () {
        let checkedBox = $('#domain-list-table').find('tbody').find('input:checked');
        let removeURL = checkedBox.parents('tr');
        $(removeURL.children('td')).each(function (i, url) {
            if (i % 2 === 1) {
                delete domainList[url.innerText];
            }
        });
        removeURL.remove();

        chrome.storage.local.set({'domainList': domainList}, function () {
            console.log('save!');
        });
    });

    $('#domain-list-table').change(function () {
        if ($(this).find('tbody').find('input:checked').length > 0) {
            $('#del-button2').prop('disabled', false);
        } else {
            $('#del-button2').prop('disabled', true);
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
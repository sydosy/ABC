run();

function run() {
    let protocol = window.location.protocol;
    if (protocol !== 'http:') {
        return;
    }

    let formElements = document.forms;
    for (let i = 0; i < formElements.length; i++) {
        let inputElements = formElements[i].getElementsByTagName('input');
        for (let j = 0; j < inputElements.length; j++) {
            if (inputElements[j].type !== 'password') {
                continue;
            }

            chrome.storage.local.get('whiteList', function (value) {
                let whiteList = value.whiteList;
                if (whiteList != null && whiteList.indexOf(window.location.href) >= 0) {
                    return;
                }
                showHTTPAlertPopup(whiteList);
            });

            break;
        }
    }
}

function showHTTPAlertPopup(whiteList) {
    swal({
        text: 'データ通信方式がhttpです。外部からパスワード等が閲覧できる可能性があります。',
        input: 'checkbox',
        inputPlaceholder: '今後このページで警告を表示しない',
        confirmButtonText: '確認'
    }).then(function (result) {
        //”今後このページで警告を表示しない”がチェックされた状態で確認ボタンが押された
        if (result === 1) {
            if (!whiteList) {
                whiteList = [];
            }
            whiteList.push(window.location.href);
            chrome.storage.local.set({'whiteList': whiteList}, function () {
                console.log(whiteList);
            });
        }
    });
}
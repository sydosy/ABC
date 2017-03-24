run();

function run() {
    let inputElements = document.body.getElementsByTagName('input');
    for (let i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type !== 'password') {
            continue;
        }

        let protocol = window.location.protocol;
        if (protocol === 'http:') {
            runHttpAlert()
        }
    }
}

function runHttpAlert() {
    chrome.storage.local.get('whiteList', function (value) {
        let whiteList = value.whiteList;
        if (whiteList != null && whiteList.indexOf(window.location.href) >= 0) {
            return;
        }
        showHttpAlertPopup(whiteList);
    });
}

function showHttpAlertPopup(whiteList) {
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
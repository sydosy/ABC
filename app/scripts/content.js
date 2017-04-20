run();

function run() {
    let inputElements = document.body.getElementsByTagName('input');
    for (let i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type !== 'password') {
            continue;
        }

        switch (window.location.protocol) {
            case 'http:':
                alertHttpIfNeeded();
                break;
            case 'https:':
                registerDomainIfNeeded();
                break;
        }

        break;
    }
}

function alertHttpIfNeeded() {
    chrome.storage.local.get('whiteList', function (storage) {
        let whiteList = storage.whiteList;
        if (!whiteList) {
            whiteList = {};
        }

        //ドメインがホワイトリストに含まれている
        if (window.location.hostname in whiteList) {
            registerDomainIfNeeded();
            return;
        }

        //警告ポップアップを表示
        swal({
            text: 'データ通信方式がhttpです。外部からパスワード等が閲覧できる可能性があります。',
            type: 'warning',
            input: 'checkbox',
            inputPlaceholder: '今後このページで警告を表示しない',
            confirmButtonText: '確認'
        }).then(function (result) {
            //”今後このページで警告を表示しない”がチェックされていない
            if (result !== 1) {
                return;
            }

            whiteList[window.location.hostname] = window.location.href;
            chrome.storage.local.set({ 'whiteList': whiteList }, function () {
                registerDomainIfNeeded();
            });
        });
    });
}

function registerDomainIfNeeded() {
    chrome.storage.local.get('domainList', function (storage) {
        let domainList = storage.domainList;
        if (!domainList) {
            domainList = {};
        }

        //ドメインがドメインリストに含まれている
        if (window.location.hostname in domainList) {
            return;
        }

        //ドメイン登録ポップアップを表示
        swal({
            text: '登録されていないサイトのデータ送信ページです。登録しますか？',
            type: 'question',
            confirmButtonText: '登録',
            showCancelButton: true,
            cancelButtonText: 'キャンセル'
        }).then(function () {
            //登録ボタンが押された
            domainList[window.location.hostname] = window.location.href;
            chrome.storage.local.set({ 'domainList': domainList }, function () {
            });
        });
    });
}

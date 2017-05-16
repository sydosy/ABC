run();

async function run() {
    let inputElements = document.body.getElementsByTagName('input');
    for (let i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type !== 'password') {
            continue;
        }

        switch (window.location.protocol) {
            case 'http:':
                await alertHttpIfNeeded();
                registerDomainIfNeeded();
                break;
            case 'https:':
                registerDomainIfNeeded();
                break;
        }

        break;
    }
}

function alertHttpIfNeeded() {
    return new Promise(async (resolve) => {
        let whiteList = await getLocalStorage('whiteList');
        if (!whiteList) {
            whiteList = {};
        }

        //ドメインがホワイトリストに含まれている
        if (window.location.hostname in whiteList) {
            resolve();
            return;
        }

        //警告ポップアップを表示
        swal({
            text: 'データ通信方式がhttpです。外部からパスワード等が閲覧できる可能性があります。',
            type: 'warning',
            input: 'checkbox',
            inputPlaceholder: '今後このページで警告を表示しない',
            confirmButtonText: '確認'
        }).then(async (result) => {
            //”今後このページで警告を表示しない”がチェックされていない
            if (result !== 1) {
                resolve();
                return;
            }

            whiteList[window.location.hostname] = window.location.href;
            await setLocalStorage({ 'whiteList': whiteList });
            resolve();
        }).catch(() => {
            //ポップアップの外側がクリックされた
            resolve();
        });
    });
}

async function registerDomainIfNeeded() {
    let domainList = await getLocalStorage('domainList');
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
    }).then(() => {
        //登録ボタンが押された
        domainList[window.location.hostname] = window.location.href;
        setLocalStorage({ 'domainList': domainList });
    });
}

function setLocalStorage(obj) {
    return new Promise((resolve) => {
        chrome.storage.local.set(obj, () => resolve());
    });
}

function getLocalStorage(key = null) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, (item) => {
            key ? resolve(item[key]) : resolve(item);
        });
    });
}
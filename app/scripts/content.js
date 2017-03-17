run();
function run() {
    let protocol = window.location.protocol;
    let hostname = window.location.hostname;
    console.log(hostname);
    console.log(protocol);
    if (protocol === 'http:') {
        let formElements = document.forms;
        console.log(formElements);
        for (let i = 0; i < formElements.length; i++) {
            let inputElements = formElements[i].getElementsByTagName('input');
            for (let j = 0; j < inputElements.length; j++) {
                if (inputElements[j].type === 'password') {
                    chrome.storage.local.get('whiteList', function (value) {
                        let whiteList = value.whiteList;
                        if (whiteList != null) {
                            for (let i = 0; i < whiteList.length; i++) {
                                if (whiteList.indexOf(window.location.href) >= 0) {
                                    return;
                                }
                            }
                        }
                        swal({
                            text: 'データ通信方式がhttpです。外部からパスワード等が閲覧できる可能性があります。',
                            input: 'checkbox',
                            inputPlaceholder: '今後このページで警告を表示しない',
                            confirmButtonText: '確認'
                        }).then(function (result) {
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
                    });
                }
            }
        }
    }
}
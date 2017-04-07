chrome.storage.local.get('whiteList', function (chromeStorage) {
    let whiteList = chromeStorage.whiteList;
    console.log(whiteList);
    let list = $('#white-list');
    for (let i = 0; i < whiteList.length; i++) {
        list.append($('<p></p>', {
            text: whiteList[i]
        }));
    }
});
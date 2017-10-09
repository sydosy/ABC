# ABC
P講習D班アプリケーション名：Anti Bleeding ChromeExtension

## 概要
- httpのログインページで警告を表示してくれる
- 普段使用しているログインページに訪れた際にそのドメインを登録することにより，
フィッシングサイトに誘導された場合に異変に気づく手助けができる
- 登録したドメインを削除できる

## 動作環境
最新版のGoogle Chromeが動くPC

## インストール
1. Clone or DL
1. Chromeの[拡張機能](chrome://extensions/)にアクセスする
（URLバーに`chrome://extensions/`を打ち込んでも遷移できる）
1. 「デベロッパーモード」にチェックを入れる
1. 「パッケージ化されていない拡張機能を読み込む」を選択
1. DLしたABC内のappを選択し開く（zipをDLして解凍してなければ展開しておく）
1. Chrome右上にABCのアイコンが表示されれば完了

## 使い方
- httpのページにログインフォームを検知したら警告を表示する
信頼できるサイトの場合は警告画面にチェックを入れることで再度警告しなくなる
- ログインフォームがあるとドメイン登録用ポップアップを表示する
登録することで同じページでは再度表示しなくなり、
偽サイトにアクセスした場合は登録用ポップアップが表示されることで気がつく事ができる
- ABCのアイコンをクリックするとドメイン管理ページに遷移する
登録したそれぞれのドメインを閲覧、削除することができる

## ライセンス
- [MIT License (MIT)](LICENSE)

 MIT ライセンスの下で公開する、自由ソフトウェアです。
 
 ## 使用ライブラリ
 [JQuery](https://github.com/jquery/jquery)
 - MIT License (MIT)
 - ライセンス全文：[https://github.com/jquery/jquery/blob/master/LICENSE.txt](https://github.com/jquery/jquery/blob/master/LICENSE.txt)
 
 [SweetAlert2](https://github.com/limonte/sweetalert2)
 - MIT License (MIT)
 - ライセンス全文：[https://github.com/limonte/sweetalert2/blob/master/LICENSE](https://github.com/limonte/sweetalert2/blob/master/LICENSE)
 
 [Material Design Lite](https://github.com/google/material-design-lite)
 - Apache License 2.0
 - ライセンス全文：[https://github.com/google/material-design-lite/blob/mdl-1.x/LICENSE](https://github.com/google/material-design-lite/blob/mdl-1.x/LICENSE)
 

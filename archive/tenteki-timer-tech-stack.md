# 点滴タイマー 技術スタック

作成日：2026-05-06  
対象アプリ名：点滴タイマー  
対象バージョン：MVP v1.0

---

## 1. 技術選定の結論

「点滴タイマー」は、HTML / CSS / JavaScriptのみで実装する。

Reactなどのフレームワークは使用しない。サーバー、データベース、外部APIも使用しない。

PWAとして構成し、GitHub Pagesに配置する。初回読み込み後はオフラインで利用できるようにする。

---

## 2. 採用技術一覧

| 分類 | 採用技術 | 用途 |
|---|---|---|
| マークアップ | HTML | 画面構造の作成 |
| スタイル | CSS | スマホ向けUI、ライト/ダークモード対応 |
| ロジック | JavaScript | 入力チェック、丸め、時間計算、滴下計算、表示更新 |
| PWA設定 | Web App Manifest | ホーム画面追加、アプリ名、アイコン設定 |
| オフライン対応 | Service Worker / Cache API | アプリ本体のキャッシュ、オフライン利用 |
| 公開先 | GitHub Pages | 静的Webアプリの公開 |
| 対象端末 | iPhone / Android | 個人スマホ利用 |
| 対象ブラウザ | Safari / Chrome系ブラウザ | PWA利用、スマホ標準ブラウザ対応 |

---

## 3. 採用しない技術

MVP v1.0では、以下は使用しない。

| 技術 | 使用しない理由 |
|---|---|
| React | 1画面の計算アプリであり、初期版では構成が過剰になるため |
| Vue / Svelte | 同上 |
| TypeScript | 初期版ではJavaScriptのみで十分な規模のため |
| Node.jsサーバー | サーバー処理が不要なため |
| データベース | 履歴や個人情報を保存しないため |
| 外部API | 完全オフライン利用を優先するため |
| localStorage | 入力値や計算結果を保存しない方針のため |
| sessionStorage | 同上 |
| IndexedDB | 同上 |
| Cookie | 同上 |
| 通知API | 初期版では通知機能を持たないため |
| 位置情報API | 不要なため |
| 認証機能 | 個人情報を扱わず、公開URLで利用する方針のため |

---

## 4. HTML

### 4.1 役割

HTMLは、アプリ画面の構造を定義する。

主な構成要素：

- アプリタイトル
- 残量入力欄
- 残量エラー表示欄
- 終了予定時刻入力欄
- 終了予定時刻エラー表示欄
- 滴下係数選択ボタン
- 計算ボタン
- 結果表示エリア
- 条件表示エリア

### 4.2 使用する主なHTML要素

| 要素 | 用途 |
|---|---|
| `main` | アプリ全体のコンテナ |
| `header` | タイトル表示 |
| `section` | 入力エリア、結果エリアのまとまり |
| `label` | 入力欄の説明 |
| `input type="number"` | 残量入力 |
| `input type="time"` | 終了予定時刻入力 |
| `button` | 滴下係数選択、計算実行 |
| `p` / `div` | 結果、条件、エラー表示 |

### 4.3 終了予定時刻入力

終了予定時刻は、スマホ標準の時刻入力UIを使う。

```html
<input type="time" id="end-time">
```

アプリ側で10分単位に丸めるため、UI側で厳密に10分単位へ制限することは必須ではない。

---

## 5. CSS

### 5.1 役割

CSSは、スマホで見やすく、操作しやすい画面を作る。

主な責務：

- 1画面完結のレイアウト
- 大きめの入力欄
- 押しやすいボタン
- 結果の強調表示
- 条件表示の控えめな表示
- エラー表示
- ライトモード / ダークモード対応

---

### 5.2 レスポンシブ方針

スマホ利用を主対象にする。

- 画面幅が狭くても横スクロールしない。
- 入力欄とボタンは指で押しやすい高さにする。
- 結果は視線が迷わないように中央寄せを基本にする。
- PC表示でも崩れないが、PC最適化は優先しない。

---

### 5.3 ダークモード対応

スマホ本体の設定に合わせて自動切り替えする。

CSSでは、`prefers-color-scheme` を使用する。

```css
@media (prefers-color-scheme: dark) {
  /* ダークモード用スタイル */
}
```

アプリ内にテーマ切り替えボタンは設けない。

---

## 6. JavaScript

### 6.1 役割

JavaScriptは、アプリの計算・検証・表示更新を担当する。

主な処理：

- 入力値取得
- 入力チェック
- 残量の10mL単位丸め
- 終了予定時刻の10分単位丸め
- 現在時刻取得
- 当日・翌日判定
- 残り時間計算
- mL/h計算
- 滴/分計算
- 秒/滴計算
- エラー表示
- 結果表示
- 入力欄リセット

---

### 6.2 使用する主なWeb API

| API / 機能 | 用途 |
|---|---|
| DOM API | 入力値取得、表示更新、イベント処理 |
| Date | 現在時刻取得、終了予定日時作成、残り時間計算 |
| Math.round | 10mL単位、10分単位、整数表示への四捨五入 |
| addEventListener | ボタン押下イベント処理 |
| navigator.serviceWorker | Service Worker登録 |

---

### 6.3 計算ロジック

基本式：

```text
mL/h = 残量mL ÷ 残り時間分 × 60
滴/分 = 残量mL ÷ 残り時間分 × 滴下係数
秒/滴 = 60 ÷ 表示用の滴/分
```

残量丸め：

```javascript
const roundedVolume = Math.round(inputVolume / 10) * 10;
```

終了予定時刻の分丸め：

```javascript
const roundedMinute = Math.round(minute / 10) * 10;
```

mL/h：

```javascript
const mlPerHourRaw = volumeMl / remainingMinutes * 60;
const mlPerHourDisplay = Math.round(mlPerHourRaw);
```

滴/分：

```javascript
const dropsPerMinuteRaw = volumeMl / remainingMinutes * dropFactor;
const dropsPerMinuteDisplay = Math.round(dropsPerMinuteRaw);
```

秒/滴：

```javascript
const secondsPerDropDisplay = Math.round(60 / dropsPerMinuteDisplay);
```

---

## 7. Web App Manifest

### 7.1 役割

`manifest.json` は、アプリをスマホのホーム画面に追加するための設定ファイルである。

主な設定：

- アプリ名
- 短いアプリ名
- 起動URL
- 表示形式
- 背景色
- テーマ色
- アイコン

---

### 7.2 推奨設定

```json
{
  "name": "点滴タイマー",
  "short_name": "点滴タイマー",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 7.3 アイコン

初期版では、単色背景に「滴」の1文字を配置した仮アイコンを使用する。

必要サイズ：

- 192px × 192px
- 512px × 512px

---

## 8. Service Worker

### 8.1 役割

`service-worker.js` は、アプリをオフラインで利用できるようにするためのファイルである。

主な役割：

- アプリ本体ファイルをキャッシュする。
- オフライン時にキャッシュ済みファイルを返す。
- キャッシュのバージョン管理を行う。

---

### 8.2 キャッシュ対象

```javascript
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
```

### 8.3 キャッシュ名

```javascript
const CACHE_NAME = 'tenteki-timer-v1';
```

アプリ更新時は、キャッシュ名を `tenteki-timer-v2` のように変更する。

---

## 9. GitHub Pages

### 9.1 役割

GitHub Pagesは、静的ファイルを公開するために使用する。

配置するファイル：

- index.html
- style.css
- app.js
- manifest.json
- service-worker.js
- icons/

### 9.2 利用手順イメージ

```text
GitHubリポジトリを作成
  ↓
ファイル一式を配置
  ↓
GitHub Pagesを有効化
  ↓
公開URLをスマホで開く
  ↓
ホーム画面に追加
  ↓
初回読み込み後はオフライン利用
```

---

## 10. 対象環境

### 10.1 対象端末

- iPhone
- Android

### 10.2 対象ブラウザ

- iPhone：Safariを主対象
- Android：Chrome系ブラウザを主対象

### 10.3 画面サイズ

スマホ縦持ちを主対象にする。

- 片手操作しやすいこと
- 入力欄が小さすぎないこと
- 結果が大きく見えること

---

## 11. 開発方針

### 11.1 MVP優先

最初に作るものは、機能を絞ったMVPとする。

MVPで実装するもの：

- 1画面UI
- 残量入力
- 終了予定時刻入力
- 滴下係数選択
- 計算ボタン
- 結果表示
- 条件表示
- エラー表示
- PWA対応
- オフライン対応

MVPで実装しないもの：

- 履歴保存
- 患者情報入力
- タイマー通知
- カウントダウン
- 薬剤計算
- 輸液ポンプ設定
- 認証

---

## 12. ディレクトリ構成案

```text
tenteki-timer/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── service-worker.js
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

`README.md` は任意だが、GitHub上で管理する場合は作成を推奨する。

READMEに書く内容：

- アプリ概要
- 使い方
- 注意事項
- GitHub Pagesでの公開方法
- 更新履歴

---

## 13. 品質確認のためのチェックリスト

### 13.1 計算

- [ ] mL/hが整数で表示される。
- [ ] 滴/分が整数で表示される。
- [ ] 秒/滴が整数で表示される。
- [ ] 滴/分が1未満の場合、秒/滴が表示されない。
- [ ] mL/hが1未満の場合、「1mL/h未満」と表示される。

### 13.2 入力

- [ ] 残量の空欄エラーが表示される。
- [ ] 終了予定時刻の空欄エラーが表示される。
- [ ] 残量0mL以下でエラーが表示される。
- [ ] 残量2500mL超でエラーが表示される。
- [ ] 15 / 20 / 60滴/mLを選択できる。
- [ ] 初期値が20滴/mLになっている。

### 13.3 丸め

- [ ] 123mLが120mLになる。
- [ ] 125mLが130mLになる。
- [ ] 08:14が08:10になる。
- [ ] 08:15が08:20になる。
- [ ] 丸め後の終了予定時刻で当日・翌日判定される。

### 13.4 UI

- [ ] 1画面で完結している。
- [ ] 秒/滴が一番大きく表示される。
- [ ] 条件表示が小さく表示される。
- [ ] ライトモードで見やすい。
- [ ] ダークモードで見やすい。

### 13.5 PWA

- [ ] manifest.jsonが読み込まれる。
- [ ] Service Workerが登録される。
- [ ] ホーム画面に追加できる。
- [ ] 初回読み込み後にオフラインで開ける。
- [ ] オフラインでも計算できる。

---

## 14. 技術選定理由まとめ

このアプリは、1画面で完結する計算補助ツールである。入力値の保存や外部通信を必要としないため、フレームワークやサーバーを導入する必要性は低い。

そのため、MVPでは以下の構成が最も適している。

```text
HTML
+ CSS
+ JavaScript
+ Web App Manifest
+ Service Worker
+ GitHub Pages
```

この構成により、以下を満たせる。

- ストア公開なしで使える。
- iPhone / Androidの両方で使える。
- ホーム画面に追加できる。
- 初回読み込み後はオフラインで使える。
- 入力値や計算結果を保存しない。
- コード量を少なく保てる。
- 後からReact化する余地も残せる。

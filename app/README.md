# app

このディレクトリは、点滴タイマーの実装コード、テスト、一時作業領域、出力物置き場として使う。

## 主なサブディレクトリ

- `app/src/`: 静的PWA本体
- `app/tests/`: ブラウザで開くロジック確認用テスト
- `app/tmp/`: 一時作業用
- `app/outbox/`: 明確な目的がある場合の出力先

## 現在の実装

- `app/src/calc.js`: DOM非依存の計算ロジック
- `app/src/app.js`: DOM操作、イベント処理、結果表示
- `app/src/index.html`: 1画面UI
- `app/src/style.css`: スマホ向けUI、ライト/ダークモード
- `app/src/manifest.json`: PWA設定
- `app/src/service-worker.js`: オフラインキャッシュ
- `app/src/icons/`: 仮アイコン
- `app/tests/calculation-test.html`: 固定 `now` を渡すロジックテスト

## 注意

- HTML / CSS / JavaScript のみで実装する。
- React、ビルドツール、外部API、DB、ユーザーデータ保存APIは追加しない。
- `localStorage`、`sessionStorage`、`IndexedDB`、Cookieは使わない。
- Cache APIはService Workerがアプリ本体ファイルをオフライン利用する目的に限って使う。

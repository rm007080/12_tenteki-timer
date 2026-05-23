# 現在進行

## 次の1テーマ

秒針ガイド機能の残確認として、v1キャッシュからv2への更新確認、スマホ実機ホーム画面追加確認、MVP完了条件の最終確認に進む。

## 作業中

- [ ] v1キャッシュ導入済み状態からv2へ更新できることを確認する
- [ ] スマホ実機でホーム画面追加を確認する
- [ ] MVP完了条件の最終確認を行う

## 秒針ガイド 実装確認

- [x] `app/tests/calculation-test.html` で 36 / 36 件成功を確認する
- [x] ブラウザで計算前非表示、計算後表示、毎秒更新、前回結果表示、対象外表示、短間隔ラベル非表示を確認する
- [x] 360x640 と 320x640 で横スクロールが出ないことを確認する
- [x] サーバー停止後の再読み込みで、オフライン相当でも計算と秒針ガイド表示ができることを確認する
- [ ] v1キャッシュ導入済み状態からv2へ更新できることを確認する

## 秒針ガイド計画レビュー結果

- [x] 残P1/P2を `doc/architecture/byosingaido-plan.md` に反映する
- [x] `codex-plan-review` を再実施し、シニアエンジニア観点で P0/P1/P2 0件を確認する
- [x] `codex-plan-review` を再実施し、UI/UX観点で P0/P1/P2 0件を確認する

## 次に続く作業

- [ ] GitHub Pages公開URLまたはローカルHTTP配信で、スマホ実機のホーム画面追加を確認する
- [ ] `doc/architecture/implementation-plan.md` の完了条件を実態に合わせて最終更新する

## 完了

- [x] 秒針ガイド計画を正本文書と実装チェックリストへ反映する
- [x] 秒針ガイドの計算ロジックとテストを実装する
- [x] 秒針ガイドのUI、タイマー管理、PWA更新を実装する
- [x] ローカルプレビューとポート確認のつまずきを `logs/2026-05-24_local-preview-port-troubleshooting.md` に記録する
- [x] `doc/architecture/overview.md` のルート直下配置案を `app/src/` 配置へ更新する
- [x] `doc/architecture/tech-stack.md` のルート直下配置案を `app/src/` 配置へ更新する
- [x] GitHub Pages公開元はリポジトリルート、アプリURLは `/<repo>/app/src/` と明記する
- [x] PWAのスコープは `/<repo>/app/src/` ディレクトリ内と明記する
- [x] 標準ディレクトリ側を参照する状態にそろえる
- [x] `app/src/calc.js` の計算ロジック実装
- [x] `app/tests/calculation-test.html` のロジックテスト作成
- [x] `app/src/index.html` と `app/src/style.css` のUI実装
- [x] `app/src/manifest.json` と `app/src/service-worker.js` のPWA実装
- [x] `app/src/` のHTTP配信、UI挙動、静的PWA設定、GitHub Pages想定URLの確認
- [x] 実ブラウザでService Worker登録、オフライン表示、オフライン計算を確認
- [x] 秒針ガイド機能の初期計画を作成する
- [x] 秒針ガイド機能計画に `codex-plan-review` を実施する
- [x] 秒針ガイド機能計画へ1回目のレビュー結果を反映する
- [x] 秒針ガイド機能計画を再レビューする
- [x] 秒針ガイド計画に残P1/P2を反映し、最終レビューで P0/P1/P2 0件を確認する

# 現在進行

## 次の1テーマ

`doc/architecture/byosingaido-plan.md` の計画に沿って、秒針ガイド機能の実装に進む。

## 作業中

- [ ] 秒針ガイド計画を正本文書と実装チェックリストへ反映する
- [ ] 秒針ガイドの計算ロジックとテストを実装する
- [ ] 秒針ガイドのUI、タイマー管理、PWA更新を実装する

## 秒針ガイド計画レビュー結果

- [x] 残P1/P2を `doc/architecture/byosingaido-plan.md` に反映する
- [x] `codex-plan-review` を再実施し、シニアエンジニア観点で P0/P1/P2 0件を確認する
- [x] `codex-plan-review` を再実施し、UI/UX観点で P0/P1/P2 0件を確認する

## 次に続く作業

- [ ] MVPのスマホ実機ホーム画面追加を確認する
- [ ] MVP完了条件の最終確認を行う

## 完了

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

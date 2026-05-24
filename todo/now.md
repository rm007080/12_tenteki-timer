# 現在進行

## 次の1テーマ

v2キャッシュ導入済み状態からv3へ更新できることを実ブラウザまたは実機相当で確認し、その後GitHub Pages URLとiPhone / Android実機PWA確認を行ってMVP完了条件を閉じる。

## 作業中

- [x] `doc/architecture/byosingaido-simplify-plan.md` フェーズ1〜3に沿って、SVG盤面内表示、DOM更新、CSS、Service Workerを更新する
- [x] `doc/architecture/byosingaido-simplify-plan.md` フェーズ4に沿って、関連ドキュメントと `todo/` を更新する
- [x] `app/tests/calculation-test.html` から `showDialLabels` 前提の確認を削除し、既存角度確認を維持する
- [x] ローカルHTTP配信でロジックテストを全件成功させる
- [x] 320x640 / 360x640 のダーク表示で `N > 2` / `N = 2` / `N = 1` を確認し、ライト/ダークの主要コントラストをCSS値から確認する
- [ ] v2キャッシュ導入済み状態からv3へ更新できることを確認する
- [ ] GitHub Pages URLで主端末スモーク確認を行う
- [ ] iPhone / Android 両方でホーム画面追加、ホーム画面起動、オフライン再起動、オフライン計算を確認する
- [ ] MVP完了条件の最終確認を行う

## 秒針ガイド簡素化計画

- [x] 秒針ガイド簡素化計画を `doc/architecture/byosingaido-simplify-plan.md` に作成する
- [x] `codex-plan-review` を実施し、レビュー指摘を反映する
- [x] 最終レビューでシニアエンジニア観点 P0/P1/P2 0件を確認する
- [x] 最終レビューで UI/UX 観点 P0/P1/P2 0件を確認する
- [x] `plan-to-checklist` を実施し、フェーズ別チェックリストへ再構成する

## 秒針ガイド 実装確認

- [x] `app/tests/calculation-test.html` で 36 / 36 件成功を確認する
- [x] ブラウザで計算前非表示、計算後表示、毎秒更新、前回結果表示、対象外表示、短間隔ラベル非表示を確認する
- [x] 360x640 と 320x640 で横スクロールが出ないことを確認する
- [x] サーバー停止後の再読み込みで、オフライン相当でも計算と秒針ガイド表示ができることを確認する

## 秒針ガイド計画レビュー結果

- [x] 残P1/P2を `doc/architecture/byosingaido-plan.md` に反映する
- [x] `codex-plan-review` を再実施し、シニアエンジニア観点で P0/P1/P2 0件を確認する
- [x] `codex-plan-review` を再実施し、UI/UX観点で P0/P1/P2 0件を確認する

## 次に続く作業

- [x] 秒針ガイド簡素化実装後、`doc/architecture/implementation-plan.md` の完了条件を実態に合わせて最終更新する
- [ ] MVP完了条件を閉じる場合は、iPhone / Android 両方の実機PWA確認結果を `todo/now.md` と `doc/architecture/implementation-plan.md` に反映する

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
- [x] 秒針ガイド簡素化を実装し、`app/tests/calculation-test.html` で 36 / 36 件成功を確認する
- [x] 320x640 / 360x640 のダーク表示で、通常間隔、2秒、1秒の秒針ガイド表示を確認する
- [x] `doc/operations/handover.md` と `doc/operations/Next-Agent-Prompt.md` を最新状態へ更新する

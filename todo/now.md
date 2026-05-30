# 現在進行

## 次の1テーマ

MVP v1.0 は完了済み。

`doc/architecture/04_byoshin-only-plan.md` に沿った、既存の計算連動秒針ガイドから「常時表示の現在秒時計」への置き換えは完了済み。

現時点の次テーマは未設定。

## 作業中

- [ ] 次の改善テーマを決める

## 完了

- [x] `doc/architecture/04_byoshin-only-plan.md` に沿って、秒針時計化を実装する
- [x] 実装に合わせて `AGENTS.md`、`README.md`、正本文書、`todo/`、引継ぎ文書の旧パスと秒針仕様を更新する
- [x] `app/tests/calculation-test.html` に `getSecondClockState()` の固定時刻テストを追加し、25 / 25 件成功を確認する
- [x] Service Workerのキャッシュ名を `tenteki-timer-v4` に更新する
- [x] v3キャッシュ導入済み状態からv4へ更新できることを確認する
- [x] v4更新後、オフラインで時計盤付き表示と計算ができることを確認する
- [x] `doc/architecture/03_byosingaido-simplify-plan.md` フェーズ1〜3に沿って、SVG盤面内表示、DOM更新、CSS、Service Workerを更新する
- [x] `doc/architecture/03_byosingaido-simplify-plan.md` フェーズ4に沿って、関連ドキュメントと `todo/` を更新する
- [x] `app/tests/calculation-test.html` から `showDialLabels` 前提の確認を削除し、既存角度確認を維持する
- [x] ローカルHTTP配信でロジックテストを全件成功させる
- [x] 320x640 / 360x640 のダーク表示で `N > 2` / `N = 2` / `N = 1` を確認し、ライト/ダークの主要コントラストをCSS値から確認する
- [x] v2キャッシュ導入済み状態からv3へ更新できることを確認する
- [x] GitHub Pages URLで主端末スモーク確認を行う
- [x] iPhone / Android 両方でホーム画面追加、ホーム画面起動、オフライン再起動、オフライン計算を確認する
- [x] MVP完了条件の最終確認を行う
- [x] 秒針ガイド簡素化実装後、`doc/architecture/01_implementation-plan.md` の完了条件を実態に合わせて最終更新する
- [x] MVP完了条件を閉じるため、iPhone / Android 両方の実機PWA確認結果を `todo/now.md` と `doc/architecture/01_implementation-plan.md` に反映する
- [x] 秒針時計化計画を `doc/architecture/04_byoshin-only-plan.md` に作成した
- [x] 秒針時計化計画に `codex-plan-review` を実施し、レビュー結果を反映して P0/P1/P2 0件を確認した

## 完了済みの主要成果

- [x] 標準ワークスペース構成を作成した
- [x] 既存詳細文書の内容を標準ディレクトリ側へ統合し、正本化した
- [x] `README.md` と `AGENTS.md` に標準ディレクトリ側を正本として扱う方針を反映した
- [x] `doc/architecture/overview.md` のルート直下配置案を `app/src/` 配置へ更新した
- [x] `doc/architecture/tech-stack.md` のルート直下配置案を `app/src/` 配置へ更新した
- [x] GitHub Pages公開元はリポジトリルート、アプリURLは `/<repo>/app/src/` と明記した
- [x] PWAのスコープは `/<repo>/app/src/` ディレクトリ内と明記した
- [x] 標準ディレクトリ側を参照する状態にそろえた
- [x] `app/src/calc.js` の計算ロジックを実装した
- [x] `app/tests/calculation-test.html` のロジックテストを作成した
- [x] `app/src/index.html` と `app/src/style.css` のUIを実装した
- [x] `app/src/manifest.json` と `app/src/service-worker.js` のPWA構成を実装した
- [x] `app/src/` のHTTP配信、UI挙動、静的PWA設定、GitHub Pages想定URLを確認した
- [x] 実ブラウザでService Worker登録、オフライン表示、オフライン計算を確認した
- [x] 秒針ガイド機能の初期計画を作成した
- [x] 秒針ガイド機能計画に `codex-plan-review` を実施した
- [x] 秒針ガイド機能計画へレビュー結果を反映した
- [x] 秒針ガイド計画の最終レビューで P0/P1/P2 0件を確認した
- [x] 秒針ガイド計画を正本文書と実装チェックリストへ反映した
- [x] 秒針ガイドの計算ロジックとテストを実装した
- [x] 秒針ガイドのUI、タイマー管理、PWA更新を実装した
- [x] ローカルプレビューとポート確認のつまずきを `logs/2026-05-24_local-preview-port-troubleshooting.md` に記録した
- [x] 秒針ガイド簡素化計画を `doc/architecture/03_byosingaido-simplify-plan.md` に作成した
- [x] `codex-plan-review` を実施し、レビュー指摘を反映した
- [x] 秒針ガイド簡素化計画をフェーズ別チェックリストへ再構成した
- [x] 秒針ガイド簡素化を実装し、`app/tests/calculation-test.html` で 36 / 36 件成功を確認した
- [x] 320x640 / 360x640 のダーク表示で、通常間隔、2秒、1秒の秒針ガイド表示を確認した
- [x] v2キャッシュ導入済み状態からv3への更新、GitHub Pages、iPhone / Android 実機PWA確認を完了した
- [x] `doc/operations/handover.md` と `doc/operations/Next-Agent-Prompt.md` をMVP完了状態へ更新した

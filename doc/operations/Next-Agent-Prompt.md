# Next Agent Prompt

このリポジトリは `C:\Users\littl\app-dev\12_tenteki-timer` です。

まず次を読んでください。

1. `AGENTS.md`
2. `README.md`
3. `specs/requirements.md`
4. `doc/architecture/overview.md`
5. `doc/architecture/tech-stack.md`
6. `doc/architecture/implementation-plan.md`
7. `doc/architecture/byosingaido-plan.md`
8. `doc/architecture/byosingaido-simplify-plan.md`
9. `doc/operations/handover.md`
10. `todo/now.md`

## 現状

- MVP本体は `app/src/` に実装済み。
- 計算ロジックテストは `app/tests/calculation-test.html` にある。
- Service Worker登録、オフライン表示、オフライン計算は実ブラウザで確認済み。
- 秒針ガイド機能は `doc/architecture/byosingaido-plan.md` に沿って実装済み。
- `app/tests/calculation-test.html` は 36 / 36 件成功を確認済み。
- 秒針ガイドは、計算前非表示、計算後表示、毎秒更新、前回結果表示、対象外表示、短間隔ラベル非表示、360x640 / 320x640 の横スクロールなしを確認済み。
- サーバー停止後の再読み込みで、オフライン相当でも秒針ガイド付きの計算ができることを確認済み。
- 秒針ガイド簡素化計画は `doc/architecture/byosingaido-simplify-plan.md` にあり、`codex-plan-review` 最終結果はシニアエンジニア観点・UI/UX観点ともに P0/P1/P2 0件。
- `doc/architecture/byosingaido-simplify-plan.md` は `plan-to-checklist` 済みで、フェーズ別チェックリストになっている。
- 残件は、秒針ガイド簡素化の実装、Service Worker v3更新、v2導入済み状態からv3への更新確認、スマホ実機ホーム画面追加確認、MVP完了条件の最終確認。
- ローカルプレビューとポート確認のつまずきは `logs/2026-05-24_local-preview-port-troubleshooting.md` に記録済み。ただし `logs/*` は `.gitignore` 対象。
- `doc/architecture/byosingaido-simplify-plan.md` は現時点で未追跡ファイル。

## 次の1テーマ

`doc/architecture/byosingaido-simplify-plan.md` に沿って、秒針ガイドの盤面内表示を簡素化し、Service Workerを `tenteki-timer-v3` へ更新したうえで、ブラウザ表示、v2導入済み状態からv3へのPWA更新、スマホ実機ホーム画面追加、MVP完了条件を確認する。

## 実装の要点

- SVG盤面内の12/3/6/9時基準目盛りと「次」「2つ先」テキストを削除する。
- 外側凡例はSVG直前へ移し、文言を「実線: 次の目印」「破線: 2つ先の目印」にする。
- `app.js` からラベルDOM参照、`setLabelByAngle()`、ラベル表示制御を削除する。
- `calc.js` の `getSecondGuideState()` から `showDialLabels` を削除する。
- 目印線の長さ判定は `app.js` 側で `var usesLongMarkers = state.intervalSeconds > 2` として明示する。
- 読み上げ用固定文に「実線が次の目印、破線が2つ先の目印です」を含める。
- `style.css` から削除するのは `.guide-reference` と `.guide-label` に限定し、`.guide-legend`、`.legend-line`、`.legend-line-dashed`、`.sr-only` は残す。
- `service-worker.js` の `CACHE_NAME` を `tenteki-timer-v3` に更新する。
- 旧キャッシュ削除は `tenteki-timer-` で始まるCacheだけを対象にし、無関係Cacheを削除しない。

## 再開コマンド

ローカルHTTP配信:

```powershell
python -m http.server 4180 --bind 127.0.0.1
```

アプリ本体:

```text
http://127.0.0.1:4180/app/src/
```

ロジックテスト:

```text
http://127.0.0.1:4180/app/tests/calculation-test.html
```

ポート確認:

```powershell
Get-NetTCPConnection -LocalPort 4180 -State Listen -ErrorAction SilentlyContinue
```

`http://127.0.0.1:4180/` だけを開くとリポジトリルートの一覧が出る。アプリを見るには `/app/src/` まで付ける。

## 確認すること

- `app/tests/calculation-test.html` は、`showDialLabels` 前提の確認を削除したうえで全件成功させる。
- 320x640 / 360x640 × ライト/ダーク × `N > 2` / `N = 2` / `N = 1` で、横スクロールなし、秒針、次目印、2つ先目印、色付き範囲、凡例が読めることを確認する。
- v2キャッシュ導入済み状態からv3へ更新できることを確認する。
- v3更新確認時は、v2状態のタブまたはPWAを閉じて再起動するか、DevToolsで `waiting` / `activated` 状態を確認してから再読み込みする。
- `tenteki-timer-v2` が削除され、無関係Cacheが削除されないことを確認する。
- GitHub Pages `https://rm007080.github.io/12_tenteki-timer/app/src/` で主端末スモーク確認を行う。
- MVP完了判定では、iPhone / Android 両方でホーム画面追加、ホーム画面起動、初回オンライン読み込み後の機内モード切替、ホーム画面アイコンからの再起動、オフライン計算を確認する。

## 守ること

- 正本は `specs/requirements.md`、`doc/architecture/overview.md`、`doc/architecture/tech-stack.md`。
- `archive/` の文書は更新しない。
- HTML / CSS / JavaScript のみ。React、ビルドツール、外部API、DB、ユーザーデータ保存APIは追加しない。
- 実装本体は `app/src/` 配下に置く。
- 計算ロジックや秒針ガイド状態はDOMから分離し、固定した `now` / `nowMs` で確認できる形にする。
- 医療判断を代替する表現を入れない。
- ユーザー入力値、計算結果、利用履歴を永続保存しない。
- `localStorage`、`sessionStorage`、`IndexedDB`、Cookieは使わない。

## 確認メモ

- 秒針ガイド計画レビューは P0/P1/P2 0件まで確認済み。
- 秒針ガイド簡素化計画レビューも P0/P1/P2 0件まで確認済み。
- MVPを閉じる場合は、iPhone / Android 両方のホーム画面追加とオフライン再起動後の計算を確認し、`doc/architecture/implementation-plan.md` と `todo/now.md` を更新する。

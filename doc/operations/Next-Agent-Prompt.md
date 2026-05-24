# Next Agent Prompt

あなたは `C:\Users\littl\app-dev\12_tenteki-timer` を引き継いだ実装担当です。目的は、未完了のPWA更新確認と実機確認を終わらせ、MVP完了条件を閉じられるか判断することです。

## 最初に読むもの

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

## 現在の到達点

- MVP本体は `app/src/` に実装済み。
- 秒針ガイド機能と秒針ガイド簡素化は実装済み。
- SVG盤面内の12 / 3 / 6 / 9時基準目盛りと「次」「2つ先」テキストは削除済み。
- 外側凡例はSVG直前へ移動済みで、文言は「実線: 次の目印」「破線: 2つ先の目印」。
- `calc.js` の `getSecondGuideState()` から `showDialLabels` は削除済み。
- `app.js` のラベルDOM参照、`setLabelByAngle()`、ラベル表示制御は削除済み。
- Service Workerは `tenteki-timer-v3`。
- 旧Cache削除は `tenteki-timer-` で始まるCacheだけを対象にしている。
- `app/tests/calculation-test.html` は簡素化後も 36 / 36 件成功。
- 320x640 / 360x640 のダーク表示で `N > 2` / `N = 2` / `N = 1` を確認済み。
- ライト/ダークの主要テキストとガイド線コントラストはCSS値から確認済み。

## いま残っている主タスク

1. v2キャッシュ導入済み状態からv3へ更新できることを、実ブラウザまたは実機相当で確認する。
2. GitHub Pages `https://rm007080.github.io/12_tenteki-timer/app/src/` で主端末スモーク確認を行う。
3. iPhone / Android 両方でホーム画面追加、ホーム画面起動、オフライン再起動、オフライン計算を確認する。
4. MVP完了条件を閉じられる場合は `doc/architecture/implementation-plan.md` と `todo/now.md` を更新する。

まずは1つに絞り、v2→v3のPWA更新確認から着手してください。

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

構文確認:

```powershell
node --check app/src/app.js
node --check app/src/calc.js
node --check app/src/service-worker.js
git diff --check
```

ポート確認:

```powershell
Get-NetTCPConnection -LocalPort 4180 -State Listen -ErrorAction SilentlyContinue
```

`http://127.0.0.1:4180/` だけを開くとリポジトリルートの一覧が出ます。アプリを見るには `/app/src/` まで付けてください。

## 確認すること

- `app/tests/calculation-test.html` が `36 / 36 件成功` のままか。
- v2キャッシュ導入済み状態を作れるか。
- v2状態からv3へ更新できるか。
- `tenteki-timer-v2` が削除されるか。
- 無関係Cacheが削除されないか。
- 更新後UIが表示されるか。
- オフライン再読み込みできるか。
- オフラインで計算できるか。
- GitHub Pages URLで計算できるか。
- iPhone / Android 両方でホーム画面追加、ホーム画面起動、機内モード後の再起動、オフライン計算ができるか。

## 注意

- この環境のブラウザ評価コンテキストでは `navigator.serviceWorker` / `caches` が読めなかったため、実Cache更新確認は未完了です。DevToolsまたは実機側で確認してください。
- `logs/*` は `.gitignore` 対象です。既存の `logs/2026-05-24_local-preview-port-troubleshooting.md` は通常の `git status` には出ません。
- `archive/` は元文書の保管場所なので更新しないでください。
- `data/inputs/`、`app/outbox/`、`logs/` は明確な目的がある場合以外は触らないでください。
- HTML / CSS / JavaScript のみ。React、ビルドツール、外部API、DB、保存APIは追加しないでください。
- `localStorage`、`sessionStorage`、`IndexedDB`、Cookieは使わないでください。
- 医療判断を代替する表現を入れないでください。

## 完了時に更新するもの

- `doc/operations/handover.md`
- `doc/operations/Next-Agent-Prompt.md`
- `todo/now.md`
- `doc/architecture/implementation-plan.md`

MVPを閉じる場合は、iPhone / Android 両方のホーム画面追加とオフライン再起動後の計算確認結果を必ず反映してください。

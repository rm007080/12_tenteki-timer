# Next Agent Prompt

あなたは `C:\Users\littl\app-dev\12_tenteki-timer` を引き継いだ実装担当です。

MVP v1.0、秒針ガイド追加、秒針ガイド簡素化、秒針時計化は完了済みです。現時点の次テーマは未設定です。

## 最初に読むもの

1. `AGENTS.md`
2. `README.md`
3. `specs/requirements.md`
4. `doc/architecture/overview.md`
5. `doc/architecture/tech-stack.md`
6. `doc/architecture/01_implementation-plan.md`
7. `doc/architecture/04_byoshin-only-plan.md`
8. `doc/operations/handover.md`
9. `todo/now.md`

## 現在の到達点

- MVP本体は `app/src/` に実装済み。
- 計算連動の秒針ガイドは廃止済み。
- 起動直後から結果パネル下部に、計算結果と連動しない常時表示の「現在秒」時計が表示される。
- 時計盤には 0, 5, 10 ... 55 の数字、60本目盛り、5秒ごとの長い目盛りがある。
- 時計盤の近くに「現在秒」と「現在時刻の秒です。滴下タイミングを示すものではありません。」を表示している。
- 「次の目印」「2つ先の目印」「色付き範囲」「凡例」「対象外表示」は削除済み。
- 前回結果表示は結果側の小さな表示欄に移動済み。
- `calc.js` には `getSecondClockState(nowMs)` があり、`getSecondGuideState()` とガイド専用戻り値は削除済み。
- Service Workerは現在 `tenteki-timer-v4`。
- 旧Cache削除は `tenteki-timer-` で始まるCacheだけを対象にしている。

## 確認済み

- `app/tests/calculation-test.html`: `25 / 25 件成功`。
- `node --check app/src/app.js`: 成功。
- `node --check app/src/calc.js`: 成功。
- `node --check app/src/service-worker.js`: 成功。
- `git diff --check`: 成功。
- 320px / 360px 幅のフレーム検証で横スクロールなし、時計SVG幅200px、60本目盛り、12個の数字を確認。
- ダークテーマの主要時計色はCSS値から、本文14.82:1、補助文9.01:1、秒針13.01:1、1秒目盛り11.05:1、盤面外周3.33:1を確認。
- 初期表示で時計盤が表示され、時計の毎秒更新が live region のテキストを毎秒更新しないことを確認。
- 入力変更・エラー時に前回結果表示が結果側に出ることを確認。
- 計算成功時に前回結果表示が消えることを確認。
- v3キャッシュ導入済み状態からv4へ更新できることを確認。
- v4更新後、オフラインで時計盤付き表示と計算ができることを確認。

## 再開コマンド

ローカルHTTP配信:

```powershell
python -m http.server 4180 --bind 127.0.0.1
```

アプリ本体:

```text
http://127.0.0.1:4180/app/src/
```

`localhost:4180` ではなく `127.0.0.1:4180` を優先してください。環境によって `localhost` が `::1` 側へ解決され、`--bind 127.0.0.1` のサーバーに届かない場合があります。

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

起動したPowerShellが分からない場合の停止:

```powershell
$serverPid = (Get-NetTCPConnection -LocalPort 4180 -State Listen -ErrorAction SilentlyContinue).OwningProcess
if ($serverPid) { Stop-Process -Id $serverPid }
```

`http://127.0.0.1:4180/` だけを開くとリポジトリルートの一覧が出ます。アプリを見るには `/app/src/` まで付けてください。

## 注意

- `archive/` は元文書の保管場所なので更新しないでください。
- `data/inputs/`、`app/outbox/`、`logs/` は明確な目的がある場合以外は触らないでください。
- `app/tmp/` は一時作業用です。成果物の正本にしないでください。
- HTML / CSS / JavaScript のみ。React、ビルドツール、外部API、DB、保存APIは追加しないでください。
- `localStorage`、`sessionStorage`、`IndexedDB`、Cookieは使わないでください。
- 医療判断を代替する表現を入れないでください。
- 新しい計画を作る場合は `doc/architecture/00_plan-template.md` を使い、`PWA更新確認` を必ず埋めてください。

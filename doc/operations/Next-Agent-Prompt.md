# Next Agent Prompt

あなたは `C:\Users\littl\app-dev\12_tenteki-timer` を引き継いだ実装担当です。

MVP v1.0 は完了済みです。次の主タスクは、`doc/architecture/04_byoshin-only-plan.md` に沿って、既存の計算連動秒針ガイドを常時表示の「現在秒」時計へ置き換えることです。

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
- 秒針ガイド機能と秒針ガイド簡素化は実装済み。
- Service Workerは現在 `tenteki-timer-v3`。
- 旧Cache削除は `tenteki-timer-` で始まるCacheだけを対象にしている。
- `app/tests/calculation-test.html` は簡素化後も 36 / 36 件成功。
- v2キャッシュ導入済み状態からv3へ更新できることを確認済み。
- GitHub Pages `https://rm007080.github.io/12_tenteki-timer/app/src/` で主端末スモーク確認済み。
- iPhone / Android 両方でホーム画面追加、ホーム画面起動、オフライン再起動、オフライン計算を確認済み。
- 秒針時計化計画 `doc/architecture/04_byoshin-only-plan.md` は `codex-plan-review` 済みで P0/P1/P2 0件。
- 秒針時計化の実装は未着手。

## 現在の主タスク

`doc/architecture/04_byoshin-only-plan.md` に従って実装する。

実装の要点:

- 起動直後から結果パネル下部に秒針時計を表示する。
- 時計は計算結果と連動させない。
- 時計盤には 0, 5, 10 ... 55 の数字、60本目盛り、5秒ごとの長い目盛りを置く。
- 時計盤の近くに「現在秒」と「現在時刻の秒です。滴下タイミングを示すものではありません。」を表示する。
- 「次の目印」「2つ先の目印」「色付き範囲」「凡例」「対象外表示」は削除する。
- 前回結果表示は秒針周辺ではなく、結果側の小さな表示欄に移す。
- `calc.js` に `getSecondClockState(nowMs)` を追加し、固定時刻テストで確認する。
- Service Workerのキャッシュ名を `tenteki-timer-v4` に上げる。
- `AGENTS.md`、`README.md`、`todo/now.md`、引継ぎ文書に残る旧パスも番号付き文書へ統一する。
- 新しい計画を追加する場合は `doc/architecture/00_plan-template.md` を使い、`PWA更新確認` を必ず埋める。

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

## 実装後に必ず確認すること

- `app/tests/calculation-test.html` に `getSecondClockState()` の固定時刻テストを追加し、全件成功を確認する。
- `node --check app/src/app.js`
- `node --check app/src/calc.js`
- `node --check app/src/service-worker.js`
- `git diff --check`
- 320px / 360px幅、ライト / ダークで時計盤が読めること。
- 計算成功後、結果パネル全体へスクロールし、計算結果と時計盤が同じ流れで見えること。
- 入力変更・エラー時に前回結果表示が結果側に出ること。
- 計算成功時に前回結果表示が消えること。
- 時計の毎秒更新が読み上げ用テキストや live region を毎秒更新しないこと。
- v3キャッシュ導入済み状態からv4へ更新できること。
- v4更新後、オフラインで時計盤付き表示と計算ができること。

## 注意

- `archive/` は元文書の保管場所なので更新しないでください。
- `data/inputs/`、`app/outbox/`、`logs/` は明確な目的がある場合以外は触らないでください。
- HTML / CSS / JavaScript のみ。React、ビルドツール、外部API、DB、保存APIは追加しないでください。
- `localStorage`、`sessionStorage`、`IndexedDB`、Cookieは使わないでください。
- 医療判断を代替する表現を入れないでください。
- 現在、アーキテクチャ文書は番号付きファイルへ整理されています。旧パスへ戻さず、実在する番号付き文書を正として扱ってください。

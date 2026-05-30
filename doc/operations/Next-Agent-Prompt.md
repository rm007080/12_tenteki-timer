# Next Agent Prompt

あなたは `C:\Users\littl\app-dev\12_tenteki-timer` を引き継いだ実装担当です。

このプロジェクトの MVP v1.0 は完了済みです。現時点で継続中の実装タスクや確認待ちはありません。次に作業する場合は、ユーザーが指定する改善・追加要件を新しいテーマとして扱ってください。

## 最初に読むもの

1. `AGENTS.md`
2. `README.md`
3. `specs/requirements.md`
4. `doc/architecture/overview.md`
5. `doc/architecture/tech-stack.md`
6. `doc/architecture/implementation-plan.md`
7. `doc/operations/handover.md`
8. `todo/now.md`

## 現在の到達点

- MVP本体は `app/src/` に実装済み。
- 秒針ガイド機能と秒針ガイド簡素化は実装済み。
- Service Workerは `tenteki-timer-v3`。
- 旧Cache削除は `tenteki-timer-` で始まるCacheだけを対象にしている。
- `app/tests/calculation-test.html` は簡素化後も 36 / 36 件成功。
- v2キャッシュ導入済み状態からv3へ更新できることを確認済み。
- GitHub Pages `https://rm007080.github.io/12_tenteki-timer/app/src/` で主端末スモーク確認済み。
- iPhone / Android 両方でホーム画面追加、ホーム画面起動、オフライン再起動、オフライン計算を確認済み。
- MVP完了条件はすべて完了済み。

## 現在の主タスク

なし。

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

## 注意

- `archive/` は元文書の保管場所なので更新しないでください。
- `data/inputs/`、`app/outbox/`、`logs/` は明確な目的がある場合以外は触らないでください。
- HTML / CSS / JavaScript のみ。React、ビルドツール、外部API、DB、保存APIは追加しないでください。
- `localStorage`、`sessionStorage`、`IndexedDB`、Cookieは使わないでください。
- 医療判断を代替する表現を入れないでください。

## 次に更新する可能性があるもの

新しい改善・追加要件に着手した場合は、内容に応じて次を更新してください。

- `doc/operations/handover.md`
- `doc/operations/Next-Agent-Prompt.md`
- `todo/now.md`
- `doc/architecture/implementation-plan.md`
- 必要な正本文書

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
8. `doc/operations/handover.md`
9. `todo/now.md`

## 現状

- MVP本体は `app/src/` に実装済み。
- 計算ロジックテストは `app/tests/calculation-test.html` にある。
- Service Worker登録、オフライン表示、オフライン計算は実ブラウザで確認済み。
- 秒針ガイド機能は `doc/architecture/byosingaido-plan.md` に沿って実装済み。
- `app/tests/calculation-test.html` は 36 / 36 件成功を確認済み。
- 秒針ガイドは、計算前非表示、計算後表示、毎秒更新、前回結果表示、対象外表示、短間隔ラベル非表示、360x640 / 320x640 の横スクロールなしを確認済み。
- サーバー停止後の再読み込みで、オフライン相当でも秒針ガイド付きの計算ができることを確認済み。
- 残件は、v1キャッシュ導入済み状態からv2へ更新できることの実機相当確認、スマホ実機でのホーム画面追加確認、MVP完了条件の最終確認。
- ローカルプレビューとポート確認のつまずきは `logs/2026-05-24_local-preview-port-troubleshooting.md` に記録済み。ただし `logs/*` は `.gitignore` 対象。

## 次の1テーマ

v1キャッシュ導入済み状態からv2へ更新できることの確認、スマホ実機でのホーム画面追加確認、MVP完了条件の最終確認に進む。

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

## 実装済みの主なポイント

- `calc.js` は `dropsPerMinuteValue`、`secondsPerDropRaw`、`secondsPerDropSeconds`、`isSecondGuideEligible` と `getSecondGuideState(anchorMs, intervalSeconds, nowMs)` をDOM非依存で公開する。
- タイマー管理は再帰的 `setTimeout` と `guideRunId` で古い更新を無視する。
- 成功後の自動リセットは前回結果化のトリガーにしない。ユーザー操作の入力変更やエラー時だけ、表示中のガイドが前回計算結果であることを可視表示する。
- `N <= 2` の短間隔時は盤面上ラベルを出さず、外側凡例と実線/破線で意味を示す。
- 自動スクロール、SVGサイズ、フォーカス、`aria-live`、Service Worker v2更新を反映済み。

## 守ること

- 正本は `specs/requirements.md`、`doc/architecture/overview.md`、`doc/architecture/tech-stack.md`。
- `archive/` の文書は更新しない。
- HTML / CSS / JavaScript のみ。React、ビルドツール、外部API、DB、ユーザーデータ保存APIは追加しない。
- 実装本体は `app/src/` 配下に置く。
- 計算ロジックや秒針ガイド状態はDOMから分離し、固定した `now` / `nowMs` で確認できる形にする。
- 医療判断を代替する表現を入れない。
- ユーザー入力値、計算結果、利用履歴を永続保存しない。

## 確認メモ

- 秒針ガイド計画レビューは P0/P1/P2 0件まで確認済み。
- MVPを閉じる場合は、スマホ実機でホーム画面追加を確認し、`doc/architecture/implementation-plan.md` と `todo/now.md` を更新する。

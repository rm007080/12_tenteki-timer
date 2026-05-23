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
- MVP残件はスマホ実機でのホーム画面追加確認と、MVP完了条件の最終確認。
- 秒針ガイド機能の計画は `doc/architecture/byosingaido-plan.md` にある。
- 秒針ガイド計画は残P1/P2を反映済み。最終 `codex-plan-review` でシニアエンジニア観点、UI/UX観点とも P0 0件 / P1 0件 / P2 0件。

## 次の1テーマ

`doc/architecture/byosingaido-plan.md` の計画に沿って、秒針ガイド機能の実装に進む。

## 実装時に守る主な計画ポイント

- `calc.js` は `dropsPerMinuteValue`、`secondsPerDropRaw`、`secondsPerDropSeconds`、`isSecondGuideEligible` と `getSecondGuideState(anchorMs, intervalSeconds, nowMs)` をDOM非依存で公開する。
- タイマー管理は再帰的 `setTimeout` と `guideRunId` で古い更新を無視する。
- 成功後の自動リセットは前回結果化のトリガーにしない。ユーザー操作の入力変更やエラー時だけ、表示中のガイドが前回計算結果であることを可視表示する。
- `N <= 2` の短間隔時は盤面上ラベルを出さず、外側凡例と実線/破線で意味を示す。
- 自動スクロール、SVGサイズ、色コントラスト、フォーカス、`aria-live`、Service Worker v2更新は `byosingaido-plan.md` の Test Plan に従って確認する。

## 守ること

- 正本は `specs/requirements.md`、`doc/architecture/overview.md`、`doc/architecture/tech-stack.md`。
- `archive/` の文書は更新しない。
- HTML / CSS / JavaScript のみ。React、ビルドツール、外部API、DB、ユーザーデータ保存APIは追加しない。
- 実装本体は `app/src/` 配下に置く。
- 計算ロジックや秒針ガイド状態はDOMから分離し、固定した `now` / `nowMs` で確認できる形にする。
- 医療判断を代替する表現を入れない。
- ユーザー入力値、計算結果、利用履歴を永続保存しない。

## 確認メモ

- `doc/architecture/byosingaido-plan.md` は現時点で未追跡ファイル。
- 秒針ガイド計画レビューは P0/P1/P2 0件まで確認済み。
- MVPを先に閉じる場合は、スマホ実機でホーム画面追加を確認し、`doc/architecture/implementation-plan.md` と `todo/now.md` を更新する。

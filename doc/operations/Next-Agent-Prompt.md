# Next Agent Prompt

このリポジトリは `C:\Users\littl\app-dev\12_tenteki-timer` です。

まず次を読んでください。

1. `AGENTS.md`
2. `README.md`
3. `specs/requirements.md`
4. `doc/architecture/overview.md`
5. `doc/architecture/tech-stack.md`
6. `doc/architecture/implementation-plan.md`
7. `doc/operations/handover.md`
8. `todo/now.md`

次の1テーマは、`doc/architecture/implementation-plan.md` の **フェーズ1: 正本文書の整合** です。

やること:

- `doc/architecture/overview.md` のルート直下配置案を `app/src/` 配置へ更新する。
- `doc/architecture/tech-stack.md` のルート直下配置案を `app/src/` 配置へ更新する。
- GitHub Pages公開元はリポジトリルート、アプリURLは `/<repo>/app/src/`、PWAスコープはそのディレクトリ内という方針にそろえる。
- 更新後、`doc/architecture/implementation-plan.md` のフェーズ1チェックを完了状態へ反映する。
- `todo/now.md` も実際の進捗に合わせて更新する。

守ること:

- 正本は `specs/requirements.md`、`doc/architecture/overview.md`、`doc/architecture/tech-stack.md`。
- `archive/` の文書は更新しない。
- HTML / CSS / JavaScript のみ。React、ビルドツール、外部API、DB、ユーザーデータ保存APIは追加しない。
- 実装本体は `app/src/` 配下に置く。
- 医療判断を代替する表現を入れない。
- ユーザー入力値、計算結果、利用履歴を永続保存しない。

現状:

- 実装ファイルは未作成。
- 実装計画はチェックリスト化済み。
- `codex-plan-review` 済みで、最終的にP0/P1は0件。

# AGENTS.md

## このリポジトリについて

- このプロジェクトは、仕様、設計、意思決定、現在進行、実装、運用が混ざらないように構成する。
- `AGENTS.md` を既定の AI 運用正本として扱う。
- 点滴タイマーは、HTML / CSS / JavaScript のみで作る静的PWAである。
- 個人情報、入力履歴、計算履歴を保存しない方針を守る。

## 最初に読むもの

- `README.md`
- `specs/requirements.md`
- `doc/architecture/overview.md`
- `doc/architecture/tech-stack.md`
- `todo/now.md`

## 正本の扱い

- 要件は `specs/requirements.md` を正本とする。
- アーキテクチャは `doc/architecture/overview.md` を正本とする。
- 技術スタックは `doc/architecture/tech-stack.md` を正本とする。
- ルート直下の `tenteki-timer-*.md` は初期作成時の元文書であり、今後の更新先にしない。

## 作業ルール

- 変更は最小限にし、現在の repo 構造に合わせる。
- 実データや生成物は、明確なユーザー意図なしに編集しない。
- 振る舞い、パス、コマンドを変えたら、ドキュメント更新を残さない。
- 推測コマンドではなく repo 固有の実コマンドを優先する。
- MVPではReact、ビルドツール、外部API、DB、ブラウザ保存APIを追加しない。
- 医療判断を代替する表現をUIやドキュメントに入れない。

## 現時点の検証

- 実装前のため確定したテストコマンドはない。
- 静的HTML/CSS/JSの実装後は、ブラウザで手動確認し、必要に応じてローカルHTTPサーバーでService Workerを確認する。

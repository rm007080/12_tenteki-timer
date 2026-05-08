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
- `doc/architecture/implementation-plan.md`
- `todo/now.md`

## 正本の扱い

- 要件は `specs/requirements.md` を正本とする。
- アーキテクチャは `doc/architecture/overview.md` を正本とする。
- 技術スタックは `doc/architecture/tech-stack.md` を正本とする。
- ルート直下の `tenteki-timer-*.md` は初期作成時の元文書であり、今後の更新先にしない。

## 実装場所

- 実装本体は `app/src/` 配下に置く。
- ロジック確認用の静的テストは `app/tests/` 配下に置く。
- GitHub Pages公開元はリポジトリルート、アプリURLは `/<repo>/app/src/` とする。
- PWAの `start_url`、`scope`、Service Workerのキャッシュ対象は `app/src/` 配下で相対パスが成立する形にする。

## 作業ルール

- 変更は最小限にし、現在の repo 構造に合わせる。
- 実データや生成物は、明確なユーザー意図なしに編集しない。
- 振る舞い、パス、コマンドを変えたら、正本文書と `todo/` の必要箇所も更新する。
- 推測コマンドではなく repo 固有の実コマンドを優先する。
- MVPではReact、ビルドツール、外部API、DB、ブラウザ保存APIを追加しない。
- 医療判断を代替する表現をUIやドキュメントに入れない。
- UIには「自然滴下の計算補助です。指示・施設ルールに従って確認してください。」を表示する。
- 計算ロジックはDOMから分離し、固定した `now` を渡して確認できる形にする。

## 外部ドキュメント確認

- コード生成、セットアップ手順、ライブラリ/APIドキュメント確認が必要な場合は Context7 を使う。
- Context7 は `mcp__context7__resolve-library-id` で対象を解決してから、`mcp__context7__query-docs` で確認する。
- MVPでは外部ライブラリを追加しない。Web API確認が必要な場合だけ、Service Worker、Cache API、Web App Manifestなどの仕様確認に使う。

## 保存と通信の禁止

- 患者名、部屋番号、患者ID、診療情報、メモの入力欄を追加しない。
- 残量、終了予定時刻、滴下係数、計算結果、利用履歴を永続保存しない。
- `localStorage`、`sessionStorage`、`IndexedDB`、Cookieは使わない。
- 外部API、ログ収集、認証、DB、本番接続を追加しない。
- Cache APIはService Workerがアプリ本体ファイルをオフライン利用する目的に限って使う。

## 触る場所と注意点

- 通常の実装変更は `app/src/`、`app/tests/`、必要な正本文書、`todo/` に限定する。
- `archive/` は元文書の保管場所として扱い、更新しない。
- `data/inputs/`、`app/outbox/`、`logs/` は、明確な目的がある場合以外は触らない。
- `app/tmp/` は一時作業用とし、成果物の正本にしない。

## 現時点の検証

- 実装前のため確定したテストコマンドはない。
- ロジック確認は `app/tests/calculation-test.html` をブラウザで開く方式にする。
- Service Worker確認は `file://` ではなく、`app/src/` をローカルHTTPサーバーで配信して行う。
- 手動確認項目は `doc/architecture/implementation-plan.md` のフェーズ6に従う。

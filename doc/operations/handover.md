# 点滴タイマー 引継ぎメモ

## 現在地

- 標準ワークスペース化は完了している。
- MVP本体は `app/src/` に実装済み。
- 計算ロジック確認用の静的テストは `app/tests/calculation-test.html` にある。
- Service Worker、manifest、仮アイコンを含む静的PWA構成は実装済み。
- `app/src/` のHTTP配信、UI挙動、Service Worker登録、オフライン表示、オフライン計算は実ブラウザで確認済み。
- MVP残件は、スマホ実機でのホーム画面追加確認とMVP完了条件の最終確認。
- 新機能として、秒針ガイド追加計画を `doc/architecture/byosingaido-plan.md` に作成済み。
- 秒針ガイド計画は残P1/P2を反映済み。最終 `codex-plan-review` でシニアエンジニア観点、UI/UX観点とも P0 0件、P1 0件、P2 0件を確認済み。

## 最初に読むもの

1. `AGENTS.md`
2. `README.md`
3. `specs/requirements.md`
4. `doc/architecture/overview.md`
5. `doc/architecture/tech-stack.md`
6. `doc/architecture/implementation-plan.md`
7. `doc/architecture/byosingaido-plan.md`
8. `todo/now.md`

## 正本

- 要件: `specs/requirements.md`
- アーキテクチャ: `doc/architecture/overview.md`
- 技術スタック: `doc/architecture/tech-stack.md`
- MVP実装チェックリスト: `doc/architecture/implementation-plan.md`
- 秒針ガイド計画: `doc/architecture/byosingaido-plan.md`
- ルート直下の `tenteki-timer-*.md` は使わない。現在は `archive/` に元文書がある。

## 完了済み

- 標準ワークスペース構成を作成した。
- 既存詳細文書の内容を標準ディレクトリ側へ統合し、正本化した。
- `README.md` と `AGENTS.md` に標準ディレクトリ側を正本として扱う方針を反映した。
- `doc/architecture/overview.md` と `doc/architecture/tech-stack.md` を `app/src/` 配置方針へ整合した。
- `app/src/calc.js` にDOM非依存の計算ロジックを実装した。
- `app/tests/calculation-test.html` に固定 `now` を使うロジックテストを作成した。
- `app/src/index.html` と `app/src/style.css` に1画面UIを実装した。
- `app/src/manifest.json`、`app/src/service-worker.js`、`app/src/icons/` を実装した。
- `app/src/` のHTTP配信、UI挙動、静的PWA設定、GitHub Pages想定URLを確認した。
- 実ブラウザでService Worker登録、オフライン表示、オフライン計算を確認した。
- 秒針ガイド機能の初期計画を作成し、レビュー指摘を1回反映した。
- 更新後の秒針ガイド計画に対して再レビューを実施した。
- 秒針ガイド計画へ残P1/P2を反映し、最終レビューで P0/P1/P2 0件を確認した。

## 未完了

### MVP残件

- スマホ実機でホーム画面に追加できることを確認する。
- `doc/architecture/implementation-plan.md` の完了条件を最終確認する。

### 秒針ガイド実装残件

- `doc/architecture/byosingaido-plan.md` の計画に沿って、正本文書、実装チェックリスト、`app/src/`、`app/tests/` を更新する。
- 実装後は秒針ガイド計画の Test Plan に従い、ロジックテスト、ブラウザ確認、PWA更新確認を行う。

## 次の1テーマ

`doc/architecture/byosingaido-plan.md` の計画に沿って、秒針ガイド機能の実装に進む。

## 実装時の重要ルール

- HTML / CSS / JavaScript のみで実装する。
- React、ビルドツール、外部API、DB、ユーザーデータ保存APIは追加しない。
- Cache APIはService Workerがアプリ本体ファイルをオフライン利用する目的に限って使う。
- ユーザー入力値、計算結果、利用履歴を永続保存しない。
- 医療判断を代替する表現をUIやドキュメントに入れない。
- UIには「自然滴下の計算補助です。指示・施設ルールに従って確認してください。」を表示する。
- 実装本体は `app/src/` 配下に置く。
- GitHub Pages公開元はリポジトリルート、アプリURLは `/<repo>/app/src/` とする。
- PWAの `start_url`、`scope`、Service Workerのキャッシュ対象は `app/src/` 配下で相対パスが成立する形にする。

## 検証方針

- ロジック確認は `app/tests/calculation-test.html` をブラウザで開く方式にする。
- Service Worker確認は `file://` ではなく、`app/src/` をローカルHTTPサーバーで配信して行う。
- 手動確認項目は `doc/architecture/implementation-plan.md` のフェーズ6、および秒針ガイド計画の Test Plan に従う。
- 秒針ガイド実装時は、固定 `nowMs` で確認できる純粋関数を `calc.js` に置く。

## 触らないもの

- `archive/` は元文書の保管場所として扱い、更新しない。
- `data/inputs/`、`app/outbox/`、`logs/` は、明確な目的がある場合以外は触らない。
- `app/tmp/` は一時作業用とし、成果物の正本にしない。
- 実装中にビルドツールや外部依存を追加しない。

## 注意点

- `doc/architecture/byosingaido-plan.md` は現時点で未追跡ファイルとして作成されている。
- 現在の `git status --short` は、この引継ぎ更新前の時点で `?? doc/architecture/byosingaido-plan.md` が出ていた。
- `app/README.md`、`todo/backlog.md`、`doc/operations/handover.md`、`doc/operations/Next-Agent-Prompt.md` は古い記述が残っていたため、今回の引継ぎ更新対象にした。

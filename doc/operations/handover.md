# 点滴タイマー 引継ぎメモ

## 現在地

- 標準ワークスペース化は完了している。
- 要件、アーキテクチャ、技術スタックの正本は標準ディレクトリ側にある。
- 実装計画は [../architecture/implementation-plan.md](../architecture/implementation-plan.md) にチェックリスト化済み。
- `app/src/` と `app/tests/` はまだ実装ファイル未作成で、`.gitkeep` のみ。
- 次の作業は、実装チェックリストのフェーズ1から進める。

## 最初に読むもの

1. [../../README.md](../../README.md)
2. [../../AGENTS.md](../../AGENTS.md)
3. [../../specs/requirements.md](../../specs/requirements.md)
4. [../architecture/overview.md](../architecture/overview.md)
5. [../architecture/tech-stack.md](../architecture/tech-stack.md)
6. [../architecture/implementation-plan.md](../architecture/implementation-plan.md)
7. [../../todo/now.md](../../todo/now.md)

## 正本

- 要件: `specs/requirements.md`
- アーキテクチャ: `doc/architecture/overview.md`
- 技術スタック: `doc/architecture/tech-stack.md`
- 実装チェックリスト: `doc/architecture/implementation-plan.md`
- ルート直下の `tenteki-timer-*.md` は使わない。現在は `archive/` に元文書がある。

## 完了済み

- 標準ワークスペース構成を作成した。
- 既存詳細文書の内容を標準ディレクトリ側へ統合し、正本化した。
- `README.md` と `AGENTS.md` に標準ディレクトリ側を正本として扱う方針を反映した。
- 実装計画を作成し、`codex-plan-review` でレビューした。
- レビュー指摘を反映し、P0/P1 がない状態まで計画を修正した。
- 実装計画をフェーズ別チェックリストへ変換した。

## 未完了

- `overview.md` と `tech-stack.md` のルート直下配置案を `app/src/` 配置へ更新する。
- `app/src/calc.js`、`app/src/app.js`、`app/src/index.html`、`app/src/style.css` を実装する。
- `app/tests/calculation-test.html` を作成する。
- `app/src/manifest.json`、`app/src/service-worker.js`、`app/src/icons/` を作成する。
- ロジックテストと手動確認を実施する。
- GitHub Pagesの `/app/src/` 配下URLでPWA動作を確認する。

## 次の1テーマ

実装チェックリストの **フェーズ1: 正本文書の整合** を完了する。

具体的には、`doc/architecture/overview.md` と `doc/architecture/tech-stack.md` に残っているルート直下配置案を `app/src/` 配置へ更新し、GitHub Pages公開元とPWAスコープの方針を `/<repo>/app/src/` にそろえる。

## 実装時の重要ルール

- HTML / CSS / JavaScript のみで実装する。
- React、ビルドツール、外部API、DB、ユーザーデータ保存APIは追加しない。
- Cache APIはService Workerがアプリ本体ファイルをオフライン利用する目的に限って使う。
- ユーザー入力値、計算結果、利用履歴を永続保存しない。
- 医療判断を代替する表現をUIやドキュメントに入れない。
- UIには「自然滴下の計算補助です。指示・施設ルールに従って確認してください。」を表示する。
- 実装本体は `app/src/` 配下に置く。
- GitHub Pages公開元はリポジトリルート、アプリURLは `/<repo>/app/src/` とする。
- GitHub Actionsで別ディレクトリへ再配置する手順はMVPでは作らない。

## 検証方針

- 実装前なので、現時点で動作テストは未実施。
- ロジック確認は `app/tests/calculation-test.html` をブラウザで開く方式にする。
- Service Worker確認は `file://` ではなく、`app/src/` をローカルHTTPサーバーで配信して行う。
- 手動確認項目は `doc/architecture/implementation-plan.md` のフェーズ6に従う。

## 触らないもの

- `archive/` の元文書は参照用。正本として更新しない。
- `data/inputs/`、`app/outbox/`、`logs/` は、明確な目的がある場合以外は触らない。
- 実装中にビルドツールや外部依存を追加しない。

## 注意点

- `implementation-plan.md` はチェックリスト形式で、151件の未完了項目がある。
- 最初からアプリ実装に入る前に、フェーズ1の正本文書整合を完了する。
- `overview.md` と `tech-stack.md` には、まだルート直下に `index.html` などを置く古い記述が残っている。

# 実装計画テンプレート

新しい機能追加、UI変更、PWA更新、リファクタを計画するときは、このテンプレートをコピーして使う。

## Summary

- 何を変えるか:
- なぜ変えるか:
- ユーザーに見える変化:
- 実装しないこと:

## Key Changes

- 対象ファイル・領域:
- ロジック変更:
- UI変更:
- ドキュメント更新:
- 既存挙動で維持するもの:

## PWA更新確認

- [ ] `app/src/` のキャッシュ対象ファイルを変更するか確認する。
- [ ] PWA更新は必要 / 不要 のどちらかを明記する。
- [ ] 不要の場合は理由を書く。例: `app/src/` のキャッシュ対象ファイルを変更しないため。
- [ ] 必要な場合、`app/src/service-worker.js` の `CACHE_NAME` を次バージョンへ上げる。
- [ ] 追加・削除・リネームした静的ファイルがある場合、`ASSETS` を更新する。
- [ ] 旧キャッシュ削除条件が `tenteki-timer-` prefix に限定されていることを確認する。
- [ ] 既存バージョン導入済み状態から新バージョンへ更新できることを確認する。
- [ ] `skipWaiting()` / `clients.claim()` を使っていない前提で、タブ/PWA再起動またはDevToolsで更新状態を確認する。
- [ ] 更新後、オフラインで表示・計算できることを確認する。

## Test Plan

- ロジックテスト:
- 構文確認:
  - `node --check app/src/app.js`
  - `node --check app/src/calc.js`
  - `node --check app/src/service-worker.js`
  - `git diff --check`
- ブラウザ確認:
- スマホ幅確認:
- オフライン確認:

## Documentation Plan

- [ ] `specs/requirements.md` の更新要否を確認する。
- [ ] `doc/architecture/overview.md` の更新要否を確認する。
- [ ] `doc/architecture/tech-stack.md` の更新要否を確認する。
- [ ] `doc/architecture/01_implementation-plan.md` の更新要否を確認する。
- [ ] `todo/now.md` の更新要否を確認する。
- [ ] `doc/operations/handover.md` と `doc/operations/Next-Agent-Prompt.md` の更新要否を確認する。

## Assumptions

- 前提:
- 制約:
- 未決事項:

## Review Checklist

- [ ] PWA更新確認が `必要` または `不要` と理由付きで明記されている。
- [ ] PWA更新が必要な場合、既存バージョンから新バージョンへの更新確認がテスト計画に入っている。
- [ ] 永続保存禁止、外部通信禁止、医療判断代替表現禁止に反していない。
- [ ] 固定した `now` で確認すべきロジックがDOMから分離されている。
- [ ] 変更対象に応じて正本文書と `todo/` の更新が計画されている。

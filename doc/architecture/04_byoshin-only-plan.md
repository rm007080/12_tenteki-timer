# 秒針ガイドを常時表示の秒針時計へ簡素化する計画

## Summary
- 現在の計算連動ガイドを廃止し、結果パネル下部に常時表示される「現在秒だけを示す秒針時計」へ置き換える。
- 秒針時計はアプリ起動直後から表示し、計算成功後は結果パネル全体へ自動スクロールして、計算結果と秒針時計が同じ流れで見えるようにする。
- 既存の「次の目印」「2つ先の目印」「色付き範囲」「凡例」「対象外表示」は削除する。
- 入力変更・エラー時の「前回の計算結果」表示は、秒針周辺ではなく結果側の小さな文言として残す。
- 時計は計算結果とは完全に独立し、滴下間隔を強調・表示しない。誤認防止のため、時計盤の上に短い可視ラベル「現在秒」を置き、近くに静的な短文「現在時刻の秒です。滴下タイミングを示すものではありません。」を置く。

## Key Changes
- `app/src/index.html` / `style.css`:
  - 秒針領域を常時表示にし、起動直後は「結果はここに表示されます」+ 秒針時計 + 前回結果文言なしの状態にする。
  - 盤面は 0, 5, 10 ... 55 の数字を円周上に水平配置する。
  - 数字の内側に60本の目盛りを置き、5秒ごとの目盛りだけ長く太くする。
  - 秒針、中心点、盤面、数字、目盛り、短いラベル「現在秒」、静的な短文「現在時刻の秒です。滴下タイミングを示すものではありません。」だけで構成し、凡例・対象外文は置かない。
  - 盤面サイズは通常最大240px、狭い画面では約200pxを目安にする。
  - SVGは `viewBox="0 0 160 160"`、中心 `80,80` を基準にする。盤面半径は約74、数字半径は約63、目盛り外側半径は約54、通常目盛り内側半径は約50、5秒目盛り内側半径は約45、秒針長は約43を目安にし、320px幅でも数字が切れないようにする。
  - 数字は水平表示、中央揃え、最小フォントサイズ8px相当を目安にする。
  - 色は既存CSS変数を使う。数字は `--text`、秒針・中心点・5秒目盛りは `--guide-line`、1秒目盛りは `--guide-muted-line`、盤面外周は `--line`、盤面塗りは `--surface` を基本にする。
  - 結果パネル全体の `aria-live="polite"` は解除し、結果テキストと前回結果文言だけを必要最小限の live region にする。時計SVGは装飾扱いとして `aria-hidden="true"` を維持し、SVG自体に `aria-label` は付けない。時計の意味は可視ラベルと静的な短文で伝え、毎秒変わる不可視テキストは置かない。
  - 結果側に前回結果専用の小さな表示欄を追加する。文言は「前回の計算結果です。新しい条件は計算すると反映されます。」に固定する。
- `app/src/app.js`:
  - 時計は計算結果と連動させず、`Date.now()` ベースで常時1秒ごとにチクタク更新する。
  - 既存の秒境界に合わせた再帰的 `setTimeout` 方針は維持する。
  - 時計更新ではSVG属性だけを更新し、毎秒変わるテキストは更新しない。
  - 計算成功後のスクロール先を結果パネル全体へ変更する。`prefers-reduced-motion` 時は既存どおり即時スクロールにする。
  - スクロール成功条件は「320px幅でも、主結果・滴/分・mL/h・条件・秒針時計が同じ流れで続けて確認できること」とし、全要素が必ず同一画面に完全表示されることまでは求めない。
  - 入力変更または入力エラー時、すでに結果が表示されていれば前回結果専用表示欄を表示する。計算成功時は前回結果表示を消す。
  - ガイド対象判定、次目印、2つ先目印、範囲、対象外表示、ガイド状態文の更新処理を削除する。
- `app/src/calc.js`:
  - 計算結果に必要な `mainText`、`dropsPerMinuteText`、`mlPerHourText`、`secondsPerDropText`、条件表示は維持する。
  - 秒針ガイド専用の `dropsPerMinuteValue`、`secondsPerDropRaw`、`secondsPerDropSeconds`、`isSecondGuideEligible`、`getSecondGuideState()` は削除する。
  - 固定時刻で検証できる `getSecondClockState(nowMs)` を必須で追加し、少なくとも `second` と `angleDeg` を返す。
  - `app.js` は `Date.now()` を `getSecondClockState(nowMs)` に渡し、戻り値をSVGへ反映するだけにする。
- ドキュメント:
  - `specs/requirements.md` の秒針ガイド要件を、計算連動ガイドではなく常時表示の秒針時計として更新する。
  - `AGENTS.md` と `README.md` に残っている `doc/architecture/implementation-plan.md` 参照を `doc/architecture/01_implementation-plan.md` に統一する。
  - `doc/architecture/overview.md`、`doc/architecture/tech-stack.md`、`doc/architecture/01_implementation-plan.md`、`todo/now.md` を新仕様に合わせる。
  - `todo/now.md` に残っている `doc/architecture/implementation-plan.md` 参照も `doc/architecture/01_implementation-plan.md` に統一する。
  - 引継ぎ文書は `doc/operations/handover.md` と `doc/operations/Next-Agent-Prompt.md` の両方を更新し、同じく `doc/architecture/implementation-plan.md` 参照が残らないようにする。
  - `todo/now.md` と引継ぎ文書に残っている `doc/architecture/byosingaido-plan.md` / `doc/architecture/byosingaido-simplify-plan.md` 参照も、実在する `doc/architecture/02_byosingaido-plan.md` / `doc/architecture/03_byosingaido-simplify-plan.md` に統一する。
  - Service Workerのキャッシュ名は `tenteki-timer-v4` に上げる。

## Test Plan
- `app/tests/calculation-test.html`:
  - 既存の計算ロジックテストは維持する。
  - 削除したガイド判定・次目印・範囲角度テストを消す。
  - `getSecondClockState()` が `0秒 -> 0度`、`15秒 -> 90度`、`30秒 -> 180度`、`45秒 -> 270度` を返すことを確認する。
  - ローカルHTTP配信またはブラウザで `app/tests/calculation-test.html` を開き、更新後の全テストが `N / N 件成功` になることを確認する。
- 構文確認:
  - `node --check app/src/app.js`
  - `node --check app/src/calc.js`
  - `node --check app/src/service-worker.js`
  - `git diff --check`
- ブラウザ確認:
  - 初期表示で時計盤が表示される。
  - 秒針が現在秒に合わせて1秒ごとに動く。
  - 0, 5, 10 ... 55 の数字、60本目盛り、5秒ごとの長い目盛りが見える。
  - 計算成功後、結果パネル全体へスクロールし、計算結果と時計盤が同じ流れで見える。
  - 入力変更・エラー時に前回結果の表示が結果側に出る。
  - 計算成功時に前回結果の表示が消える。
  - 時計の毎秒更新が読み上げ用テキストや live region を毎秒更新しない。
  - 320px / 360px幅、ライト / ダークで横スクロールせず読める。
  - 初回読み込み後、オフラインでも時計盤付きで表示・計算できる。
- PWA更新確認:
  - v3キャッシュ導入済み状態を作ってから、v4へ更新できることを確認する。
  - 既存のService Workerは `skipWaiting()` / `clients.claim()` を使わないため、更新確認時はv3状態のタブまたはPWAを閉じて再起動する。代替としてDevToolsで `waiting` / `activated` 状態を確認してから再読み込みする。
  - 更新後に `tenteki-timer-v3` が削除され、`tenteki-timer-v4` が使われることを確認する。
  - v4更新後、オフラインで時計盤付き表示と計算ができることを確認する。

## Assumptions
- 0秒は12時位置、15秒は3時位置、30秒は6時位置、45秒は9時位置に置く。
- 数字はすべて水平表示にする。
- 時計盤は計算結果とは完全に独立し、滴下間隔を強調・表示しない。
- 時計盤周辺に凡例や対象外文は置かないが、誤認防止の短い可視ラベル「現在秒」と静的な短文「現在時刻の秒です。滴下タイミングを示すものではありません。」は置く。
- 時計SVGは装飾扱いにし、アクセシビリティ上の説明は可視ラベルと静的短文で伝える。秒数を毎秒読み上げる実装にはしない。
- 既存の注意文「自然滴下の計算補助です。指示・施設ルールに従って確認してください。」はヘッダー側に残す。

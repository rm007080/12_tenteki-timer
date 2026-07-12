# 点滴タイマー セキュリティレビュー

実施日：2026-07-12
対象：`app/src/` 全ファイル(index.html / style.css / calc.js / app.js / service-worker.js / manifest.json)、`app/tests/calculation-test.html`
目的：第三者がこのアプリを使用してもよいかを、技術的セキュリティとプライバシーの観点で確認する。

## 手法

- 全ソースコードの読解
- 危険パターンの横断検索(`innerHTML` / `eval` / `document.write` / `localStorage` / `sessionStorage` / `indexedDB` / `fetch` / `XMLHttpRequest`)
- 仕様書(`specs/requirements.md`)との突合

## チェック結果

| 観点 | 結果 | 根拠 |
|---|---|---|
| XSS / インジェクション | 問題なし | DOM更新はすべて `textContent` と SVG属性(`setAttribute` の数値のみ)。`innerHTML`・`eval`・`document.write` 不使用。入力は number / time 型で、値がHTMLとして解釈される経路がない |
| データ保存 | なし | `localStorage`・`sessionStorage`・`IndexedDB`・Cookie 不使用(仕様§12どおり)。入力値・計算結果は画面表示のみで永続化されない |
| 外部送信 | なし | ページ側に `fetch`・`XMLHttpRequest` 不使用。外部API・アナリティクス・ログ収集なし。計算は端末内で完結 |
| サードパーティコード | なし | 外部ライブラリ・CDN・外部フォント不使用。サプライチェーンリスクは実質ゼロ |
| Service Worker キャッシュ汚染 | 問題なし | install 時に固定の `ASSETS`(同一オリジン相対パス)のみキャッシュ。fetch ハンドラは `cache.put` を行わない読み取り専用設計で、実行時に外部レスポンスがキャッシュへ混入しない |
| 通信の暗号化 | 問題なし | GitHub Pages は HTTPS を強制 |
| 個人情報 | 扱わない | 患者名・部屋番号・ID等の入力欄が存在しない(仕様§12) |

## 実施した強化策(2026-07-12)

1. **CSP メタタグの追加**(`index.html`)
   `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; manifest-src 'self'; worker-src 'self'; base-uri 'none'; form-action 'self'`
   同一オリジンの必要リソース以外をすべて遮断する。GitHub Pages はHTTPレスポンスヘッダーを設定できないため `<meta http-equiv>` 方式を採用。
2. **インラインスクリプトの外部化**(`index.html` → `app.js`)
   Service Worker 登録処理を `app.js` へ移設し、`script-src 'self'`(`'unsafe-inline'` なし)を成立させた。
3. **誤認防止文の追加**(`index.html`)
   仕様§7.6 が必須とする「現在時刻の秒です。滴下タイミングを示すものではありません。」が欠落していたため追加。第三者利用時の誤使用防止に直結するため、セキュリティレビューの是正項目として扱った。

## 残余リスクと受容理由

| リスク | 受容理由 |
|---|---|
| `frame-ancestors` を設定できない(meta 方式では無効)ため、クリックジャッキング耐性がない | ログイン・決済・設定変更などの機微操作が存在せず、iframe に埋め込まれても攻撃者が得る利益がない |
| LICENSE ファイルがなく、コード再利用の許諾が未定義 | アプリの「利用」には影響しない。コードの再配布・改変を許可したい場合はライセンス追加を別途検討 |

## 結論：第三者利用の可否

**技術面：可。** 保存なし・送信なし・外部依存なしの静的アプリであり、利用者のデータがアプリ運営側や第三者に渡る経路が存在しない。XSS等の攻撃ベクタも確認されなかった。

**前提条件：** 本アプリは自然滴下の計算補助であり、医療判断を代替しない。UIに免責文「自然滴下の計算補助です。指示・施設ルールに従って確認してください。」を常時表示している。仕様§4 のとおり個人利用が前提だが、「URLを知っている人はアクセス可能な状態でもよい」と定義済みであり、URL共有による第三者利用は仕様の範囲内である。

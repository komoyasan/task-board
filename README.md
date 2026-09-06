# 不動産管理アプリ

Supabase認証機能付きの不動産管理Webアプリ（React + Vite）。

## 機能

- メールアドレス＋パスワードによる会員登録・ログイン（Supabase Auth）
- 未ログイン時は自動的にログイン画面へリダイレクト
- ログイン後は物件一覧画面（ダミーデータ）へ遷移
- ログアウト機能

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env` を作成し、SupabaseプロジェクトのURLとPublishable keyを設定してください。
`.env` は `.gitignore` によりGit管理対象外になっています。

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb-publishable-xxxxxxxx
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

## Supabase側の設定について

- Authentication機能でメール＋パスワード認証（Email）を有効にしてください。
- 動作確認を簡単にしたい場合は、Supabaseダッシュボードの
  「Authentication > Providers > Email」で「Confirm email」を一時的に無効にすると、
  会員登録後すぐにログインできます（本番運用時は有効化を推奨します）。

## 主なディレクトリ構成

```
src/
  lib/supabaseClient.js       Supabaseクライアントの初期化
  contexts/AuthContext.jsx    認証状態を管理するContext
  hooks/useAuth.js            認証状態を利用するカスタムフック
  components/ProtectedRoute.jsx  未ログイン時にログイン画面へリダイレクト
  pages/Login.jsx             ログイン画面
  pages/SignUp.jsx            会員登録画面
  pages/Properties.jsx        物件一覧画面
  data/dummyProperties.js     物件一覧のダミーデータ
```

## コマンド

```bash
npm run dev       # 開発サーバー起動
npm run build     # 本番ビルド
npm run lint      # Lint実行
npm run preview   # ビルド結果のプレビュー
```

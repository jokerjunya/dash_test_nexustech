# NexusTech ダッシュボード

ビジネスデータを視覚化するためのモダンなダッシュボードアプリケーション。

## 機能

- リアルタイムデータの視覚化と時系列分析
- KPI指標のトラッキングと目標達成度の表示
- 地域別売上分布の分析
- 売上推移と市場シェアの比較
- ダークモード対応
- レスポンシブデザイン

## 技術スタック

- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (アニメーション)
- Recharts (グラフ描画)
- Vite (ビルドツール)

## 開発環境のセットアップ

### 前提条件

- Node.js 18.0.0以上
- npm 9.0.0以上

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/dash_test_nexustech.git
cd dash_test_nexustech

# 依存関係のインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開いてアプリケーションを確認できます。

### ビルド

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに出力されます。

### プレビュー

```bash
npm run preview
```

ビルドされたアプリケーションをローカルでプレビューできます。

## プロジェクト構造

```
dash_test_nexustech/
├── public/             # 静的ファイル
├── src/                # ソースコード
│   ├── assets/         # 画像などのアセット
│   ├── components/     # Reactコンポーネント
│   ├── data/           # データモデルとモックデータ
│   ├── App.tsx         # メインアプリケーション
│   ├── main.tsx        # エントリーポイント
│   └── index.css       # グローバルスタイル
├── index.html          # HTMLテンプレート
├── package.json        # プロジェクト設定
├── tsconfig.json       # TypeScript設定
├── vite.config.ts      # Vite設定
└── README.md           # プロジェクト説明
```

## ライセンス

MIT

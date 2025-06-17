## 🧾 概要

このプロジェクトは、ユーザーがアップロードした写真に **Exif情報に基づく撮影日時をスタンプとして埋め込み**、加工済みの画像をまとめてダウンロード可能にする Web アプリです。

- フロントエンド：React（Vite）
- バックエンド：Node.js（Express）
- インフラ：Docker + Docker Compose

---

## 🗂 ディレクトリ構成

PhotoDateStamp/
├── client/ # React フロントエンド
  ├── src/
  └── Dockerfile
├── server/ # Node.js バックエンド
  ├── index.ts
  ├── imageProcessor.ts
  └── Dockerfile
├── docker-compose.yml
└── README.md


---

## 🛠 使用技術

| レイヤー    | 技術                     |
| ------- | ---------------------- |
| フロントエンド | React, Vite, axios     |
| バックエンド  | Node.js, Express       |
| 画像処理    | sharp, exif-parser     |
| ファイル処理  | multer, archiver       |
| コンテナ    | Docker, Docker Compose |

---

## 🚀 機能仕様（MVP）

1. **複数画像のアップロード（JPEG）**
2. **Exifから撮影日時を取得**
3. **撮影日時を画像にスタンプとして描画**
4. **処理済み画像をZIPにまとめて返却**
5. **ブラウザ上でダウンロード可能にする**

---

## 📦 フロントエンド構成（client/）

- React UIで画像選択とプレビュー表示
- 複数ファイルを選択し、`FormData` 経由でAPIに送信
- ZIPファイルとして返された加工済み画像をダウンロードリンクで提供

#### 使用ライブラリ例

```
npm install axios
```

## 🧩 バックエンド構成（server/）

- `multer` で画像アップロード処理
- `exif-parser` で撮影日時を取得
- `sharp` で画像に日付を描画
- `archiver` で画像をまとめてZIPに圧縮

#### 使用ライブラリ例

```
npm install express multer exif-parser sharp archiver
```

## 📁 API仕様（POST /process）

- **エンドポイント**：`POST /process`
- **リクエスト**：`multipart/form-data`（画像ファイル群）
- **レスポンス**：Content-Type: `application/zip`
- **処理内容**：
    1. 各画像のExifから撮影日時を取得
    2. 画像右下に日付を描画（例：`2023-12-31 15:24:11`）
    3. 加工済み画像をZIPにまとめて返却

## 📝 その他備考

- 処理できる画像は JPEG 推奨（Exif対応のため）
- 将来的に：
    - スタンプのフォントや位置のカスタマイズ
    - ログ保存や履歴表示
    - ユーザー管理
    - クラウドストレージ対応


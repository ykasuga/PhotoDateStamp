## 技術コンテキスト

**使用技術:**

*   フロントエンド: React, Vite, axios
*   バックエンド: Node.js, Express
*   画像処理: sharp, exif-parser
*   ファイル処理: multer, archiver
*   コンテナ化: Docker, Docker Compose

**開発環境:**

*   このプロジェクトでは、ローカル開発にDockerとDocker Composeを使用します。
*   フロントエンドはポート3000で提供されます。
*   バックエンドはポート5002で提供されます。

**技術的な制約:**

*   アプリケーションは、複数の画像アップロードを効率的に処理できる必要があります。
*   アプリケーションは、画像を迅速に処理できる必要があります。
*   アプリケーションは、エラーなしにZIPアーカイブを生成できる必要があります。

**依存関係:**

*   フロントエンド: axios
*   バックエンド: express, multer, exif-parser, sharp, archiver

**ツールの使用パターン:**

*   `docker compose up --build`: Dockerコンテナを構築および実行するために使用されます。
*   `npm install`: 依存関係をインストールするために使用されます。

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
*   バックエンドでは、ESモジュールを使用するために、`tsconfig.json`の`module`オプションを`es6`に設定し、`ts-node -r esm`を使用します。

**技術的な制約:**
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
*   `apk update && apk add fontconfig`: Dockerイメージにfontconfigライブラリをインストールするために使用されます。
*   `npm install --force --legacy-peer-deps`: 依存関係の競合を解決するために使用されます。
*   `npm ci`: package-lock.jsonファイルに基づいて依存関係をインストールするために使用されます。
*   `npm install -g @types/express`: expressの型定義をインストールするために使用されます。
*   `npm rebuild exiftool-vendored`: exiftool-vendoredモジュールをリビルドするために使用されます。
*   `npm install -g typescript ts-node esm`: TypeScript、ts-node、esmをグローバルにインストールするために使用されます。
*   `CMD ["ts-node", "-r", "esm", "/app/src/index.ts"]`: Dockerコンテナ内でTypeScriptファイルを`ts-node`で実行するために使用されます。

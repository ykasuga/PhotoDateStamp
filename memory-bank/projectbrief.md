## プロジェクト概要

**プロジェクト名:** PhotoDateStamp

**説明:** ユーザーが写真をアップロードし、Exif情報に基づいて写真の撮影日をスタンプとして埋め込み、加工された画像をZIPファイルでまとめてダウンロードできるWebアプリケーションです。

**主な要件と目標:**

*   ユーザーが複数のJPEG画像をアップロードできるようにする。
*   各画像のExifデータから撮影日を抽出する。
*   撮影日を画像にスタンプとして描画する。
*   加工されたすべての画像をダウンロードするためのZIPファイルを提供する。

**技術スタック:**

*   フロントエンド: React (Vite)
*   バックエンド: Node.js (Express)
*   インフラストラクチャ: Docker + Docker Compose

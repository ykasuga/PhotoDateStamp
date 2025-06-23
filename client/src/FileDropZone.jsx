import React, { useCallback } from 'react';

function FileDropZone({ onFileDrop }) {
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const items = event.dataTransfer.items;

    const traverseFileTree = (item, path = '') => {
      return new Promise((resolve) => {
        if (item.isFile) {
          item.file((file) => {
            file.fullPath = path + file.name;
            resolve([file]);
          });
        } else if (item.isDirectory) {
          const dirReader = item.createReader();
          dirReader.readEntries(async (entries) => {
            const files = await Promise.all(
              entries.map((entry) => traverseFileTree(entry, path + item.name + '/'))
            );
            resolve(files.flat());
          });
        }
      });
    };

    const handleItems = async () => {
      const entries = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i].webkitGetAsEntry();
        if (item) {
          entries.push(item);
        }
      }

      const files = await Promise.all(entries.map((entry) => traverseFileTree(entry)));
      const allFiles = files.flat();

      // 親コンポーネントにファイルリストを渡す
      if (onFileDrop) {
        // FileList風にするために配列を渡す
        onFileDrop({ target: { files: allFiles } });
      }
    };

    handleItems();
  }, [onFileDrop]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: '2px dashed #ccc',
        padding: '40px',
        textAlign: 'center',
        color: '#666',
      }}
    >
      ここにファイルまたはフォルダをドロップ
    </div>
  );
}

export default FileDropZone;

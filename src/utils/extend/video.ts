export async function loadVideoMetadata(file: File) {
  return new Promise<HTMLVideoElement>((resolve, reject) => {
    const element = document.createElement('video');
    element.preload = 'metadata';
    element.src = URL.createObjectURL(file);
    
    element.onloadedmetadata = function () {
      URL.revokeObjectURL(element.src);
      resolve(element);
    };
    
    element.onerror = function (event) {
      reject(event);
    };
  });
}

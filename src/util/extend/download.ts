//https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
export function downloadImage(url: string, filename: string) {
  const downloadedImg = new Image();
  downloadedImg.crossOrigin = "Anonymous";
  downloadedImg.src = url;
  downloadedImg.style.display = 'none';

  downloadedImg.onload = function imageReceived() {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    if (!context || !downloadedImg) {
      return;
    }

    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;
    context.drawImage(downloadedImg, 0, 0);

    const dataurl = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');

    anchor.download = filename;
    anchor.href = dataurl;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
}

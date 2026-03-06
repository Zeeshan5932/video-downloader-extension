chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "DOWNLOAD_VIDEO") {
    let filename = "video.mp4";

    try {
      const urlObj = new URL(message.url);
      const lastPart = urlObj.pathname.split("/").pop();
      if (lastPart) {
        filename = lastPart;
      }
    } catch (e) {}

    chrome.downloads.download(
      {
        url: message.url,
        filename: filename,
        saveAs: true
      },
      (downloadId) => {
        if (chrome.runtime.lastError) {
          sendResponse({
            ok: false,
            error: chrome.runtime.lastError.message
          });
        } else {
          sendResponse({
            ok: true
          });
        }
      }
    );

    return true;
  }
});
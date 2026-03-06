document.getElementById("downloadBtn").addEventListener("click", async () => {
  const url = document.getElementById("videoUrl").value.trim();
  const status = document.getElementById("status");

  if (!url) {
    status.textContent = "Please paste a video link.";
    return;
  }

  chrome.runtime.sendMessage(
    {
      type: "DOWNLOAD_VIDEO",
      url: url
    },
    (response) => {
      if (response && response.ok) {
        status.textContent = "Download started.";
      } else {
        status.textContent = response?.error || "Download failed.";
      }
    }
  );
});
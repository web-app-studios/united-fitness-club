function renderVideoPairs() {
  const container = document.getElementById("video-pairs");
  if (!container) return;

  const pairs =
    typeof I18n !== "undefined" ? I18n.getVideoPairs() : typeof VIDEO_PAIRS !== "undefined" ? VIDEO_PAIRS : [];

  container.innerHTML = "";

  pairs.forEach((pair, index) => {
    const row = document.createElement("article");
    row.className = "video-pair";
    row.setAttribute("aria-labelledby", `video-pair-title-${index}`);

    const learnLabel = pair.learnHow || "Learn how";

    row.innerHTML = `
      <header class="video-pair-header">
        <p class="video-pair-tag">${pair.goalTag}</p>
        <h3 id="video-pair-title-${index}">${pair.goalText}</h3>
      </header>
      <div class="video-pair-embeds">
        <div class="embed-column embed-column--full">
          <p class="embed-label">
            <span class="embed-label-badge embed-label-badge--yt">${learnLabel}</span>
            ${pair.youtubeTitle}
          </p>
        </div>
      </div>
    `;

    const iframe = document.createElement("iframe");
    iframe.className = "embed-frame youtube-embed";
    const hl = pair.embedLang === "ml" ? "&hl=ml" : "";
    iframe.src = `https://www.youtube.com/embed/${pair.youtubeId}?rel=0&modestbranding=1${hl}`;
    iframe.title = pair.youtubeTitle;
    iframe.loading = "lazy";
    iframe.allowFullscreen = true;
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );

    const wrap = document.createElement("div");
    wrap.className = "embed-cell embed-cell--youtube";
    wrap.appendChild(iframe);
    row.querySelector(".video-pair-embeds").appendChild(wrap);
    container.appendChild(row);
  });
}


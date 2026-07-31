(function () {
  "use strict";

  const body = document.body;
  const productId = body ? body.getAttribute("data-product-id") : "";
  const productName = document.querySelector("[data-product-name]");
  const gallery = document.querySelector("[data-gallery]");
  const activeDisplay = document.querySelector("[data-active-media]");
  const thumbnailList = document.querySelector("[data-thumbnails]");
  const galleryStatus = document.querySelector("[data-gallery-status]");
  const description = document.querySelector("[data-full-description]");
  const orderLink = document.querySelector("[data-order-link]");
  const errorMessage = document.querySelector("[data-product-error]");
  const overlay = document.querySelector("[data-zoom-overlay]");
  const overlayDialog = document.querySelector("[data-zoom-dialog]");
  const overlayImage = document.querySelector("[data-zoom-image]");
  const overlayClose = document.querySelector("[data-zoom-close]");

  let currentVideo = null;
  let zoomOpener = null;

  function findProduct() {
    if (!productId || !Array.isArray(window.PRODUCTS)) {
      return null;
    }

    return window.PRODUCTS.find(function (candidate) {
      return candidate && candidate.id === productId;
    }) || null;
  }

  function showProductError(message) {
    if (gallery) {
      gallery.hidden = true;
    }
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.hidden = false;
    }
  }

  function imageExists(src) {
    return new Promise(function (resolve) {
      const image = new Image();
      image.addEventListener("load", function () {
        resolve(true);
      }, { once: true });
      image.addEventListener("error", function () {
        resolve(false);
      }, { once: true });
      image.src = src;
    });
  }

  async function videoExists(src) {
    try {
      const response = await fetch(src, { method: "HEAD", cache: "no-store" });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async function getUsableMedia(mediaItems) {
    if (!Array.isArray(mediaItems)) {
      return [];
    }

    const checks = mediaItems.map(async function (media) {
      if (!media || typeof media.src !== "string" || typeof media.alt !== "string") {
        return null;
      }

      if (media.type === "image" && await imageExists(media.src)) {
        return media;
      }

      if (media.type === "video" && media.enabled === true && await videoExists(media.src)) {
        return media;
      }

      return null;
    });

    const results = await Promise.all(checks);
    return results.filter(Boolean);
  }

  function pauseActiveVideo() {
    if (currentVideo) {
      currentVideo.pause();
      currentVideo = null;
    }
  }

  function openZoom(media, opener) {
    if (!overlay || !overlayImage || !overlayClose || !body || media.type !== "image") {
      return;
    }

    zoomOpener = opener;
    overlayImage.src = media.src;
    overlayImage.alt = media.alt;
    overlay.hidden = false;
    body.classList.add("zoom-open");
    overlayClose.focus();
  }

  function closeZoom() {
    if (!overlay || overlay.hidden) {
      return;
    }

    overlay.hidden = true;
    if (overlayImage) {
      overlayImage.removeAttribute("src");
      overlayImage.alt = "";
    }
    if (body) {
      body.classList.remove("zoom-open");
    }
    if (zoomOpener && document.contains(zoomOpener)) {
      zoomOpener.focus();
    }
    zoomOpener = null;
  }

  function createImageDisplay(media) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "media-zoom-button";
    button.setAttribute("aria-label", "Enlarge " + media.alt);

    const image = document.createElement("img");
    image.src = media.src;
    image.alt = media.alt;
    image.decoding = "async";
    image.addEventListener("error", function () {
      button.remove();
      if (galleryStatus) {
        galleryStatus.textContent = "This image is temporarily unavailable.";
      }
    }, { once: true });

    button.appendChild(image);
    button.addEventListener("click", function () {
      openZoom(media, button);
    });
    return button;
  }

  function createVideoDisplay(media) {
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", media.alt);
    if (media.poster) {
      video.poster = media.poster;
    }

    const source = document.createElement("source");
    source.src = media.src;
    source.type = "video/mp4";
    video.appendChild(source);
    currentVideo = video;
    return video;
  }

  function setActiveThumbnail(buttons, activeIndex) {
    buttons.forEach(function (button, index) {
      const isActive = index === activeIndex;
      button.classList.toggle("is-active", isActive);
      if (isActive) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  function showMedia(media, index, thumbnailButtons) {
    if (!activeDisplay) {
      return;
    }

    pauseActiveVideo();
    activeDisplay.replaceChildren();

    if (media.type === "image") {
      activeDisplay.appendChild(createImageDisplay(media));
    } else if (media.type === "video") {
      activeDisplay.appendChild(createVideoDisplay(media));
    }

    setActiveThumbnail(thumbnailButtons, index);
    if (galleryStatus) {
      galleryStatus.textContent = "Showing " + media.alt + ".";
    }
  }

  function createThumbnail(media, index) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "thumbnail-button";
    button.setAttribute("aria-label", "Show " + media.alt);
    button.dataset.mediaIndex = String(index);

    if (media.type === "image" || media.poster) {
      const image = document.createElement("img");
      image.src = media.type === "image" ? media.src : media.poster;
      image.alt = "";
      image.loading = "lazy";
      image.addEventListener("error", function () {
        image.remove();
      }, { once: true });
      button.appendChild(image);
    }

    if (media.type === "video") {
      const label = document.createElement("span");
      label.className = "thumbnail-video-label";
      label.textContent = "Video";
      button.appendChild(label);
    }

    return button;
  }

  function configureZoomDialog() {
    if (!overlay || !overlayClose) {
      return;
    }

    overlayClose.addEventListener("click", closeZoom);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay || event.target === overlayDialog) {
        closeZoom();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (overlay.hidden) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeZoom();
      } else if (event.key === "Tab") {
        event.preventDefault();
        overlayClose.focus();
      }
    });
  }

  async function initialiseProductPage() {
    const product = findProduct();
    if (!product) {
      showProductError("Product information could not be found. Please return to the homepage.");
      return;
    }

    if (productName) {
      productName.textContent = product.title;
    }
    if (description) {
      description.textContent = product.fullDescription || "Description coming soon.";
    }
    if (orderLink && product.orderEmail && product.emailSubject) {
      orderLink.href = "mailto:" + product.orderEmail + "?subject=" + encodeURIComponent(product.emailSubject);
    }

    // A proper enquiry form or e-commerce checkout can be added later if sales volume increases.
    const mediaItems = await getUsableMedia(product.media);
    if (mediaItems.length === 0 || !thumbnailList || !activeDisplay) {
      showProductError("No product media is currently available. Please return to the homepage.");
      return;
    }

    const thumbnailButtons = mediaItems.map(function (media, index) {
      const button = createThumbnail(media, index);
      thumbnailList.appendChild(button);
      return button;
    });

    thumbnailButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        showMedia(mediaItems[index], index, thumbnailButtons);
      });
    });

    configureZoomDialog();
    showMedia(mediaItems[0], 0, thumbnailButtons);
  }

  initialiseProductPage();
}());

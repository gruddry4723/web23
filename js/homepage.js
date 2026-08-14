(function () {
  "use strict";

  function loadHomepageImage(product) {
    return new Promise(function (resolve) {
      if (!product.homepageImage || !product.title) {
        resolve(null);
        return;
      }

      const image = new Image();
      image.alt = product.title + " homepage view";
      image.decoding = "async";
      image.addEventListener("load", function () {
        resolve(image);
      }, { once: true });
      image.addEventListener("error", function () {
        resolve(null);
      }, { once: true });
      image.src = product.homepageImage;
    });
  }

  function createProductEntry(product, image) {
    const article = document.createElement("article");
    article.className = "product-entry";

    const heading = document.createElement("h2");
    heading.className = "product-entry__title";

    const titleLink = document.createElement("a");
    titleLink.href = product.pageUrl;
    titleLink.textContent = product.title;
    heading.appendChild(titleLink);
    article.appendChild(heading);

    const layout = document.createElement("div");
    layout.className = "product-entry__layout";

    if (image) {
      const figure = document.createElement("figure");
      figure.className = "product-entry__figure";

      const imageLink = document.createElement("a");
      imageLink.href = product.pageUrl;
      imageLink.setAttribute("aria-label", "View " + product.title);
      image.addEventListener("error", function () {
        figure.remove();
        layout.classList.add("product-entry__layout--without-image");
      }, { once: true });
      imageLink.appendChild(image);
      figure.appendChild(imageLink);
      layout.appendChild(figure);
    } else {
      layout.classList.add("product-entry__layout--without-image");
    }

    const description = document.createElement("p");
    description.className = "product-entry__description";
    description.textContent = product.shortDescription || "Description coming soon.";
    layout.appendChild(description);
    article.appendChild(layout);

    return article;
  }

  async function renderVisibleProducts() {
    const container = document.querySelector("[data-products-list]");
    if (!container || !Array.isArray(window.PRODUCTS)) {
      return;
    }

    const visibleProducts = window.PRODUCTS.filter(function (product) {
      return product && product.visible === true && product.title && product.pageUrl;
    });

    if (visibleProducts.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No products are currently available";
      container.appendChild(message);
      return;
    }

    const preparedProducts = await Promise.all(visibleProducts.map(async function (product) {
      return {
        product: product,
        image: await loadHomepageImage(product)
      };
    }));

    preparedProducts.forEach(function (prepared, index) {
      if (index > 0) {
        container.appendChild(document.createElement("hr"));
      }
      container.appendChild(createProductEntry(prepared.product, prepared.image));
    });
  }

  renderVisibleProducts();
}());

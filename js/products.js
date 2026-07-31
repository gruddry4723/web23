(function () {
  "use strict";

  // EDIT THIS ADDRESS once to change the recipient for every product enquiry.
  const ORDER_EMAIL = "orders@example.com";

  // PRODUCT EDITING GUIDE
  // - visible: controls whether the product is inserted on the homepage.
  // - title, shortDescription, fullDescription: edit the public wording here.
  // - homepageImage and media src/poster: edit filenames when replacing media.
  // - price: reserved for a future displayed price; leave blank for now.
  // - emailSubject: edit the subject inserted into the mailto link.
  // - Set a video's enabled value to true only after adding a valid MP4 file.
  window.PRODUCTS = [
    {
      id: "product1",
      visible: false,
      title: "SpekOne - R2000",
      shortDescription: "",
      fullDescription: "Each piece is made by hand, so subtle differences in surface and form are to be expected.",
      price: "R2000",
      homepageImage: "media/homepage/product1-home.svg",
      pageUrl: "spek1/",
      orderEmail: ORDER_EMAIL,
      emailSubject: "Order enquiry: Product One",
      media: [
        { type: "image", src: "../media/product1/product1-main.svg", alt: "Product One main view" },
        { type: "image", src: "../media/product1/product1-detail-01.svg", alt: "Product One detail view one" },
        { type: "image", src: "../media/product1/product1-detail-02.svg", alt: "Product One detail view two" },
        { type: "image", src: "../media/product1/product1-detail-03.svg", alt: "Product One detail view three" },
        { type: "image", src: "../media/product1/product1-detail-04.svg", alt: "Product One detail view four" },
        {
          type: "video",
          src: "../media/product1/product1-video.mp4",
          poster: "../media/product1/product1-main.svg",
          alt: "Product One demonstration video",
          enabled: false
        }
      ]
    },
    {
      id: "product2",
      visible: false,
      title: "Speaker Two - R1500/",
      shortDescription: "An editable description for the second work, ready to publish when the piece is available.",
      fullDescription: "Product Two is reserved for a future object, artwork or sculpture. Replace this text with its materials, dimensions, edition details and making process.",
      price: "r4",
      homepageImage: "media/homepage/product2-home.svg",
      pageUrl: "product2/",
      orderEmail: ORDER_EMAIL,
      emailSubject: "Order enquiry: Product Two",
      media: [
        { type: "image", src: "../media/product2/product2-main.svg", alt: "Product Two main view" },
        { type: "image", src: "../media/product2/product2-detail-01.svg", alt: "Product Two detail view one" },
        { type: "image", src: "../media/product2/product2-detail-02.svg", alt: "Product Two detail view two" },
        { type: "image", src: "../media/product2/product2-detail-03.svg", alt: "Product Two detail view three" },
        { type: "image", src: "../media/product2/product2-detail-04.svg", alt: "Product Two detail view four" },
        {
          type: "video",
          src: "../media/product2/product2-video.mp4",
          poster: "../media/product2/product2-main.svg",
          alt: "Product Two demonstration video",
          enabled: false
        }
      ]
    },
    {
      id: "product3",
      visible: false,
      title: "Product Three",
      shortDescription: "An editable description for the third work, ready to publish when the piece is available.",
      fullDescription: "Product Three is reserved for a future object, artwork or sculpture. Replace this text with its materials, dimensions, edition details and making process.",
      price: "",
      homepageImage: "media/homepage/product3-home.svg",
      pageUrl: "product3/",
      orderEmail: ORDER_EMAIL,
      emailSubject: "Order enquiry: Product Three",
      media: [
        { type: "image", src: "../media/product3/product3-main.svg", alt: "Product Three main view" },
        { type: "image", src: "../media/product3/product3-detail-01.svg", alt: "Product Three detail view one" },
        { type: "image", src: "../media/product3/product3-detail-02.svg", alt: "Product Three detail view two" },
        { type: "image", src: "../media/product3/product3-detail-03.svg", alt: "Product Three detail view three" },
        { type: "image", src: "../media/product3/product3-detail-04.svg", alt: "Product Three detail view four" },
        {
          type: "video",
          src: "../media/product3/product3-video.mp4",
          poster: "../media/product3/product3-main.svg",
          alt: "Product Three demonstration video",
          enabled: false
        }
      ]
    },
    {
      id: "product4",
      visible: false,
      title: "Product Four",
      shortDescription: "An editable description for the fourth work, ready to publish when the piece is available.",
      fullDescription: "Product Four is reserved for a future object, artwork or sculpture. Replace this text with its materials, dimensions, edition details and making process.",
      price: "",
      homepageImage: "media/homepage/product4-home.svg",
      pageUrl: "product4/",
      orderEmail: ORDER_EMAIL,
      emailSubject: "Order enquiry: Product Four",
      media: [
        { type: "image", src: "../media/product4/product4-main.svg", alt: "Product Four main view" },
        { type: "image", src: "../media/product4/product4-detail-01.svg", alt: "Product Four detail view one" },
        { type: "image", src: "../media/product4/product4-detail-02.svg", alt: "Product Four detail view two" },
        { type: "image", src: "../media/product4/product4-detail-03.svg", alt: "Product Four detail view three" },
        { type: "image", src: "../media/product4/product4-detail-04.svg", alt: "Product Four detail view four" },
        {
          type: "video",
          src: "../media/product4/product4-video.mp4",
          poster: "../media/product4/product4-main.svg",
          alt: "Product Four demonstration video",
          enabled: false
        }
      ]
    },
    {
      id: "product5",
      visible: false,
      title: "Product Five",
      shortDescription: "An editable description for the fifth work, ready to publish when the piece is available.",
      fullDescription: "Product Five is reserved for a future object, artwork or sculpture. Replace this text with its materials, dimensions, edition details and making process.",
      price: "",
      homepageImage: "media/homepage/product5-home.svg",
      pageUrl: "product5/",
      orderEmail: ORDER_EMAIL,
      emailSubject: "Order enquiry: Product Five",
      media: [
        { type: "image", src: "../media/product5/product5-main.svg", alt: "Product Five main view" },
        { type: "image", src: "../media/product5/product5-detail-01.svg", alt: "Product Five detail view one" },
        { type: "image", src: "../media/product5/product5-detail-02.svg", alt: "Product Five detail view two" },
        { type: "image", src: "../media/product5/product5-detail-03.svg", alt: "Product Five detail view three" },
        { type: "image", src: "../media/product5/product5-detail-04.svg", alt: "Product Five detail view four" },
        {
          type: "video",
          src: "../media/product5/product5-video.mp4",
          poster: "../media/product5/product5-main.svg",
          alt: "Product Five demonstration video",
          enabled: false
        }
      ]
    }
  ];
}());

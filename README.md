# BRAND static product website

A plain, responsive black-and-white product website built with HTML5, CSS3, vanilla JavaScript and local media only. There is no package manager, framework, database or build step.

## Opening the project

Open PowerShell and run:

```powershell
cd "$HOME\Desktop\WEB!"
code .
```

## Running locally

The recommended option in Visual Studio Code is the Live Server extension. Open `index.html`, then choose **Open with Live Server**.

Alternatively, start Python's simple local server:

```powershell
cd "$HOME\Desktop\WEB!"
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Use a local server instead of double-clicking the HTML files. The optional-video check relies on normal HTTP file access.

## Editing products

All five products are configured in `js/products.js`. This is the main file to edit for product content.

- Change `visible: false` to `visible: true` to add a product to the homepage. Disabled products are not inserted into the homepage at all.
- Edit `title`, `shortDescription` and `fullDescription` to change product wording.
- `price` is included as an empty future field and is not currently displayed.
- Change `emailSubject` to update the product-specific subject used by the email link.
- Change `ORDER_EMAIL` near the top of the file to replace `orders@example.com` everywhere.
- Put homepage images in `media/homepage/` and update each `homepageImage` path.
- Put gallery images in the matching `media/product1/` through `media/product5/` folder and update that product's `media` entries.
- Replace placeholder SVG paths with local JPG, PNG or WebP filenames as needed. Keep the paths relative.
- Add a real MP4 as `media/productN/productN-video.mp4`, then change its video record to `enabled: true`. Disabled or missing videos are skipped safely.

Each product page identifies its record with a body attribute such as `data-product-id="product1"`. Product wording should remain in `js/products.js` rather than being duplicated in page markup.

## Replacing media

The included SVG files are valid local placeholders. Each one states its product number, role and filename. Replace them with finished photography while keeping useful alt text in `js/products.js`.

Recommended production filenames:

```text
product1-main.webp
product1-front.webp
product1-side.webp
product1-detail-01.webp
product1-detail-02.webp
product1-video.mp4
```

Every product media folder includes `VIDEO-PLACEHOLDER.txt`. It explains where the valid MP4 belongs. Do not rename the text file to `.mp4`.

## Brand, contact and search settings

- Replace `BRAND`, the homepage subheading and introduction in `index.html`.
- Replace `orders@example.com` by editing `ORDER_EMAIL` once in `js/products.js`.
- Replace every `https://www.example.com/` URL in the canonical links, `robots.txt` and `sitemap.xml` with the real public domain. Keep trailing slashes consistent.
- Update the unique page titles and meta descriptions if product names change.

## Git setup and first upload

Run these commands after creating an empty GitHub repository:

```powershell
cd "$HOME\Desktop\WEB!"
git init
git add .
git commit -m "Initial black and white product website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the HTTPS or SSH URL shown by GitHub. Do not use the placeholder text literally.

## Publishing with GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` publishes the repository as a static GitHub Pages site whenever `main` is pushed. It can also be run manually.

1. Open the repository on GitHub.
2. Open **Settings**, then **Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Open the **Actions** tab and wait for the Pages deployment workflow to complete.
5. Open the published URL shown by the successful deployment or on the Pages settings screen.

For a custom domain, add the domain in the repository's Pages settings, then follow the DNS instructions supplied by GitHub and your DNS provider. Do not guess DNS records: use the values GitHub shows for the selected domain. After the domain works, replace the `example.com` placeholders described above.

## Project structure

```text
WEB!/
├── index.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── README.md
├── .gitignore
├── css/style.css
├── js/
│   ├── products.js
│   ├── homepage.js
│   └── product-gallery.js
├── product1/ ... product5/
│   └── index.html
├── media/
│   ├── homepage/
│   └── product1/ ... product5/
└── .github/workflows/deploy-pages.yml
```

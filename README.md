# wede5020-gr2-wede-poe-olwethumlambo

**Module:** WEDE 5020  
**Project:** Can Own Clothing  
**Student:** Olwethu Mlambo  
**Version:** Part 3 coursework prototype  

## 1. Project overview

Can Own Clothing is a clothing brand built around hope, self-belief and encouraging people not to give up. This website presents the brand, its clothing products, available colours and ways for customers to make enquiries. The website is a student prototype; it is not a live online shop and does not process payments.

The site uses HTML for page structure, CSS for presentation and responsive layouts, and JavaScript for client-side interactions. The use of clear page titles, descriptive content and meaningful image alternative text follows general search-friendly content guidance (Google Search Central, n.d.).

## 2. Files and pages

| File or folder | Purpose |
|---|---|
| `index.html` | Home page, brand introduction and FAQ/accordion content. |
| `about.html` | Brand background, mission, vision, team information and image gallery/lightbox. |
| `products.html` | Product cards with product search and category filtering. |
| `colours.html` | Product, colour, size and quantity selection; carries the selection into the enquiry process. |
| `enquiry.html` | Product enquiry form, browser-side validation and estimated standard-item total. |
| `contact.html` | Contact information, contact form and interactive map placeholder. |
| `css/style.css` | Shared page styling, responsive layouts, hover transitions and reduced-motion support. |
| `js/script.js` | JavaScript for navigation, product search/filtering, gallery lightbox, product selection, forms and map setup. |
| `images/` | Image assets used by the website. The current package contains placeholder SVG artwork that should be replaced with the approved Can Own Clothing photographs and logo before final submission/publication. |
| `robots.txt` | Starter file for crawler guidance. |
| `sitemap.xml` | Starter sitemap listing the site pages. Replace example URLs with the final published domain. |
| `REFERENCES.md` | Credible technical sources supporting the implementation choices. |

## 3. Part 2 to Part 3 change log

The following records the main development changes from the Part 2 version to the Part 3 version. Part 2 provided the basic multi-page website structure, brand information, product presentation, customisation information, gallery and contact/enquiry content. Part 3 builds on that foundation with additional interaction, validation, responsive behaviour and technical documentation.

| Section/file | Part 2 baseline | Part 3 change | Reason / supporting source |
|---|---|---|---|
| `index.html` - Home | Basic home page introducing the brand and clothing. | Added FAQ/accordion interaction and improved page metadata/content structure. | Expandable content gives visitors a way to open and close answers; clear page content and titles support search understanding (Google Search Central, n.d.; MDN Web Docs, n.d.-a). |
| Shared header/navigation | Basic navigation between the website pages. | Added responsive navigation behaviour and a menu toggle for smaller screens. | Helps navigation adapt to smaller screens and different devices (MDN Web Docs, n.d.-b). |
| `about.html` - About and gallery | Brand story and gallery images. | Added a clickable gallery/lightbox so visitors can view a selected image larger and close it again. | JavaScript event listeners allow a page to respond to user actions such as clicks and keyboard input (MDN Web Docs, n.d.-c). |
| `products.html` - Products | Product cards showing clothing and the existing standard prices (hoodie R350; T-shirt R250). | Added live text search and a category filter for product cards. | Event-driven JavaScript responds to text entry and filter changes (MDN Web Docs, n.d.-c). |
| `colours.html` - Colour selection | Product/customisation information with a simpler selection experience. | Added product, colour, size and quantity selection, a summary and a route to the enquiry form carrying selected details. | DOM events and URL query parameters connect the visitor's choices to the next step (MDN Web Docs, n.d.-c). |
| `enquiry.html` - Enquiry form | Basic enquiry/contact details. | Added browser-side required-field and input validation, an estimated total for standard items and a prepared email draft. | HTML form constraints can help validate user input in the browser, but they do not replace server-side validation (MDN Web Docs, n.d.-d). |
| `contact.html` - Contact | Basic contact information/form and social links. | Added client-side form handling that prepares a message in the visitor's email application, plus an interactive map placeholder. | Leaflet's documentation explains the required map container, map setup and attribution (Leaflet, n.d.; OpenStreetMap contributors, n.d.). |
| `css/style.css` - Design | Basic styling for page layout and product presentation. | Extended shared styling with responsive layouts, card styling, hover transitions and reduced-motion support. | Responsive CSS helps layouts adapt to different viewport sizes; motion effects should be considered with users' motion preferences in mind (MDN Web Docs, n.d.-b). |
| SEO and site files | No complete SEO starter files documented in the Part 2 baseline. | Added/updated page titles, meta descriptions, image alternative text, `robots.txt` and `sitemap.xml` starter files. | These are basic discoverability and site-organisation measures; they do not guarantee search indexing or ranking (Google Search Central, n.d.). |
| Documentation | Limited or no consolidated technical README and reference list. | Added this README with file descriptions, setup notes, a Part 2-to-Part 3 changelog, testing guidance and limitations; added `REFERENCES.md`. | Makes the implementation and research basis easier to understand and review. |


## 4. Part 3 functionality

- Responsive navigation for smaller screens.
- FAQ accordion on the home page.
- Product search and product-category filtering.
- Clickable gallery with a lightbox and close controls.
- Product, colour, size and quantity selection.
- Transfer of selected product details to the enquiry form.
- Browser-side validation and estimated standard-item totals.
- Prepared email drafts for enquiries and contact messages.
- Interactive Leaflet map using OpenStreetMap tiles, currently centred on an approximate Durban location.
- Responsive styling, hover transitions and reduced-motion support.
- SEO starter metadata, `robots.txt` and `sitemap.xml`.

## 5. Limitations

- This is a front-end coursework prototype. It does not include a database, user accounts, stock management, payment gateway or order-processing backend.
- The displayed prices are estimates for standard items: hoodie R350 and T-shirt R250. Availability, customisation charges, size and final prices must be confirmed by the business.
- The forms perform browser-side validation and prepare an email draft using `mailto:`. They do not automatically send or store submissions. The visitor must send the draft from their email application. A production website should use a secure form endpoint or service and validate submissions on the server as well (MDN Web Docs, n.d.-d).
- The map location, email address, domain and social links are placeholders until confirmed.
- SEO starter files do not guarantee that search engines will crawl, index or rank the website (Google Search Central, n.d.).

## 6. References

The references below support the implementation decisions described in this README. Full source details and access dates are in [`REFERENCES.md`](REFERENCES.md).

- Google Search Central (n.d.) explains basic search-engine optimisation, useful content and image discoverability (Google Search Central, n.d.).
- MDN Web Docs (n.d.-a) documents HTML forms and page structure; MDN Web Docs (n.d.-d) explains browser-side form validation and its limits.
- MDN Web Docs (n.d.-b) provides guidance on responsive CSS and media queries.
- MDN Web Docs (n.d.-c) explains DOM events used for interactive controls.
- Leaflet (n.d.) and OpenStreetMap contributors (n.d.) document the interactive map setup and map-data attribution.

## 7. Code comments and referencing

Code comments are used to label important JavaScript sections (for example, search/filtering, gallery lightbox, colour selection, form handling and map setup). The technical sources are cited in this README and listed in `REFERENCES.md`, so the implementation decisions can be traced to credible documentation. When adding new code based on an external source, add a short comment near that code naming the source and add the full source to `REFERENCES.md`. Do not place a citation in a comment unless that source genuinely informed the code.

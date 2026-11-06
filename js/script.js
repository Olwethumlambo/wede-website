document.addEventListener("DOMContentLoaded", () => {
  // Responsive navigation
  document.querySelectorAll(".menu-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const nav = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = nav.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // Search and filter product cards
  const search = document.getElementById("product-search");
  const filter = document.getElementById("product-filter");
  const productItems = [...document.querySelectorAll(".product-item")];
  const resultCount = document.getElementById("result-count");
  function filterProducts() {
    if (!search || !filter) return;
    const term = search.value.trim().toLowerCase();
    const kind = filter.value;
    let visible = 0;
    productItems.forEach(item => {
      const matches = item.dataset.name.toLowerCase().includes(term) &&
        (kind === "all" || item.dataset.type === kind);
      item.classList.toggle("hidden", !matches);
      if (matches) visible++;
    });
    if (resultCount) resultCount.textContent = `Showing ${visible} product${visible === 1 ? "" : "s"}`;
    let empty = document.getElementById("no-results");
    if (visible === 0 && productItems.length) {
      if (!empty) {
        empty = document.createElement("p");
        empty.id = "no-results";
        empty.className = "no-results";
        empty.textContent = "No products match your search. Try another word or filter.";
        document.getElementById("product-list").appendChild(empty);
      }
    } else if (empty) empty.remove();
  }
  if (search && filter) {
    search.addEventListener("input", filterProducts);
    filter.addEventListener("change", filterProducts);
  }

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeLightbox = document.querySelector(".lightbox-close");
  document.querySelectorAll(".gallery-item").forEach(button => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.full;
      lightboxImage.alt = button.querySelector("img").alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      if (closeLightbox) closeLightbox.focus();
    });
  });
  function hideLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }
  if (closeLightbox) closeLightbox.addEventListener("click", hideLightbox);
  if (lightbox) lightbox.addEventListener("click", event => { if (event.target === lightbox) hideLightbox(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") hideLightbox(); });

  // Colour selection preview and passing the selection to the enquiry page
  const colourForm = document.getElementById("colour-form");
  const colourProduct = document.getElementById("colour-product");
  const colourChoice = document.getElementById("colour-choice");
  const colourSize = document.getElementById("colour-size");
  const colourQuantity = document.getElementById("colour-quantity");
  const colourSummary = document.getElementById("colour-summary");
  const colourPreview = document.getElementById("colour-preview");
  function updateColourSummary() {
    if (!colourProduct) return;
    const productName = colourProduct.value === "hoodie" ? "Hoodie" : "T-shirt";
    if (colourSummary) colourSummary.textContent = `Selected: ${productName}, ${colourChoice.value}, ${colourSize.value}.`;
    if (colourPreview && colourChoice) {
      const hoodieImages = {"Black":"images/image5.jpg", "White":"images/image6.jpg", "Grey":"images/image7.jpg", "Burgundy":"images/image8.jpg", "Navy blue":"images/image9.jpg"};
      const tshirtImages = {"Black":"images/image1.jpg", "Burgundy":"images/image2.jpg", "Navy blue":"images/image3.jpg", "Grey":"images/image4.jpg"};
      const imageSet = colourProduct.value === "hoodie" ? hoodieImages : tshirtImages;
      const selectedImage = imageSet[colourChoice.value];
      if (selectedImage) colourPreview.src = selectedImage;
      colourPreview.alt = `Can Own ${productName} in ${colourChoice.value}`;
    }
  }
  function updateColourOptions() {
    if (!colourProduct || !colourChoice) return;
    const allowed = colourProduct.value === "hoodie" ? ["Black", "White", "Grey", "Navy blue", "Burgundy"] : ["Black", "Grey", "Navy blue", "Burgundy"];
    [...colourChoice.options].forEach(option => { option.hidden = !allowed.includes(option.value); });
    if (!allowed.includes(colourChoice.value)) colourChoice.value = allowed[0];
    updateColourSummary();
  }
  if (colourProduct) colourProduct.addEventListener("change", updateColourOptions);
  [colourChoice, colourSize].forEach(el => { if (el) el.addEventListener("change", updateColourSummary); });
  updateColourOptions();
  if (colourForm) colourForm.addEventListener("submit", event => {
    event.preventDefault();
    const params = new URLSearchParams({
      product: colourProduct.value,
      colour: colourChoice.value,
      size: colourSize.value,
      quantity: colourQuantity.value
    });
    window.location.href = `enquiry.html?${params.toString()}`;
  });

  // Fill enquiry form from product/colour query parameters
  const params = new URLSearchParams(window.location.search);
  const enquiryProduct = document.getElementById("product");
  const enquirySize = document.getElementById("size");
  const enquiryQuantity = document.getElementById("quantity");
  const enquiryMessageBox = document.getElementById("message");
  if (enquiryProduct && params.has("product")) {
    const value = params.get("product");
    enquiryProduct.value = value === "hoodie" || value === "tshirt" || value === "custom" ? value : "";
    if (params.has("colour") && enquiryMessageBox) enquiryMessageBox.value = `Preferred colour: ${params.get("colour")}. Please confirm availability.`;
    if (params.has("size") && enquirySize) enquirySize.value = params.get("size");
    if (params.has("quantity") && enquiryQuantity) enquiryQuantity.value = params.get("quantity");
  }

  // Enquiry form: native validation, estimated total, and email draft
  const enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) enquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;
    const data = new FormData(enquiryForm);
    const product = data.get("product") || "";
    const quantity = Math.max(1, Number(data.get("quantity") || 1));
    const prices = { hoodie: 350, tshirt: 250 };
    const total = prices[product] ? prices[product] * quantity : null;
    const priceText = total === null ? "The price will be confirmed after reviewing your request." :
      `Estimated item total: R${total.toLocaleString("en-ZA")}. This excludes any delivery or customisation costs and is not a final quote.`;
    const response = document.getElementById("enquiryMessage");
    if (response) response.textContent = `${priceText} Stock and size availability must be confirmed by the business.`;
    const body = [
      "Can Own Clothing enquiry", "",
      `Name: ${data.get("name")}`, `Email: ${data.get("email")}`, `Phone: ${data.get("phone") || "Not provided"}`,
      `Enquiry type: ${data.get("type")}`, `Product: ${product || "Not selected"}`,
      `Size: ${data.get("size") || "Not selected"}`, `Quantity: ${quantity}`, "",
      `Message: ${data.get("message")}`, "", priceText
    ].join("\n");
    const link = document.getElementById("enquiry-email-link");
    if (link) {
      link.href = `mailto:canownclothing@example.com?subject=${encodeURIComponent("Can Own Clothing enquiry")}&body=${encodeURIComponent(body)}`;
      link.classList.remove("hidden");
    }
  });

  // Contact form compiles the message into an email draft
  const contactForm = document.getElementById("contactForm");
  if (contactForm) contactForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const body = [
      "Can Own Clothing contact message", "",
      `Name: ${data.get("name")}`, `Email: ${data.get("email")}`,
      `Message type: ${data.get("subject")}`, "", `Message: ${data.get("message")}`
    ].join("\n");
    const link = document.getElementById("contact-email-link");
    if (link) {
      link.href = `mailto:canownclothing@example.com?subject=${encodeURIComponent("Can Own Clothing - " + data.get("subject"))}&body=${encodeURIComponent(body)}`;
      link.classList.remove("hidden");
    }
    const response = document.getElementById("contactMessage");
    if (response) response.textContent = "Your message has been checked and prepared. Select the email button to open your email app and send it.";
  });

  // Enlarge real product and lifestyle photographs when clicked.
  document.querySelectorAll(".zoomable-image").forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      let viewer = document.getElementById("photo-viewer");
      if (!viewer) {
        viewer = document.createElement("div");
        viewer.id = "photo-viewer";
        viewer.className = "photo-viewer";
        viewer.innerHTML = '<button type="button" class="photo-viewer-close" aria-label="Close enlarged picture">×</button><img alt="Enlarged clothing photograph">';
        document.body.appendChild(viewer);
        viewer.addEventListener("click", event => { if (event.target === viewer || event.target.classList.contains("photo-viewer-close")) viewer.classList.remove("open"); });
      }
      const large = viewer.querySelector("img");
      large.src = img.currentSrc || img.src;
      large.alt = img.alt;
      viewer.classList.add("open");
    });
  });

  // Interactive map: approximate Durban area only; update to the real business location before publishing.
  const mapElement = document.getElementById("map");
  if (mapElement) {
    if (window.L) {
      const map = L.map("map", {zoomControl:true, scrollWheelZoom:true}).setView([-29.6000, 30.3790], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);
      L.marker([-29.6000, 30.3790]).addTo(map).bindPopup("Pietermaritzburg city-centre area (approximate). This is not a confirmed shop address.");
      setTimeout(() => map.invalidateSize(), 250);
    } else {
      mapElement.innerHTML = '<iframe title="Zoomable OpenStreetMap map of Pietermaritzburg" src="https://www.openstreetmap.org/export/embed.html?bbox=30.34%2C-29.63%2C30.42%2C-29.57&layer=mapnik&marker=-29.60%2C30.379" loading="lazy"></iframe>';
    }
  }
});

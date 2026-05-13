const IMAGES = [
  {
    id: 1,
    cat: "nature",
    src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800",
    thumb: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=200",
    title: "Northern Mist",
    subtitle: "Landscape",
    desc: "Morning fog dissolves over ancient pines, the forest holding its breath before the day takes hold.",
    height: "tall",
  },
  {
    id: 2,
    cat: "architecture",
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    thumb: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200",
    title: "Concrete Light",
    subtitle: "Architecture",
    desc: "Brutalist geometry softened by afternoon sun — shadows carve meaning from raw material.",
    height: "medium",
  },
  {
    id: 3,
    cat: "portrait",
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800",
    thumb: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
    title: "Quiet Study",
    subtitle: "Portrait",
    desc: "A moment of stillness caught between thoughts — the camera as witness, not intruder.",
    height: "tall",
  },
  {
    id: 4,
    cat: "abstract",
    src: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800",
    thumb: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=200",
    title: "Iridescence",
    subtitle: "Abstract",
    desc: "Color as substance — light folded into matter until the boundary between disappears.",
    height: "short",
  },
  {
    id: 5,
    cat: "nature",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    thumb: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200",
    title: "Aerial Silence",
    subtitle: "Landscape",
    desc: "The earth from above loses its urgency — what seemed important becomes texture.",
    height: "medium",
  },
  {
    id: 6,
    cat: "architecture",
    src: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=800",
    thumb: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=200",
    title: "Axis Mundi",
    subtitle: "Architecture",
    desc: "Steel and glass reach upward in a gesture both practical and sublime.",
    height: "tall",
  },
  {
    id: 7,
    cat: "nature",
    src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
    thumb: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=200",
    title: "Golden Shore",
    subtitle: "Seascape",
    desc: "Where water meets land, the day performs its daily act of dissolution.",
    height: "short",
  },
  {
    id: 8,
    cat: "portrait",
    src: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800",
    thumb: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200",
    title: "Known Light",
    subtitle: "Portrait",
    desc: "The gaze holds a thousand unspoken languages — this one speaks of recognition.",
    height: "tall",
  },
  {
    id: 9,
    cat: "abstract",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200",
    title: "Ripple Effect",
    subtitle: "Abstract",
    desc: "A single disturbance propagates outward — cause and consequence made visible.",
    height: "medium",
  },
  {
    id: 10,
    cat: "architecture",
    src: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800",
    thumb: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=200",
    title: "Glass Horizon",
    subtitle: "Architecture",
    desc: "Transparency as architectural intention — the building refuses to claim its space.",
    height: "short",
  },
  {
    id: 11,
    cat: "nature",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    thumb: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200",
    title: "Cathedral Grove",
    subtitle: "Forest",
    desc: "Ancient trees hold centuries of silence between them — to enter is to become small.",
    height: "tall",
  },
  {
    id: 12,
    cat: "abstract",
    src: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800",
    thumb: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=200",
    title: "Threshold",
    subtitle: "Abstract",
    desc: "Between states — not quite water, not quite light. The moment before definition.",
    height: "medium",
  },
];

let activeFilter = "all";
let activeView = "grid-3";
let currentIndex = 0;
let visibleImages = [...IMAGES];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbTitle = document.getElementById("lbTitle");
const lbDesc = document.getElementById("lbDesc");
const lbCat = document.getElementById("lbCat");
const lbCurrent = document.getElementById("lbCurrent");
const lbTotal = document.getElementById("lbTotal");
const lbThumbs = document.getElementById("lbThumbs");
const imgCount = document.getElementById("img-count");

function buildGallery() {
  gallery.innerHTML = "";

  visibleImages =
    activeFilter === "all"
      ? [...IMAGES]
      : IMAGES.filter((img) => img.cat === activeFilter);

  imgCount.textContent = visibleImages.length;
  lbTotal.textContent = visibleImages.length;

  if (visibleImages.length === 0) {
    gallery.innerHTML = '<div class="empty">No images in this category</div>';
    return;
  }

  visibleImages.forEach((img, i) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.dataset.index = i;
    item.innerHTML = `
      <img src="${img.src}" alt="${img.title}" loading="lazy" />
      <div class="item-overlay">
        <div class="item-title">${img.title}</div>
        <div class="item-meta">
          <span class="item-cat">${img.cat}</span>
          <span>${img.subtitle}</span>
        </div>
      </div>
      <div class="item-expand">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1h5M1 1v5M13 13h-5M13 13v-5M1 13h5M1 13v-5M13 1h-5M13 1v5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
    `;
    item.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(item);
  });

  buildThumbs();
}

function buildThumbs() {
  lbThumbs.innerHTML = "";
  visibleImages.forEach((img, i) => {
    const t = document.createElement("img");
    t.src = img.thumb;
    t.alt = img.title;
    t.className = "lb-thumb";
    t.addEventListener("click", () => {
      currentIndex = i;
      updateLightbox();
    });
    lbThumbs.appendChild(t);
  });
}

function openLightbox(index) {
  currentIndex = index;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
  updateLightbox();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const img = visibleImages[currentIndex];
  lbImg.classList.add("loading");
  const tempImg = new Image();
  tempImg.onload = () => {
    lbImg.src = img.src;
    lbImg.alt = img.title;
    lbImg.classList.remove("loading");
  };
  tempImg.src = img.src;

  lbTitle.innerHTML = img.title
    .split(" ")
    .map((w, i) =>
      i === img.title.split(" ").length - 1 ? `<em>${w}</em>` : w,
    )
    .join(" ");
  lbDesc.textContent = img.desc;
  lbCat.textContent =
    img.cat.toUpperCase() + " · " + img.subtitle.toUpperCase();
  lbCurrent.textContent = currentIndex + 1;

  const thumbs = lbThumbs.querySelectorAll(".lb-thumb");
  thumbs.forEach((t, i) => t.classList.toggle("active", i === currentIndex));

  const activeThumb = thumbs[currentIndex];
  if (activeThumb)
    activeThumb.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
}

function navigate(dir) {
  currentIndex =
    (currentIndex + dir + visibleImages.length) % visibleImages.length;
  updateLightbox();
}

// Filter pills
document.querySelectorAll(".pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".pill")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.cat;
    buildGallery();
  });
});

// View toggles
document.querySelectorAll(".view-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".view-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeView = btn.dataset.view;
    gallery.className = `gallery ${activeView}`;
  });
});

// Lightbox controls
document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbBackdrop").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", () => navigate(-1));
document.getElementById("lbNext").addEventListener("click", () => navigate(1));

// Keyboard
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") navigate(-1);
  if (e.key === "ArrowRight") navigate(1);
});

// Touch swipe on lightbox
let touchStartX = 0;
lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});
lightbox.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
});

// Init
buildGallery();

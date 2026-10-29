document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;


  /* MOBILE MENU */

  const mobileMenuButton =
    document.getElementById("mobileMenuButton");

  const mainNav =
    document.getElementById("mainNav");


  if (
    mobileMenuButton &&
    mainNav
  ) {

    mobileMenuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          mainNav.classList.toggle("open");

        mobileMenuButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    mainNav
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            mainNav.classList.remove("open");

            mobileMenuButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }



  /* REVEAL */

  let revealObserver = null;


  function observeRevealElements(
    root = document
  ) {

    const elements =
      root.querySelectorAll(
        ".reveal:not(.visible)"
      );


    if (
      !("IntersectionObserver" in window)
    ) {

      elements.forEach(
        (element) => {

          element.classList.add(
            "visible"
          );

        }
      );

      return;
    }


    if (!revealObserver) {

      revealObserver =
        new IntersectionObserver(
          (entries, observer) => {

            entries.forEach(
              (entry) => {

                if (
                  entry.isIntersecting
                ) {

                  entry.target.classList.add(
                    "visible"
                  );

                  observer.unobserve(
                    entry.target
                  );

                }

              }
            );

          },
          {
            threshold: 0.12
          }
        );

    }


    elements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  }


  observeRevealElements();



  /* TOAST */

  const toast =
    document.getElementById("toast");

  const toastMessage =
    document.getElementById(
      "toastMessage"
    );

  let toastTimer;


  function showToast(message) {

    if (
      !toast ||
      !toastMessage
    ) {
      return;
    }


    toastMessage.textContent =
      message;


    toast.classList.add(
      "show"
    );


    clearTimeout(
      toastTimer
    );


    toastTimer =
      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

        },
        3200
      );

  }



  /* CONTACT PREFERENCE */

  function setupContactPreference(
    form
  ) {

    if (!form) {
      return;
    }


    const preference =
      form.querySelector(
        "[data-contact-preference]"
      );

    const preferenceGroup =
      form.querySelector(
        "[data-preference-group]"
      );

    const phoneGroup =
      form.querySelector(
        "[data-phone-group]"
      );

    const emailGroup =
      form.querySelector(
        "[data-email-group]"
      );

    const phoneInput =
      form.querySelector(
        "[data-phone-input]"
      );

    const emailInput =
      form.querySelector(
        "[data-email-input]"
      );


    if (
      !preference ||
      !phoneGroup ||
      !emailGroup ||
      !phoneInput ||
      !emailInput
    ) {
      return;
    }


    function applyPreference() {

      const selected =
        preference.value;


      if (
        selected === "email"
      ) {

        phoneGroup.classList.add(
          "contact-field-hidden"
        );

        emailGroup.classList.remove(
          "contact-field-hidden"
        );


        phoneInput.required =
          false;

        emailInput.required =
          true;

      }

      else {

        phoneGroup.classList.remove(
          "contact-field-hidden"
        );

        emailGroup.classList.add(
          "contact-field-hidden"
        );


        phoneInput.required =
          true;

        emailInput.required =
          false;

      }

    }


    preference.addEventListener(
      "change",
      applyPreference
    );


    applyPreference();


    form._contactMode = {
      preference,
      preferenceGroup,
      phoneGroup,
      emailGroup,
      phoneInput,
      emailInput,
      applyPreference
    };

  }


  document
    .querySelectorAll(
      "[data-contact-form]"
    )
    .forEach(
      setupContactPreference
    );



  /* SERVICE DRAWER */

  const serviceDrawer =
    document.getElementById(
      "serviceDrawer"
    );

  const drawerBackdrop =
    document.getElementById(
      "drawerBackdrop"
    );

  const drawerClose =
    document.getElementById(
      "drawerClose"
    );

  const drawerLabel =
    document.getElementById(
      "drawerLabel"
    );

  const drawerTitle =
    document.getElementById(
      "drawerTitle"
    );

  const drawerIntro =
    document.getElementById(
      "drawerIntro"
    );

  const drawerPoints =
    document.getElementById(
      "drawerPoints"
    );

  const drawerExtra =
    document.getElementById(
      "drawerExtra"
    );

  const serviceInterest =
    document.getElementById(
      "serviceInterest"
    );

  const serviceForm =
    document.getElementById(
      "serviceForm"
    );


  const serviceData = {

    health: {

      label:
        "Personal Advisory",

      title:
        "Υγεία",

      intro:
        "Η ασφάλιση υγείας δεν είναι μόνο θέμα κόστους. Σημασία έχει να γνωρίζεις ποιες επιλογές θα έχεις πραγματικά διαθέσιμες όταν τις χρειαστείς.",

      points: [
        "Νοσοκομειακές καλύψεις και όρια.",
        "Απαλλαγές και συμμετοχές.",
        "Δίκτυα νοσοκομείων και τρόπος χρήσης.",
        "Τι καλύπτεται και τι εξαιρείται."
      ],

      extra:
        ""

    },


    family: {

      label:
        "Personal Advisory",

      title:
        "Οικογένεια & Εισόδημα",

      intro:
        "Η οικονομική προστασία έχει μεγαλύτερη αξία όταν έχει σχεδιαστεί πριν αλλάξουν τα δεδομένα.",

      points: [
        "Προστασία ζωής.",
        "Απώλεια ή μείωση εισοδήματος.",
        "Οικογενειακές οικονομικές υποχρεώσεις.",
        "Σχεδιασμός με βάση τους ανθρώπους που θέλεις να προστατεύσεις."
      ],

      extra:
        ""

    },


    home: {

      label:
        "Personal Advisory",

      title:
        "Κατοικία",

      intro:
        "Η σωστή προστασία της κατοικίας ξεκινά από την πραγματική αξία του ακινήτου και τους κινδύνους που μπορούν να δημιουργήσουν σοβαρό οικονομικό κόστος.",

      points: [
        "Κτίριο και περιεχόμενο.",
        "Φυσικά φαινόμενα.",
        "Πυρκαγιά και λοιποί βασικοί κίνδυνοι.",
        "Ασφαλιζόμενη αξία και αποφυγή κενών στην κάλυψη."
      ],

      extra:
        ""

    },


    car: {

      label:
        "Personal Advisory",

      title:
        "Αυτοκίνητο",

      intro:
        "Η υποχρεωτική ασφάλιση είναι μόνο η αφετηρία. Η ουσιαστική κάλυψη εξαρτάται από το όχημα, την αξία του και τον τρόπο που χρησιμοποιείται.",

      points: [
        "Αστική ευθύνη.",
        "Ίδιες ζημιές και μικτή κάλυψη.",
        "Κλοπή, πυρκαγιά και φυσικά φαινόμενα.",
        "Οδική βοήθεια και πρόσθετες καλύψεις."
      ],

      extra:
        ""

    },


    business: {

      label:
        "Business Advisory",

      title:
        "Επιχείρηση",

      intro:
        "Κάθε δραστηριότητα έχει διαφορετικούς κινδύνους. Πρώτα εντοπίζουμε τι μπορεί πραγματικά να επηρεάσει την επιχείρηση και μετά εξετάζουμε την προστασία.",

      points: [
        "Επαγγελματική περιουσία.",
        "Αστική και επαγγελματική ευθύνη.",
        "Κίνδυνοι που μπορούν να διακόψουν τη λειτουργία.",
        "Καλύψεις ανάλογα με το αντικείμενο της δραστηριότητας."
      ],

      extra:
        ""

    },


    investment: {

      label:
        "Financial Planning",

      title:
        "Αποταμίευση / Επένδυση / Σύνταξη",

      intro:
        "Ο οικονομικός σχεδιασμός ξεκινά από τον στόχο, τον χρόνο που έχεις μπροστά σου και το επίπεδο κινδύνου που μπορείς να αποδεχθείς.",

      points: [
        "Καθορισμός στόχων.",
        "Χρονικός ορίζοντας.",
        "Σταδιακή αποταμίευση και επένδυση.",
        "Προετοιμασία για τη σύνταξη."
      ],

      extra:
        ""

    },


    finance: {

      label:
        "In partnership with IMS",

      title:
        "Χρηματοδότηση",

      intro:
        "Μέσα από τη συνεργασία μου με την IMS μπορούμε να εξετάσουμε διαθέσιμες επιλογές στεγαστικής χρηματοδότησης από συνεργαζόμενες τράπεζες.",

      points: [
        "Αγορά έτοιμου ή υπό κατασκευή ακινήτου.",
        "Αγορά και επισκευή ή ολοκλήρωση ημιτελούς ακινήτου.",
        "Αγορά οικοπέδου και ανέγερση.",
        "Χρηματοδότηση αγοράς μέσω πλειστηριασμού."
      ],

      extra:
        "Η αξιολόγηση γίνεται με βάση τα πραγματικά δεδομένα της κάθε περίπτωσης και τις διαθέσιμες τραπεζικές επιλογές."

    }

  };


  function configureServiceContactMode(
    serviceKey
  ) {

    if (
      !serviceForm ||
      !serviceForm._contactMode
    ) {
      return;
    }


    const mode =
      serviceForm._contactMode;


    if (
      serviceKey === "finance"
    ) {

      if (
        mode.preferenceGroup
      ) {

        mode.preferenceGroup.classList.add(
          "contact-field-hidden"
        );

      }


      mode.phoneGroup.classList.remove(
        "contact-field-hidden"
      );

      mode.emailGroup.classList.add(
        "contact-field-hidden"
      );


      mode.phoneInput.required =
        true;

      mode.emailInput.required =
        false;

      mode.emailInput.value =
        "";

    }

    else {

      if (
        mode.preferenceGroup
      ) {

        mode.preferenceGroup.classList.remove(
          "contact-field-hidden"
        );

      }


      mode.applyPreference();

    }

  }


  function openServiceDrawer(
    key
  ) {

    if (
      !serviceDrawer ||
      !drawerBackdrop
    ) {
      return;
    }


    const data =
      serviceData[key];


    if (!data) {
      return;
    }


    if (drawerLabel) {

      drawerLabel.textContent =
        data.label;

    }


    if (drawerTitle) {

      drawerTitle.textContent =
        data.title;

    }


    if (drawerIntro) {

      drawerIntro.textContent =
        data.intro;

    }


    if (drawerExtra) {

      drawerExtra.textContent =
        data.extra || "";

    }


    if (serviceInterest) {

      serviceInterest.value =
        data.title;

    }


    if (drawerPoints) {

      drawerPoints.innerHTML =
        data.points
          .map(
            (point, index) => {

              const number =
                String(
                  index + 1
                )
                .padStart(
                  2,
                  "0"
                );


              return `
                <div class="drawer-point">
                  <span>${number}</span>
                  <p>${point}</p>
                </div>
              `;

            }
          )
          .join("");

    }


    configureServiceContactMode(
      key
    );


    serviceDrawer.classList.add(
      "show"
    );

    drawerBackdrop.classList.add(
      "show"
    );


    serviceDrawer.setAttribute(
      "aria-hidden",
      "false"
    );


    body.classList.add(
      "drawer-open"
    );

  }


  function closeServiceDrawer() {

    if (
      !serviceDrawer ||
      !drawerBackdrop
    ) {
      return;
    }


    serviceDrawer.classList.remove(
      "show"
    );

    drawerBackdrop.classList.remove(
      "show"
    );


    serviceDrawer.setAttribute(
      "aria-hidden",
      "true"
    );


    body.classList.remove(
      "drawer-open"
    );

  }


  document
    .querySelectorAll(
      "[data-service]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            openServiceDrawer(
              button.dataset.service
            );

          }
        );

      }
    );


  if (drawerClose) {

    drawerClose.addEventListener(
      "click",
      closeServiceDrawer
    );

  }


  if (drawerBackdrop) {

    drawerBackdrop.addEventListener(
      "click",
      closeServiceDrawer
    );

  }



  /* KNOWLEDGE DATA */

  const categoryLabels = {
    health: "Υγεία",
    property: "Κατοικία",
    business: "Επιχείρηση",
    car: "Αυτοκίνητο",
    basics: "Βασικές έννοιες"
  };


  const categoryVisuals = {

    health: {
      className: "graphic-blue",
      symbol: "+"
    },

    property: {
      className: "graphic-brown",
      symbol: "%"
    },

    business: {
      className: "graphic-dark",
      symbol: "!"
    },

    car: {
      className: "graphic-neutral",
      symbol: "+"
    },

    basics: {
      className: "graphic-neutral",
      symbol: "A / B / C"
    }

  };


  const featuredKnowledgeContainer =
    document.getElementById(
      "featuredKnowledgeContainer"
    );

  const knowledgeGrid =
    document.getElementById(
      "knowledgeGrid"
    );

  let knowledgeItems = [];


  function escapeHtml(
    value = ""
  ) {

    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  function getYouTubeId(
    url = ""
  ) {

    const cleanUrl =
      String(url).trim();


    if (!cleanUrl) {
      return "";
    }


    try {

      const parsed =
        new URL(cleanUrl);


      if (
        parsed.hostname === "youtu.be" ||
        parsed.hostname.endsWith(
          ".youtu.be"
        )
      ) {

        return parsed.pathname
          .split("/")
          .filter(Boolean)[0] || "";

      }


      if (
        parsed.hostname.includes(
          "youtube.com"
        ) ||
        parsed.hostname.includes(
          "youtube-nocookie.com"
        )
      ) {

        const watchId =
          parsed.searchParams.get("v");


        if (watchId) {
          return watchId;
        }


        const parts =
          parsed.pathname
            .split("/")
            .filter(Boolean);


        const knownPrefixes = [
          "embed",
          "shorts",
          "live"
        ];


        if (
          parts.length >= 2 &&
          knownPrefixes.includes(
            parts[0]
          )
        ) {

          return parts[1];

        }

      }

    }

    catch (error) {

      return "";

    }


    return "";

  }


  function getYouTubeThumbnail(
    url
  ) {

    const id =
      getYouTubeId(url);


    if (!id) {
      return "";
    }


    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  }


  function getYouTubeEmbedUrl(
    url
  ) {

    const id =
      getYouTubeId(url);


    if (!id) {
      return "";
    }


    return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;

  }


  function createFeaturedKnowledge(
    item
  ) {

    if (
      !featuredKnowledgeContainer
    ) {
      return;
    }


    if (!item) {

      featuredKnowledgeContainer.innerHTML =
        "";

      return;
    }


    const label =
      categoryLabels[item.category] ||
      "Knowledge";


    const youtubeId =
      getYouTubeId(
        item.youtube_url
      );


    const thumbnail =
      getYouTubeThumbnail(
        item.youtube_url
      );


    const visualContent =
      thumbnail
        ? `
          <img
            src="${escapeHtml(thumbnail)}"
            alt=""
            style="
              position:absolute;
              inset:0;
              width:100%;
              height:100%;
              object-fit:cover;
            "
          >

          <span
            style="
              position:absolute;
              inset:0;
              background:linear-gradient(
                180deg,
                rgba(20,35,45,.08),
                rgba(20,35,45,.28)
              );
            "
          ></span>

          <span class="play-button">
            ▶
          </span>
        `
        : `
          <span class="visual-circle circle-one"></span>
          <span class="visual-circle circle-two"></span>
          <span class="visual-circle circle-three"></span>

          <div class="visual-center">

            <span>
              Featured
            </span>

            <strong>
              ${escapeHtml(label)}
            </strong>

          </div>

          <span class="play-button">
            ${youtubeId ? "▶" : "01"}
          </span>
        `;


    featuredKnowledgeContainer.innerHTML =
      `
        <article
          class="featured-card reveal knowledge-open"
          tabindex="0"
          data-knowledge-index="${item._index}"
        >

          <div class="featured-visual">
            ${visualContent}
          </div>


          <div class="featured-content">

            <span class="content-meta">
              ${escapeHtml(label)}
              ${item.duration ? ` · ${escapeHtml(item.duration)}` : ""}
              · Featured
            </span>

            <h2>
              ${escapeHtml(item.title)}
            </h2>

            <p>
              ${escapeHtml(item.description)}
            </p>

            <span class="content-action">
              ${youtubeId ? "Δες το βίντεο →" : "Δες την εξήγηση →"}
            </span>

          </div>

        </article>
      `;

  }


  function createKnowledgeCards(
    items
  ) {

    if (!knowledgeGrid) {
      return;
    }


    knowledgeGrid.innerHTML =
      items
        .map(
          (item, visibleIndex) => {

            const label =
              categoryLabels[item.category] ||
              "Γνώση";


            const visual =
              categoryVisuals[item.category] ||
              categoryVisuals.basics;


            const thumbnail =
              getYouTubeThumbnail(
                item.youtube_url
              );


            const cardNumber =
              String(
                visibleIndex + 1
              )
              .padStart(
                2,
                "0"
              );


            const visualContent =
              thumbnail
                ? `
                  <img
                    src="${escapeHtml(thumbnail)}"
                    alt=""
                    style="
                      position:absolute;
                      inset:0;
                      width:100%;
                      height:100%;
                      object-fit:cover;
                    "
                  >

                  <span
                    style="
                      position:absolute;
                      inset:0;
                      background:linear-gradient(
                        180deg,
                        rgba(20,35,45,.05),
                        rgba(20,35,45,.25)
                      );
                    "
                  ></span>

                  <span
                    style="
                      position:relative;
                      z-index:4;
                      width:52px;
                      height:52px;
                      display:grid;
                      place-items:center;
                      border-radius:50%;
                      background:rgba(255,255,255,.9);
                      color:#242b2d;
                      font-size:17px;
                    "
                  >
                    ▶
                  </span>
                `
                : `
                  <span class="graphic-index">
                    ${cardNumber}
                  </span>

                  <strong>
                    ${escapeHtml(visual.symbol)}
                  </strong>
                `;


            return `
              <article
                class="knowledge-card reveal knowledge-open"
                data-category="${escapeHtml(item.category)}"
                data-knowledge-index="${item._index}"
                tabindex="0"
              >

                <div
                  class="knowledge-graphic ${escapeHtml(visual.className)}"
                  style="position:relative;"
                >
                  ${visualContent}
                </div>

                <span class="card-meta">
                  ${escapeHtml(label)}
                  ${item.duration ? ` · ${escapeHtml(item.duration)}` : ""}
                </span>

                <h3>
                  ${escapeHtml(item.title)}
                </h3>

                <p>
                  ${escapeHtml(item.description)}
                </p>

              </article>
            `;

          }
        )
        .join("");

  }


  function applyKnowledgeFilter(
    filter
  ) {

    document
      .querySelectorAll(
        ".knowledge-card"
      )
      .forEach(
        (card) => {

          const category =
            card.dataset.category;


          const shouldShow =
            filter === "all" ||
            category === filter;


          card.classList.toggle(
            "hidden",
            !shouldShow
          );

        }
      );

  }


  function setupKnowledgeFilters() {

    const filterButtons =
      document.querySelectorAll(
        ".filter-button"
      );


    filterButtons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            filterButtons.forEach(
              (item) => {

                item.classList.remove(
                  "active"
                );

              }
            );


            button.classList.add(
              "active"
            );


            applyKnowledgeFilter(
              button.dataset.filter
            );

          }
        );

      }
    );

  }


  async function loadKnowledgeData() {

    if (
      !featuredKnowledgeContainer &&
      !knowledgeGrid
    ) {
      return;
    }


    try {

      const response =
        await fetch(
          "data/knowledge.json",
          {
            cache: "no-store"
          }
        );


      if (!response.ok) {

        throw new Error(
          `Knowledge data error: ${response.status}`
        );

      }


      const data =
        await response.json();


      const rawItems =
        Array.isArray(data.videos)
          ? data.videos
          : [];


      knowledgeItems =
        rawItems
          .map(
            (item, index) => ({
              ...item,
              _index: index
            })
          )
          .filter(
            (item) =>
              item.published !== false
          );


      const featuredItem =
        knowledgeItems.find(
          (item) =>
            item.featured === true
        ) ||
        knowledgeItems[0];


      createFeaturedKnowledge(
        featuredItem
      );


      createKnowledgeCards(
        knowledgeItems
      );


      observeRevealElements();


      const activeFilter =
        document.querySelector(
          ".filter-button.active"
        );


      applyKnowledgeFilter(
        activeFilter?.dataset.filter ||
        "all"
      );

    }

    catch (error) {

      console.error(
        "Δεν ήταν δυνατή η φόρτωση της Γνώσης.",
        error
      );


      if (
        featuredKnowledgeContainer
      ) {

        featuredKnowledgeContainer.innerHTML =
          `
            <div
              style="
                padding:28px;
                border:1px solid #dde1df;
                background:#ffffff;
              "
            >
              Δεν ήταν δυνατή η φόρτωση του περιεχομένου της Γνώσης.
            </div>
          `;

      }

    }

  }


  setupKnowledgeFilters();



  /* KNOWLEDGE DRAWER */

  const knowledgeDrawer =
    document.getElementById(
      "knowledgeDrawer"
    );

  const knowledgeBackdrop =
    document.getElementById(
      "knowledgeBackdrop"
    );

  const knowledgeClose =
    document.getElementById(
      "knowledgeClose"
    );

  const knowledgeDrawerTitle =
    document.getElementById(
      "knowledgeDrawerTitle"
    );

  const knowledgeDrawerMeta =
    document.getElementById(
      "knowledgeDrawerMeta"
    );

  const knowledgeDrawerSummary =
    document.getElementById(
      "knowledgeDrawerSummary"
    );

  const knowledgeVideoArea =
    document.getElementById(
      "knowledgeVideoArea"
    );


  function renderKnowledgeVideo(
    item
  ) {

    if (!knowledgeVideoArea) {
      return;
    }


    const embedUrl =
      getYouTubeEmbedUrl(
        item.youtube_url
      );


    if (embedUrl) {

      knowledgeVideoArea.innerHTML =
        `
          <iframe
            src="${escapeHtml(embedUrl)}"
            title="${escapeHtml(item.title)}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"
            style="
              position:absolute;
              inset:0;
              width:100%;
              height:100%;
              border:0;
            "
          ></iframe>
        `;

      return;
    }


    knowledgeVideoArea.innerHTML =
      `
        <span class="video-orbit video-orbit-a"></span>
        <span class="video-orbit video-orbit-b"></span>

        <div class="video-placeholder-center">

          <span>
            Video coming soon
          </span>

          <strong>
            Explanation
          </strong>

        </div>
      `;

  }


  function openKnowledgeDrawerByIndex(
    index
  ) {

    if (
      !knowledgeDrawer ||
      !knowledgeBackdrop
    ) {
      return;
    }


    const item =
      knowledgeItems.find(
        (entry) =>
          String(entry._index) ===
          String(index)
      );


    if (!item) {
      return;
    }


    const label =
      categoryLabels[item.category] ||
      "Knowledge";


    if (
      knowledgeDrawerTitle
    ) {

      knowledgeDrawerTitle.textContent =
        item.title || "";

    }


    if (
      knowledgeDrawerMeta
    ) {

      knowledgeDrawerMeta.textContent =
        item.duration
          ? `${label} · ${item.duration}`
          : label;

    }


    if (
      knowledgeDrawerSummary
    ) {

      knowledgeDrawerSummary.textContent =
        item.summary || "";

    }


    renderKnowledgeVideo(
      item
    );


    knowledgeDrawer.classList.add(
      "show"
    );

    knowledgeBackdrop.classList.add(
      "show"
    );


    knowledgeDrawer.setAttribute(
      "aria-hidden",
      "false"
    );


    body.classList.add(
      "drawer-open"
    );

  }


  function closeKnowledgeDrawer() {

    if (
      !knowledgeDrawer ||
      !knowledgeBackdrop
    ) {
      return;
    }


    knowledgeDrawer.classList.remove(
      "show"
    );

    knowledgeBackdrop.classList.remove(
      "show"
    );


    knowledgeDrawer.setAttribute(
      "aria-hidden",
      "true"
    );


    body.classList.remove(
      "drawer-open"
    );


    if (
      knowledgeVideoArea
    ) {

      knowledgeVideoArea.innerHTML =
        `
          <span class="video-orbit video-orbit-a"></span>
          <span class="video-orbit video-orbit-b"></span>

          <div class="video-placeholder-center">

            <span>
              Video placeholder
            </span>

            <strong>
              Explanation
            </strong>

          </div>
        `;

    }

  }


  document.addEventListener(
    "click",
    (event) => {

      const item =
        event.target.closest(
          ".knowledge-open"
        );


      if (!item) {
        return;
      }


      const index =
        item.dataset.knowledgeIndex;


      if (
        index !== undefined
      ) {

        openKnowledgeDrawerByIndex(
          index
        );

      }

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key !== "Enter" &&
        event.key !== " "
      ) {
        return;
      }


      const item =
        event.target.closest(
          ".knowledge-open"
        );


      if (!item) {
        return;
      }


      event.preventDefault();


      const index =
        item.dataset.knowledgeIndex;


      if (
        index !== undefined
      ) {

        openKnowledgeDrawerByIndex(
          index
        );

      }

    }
  );


  if (knowledgeClose) {

    knowledgeClose.addEventListener(
      "click",
      closeKnowledgeDrawer
    );

  }


  if (knowledgeBackdrop) {

    knowledgeBackdrop.addEventListener(
      "click",
      closeKnowledgeDrawer
    );

  }


  loadKnowledgeData();



  /* ESCAPE CLOSE */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key !== "Escape"
      ) {
        return;
      }


      closeServiceDrawer();
      closeKnowledgeDrawer();

    }
  );



  /* CAREER FORM MOTIVATION */

  const careerForm =
    document.getElementById(
      "careerForm"
    );

  const careerCheckError =
    document.getElementById(
      "careerCheckError"
    );


  function careerHasMotivation() {

    if (!careerForm) {
      return true;
    }


    return Boolean(
      careerForm.querySelector(
        'input[name="motivation"]:checked'
      )
    );

  }



  /* NETLIFY FORMS */

  document
    .querySelectorAll(
      ".js-netlify-form"
    )
    .forEach(
      (form) => {

        form.addEventListener(
          "submit",
          async (event) => {

            event.preventDefault();


            if (
              form === careerForm &&
              !careerHasMotivation()
            ) {

              if (
                careerCheckError
              ) {

                careerCheckError.textContent =
                  "Επίλεξε τουλάχιστον ένα.";

              }

              return;

            }


            if (
              careerCheckError
            ) {

              careerCheckError.textContent =
                "";

            }


            if (
              !form.checkValidity()
            ) {

              form.reportValidity();

              return;

            }


            const submitButton =
              form.querySelector(
                'button[type="submit"]'
              );


            if (submitButton) {
              submitButton.disabled = true;
            }


            try {

              const formData =
                new FormData(form);


              const response =
                await fetch(
                  "/",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type":
                        "application/x-www-form-urlencoded"
                    },
                    body:
                      new URLSearchParams(
                        formData
                      ).toString()
                  }
                );


              if (!response.ok) {
                throw new Error(
                  "Form submission failed"
                );
              }


              const message =
                form.dataset.success ||
                "Η αποστολή ολοκληρώθηκε.";


              showToast(
                message
              );


              form.reset();


              if (
                form._contactMode
              ) {

                form._contactMode.preference.value =
                  "phone";

                form._contactMode.applyPreference();

              }


              if (
                form === serviceForm
              ) {

                setTimeout(
                  closeServiceDrawer,
                  550
                );

              }


              if (
                knowledgeDrawer &&
                knowledgeDrawer.contains(form)
              ) {

                setTimeout(
                  closeKnowledgeDrawer,
                  550
                );

              }

            }

            catch (error) {

              showToast(
                "Η αποστολή δεν ολοκληρώθηκε. Δοκίμασε ξανά σε λίγο."
              );

            }

            finally {

              if (submitButton) {
                submitButton.disabled = false;
              }

            }

          }
        );

      }
    );



  /* CAREER AUDIO */

  const careerAudio =
    document.getElementById(
      "careerAudio"
    );

  const careerSoundToggle =
    document.getElementById(
      "careerSoundToggle"
    );

  const careerSoundText =
    document.getElementById(
      "careerSoundText"
    );


  if (
    careerAudio &&
    careerSoundToggle
  ) {

    careerAudio.volume =
      0.18;


    let ambientEnabled =
      localStorage.getItem(
        "careerAmbient"
      ) !== "off";


    function updateSoundUI() {

      careerSoundToggle.classList.toggle(
        "sound-off",
        !ambientEnabled
      );


      careerSoundToggle.setAttribute(
        "aria-pressed",
        String(
          ambientEnabled
        )
      );


      if (
        careerSoundText
      ) {

        careerSoundText.textContent =
          ambientEnabled
            ? "Ambient On"
            : "Ambient Off";

      }

    }


    async function tryPlayAudio() {

      if (
        !ambientEnabled
      ) {
        return;
      }


      try {

        await careerAudio.play();

      }

      catch (error) {

      }

    }


    function enableAfterInteraction() {

      if (
        ambientEnabled &&
        careerAudio.paused
      ) {

        careerAudio
          .play()
          .catch(
            () => {}
          );

      }


      document.removeEventListener(
        "pointerdown",
        enableAfterInteraction
      );

      document.removeEventListener(
        "keydown",
        enableAfterInteraction
      );

    }


    updateSoundUI();

    tryPlayAudio();


    document.addEventListener(
      "pointerdown",
      enableAfterInteraction,
      {
        once: true
      }
    );


    document.addEventListener(
      "keydown",
      enableAfterInteraction,
      {
        once: true
      }
    );


    careerSoundToggle.addEventListener(
      "click",
      () => {

        ambientEnabled =
          !ambientEnabled;


        localStorage.setItem(
          "careerAmbient",
          ambientEnabled
            ? "on"
            : "off"
        );


        updateSoundUI();


        if (
          ambientEnabled
        ) {

          careerAudio
            .play()
            .catch(
              () => {}
            );

        }

        else {

          careerAudio.pause();

        }

      }
    );


    document.addEventListener(
      "visibilitychange",
      () => {

        if (
          document.hidden
        ) {

          careerAudio.pause();

          return;

        }


        if (
          ambientEnabled
        ) {

          careerAudio
            .play()
            .catch(
              () => {}
            );

        }

      }
    );

  }

});
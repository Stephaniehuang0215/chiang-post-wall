(function () {
  "use strict";

  var PLATFORM_LABELS = { facebook: "Facebook", threads: "Threads", article: "文章" };
  var RELATION_ORDER = ["家人", "同學", "師長", "學生", "朋友", "工作夥伴", "合作夥伴", "其他受過幫助的人"];
  var current = { platform: "all", relation: "all", trait: "all", query: "" };
  var index = [];
  var listEl = document.getElementById("post-list");
  var statusEl = document.getElementById("status");

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function normalize(value) {
    return String(value || "").normalize("NFKC").toLowerCase();
  }

  function safeUrl(value) {
    try {
      var parsed = new URL(value);
      return parsed.protocol === "https:" ? parsed.href : null;
    } catch (error) {
      return null;
    }
  }

  function assignAnchors(items) {
    var seen = {};
    items.forEach(function (post) {
      var base = "post-" + normalize(post.author).replace(/[^a-z0-9\u3400-\u9fff]+/g, "-").replace(/^-|-$/g, "");
      base = base === "post-" ? "post-item" : base;
      seen[base] = (seen[base] || 0) + 1;
      post.anchor = seen[base] === 1 ? base : base + "-" + seen[base];
    });
  }

  function share(data, done) {
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      navigator.share(data).catch(function (error) {
        if (error && error.name === "AbortError") return;
        copy();
      });
      return;
    }
    copy();

    function copy() {
      if (!navigator.clipboard) return done(false);
      navigator.clipboard.writeText(data.url).then(function () { done(true); }, function () { done(false); });
    }
  }

  function articlePreview(post, url) {
    var link = el("a", "article-preview");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.appendChild(el("span", "article-title", post.title || "閱讀文章"));
    if (post.source) link.appendChild(el("span", "article-source", post.source));
    if (post.excerpt) link.appendChild(el("span", "article-excerpt", post.excerpt));
    link.appendChild(el("span", "article-more", "閱讀原文 →"));
    return link;
  }

  function embedFor(post, url) {
    var wrap = el("div", "embed");
    if (post.platform === "facebook") {
      var width = 500;
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.facebook.com/plugins/post.php?href=" + encodeURIComponent(url) + "&show_text=true&width=" + width;
      iframe.width = String(width);
      iframe.height = String(Number(post.height) > 0 ? Number(post.height) : 820);
      iframe.loading = "lazy";
      iframe.title = post.author + " 的 Facebook 貼文";
      iframe.setAttribute("allow", "clipboard-write; encrypted-media; picture-in-picture; web-share");
      wrap.appendChild(iframe);
    } else if (post.platform === "threads" && post.embedHtml) {
      var template = document.createElement("template");
      template.innerHTML = String(post.embedHtml);
      template.content.querySelectorAll("script").forEach(function (script) { script.remove(); });
      wrap.appendChild(template.content);
    } else if (post.platform === "article") {
      wrap.appendChild(articlePreview(post, url));
    } else {
      wrap.appendChild(el("p", "embed-placeholder", "嵌入尚未設定，請由下方連結閱讀原文。"));
    }
    return wrap;
  }

  function loadThreadsScript() {
    if (document.querySelector('script[src="https://www.threads.com/embed.js"]')) return;
    var script = document.createElement("script");
    script.src = "https://www.threads.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }

  function renderCard(post) {
    var url = safeUrl(post.url);
    var platform = normalize(post.platform);
    if (!url || !post.author || !PLATFORM_LABELS[platform]) return null;
    post.platform = platform;

    var card = el("article", "card");
    card.id = post.anchor;
    card.dataset.platform = platform;
    card.dataset.relation = post.relation || "";
    card.appendChild(embedFor(post, url));

    var footer = el("div", "card-footer");
    var heading = el("div", "card-heading");
    heading.appendChild(el("h3", null, post.author));
    if (post.relation) heading.appendChild(el("span", "relation-tag", post.relation));
    heading.appendChild(el("span", "platform", PLATFORM_LABELS[platform]));
    footer.appendChild(heading);
    if (post.note) footer.appendChild(el("p", "note", post.note));

    var actions = el("div", "card-actions");
    var source = el("a", null, platform === "article" ? "閱讀原文" : "開啟原始貼文");
    source.href = url;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    actions.appendChild(source);
    var shareButton = el("button", null, "分享這篇");
    shareButton.type = "button";
    shareButton.addEventListener("click", function () {
      var shareUrl = location.origin + location.pathname + "#" + post.anchor;
      share({ title: post.author + "｜我們認識的蔣萬安", url: shareUrl }, function (copied) {
        shareButton.textContent = copied ? "已複製連結" : "請複製網址列";
        setTimeout(function () { shareButton.textContent = "分享這篇"; }, 2200);
      });
    });
    actions.appendChild(shareButton);
    footer.appendChild(actions);
    card.appendChild(footer);

    var traits = Array.isArray(post.traits) ? post.traits : [];
    var keywords = Array.isArray(post.keywords) ? post.keywords : [];
    index.push({
      card: card,
      traits: traits,
      text: normalize([post.author, post.relation, post.note, post.title].concat(traits, keywords).join(" "))
    });
    return card;
  }

  function filterButton(value, label, count) {
    var button = el("button", null, label);
    button.type = "button";
    button.dataset.filter = value;
    button.setAttribute("aria-pressed", String(value === "all"));
    if (count) button.appendChild(el("span", "count", String(count)));
    return button;
  }

  function buildDynamicFilters() {
    var relations = [];
    var traits = {};
    index.forEach(function (item) {
      var relation = item.card.dataset.relation;
      if (relation && relations.indexOf(relation) === -1) relations.push(relation);
      item.traits.forEach(function (trait) { traits[trait] = (traits[trait] || 0) + 1; });
    });

    if (relations.length) {
      var nav = document.getElementById("relation-filters");
      nav.appendChild(filterButton("all", "全部關係"));
      RELATION_ORDER.filter(function (item) { return relations.indexOf(item) !== -1; })
        .concat(relations.filter(function (item) { return RELATION_ORDER.indexOf(item) === -1; }))
        .forEach(function (item) { nav.appendChild(filterButton(item, item)); });
      document.getElementById("relation-group").hidden = false;
    }

    var traitNames = Object.keys(traits).sort(function (a, b) { return traits[b] - traits[a]; });
    if (traitNames.length) {
      var traitNav = document.getElementById("trait-filters");
      traitNav.appendChild(filterButton("all", "全部"));
      traitNames.forEach(function (trait) { traitNav.appendChild(filterButton(trait, trait, traits[trait])); });
      document.getElementById("trait-group").hidden = false;
    }
  }

  function applyFilters() {
    var terms = normalize(current.query).split(/[\s、,，]+/).filter(Boolean);
    var visible = 0;
    index.forEach(function (item) {
      var show = (current.platform === "all" || item.card.dataset.platform === current.platform) &&
        (current.relation === "all" || item.card.dataset.relation === current.relation) &&
        (current.trait === "all" || item.traits.indexOf(current.trait) !== -1) &&
        terms.every(function (term) { return item.text.indexOf(term) !== -1; });
      item.card.hidden = !show;
      if (show) visible += 1;
    });
    document.querySelectorAll(".filters button").forEach(function (button) {
      var group = button.parentNode.dataset.group;
      button.setAttribute("aria-pressed", String(current[group] === button.dataset.filter));
    });
    statusEl.textContent = index.length === 0
      ? "尚未收錄貼文。請先在 posts.js 加入已核對的公開原文。"
      : (visible === 0 ? "目前沒有符合條件的貼文。" : ((terms.length || current.platform !== "all" || current.relation !== "all" || current.trait !== "all") ? "符合 " + visible + " 篇" : ""));
  }

  function init() {
    if (typeof posts === "undefined" || !Array.isArray(posts)) {
      statusEl.textContent = "讀取 posts.js 失敗。";
      return;
    }
    var sorted = posts.map(function (post, position) { return { post: post, position: position }; })
      .sort(function (a, b) { return (Number(b.post.length) || -1) - (Number(a.post.length) || -1) || a.position - b.position; })
      .map(function (item) { return item.post; });
    assignAnchors(posts);
    sorted.forEach(function (post) {
      var card = renderCard(post);
      if (card) listEl.appendChild(card);
    });
    if (posts.some(function (post) { return normalize(post.platform) === "threads" && post.embedHtml; })) {
      loadThreadsScript();
    }
    document.getElementById("summary").textContent = index.length ? "已收錄 " + index.length + " 篇" : "等待第一篇可核對的公開原文";
    buildDynamicFilters();

    document.querySelectorAll(".filters").forEach(function (nav) {
      nav.addEventListener("click", function (event) {
        var button = event.target.closest("button");
        if (!button) return;
        current[nav.dataset.group] = button.dataset.filter;
        applyFilters();
      });
    });
    document.getElementById("post-search").addEventListener("input", function (event) {
      current.query = event.target.value;
      applyFilters();
    });

    var shareStatus = document.getElementById("share-status");
    document.getElementById("share-button").addEventListener("click", function () {
      share({ title: document.title, url: location.origin + location.pathname }, function (copied) {
        shareStatus.textContent = copied ? "連結已複製" : "請複製網址列的連結";
      });
    });
    applyFilters();
  }

  init();
}());

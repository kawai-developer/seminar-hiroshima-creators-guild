const pdfPageImage = (page) =>
  `assets/pdf-pages/page-${String(page).padStart(3, "0")}.png`;

const wrap = (content, className = "") =>
  `<div class="${["raw-wrap", className].filter(Boolean).join(" ")}">${content}</div>`;

const card = (content, className = "") =>
  `<div class="raw-card ${className}">${content}</div>`;

const list = (items, className = "raw-list") =>
  `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

const ordered = (items) =>
  `<ol class="raw-agenda-list">${items.map((item) => `<li>${item}</li>`).join("")}</ol>`;

const rawSlide = (agendaId, html, notes) => ({
  agendaId,
  layout: "raw",
  html,
  notes
});

const imageSlide = (agendaId, page, notes = `PDF page ${page}`) => ({
  agendaId,
  layout: "full-image",
  image: pdfPageImage(page),
  notes
});

const intro = "intro";
const types = "types";
const problem = "problem";
const pillars = "pillars";
const action = "action";
const closing = "closing";

const agendaTimes = {
  [intro]: "20:00-20:08",
  [types]: "20:08-20:23",
  [problem]: "20:23-20:44",
  [pillars]: "20:44-21:10",
  [action]: "21:10-21:30",
  [closing]: "21:30-22:00"
};

const sectionDoor = (agendaId, title, sub, notes, navLabel = title.replace(/<br>/g, " ")) => ({
  agendaId,
  layout: "raw",
  html: `
    <div class="raw-wrap raw-section raw-section-door">
      <p class="raw-section-time">${agendaTimes[agendaId]}</p>
      <h1 class="raw-section-title">${title}</h1>
      ${sub ? `<p class="raw-section-sub">${sub}</p>` : ""}
    </div>
  `,
  notes,
  navLabel
});

const PRESENTATION = {
  title: "AIがデザイナーの仕事を奪う？",
  subtitle: "ひろしまクリエイターズギルド AIセミナー 2026.3.16",
  colors: {
    base: "#FFF0EB",
    main: "#333333",
    accent: "#EC008C",
    cyan: "#00CED1",
    yellow: "#D4A400",
    white: "#FFFFFF",
    grey: "#999999"
  },
  fonts: {
    heading: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
    body: "'Noto Sans JP', sans-serif"
  },
  agenda: [
    { id: intro, label: "導入", time: agendaTimes[intro] },
    { id: types, label: "タイプ整理", time: agendaTimes[types] },
    { id: problem, label: "問題の正体", time: agendaTimes[problem] },
    { id: pillars, label: "3つの柱", time: agendaTimes[pillars] },
    { id: action, label: "実行", time: agendaTimes[action] },
    { id: closing, label: "まとめ", time: agendaTimes[closing] }
  ],
  slides: [
    {
      agendaId: intro,
      layout: "full-image",
      image: "assets/seminar-260316-cover.png",
      notes: "Seminar cover image"
    },
    sectionDoor(intro, "導入", "今日の約束", "Section door: intro"),
    rawSlide(
      intro,
      wrap(`
        <h1 class="raw-title-lg">「AIがデザインする時代、<br>人間はプロンプトを<br>打つだけになる」</h1>
        <p class="raw-sub raw-muted">そんな未来予測が、クリエイターの不安を煽っています。<br>でも、本当にそうでしょうか？</p>
      `),
      "PDF page 2"
    ),
    imageSlide(intro, 3),
    imageSlide(intro, 4),
    imageSlide(intro, 5),
    imageSlide(intro, 6),
    rawSlide(
      intro,
      wrap(`
        ${card(`
          <h2 class="raw-card-title">肩書きの話をしたいわけではありません。</h2>
          <p class="raw-card-body">私自身が、皆さんと同じ「ものづくりが好きな人間」として、<br>AIとの付き合い方について話します。</p>
        `, "raw-card--wide raw-card--center")}
      `),
      "PDF page 7"
    ),
    rawSlide(
      intro,
      wrap(`
        <p class="raw-topnote">この記事を読み終わったら、1つだけ変わることがあります。</p>
        <h1 class="raw-title-lg raw-accent">やりたくない作業を1つ、<br>AIに投げられるようになる。</h1>
      `),
      "PDF page 8"
    ),
    rawSlide(
      intro,
      wrap(`
        <h1 class="raw-title-md">目次</h1>
        <p class="raw-agenda-summary">20:00-22:00</p>
        <ol class="raw-agenda-list raw-agenda-list--timed">
          <li><span class="raw-agenda-item-title">はじめに / 今日の約束</span><span class="raw-agenda-item-time">20:00-20:08</span></li>
          <li><span class="raw-agenda-item-title">あなたはどのタイプ？（H/C/G）</span><span class="raw-agenda-item-time">20:08-20:23</span></li>
          <li><span class="raw-agenda-item-title">問題の正体 / 本当の敵は何か</span><span class="raw-agenda-item-time">20:23-20:44</span></li>
          <li><span class="raw-agenda-item-title">解決策デモ / 3つの柱</span><span class="raw-agenda-item-time">20:44-21:10</span></li>
          <li><span class="raw-agenda-item-title">実行 / 明日やる1アクション</span><span class="raw-agenda-item-time">21:10-21:30</span></li>
          <li><span class="raw-agenda-item-title">1%の覇気論 + 特典案内</span><span class="raw-agenda-item-time">21:30-21:40</span></li>
          <li><span class="raw-agenda-item-title">Q&amp;A</span><span class="raw-agenda-item-time">21:40-22:00</span></li>
        </ol>
      `, "raw-wrap--left raw-wrap--narrow"),
      "PDF page 9"
    ),
    sectionDoor(types, "タイプ整理", "あなたはどのタイプ？", "Section door: types"),
    rawSlide(
      types,
      wrap(`
        <div class="raw-grid-3">
          ${card(`<div class="raw-type-mark raw-accent">H</div><div class="raw-type-title raw-accent">作る人</div><p class="raw-card-note">手を動かすのが好き</p>`, "raw-type-card")}
          ${card(`<div class="raw-type-mark raw-cyan">C</div><div class="raw-type-title raw-cyan">伝える人</div><p class="raw-card-note">企画・提案が得意</p>`, "raw-type-card")}
          ${card(`<div class="raw-type-mark raw-yellow">G</div><div class="raw-type-title raw-yellow">考える人</div><p class="raw-card-note">構造・全体像を担う</p>`, "raw-type-card")}
        </div>
      `),
      "PDF page 11"
    ),
    rawSlide(
      types,
      wrap(`
        ${card(`
          <div class="raw-card-headline"><span class="raw-accent">H</span> — 作る人 <span class="raw-inline-note">（デザイナー、イラストレーター、映像クリエイター）</span></div>
          <div class="raw-grid-2 raw-grid-gap-lg">
            <div>
              <div class="raw-col-title raw-accent">本当はやりたいこと</div>
              ${list(["色を選ぶ楽しさ", "レイアウトの試行錯誤", "「これだ」という瞬間"], "raw-list raw-list--plain")}
            </div>
            <div>
              <div class="raw-col-title raw-muted">でも現実は…</div>
              ${list(["素材探しに2時間", "リサイズ地獄", "説明資料に3時間"], "raw-list raw-list--plain")}
            </div>
          </div>
        `, "raw-card--wide")}
      `),
      "PDF page 12"
    ),
    rawSlide(
      types,
      wrap(`
        ${card(`
          <div class="raw-card-headline"><span class="raw-cyan">C</span> — 伝える人 <span class="raw-inline-note">（ディレクター、プランナー、マーケター）</span></div>
          <div class="raw-grid-2 raw-grid-gap-lg">
            <div>
              <div class="raw-col-title raw-cyan">本当はやりたいこと</div>
              ${list(["クライアントとの対話", "コンセプトの設計", "チームの方向づけ"], "raw-list raw-list--plain")}
            </div>
            <div>
              <div class="raw-col-title raw-muted">でも現実は…</div>
              ${list(["議事録まとめに1時間", "提案書の文章に半日", "見積もりで頭が痛い"], "raw-list raw-list--plain")}
            </div>
          </div>
        `, "raw-card--wide")}
      `),
      "PDF page 13"
    ),
    rawSlide(
      types,
      wrap(`
        ${card(`
          <div class="raw-card-headline"><span class="raw-yellow">G</span> — 考える人 <span class="raw-inline-note">（IAデザイナー、UXデザイナー、アーキテクト）</span></div>
          <div class="raw-grid-2 raw-grid-gap-lg">
            <div>
              <div class="raw-col-title raw-yellow">本当はやりたいこと</div>
              ${list(["IA設計・構造の整理", "ユーザー体験の設計", "全体最適の判断"], "raw-list raw-list--plain")}
            </div>
            <div>
              <div class="raw-col-title raw-muted">でも現実は…</div>
              ${list(["情報の海で溺れる", "リサーチの整理に時間", "雑務で思考が中断"], "raw-list raw-list--plain")}
            </div>
          </div>
        `, "raw-card--wide")}
      `),
      "PDF page 14"
    ),
    rawSlide(
      types,
      wrap(`
        <div class="raw-mini-badges">
          <span class="raw-badge raw-accent">H</span>
          <span class="raw-badge raw-cyan">C</span>
          <span class="raw-badge raw-yellow">G</span>
        </div>
        ${card(`
          <h2 class="raw-card-title">全員が同じ問題を抱えている。</h2>
          <p class="raw-card-body">やりたいことに使える時間が少なすぎる。<br>やりたくない作業に時間を奪われて、<br>本当にやりたいことに集中できていない。</p>
        `, "raw-card--center raw-card--wide")}
      `),
      "PDF page 15"
    ),
    rawSlide(
      types,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">奪われている<br>時間を取り戻す</h1>
      </div>`,
      "PDF page 16"
    ),
    rawSlide(
      types,
      wrap(`
        <div class="raw-stack">
          ${card(`<p class="raw-card-body raw-card-body--flush raw-muted">× AIは「クリエイティブ」を奪うもの</p>`, "raw-card--wide raw-card--shallow")}
          ${card(`<p class="raw-card-body raw-card-body--flush">○ AIは<span class="raw-accent">「やりたくない作業（雑務）」</span>を引き受けるもの</p>`, "raw-card--wide raw-card--shallow")}
        </div>
      `),
      "PDF page 17"
    ),
    rawSlide(
      types,
      wrap(`
        <h1 class="raw-title-lg">「帰ったら試してみよう」</h1>
        <p class="raw-sub raw-accent raw-sub-strong">今日、やりたくない作業を1つだけ、<br>AIに投げてみませんか。</p>
      `),
      "PDF page 18"
    ),
    sectionDoor(problem, "問題の正体", "本当の敵は何か", "Section door: problem"),
    rawSlide(
      problem,
      wrap(`
        <h1 class="raw-title-lg">AIがデザイナーの仕事を奪う？</h1>
        <p class="raw-sub raw-muted">囁く噂その言葉<br>AIがデザインする時代、人間はプロンプトを打つだけになる。<br>本当にそうでしょうか？</p>
      `),
      "PDF page 20"
    ),
    rawSlide(
      problem,
      wrap(`
        <div class="raw-wrap--left-block">
          <h1 class="raw-title-lg raw-left">私の答えは明確です。<br>AIが再現するのは<br><span class="raw-accent">「表面」</span>だけ。</h1>
          <p class="raw-sub raw-left raw-muted">AIは見た目をコピーできます。<br>しかし、その奥にある理由には永遠に答えられません。</p>
        </div>
      `, "raw-wrap--left"),
      "PDF page 21"
    ),
    imageSlide(problem, 22),
    rawSlide(
      problem,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">本当の敵は、<br>AIではない。</h1>
      </div>`,
      "PDF page 23"
    ),
    rawSlide(
      problem,
      wrap(`
        ${card(`
          <h2 class="raw-card-title">本当の敵 = <span class="raw-accent">やりたくない作業</span></h2>
          <p class="raw-card-note raw-card-note-lg">皆さんの時間を奪っているのは、AIではありません。</p>
        `, "raw-card--center raw-card--wide")}
      `),
      "PDF page 24"
    ),
    imageSlide(problem, 25),
    rawSlide(
      problem,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">これ全部、<br>AIに投げられます。</h1>
        <p class="raw-section-sub">1つも自分でやる必要はありません。</p>
      </div>`,
      "PDF page 26"
    ),
    imageSlide(problem, 27),
    rawSlide(
      problem,
      wrap(`
        <div class="raw-grid-2 raw-grid-gap-lg">
          ${card(`<div class="raw-col-title raw-cyan">判断 — 人間がやること</div>${list(["色を選ぶ", "レイアウトを決める", "「これだ」と選ぶ"], "raw-list raw-list--plain")}`, "raw-card--tall")}
          ${card(`<div class="raw-col-title raw-muted">作業 — AIに任せること</div>${list(["素材を探す", "リサイズする", "文章を書く"], "raw-list raw-list--plain")}`, "raw-card--tall")}
        </div>
        <p class="raw-foot">やることは1つだけ。判断は自分で。作業はAIに。</p>
      `),
      "PDF page 28"
    ),
    rawSlide(
      problem,
      wrap(`
        <h1 class="raw-title-xl">判断は人間。<br>作業は<span class="raw-muted">AI。</span></h1>
        <p class="raw-foot">これがこれからのデザインです。今日の核心でした。</p>
      `),
      "PDF page 29"
    ),
    rawSlide(
      problem,
      wrap(`
        <h1 class="raw-title-lg">デザインの「作業」を<br>終わらせる。</h1>
        <div class="raw-divider raw-divider-accent"></div>
        <p class="raw-sub raw-muted">6つの苦痛を消し去る、AI活用3つの柱</p>
      `),
      "PDF page 30"
    ),
    imageSlide(problem, 31),
    imageSlide(problem, 32),
    sectionDoor(pillars, "3つの柱", "言葉系 / 素材系 / 量産系", "Section door: pillars"),
    imageSlide(pillars, 34),
    imageSlide(pillars, 35),
    rawSlide(
      pillars,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">柱2: 素材系</h1>
        <p class="raw-section-sub">Nano Banana 2</p>
      </div>`,
      "PDF page 36"
    ),
    imageSlide(pillars, 37),
    imageSlide(pillars, 38),
    rawSlide(
      pillars,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">柱3: 量産系</h1>
        <p class="raw-section-sub">Lovart / Skywork / Genspark</p>
      </div>`,
      "PDF page 39"
    ),
    imageSlide(pillars, 40),
    imageSlide(pillars, 41),
    rawSlide(
      pillars,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">3つに共通する<br>「絶対原則」</h1>
      </div>`,
      "PDF page 42"
    ),
    rawSlide(
      pillars,
      wrap(`
        <p class="raw-topnote raw-topnote-strong">AIに渡すのは「作業」のみ。デザインの「判断」は1秒も奪われない。</p>
        <h1 class="raw-title-lg"><span class="raw-strike">全部「作業」</span><br>判断は1秒も奪われていない</h1>
        <div class="raw-divider raw-divider-accent"></div>
        <p class="raw-foot">AIに渡したのは全部作業です。デザインの意思決定は100%人間が握る。<br>これがこれからの原則です。</p>
      `),
      "PDF page 43"
    ),
    rawSlide(
      pillars,
      wrap(`
        ${card(`
          <h2 class="raw-card-title">作業をAIに任せ、<br>あなたは「デザイン」に集中しよう。</h2>
        `, "raw-card--center raw-card--wide")}
      `),
      "PDF page 44"
    ),
    sectionDoor(action, "実行", "明日やる1アクションを決める", "Section door: action"),
    imageSlide(action, 46),
    imageSlide(action, 47),
    rawSlide(
      action,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">実行への2ステップ</h1>
      </div>`,
      "PDF page 48"
    ),
    imageSlide(action, 49),
    imageSlide(action, 50),
    imageSlide(action, 51),
    rawSlide(
      action,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">あなたのタイプ別<br>「明日の1アクション」</h1>
      </div>`,
      "PDF page 52"
    ),
    imageSlide(action, 53),
    imageSlide(action, 54),
    imageSlide(action, 55),
    imageSlide(action, 56),
    rawSlide(
      action,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">100点のプロンプトは、<br>今すぐ捨てよう。</h1>
      </div>`,
      "PDF page 57"
    ),
    imageSlide(action, 58),
    rawSlide(
      action,
      wrap(`
        <h2 class="raw-title-md">今夜、Geminiに貼り付けてみてください。</h2>
        <div class="raw-inputbar">
          <span class="raw-input-accent"></span>
          <span class="raw-input-placeholder">あなたの「1行」を入力…</span>
        </div>
      `),
      "PDF page 59"
    ),
    sectionDoor(closing, "まとめ", "1%の覇気論と特典案内", "Section door: closing"),
    rawSlide(
      closing,
      wrap(`
        <div class="raw-number-mix">
          <span class="raw-muted">99%</span>
          <span class="raw-plus">+</span>
          <span class="raw-accent">1%</span>
        </div>
        <p class="raw-foot">答えは極めてシンプルです。<br>99%のAIの仕事と、1%のあなたの魂。</p>
      `),
      "PDF page 61"
    ),
    rawSlide(
      closing,
      wrap(`
        <div class="raw-grid-2 raw-grid-gap-lg">
          ${card(`<div class="raw-col-title raw-muted">99% — AIの仕事</div>${list(["素材生成", "リサイズ", "文章作成", "情報整理"], "raw-list raw-list--plain")}`, "raw-card--tall")}
          ${card(`<div class="raw-col-title raw-accent">1% — あなたの魂</div>${list(["この色がいい", "この余白が好き", "ここが気持ちいい", "これが自分らしい"], "raw-list raw-list--plain")}`, "raw-card--tall")}
        </div>
      `),
      "PDF page 62"
    ),
    imageSlide(closing, 63),
    rawSlide(
      closing,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">AI時代の戦い方<br>3つのルール</h1>
      </div>`,
      "PDF page 64"
    ),
    rawSlide(
      closing,
      wrap(`
        <div class="raw-rule-head">Rule 1 &amp; 2</div>
        <h1 class="raw-title-lg raw-left">判断は人間、作業はAI。</h1>
        <div class="raw-grid-2 raw-grid-gap-lg">
          ${card(`<div class="raw-col-title raw-muted">作業（Task）</div><p class="raw-card-body raw-card-body-sm">デザイン以外のやりたくない<br>作業は全部任せる。</p>`, "raw-card--tall")}
          ${card(`<div class="raw-col-title raw-accent">判断（Judgment）</div><p class="raw-card-body raw-card-body-sm">AIにデザインはさせるな。<br>こだわりだけを研ぎ澄ます。</p>`, "raw-card--tall")}
        </div>
      `, "raw-wrap--left"),
      "PDF page 65"
    ),
    rawSlide(
      closing,
      wrap(`
        <h1 class="raw-title-lg">苦手は克服しなくていい。<br><span class="raw-accent">委託すればいい。</span></h1>
        <div class="raw-stack">
          ${card(`<p class="raw-card-body raw-card-body--flush raw-muted">× 過去　苦手を頑張って克服し、時間を奪われる</p>`, "raw-card--wide raw-card--shallow")}
          ${card(`<p class="raw-card-body raw-card-body--flush">○ 未来　苦手をAIに委託し、得意な「1%」に集中する</p>`, "raw-card--wide raw-card--shallow")}
        </div>
        <p class="raw-foot raw-muted">言語化が苦手なら、書かせればいい。リサイズが面倒なら、展開させればいい。</p>
      `),
      "PDF page 66"
    ),
    rawSlide(
      closing,
      wrap(`
        ${card(`
          <div class="raw-rule-head raw-cyan">Rule 3</div>
          <h2 class="raw-card-title">明日、やりたくない作業を<br>1つAIに投げてみる。</h2>
          <p class="raw-card-note raw-card-note-lg">理解しただけでは変わりません。<br>今夜1つ、試してください。</p>
        `, "raw-card--center raw-card--wide")}
      `),
      "PDF page 67"
    ),
    rawSlide(
      closing,
      wrap(`
        <p class="raw-topnote">99%の作業は、AIに任せてください。</p>
        <h1 class="raw-title-lg">あなたの1%の覇気を、</h1>
        <h2 class="raw-final-line">もっと大きく、もっと鋭く。</h2>
      `),
      "PDF page 68"
    )
  ]
};

const slideNavLabels = [
  "AIが仕事を奪う？",
  "プロンプト時代？",
  "川合卓也",
  "活動実績",
  "note 600記事",
  "BOOKMARK THIS PAGE",
  "肩書きの話ではない",
  "今日の変化",
  "目次",
  "あなたはどのタイプ？",
  "H/C/G 3分類",
  "Hタイプ",
  "Cタイプ",
  "Gタイプ",
  "全員の共通問題",
  "時間を取り戻す",
  "AIの役割",
  "帰ったら試す",
  "問題の正体",
  "AIが仕事を奪う？再掲",
  "表面だけ再現",
  "AIが答えられない問い",
  "本当の敵はAIではない",
  "敵はやりたくない作業",
  "6つのやりたくないこと",
  "全部AIに投げられる",
  "仕分けが重要",
  "判断と作業",
  "判断は人間",
  "作業を終わらせる",
  "6つの苦痛",
  "3つの柱とツール",
  "柱1 言葉系",
  "Geminiの使い方",
  "言語化の短縮",
  "柱2 素材系",
  "Nano Banana 2",
  "素材下ごしらえ短縮",
  "柱3 量産系",
  "量産の仕組み",
  "微調整に集中",
  "3つの絶対原則",
  "判断は奪われない",
  "デザインに集中",
  "最初の1行だけ",
  "理解から実行へ",
  "使い始められない理由",
  "実行への2ステップ",
  "Step1 工程を選ぶ",
  "Step2 1行で書く",
  "1時間を1行へ",
  "タイプ別アクション",
  "タイプ別カード",
  "Hタイプの処方箋",
  "Cタイプの処方箋",
  "Gタイプの処方箋",
  "100点のプロンプト不要",
  "AIとの対話法",
  "今夜Geminiに貼る",
  "1%の覇気論",
  "99% + 1%",
  "AIの仕事とあなたの魂",
  "判断へ時間を戻す",
  "AI時代の3ルール",
  "Rule 1 & 2",
  "苦手は委託",
  "Rule 3",
  "もっと大きく、もっと鋭く"
];

slideNavLabels.splice(1, 0, "導入");

const slideNotes = [
  "今日は『AIでデザインするな』という少し強いタイトルで話します。結論は一つです。デザインの判断は自分で握り、やりたくない作業だけAIに渡す。その考え方を持ち帰ってください。", // 1
  "ここから導入です。最初に今日の約束を置きます。終わる頃には、やりたくない作業を一つAIに投げる最初の一歩が切れる状態を目指します。", // 2
  "最近よく聞くのがこの不安です。AIがデザインする時代、人間はプロンプトを打つだけになる。本当にそうなのか、今日はそこを構造から解体します。", // 3
  "あらためて川合卓也です。SHIFT AIとベイジでAIデザインに関わっていますが、今日は肩書きよりも、同じクリエイターとして話します。", // 4
  "これまでの活動実績はありますが、今日は実績自慢がしたいわけではありません。皆さんが明日すぐ試せる形に落とすことだけに集中します。", // 5
  "noteでもAIとデザインについて発信を続けています。だからこそ見えてきたのは、奪われるのは仕事そのものではなく、時間の配分だということです。", // 6
  "このページはあとで見返せるように置いています。今日その場で全部覚えなくて大丈夫です。まずは考え方だけ持ち帰ってください。", // 7
  "肩書きの話をしたいわけではありません。ものづくりが好きな人間が、AIとどう付き合うと楽になるのか。その実感ベースで話します。", // 8
  "今日終わったら変わることは一つです。苦手を克服するのではなく、やりたくない作業をAIに委託する発想に切り替わることです。", // 9
  "今日の流れです。タイプを確認し、問題の正体を整理し、三つの柱を見せて、最後は自分の一歩に落とします。全体像をここでつかんでください。", // 10
  "まずはタイプ整理です。自分がどこに当てはまるかを見るだけで、この後の話の刺さり方がかなり変わります。", // 11
  "大きく三タイプに分けて考えます。Hは作る人、Cは伝える人、Gは考える人。複数にまたがっていても大丈夫です。", // 12
  "Hタイプの人は、色やレイアウトを触っている時間が本来いちばん楽しいはずです。でも現実は素材探しやリサイズに時間を持っていかれる。", // 13
  "Cタイプの人は、対話して方向を決めることが価値です。それなのに議事録整理や提案文、見積もりのような雑務で消耗しやすい。", // 14
  "Gタイプの人は、構造を考える時間が価値です。でも情報整理やリサーチの交通整理で思考が何度も中断されてしまう。", // 15
  "タイプは違っても、最後はここに集約されます。やりたいことに使える時間が少なすぎる。これが全員の共通問題です。", // 16
  "だから取り戻すべきものは能力ではなく時間です。何を自分でやり、何をAIに持たせるか。その仕分けが今日の核心です。", // 17
  "AIはクリエイティブそのものを奪う存在ではありません。むしろ、やりたくない作業を引き受ける部下として使うと、一気に見え方が変わります。", // 18
  "今日の提案はシンプルです。帰ったら一つだけでいい。やりたくない工程を選んで、AIに投げてみてください。", // 19
  "ここから問題の正体に入ります。怖さの正体を言葉にし直すと、AIへの見え方はかなり変わります。", // 20
  "『AIが仕事を奪う』という言葉は強いです。だからこそ、いったん真正面から受け止めたうえで、本当に奪われるものが何かを見ます。", // 21
  "僕の答えは明確です。AIが再現できるのは表面だけ。見た目は真似できても、その奥にある判断理由までは持てません。", // 22
  "なぜその色なのか、なぜその余白なのか、なぜそこで目が止まるのか。こういう問いに答えられるのは、作り手の感覚を持つ人間だけです。", // 23
  "つまり本当の敵はAIではありません。敵に見えていたものの正体を、ここで一度入れ替えます。", // 24
  "皆さんの時間を奪っているのは、やりたくない作業です。怖がるべきはAIではなく、雑務が判断時間を食っている構造の方です。", // 25
  "この『やりたくない』は大体いくつかの型に分かれます。言語化、情報整理、素材、コピー、リサイズ、事務。このあたりに心当たりがあるはずです。", // 26
  "そして重要なのは、これらの多くがもうAIに投げられることです。全部を自力で抱え込む前提を捨てていい。", // 27
  "ただし丸投げの前に必要なのが仕分けです。何でもAIに渡すのではなく、判断と作業を分けて考える。", // 28
  "左は人間がやる判断、右はAIに任せる作業です。やることはこの分離だけ。判断は自分、作業はAIです。", // 29
  "これが今日の核心です。判断は人間、作業はAI。この一行だけ覚えて帰っても、今日の価値は十分あります。", // 30
  "デザインの『作業』を終わらせる。そのために、次は具体的な三つの柱として見せます。", // 31
  "苦痛はバラバラに見えても、対処法は整理できます。ここからは再現しやすい型として見てもらいます。", // 32
  "六つの苦痛を、言葉系・素材系・量産系の三本柱にまとめます。ツール名より、どの苦痛をどこに割り当てるかで見てください。", // 33
  "ここから解決策です。三つの柱で、どこまで作業を肩代わりできるかを具体的に見せます。", // 34
  "まず言葉系です。説明、要件整理、議事録、コピーのような『言葉にする作業』は、GeminiのようなLLMがかなり強いです。", // 35
  "デザイン画像やメモを渡して、説明文や整理文に変える。感覚を後から言葉にするのに、AIはとても相性がいいです。", // 36
  "次は素材系です。背景拡張、切り抜き、下ごしらえのような準備作業は、もうかなり短縮できます。", // 37
  "素材系で大事なのは、AIにデザイン判断をさせないことです。何を使うか、どこまで広げるか、その判断だけ人間が握る。", // 38
  "昔三十分かかっていた準備が数秒になるなら、その差分は全部判断時間に戻せます。ここでも奪われたのは作業だけです。", // 39
  "最後は量産系です。同じ判断を繰り返して書き出す作業は、最もAIに向いています。", // 40
  "サイズ展開やパターン展開は、メインの判断が終わったあとに発生する仕事です。だからこそ自動化の効果が大きい。", // 41
  "量産で残るのは最終の微調整だけです。その最後の違和感を見る目こそが、人間の価値です。", // 42
  "この三つに共通する絶対原則があります。ここを外すと、AI活用はすぐ雑になります。", // 43
  "AIに渡していいのは作業だけ。デザインの判断は一秒も渡さない。これが今日の原則です。", // 44
  "だから目指す状態はこれです。作業をAIに任せて、自分はデザインに集中する。そのために次は実行に移ります。", // 45
  "ここからは実行パートです。理解で終わらせず、明日やる一手に変えます。", // 46
  "難しいことはしません。今から『明日AIに投げる一つ』を決めるだけです。", // 47
  "なかなか動けない理由は、百点のプロンプトを作ろうとするからです。必要なのは完璧さではなく、最初の一行です。", // 48
  "実行は二ステップです。工程を一つ選び、その工程を頼む一行を書く。これだけで十分です。", // 49
  "まずは自分が一番やりたくない工程を選んでください。大きな改革ではなく、今日いちばん嫌な一つでいいです。", // 50
  "次に、その工程をAIに頼むとしたら何と言うかを一行で書いてみる。役割、材料、欲しい出力を一言で置けば動きます。", // 51
  "一時間の悩みでも、AIへの入り口は一行で作れます。最初から精密に書かなくて大丈夫です。", // 52
  "ここからはタイプ別に、明日すぐ試しやすい一アクションを出します。", // 53
  "まず全体像です。タイプによって最初の着手点を変えると、初回体験の成功率が上がります。", // 54
  "Hタイプは、完成デザインの説明文を書かせるのが入りやすい。自分の感覚を言葉に変換してもらうところから始めてください。", // 55
  "Cタイプは、議事録や要件整理から入るのが早いです。会話を構造化させるだけでもかなり楽になります。", // 56
  "Gタイプは、散らかった情報を構造化させるのが相性抜群です。整理を渡して、判断に集中する時間を確保してください。", // 57
  "百点のプロンプトは要りません。対話しながら育てればいいので、まずは粗く投げることを優先してください。", // 58
  "AIとは一発で当てる勝負ではなく、対話で詰める相手です。足りない情報は後から足せば十分です。", // 59
  "今夜やってほしいのはこれだけです。書いた一行を、そのままGeminiに貼ってみる。", // 60
  "最後のまとめに入ります。ここまでの話を、価値の話に戻して締めます。", // 61
  "AI時代のクリエイターの価値はどこにあるのか。答えを一言で言うと、九十九パーセントと一パーセントの分け方です。", // 62
  "九十九パーセントの作業はAIに任せていい。でも最後の一パーセント、その色、その余白、その気持ちよさは自分で選ぶ。それが価値です。", // 63
  "だから時間を戻す先は、判断です。雑務から解放された時間を、こだわりに戻してください。", // 64
  "AI時代の戦い方を三つのルールで締めます。まずは原則の再確認からです。", // 65
  "Rule 1 と 2 です。判断は人間、作業はAI。AIにデザインはさせない。苦手な雑務は全部任せる。", // 66
  "苦手は克服しなくていい。委託すればいい。努力の向き先を、不得意の克服から得意の深化へ変えましょう。", // 67
  "Rule 3 は、明日ではなく今夜一つ試すことです。理解だけでは変わらないので、必ず一つ動かしてください。", // 68
  "九十九パーセントの作業はAIに任せてください。そして残った一パーセントの覇気を、もっと大きく、もっと鋭くしてください。" // 69
];

PRESENTATION.slides = PRESENTATION.slides.map((slide, index) => ({
  ...slide,
  navLabel: slide.navLabel || slideNavLabels[index] || `Slide ${index + 1}`,
  notes: slideNotes[index] || slide.notes
}));

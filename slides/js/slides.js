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
    { id: intro, label: "導入", time: "1-9" },
    { id: types, label: "タイプ整理", time: "10-18" },
    { id: problem, label: "問題の正体", time: "19-32" },
    { id: pillars, label: "3つの柱", time: "33-44" },
    { id: action, label: "実行", time: "45-59" },
    { id: closing, label: "まとめ", time: "60-68" }
  ],
  slides: [
    {
      agendaId: intro,
      layout: "full-image",
      image: "assets/seminar-260316-cover.png",
      notes: "Seminar cover image"
    },
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
        ${ordered([
          "はじめに",
          "あなたはどのタイプ？（H/C/G）",
          "問題の正体 — 本当の敵は何か",
          "解決策 — 実際に見せます（3つの柱）",
          "実行 — 明日AIに投げる1つを決める",
          "1%の覇気論",
          "まとめ",
          "おわりに"
        ])}
      `, "raw-wrap--left raw-wrap--narrow"),
      "PDF page 9"
    ),
    rawSlide(
      types,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">あなたはどのタイプ？</h1>
        <p class="raw-section-sub">クリエイターを3つに分けて考える</p>
      </div>`,
      "PDF page 10"
    ),
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
    rawSlide(
      problem,
      wrap(`
        <h1 class="raw-title-xl">問題の正体<br><span class="raw-accent">本当の敵は何か</span></h1>
      `),
      "PDF page 19"
    ),
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
    rawSlide(
      pillars,
      `<div class="raw-wrap raw-section">
        <h1 class="raw-section-title">柱1: 言葉系</h1>
        <p class="raw-section-sub">Gemini</p>
      </div>`,
      "PDF page 33"
    ),
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
    rawSlide(
      action,
      wrap(`
        <h1 class="raw-title-lg">完璧なプロンプトはいらない。<br>必要なのは「最初の1行」だけ。</h1>
        <p class="raw-sub raw-muted">AIの学習から「実行」へ移行するための最短ルート</p>
      `),
      "PDF page 45"
    ),
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
    rawSlide(
      closing,
      wrap(`
        <h1 class="raw-title-lg">1%の覇気論</h1>
        <p class="raw-sub raw-muted">AI時代における、クリエイターの価値はどこにあるか。</p>
      `),
      "PDF page 60"
    ),
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

PRESENTATION.slides = PRESENTATION.slides.map((slide, index) => ({
  ...slide,
  navLabel: slideNavLabels[index] || `Slide ${index + 1}`
}));

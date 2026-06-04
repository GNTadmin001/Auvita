'use client';
// 品牌與技術 — 品牌歷史 + 汽化式 PVD 技術 + 規格 + 差異化對比 + 認證 + 歷年研究全收錄（依兩份 KB 真相檔填寫）。
import { useState, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { useReveal, useHashScroll } from '@/lib/reveal';
import PhImg from '@/components/PhImg';

const STEPS = [
  {
    h: '汽化',
    p: '於 Class 100–1000 無塵真空腔體中，以物理方式將 9999 純金加熱汽化為金原子蒸氣，靶材表面溫度 1800–2100℃——不溶解、不還原，純物理製程。',
  },
  {
    h: '凝核',
    p: '金蒸氣於藥用級純水介面凝結成核，形成奈米級金顆粒。全程無化學還原劑、無分散劑、無界面活性劑介入。',
  },
  {
    h: '粒徑控制',
    p: '以製程時間與真空度精準調控顆粒成長——同一條生產線可生產 0.8–200 nm 區間之奈米金，常用為 1–3 nm／3–5 nm／30 nm 三種生醫級粒徑。',
  },
  {
    h: '收集分散',
    p: '於純水中收集，得到高純度、高分散均勻度的奈米金；每批次濃度差異控制於 ±5% 以內。可依應用調整濃度與型態。',
  },
];

const SPEC_ROWS: [string, ReactNode][] = [
  ['材料', '汽化式金（Vaporized Gold）· 金箔 / 金粉 / 奈米金'],
  [
    '純度',
    <>
      <span className="num">≥ 99.99%</span> 金（9999 Au），SGS 第三方檢測；原料採自瑞士蘇黎世銀行，每批附純度證明
    </>,
  ],
  ['製程', '物理氣相沉積（PVD）· 無化學還原劑 · 無分散劑'],
  ['製程環境', '無塵室 Class 100–1000，靶材表面溫度 1800–2100℃'],
  ['分散介質', '藥用級純水（符合 ISO 3696、ASTM D1193、EP、USP 純淨水規範）'],
  ['滅菌條件', '121℃ × 30 分鐘高溫滅菌（食用金箔成品）'],
  ['粒徑', '奈米級，於製程時間精準調控；生醫級規格 1–3 nm / 3–5 nm / 30 nm 三種'],
  ['金箔厚度', '100 nm 片狀純金（食用金箔 APPE GOLD）'],
  ['型態', '純水分散液 / 金箔 / 金粉（依應用選擇）'],
  ['微生物檢測', '金黃色葡萄球菌 / 沙門氏菌 / 李斯特菌均為陰性'],
];

const DIFFS: { k: string; a: string; t: string; j: string }[] = [
  {
    k: '製程',
    a: 'PVD 物理氣相沉積；真空、無化學還原劑、自動化無接觸',
    t: '手工捶打鍛造（或化學還原）',
    j: '手工捶打',
  },
  {
    k: '純度',
    a: '99.99%（9999 Au）',
    t: '加入銀、銅以增延展性，純度不一',
    j: '「最高」等級，無官方純度證明文件',
  },
  {
    k: '厚度',
    a: '100 nm，均勻',
    t: '120–200 nm，厚薄不一',
    j: '上澄 700 nm / 厚箔 350–500 nm / 金箔 100–200 nm',
  },
  { k: '製程滅菌', a: '121℃ × 30 分鐘', t: '無', j: '無' },
  {
    k: '食品法保障',
    a: '衛福部食品添加物許可（衛署添製字第 001598 號）',
    t: '無',
    j: '無台灣與日本政府之食用許可（日本由業者自律）',
  },
  {
    k: '消費者責任險',
    a: '富邦產物 NT$ 5,000 萬產品責任險',
    t: '無',
    j: '無',
  },
  {
    k: '消化／可分解',
    a: '結構鬆散，胃酸可分解，腸胃可代謝',
    t: '結構緻密的金屬鍵結，不易消化，大量攝入可能造成腸道阻塞',
    j: '不明',
  },
  {
    k: '可進行 LD50 等安全性試驗',
    a: '可（全球少數通過完整安全性驗證之金屬食品添加物）',
    t: '無法（無法通過胃酸消化故無法執行毒理試驗）',
    j: '不明',
  },
];

const CERTS = [
  {
    seal: 'SNQ',
    h: 'SNQ 國家品質標章',
    en: 'National Quality Mark',
    meta: ['台灣', '食品類'],
    p: '通過 SNQ 國家品質標章評鑑，以制度層級驗證產品品質與安全管理。',
  },
  {
    seal: 'E175',
    h: 'EU E175 食品添加物',
    en: 'EU Food Additive',
    meta: ['歐盟', '金 · E175'],
    p: '金（E175）為歐盟核可之食品添加物；本品於外包裝標示歐盟食用金認證編號。',
  },
  {
    seal: 'TFDA',
    h: 'TFDA 食品添加物許可',
    en: 'Taiwan FDA',
    meta: ['衛署添製字第 001598 號', '2002 年取得'],
    p: '台灣衛福部食藥署核發食用金箔食品添加物許可證；准用於糖果、糕餅、巧克力、酒類。',
  },
  {
    seal: 'SGS',
    h: 'SGS 純度檢測',
    en: 'Purity Tested',
    meta: ['每批可溯源', '≥ 99.99%'],
    p: '經 SGS 第三方檢測，金含量達 99.99%（9999 純金），未檢出銀、未檢出銅；每批可溯源。',
  },
  {
    seal: 'Tox',
    h: '毒理安全性測試',
    en: 'Toxicity Report',
    meta: ['NAMSA / DCB', 'GLP / AAALAC'],
    p: '通過 NAMSA ISO 皮膚刺激／敏感性試驗（2003）、DCB GLP 級 Ames test／微核試驗／染色體斷裂試驗（2004–2005）、90 天亞慢性毒性試驗（2006、2015）。',
  },
  {
    seal: 'HAL',
    h: 'HALAL 清真認證',
    en: 'Halal Certified',
    meta: ['國際', '清真'],
    p: '取得 HALAL 清真認證，符合相關飲食規範，適用更廣泛的市場與客群。',
  },
];

type ResearchEntry = { year: string; partner: string; topic: string; line: 'foil' | 'nano' | 'both' };

const RESEARCH: ResearchEntry[] = [
  // 金箔線（9 條）
  { year: '2000', partner: '中國醫藥大學 蔡金川', topic: '汽化微粒金箔安全藥理初探', line: 'foil' },
  { year: '2005–2006', partner: '生物技術開發中心 DCB', topic: '汽化金箔 90 天亞慢性毒性試驗', line: 'foil' },
  { year: '2013', partner: '宜蘭大學 楊瀅臻', topic: '添加汽化金箔之酒對運動協調能力的影響', line: 'foil' },
  { year: '2014', partner: '宜蘭大學 楊瀅臻', topic: '食用汽化金箔對動物學習與記憶力之評估', line: 'foil' },
  {
    year: '2015',
    partner: '華上生技醫藥',
    topic: 'GC 檢測汽化金箔於不同酒類之影響／金箔藥物動力學',
    line: 'foil',
  },
  {
    year: '2015',
    partner: '北京中檢科／廣州檢驗檢疫科學研究院',
    topic: '汽化金箔動物安全性試驗（急毒、30 天餵養、精子致畸、骨髓微核）',
    line: 'foil',
  },
  { year: '2016', partner: '北京中國檢驗檢疫科學研究院', topic: '90 天餵養試驗（食品添加許可證申請）', line: 'foil' },
  {
    year: '2017',
    partner: '國防醫學院三軍總醫院 程俊紅',
    topic: '汽化金、銀箔臨床試驗 Phase I 臨床前安全性',
    line: 'both',
  },
  { year: '2019', partner: '台灣科技大學 廖愛禾', topic: '汽化金箔結合玻尿酸與膠原蛋白技術開發', line: 'foil' },

  // 金粒線（32 條）
  { year: '2001', partner: '弘光科技大學 林麗雲', topic: '汽化金對酒類促熟作用之研究', line: 'nano' },
  {
    year: '2002–2005',
    partner: '生物技術開發中心 DCB',
    topic: '中草藥免疫活性／癌症治療佐劑之汽化金（毒理評估系列）',
    line: 'nano',
  },
  { year: '2002', partner: '中研院農業生物科技研究所', topic: '汽化金於生命科學之應用', line: 'nano' },
  { year: '2002', partner: '元智大學 林志輝、林聖典', topic: '物理製程汽化金粒子應用於金觸媒製備', line: 'nano' },
  { year: '2002', partner: '台灣大學 林敏聰', topic: '汽化金粒子物理性質量測', line: 'nano' },
  { year: '2002–2005', partner: '中興大學 許善輝', topic: '汽化金粒子複合生醫材料生物相容性測試', line: 'nano' },
  { year: '2003', partner: '長庚大學 林秀貞、林修正', topic: '金觸媒氧化 CO', line: 'nano' },
  { year: '2003', partner: '生物技術開發中心 DCB', topic: '汽化金抗氧化活性評估', line: 'nano' },
  { year: '2003', partner: '北美科學研究機構 NAMSA', topic: '汽化金／銀皮膚刺激及過敏性試驗（ISO）', line: 'both' },
  { year: '2003', partner: '台灣大學 周正俊', topic: '汽化銀粒對病原菌之抗菌作用', line: 'nano' },
  { year: '2004', partner: '生物技術開發中心 DCB', topic: '高效率複層式汽化金粒子濾材', line: 'nano' },
  { year: '2005', partner: '生物技術開發中心 DCB', topic: '汽化金粒子對類風濕性關節炎功能評估', line: 'nano' },
  { year: '2005', partner: '南台科技大學 陳易朋、陳翼鵬', topic: '口服與外用汽化金粒子之免疫功能性試驗', line: 'nano' },
  {
    year: '2005',
    partner: '生物技術開發中心 DCB',
    topic: 'cGMP 級汽化金粒子毒理／藥物動力學評估（AAALAC）',
    line: 'nano',
  },
  { year: '2006', partner: '生物技術開發中心 DCB', topic: '癌症佐劑功效評估', line: 'nano' },
  { year: '2006', partner: '工研院生醫中心', topic: '汽化金粒子原料應用於傷口敷料評估', line: 'nano' },
  { year: '2006', partner: '台北醫學大學 楊素卿', topic: '汽化金對大鼠酒精性肝損傷之影響', line: 'nano' },
  { year: '2007', partner: '台灣大學', topic: '汽化金粒子對水中金屬離子吸附之研究', line: 'nano' },
  {
    year: '2007',
    partner: '南台科技大學 陳易朋',
    topic: '汽化金粒子與牛樟芝萃取物對皮膚細胞功能影響',
    line: 'nano',
  },
  { year: '2007', partner: '食品工業發展研究所', topic: '汽化金於食品生技領域創新應用評估', line: 'nano' },
  { year: '2007', partner: '生物技術開發中心 DCB', topic: '汽化銀箔大鼠口服急性毒性測試', line: 'nano' },
  { year: '2008', partner: '海洋大學 吳彰哲', topic: '汽化金粒子與兒茶素於老鼠膀胱癌活性研究', line: 'nano' },
  {
    year: '2008–2009',
    partner: '輔仁大學 陳漢民、陳翰民',
    topic: '以蛋白質體學探討汽化金粒子於人類骨髓癌細胞之機制',
    line: 'nano',
  },
  { year: '2009', partner: '台北醫學大學 楊素卿', topic: '汽化金對大鼠酒精性肝損傷之影響（延續）', line: 'nano' },
  {
    year: '2009',
    partner: '金屬中心、義大醫院',
    topic: '人體真皮層輸送設備系統與生醫級汽化金材料開發',
    line: 'nano',
  },
  {
    year: '2010',
    partner: '台北醫學大學 許準榕等',
    topic: '汽化金粒子與兒茶素於癌細胞與抗氧化功效',
    line: 'nano',
  },
  {
    year: '2011',
    partner: '台北醫學大學 李清國、李慶國',
    topic: '汽化金粒子表面修飾／生物利用率（小粒徑）',
    line: 'nano',
  },
  { year: '2011', partner: '工業技術研究院', topic: '物理法汽化金粒表面修飾可行性（小粒徑）', line: 'nano' },
  { year: '2012', partner: '台灣科技大學 洪伯達', topic: '汽化金粒子結合 EGCG 於惡性黑色素瘤評估', line: 'nano' },
  { year: '2012', partner: '金屬工業研究發展中心', topic: '人體真皮層輸送設備效能驗證', line: 'nano' },
  {
    year: '2013',
    partner: '國科會整合計畫（輔仁大學）',
    topic: '汽化金粒於腦神經退化、皮膚與心血管老化、結腸癌、細胞機制',
    line: 'nano',
  },
  { year: '2014', partner: '工業技術研究院', topic: '物理法汽化金粒表面修飾（大粒徑）', line: 'nano' },
  { year: '2016', partner: '台灣科技大學 廖愛禾', topic: '液態經皮傳遞輸送系統', line: 'nano' },
  {
    year: '2018',
    partner: '中國 NMPA 廣州醫療器械質量監督檢驗中心',
    topic: '液態經皮傳遞輸送系統醫療器械評價（申請第二類醫療器械）',
    line: 'nano',
  },
  { year: '2018', partner: '重慶市食品藥品監督管理局', topic: '護理清洗機第二類醫材取證', line: 'nano' },
];

const JOURNALS = [
  'Huang YH et al. Gas-injection gold nanoparticles and anti-oxidants promotes diabetic wound healing. RSC Advances 4: 4656-4662 (2014)',
  'Chen YL et al. Amelioration of ethanol-induced liver injury in rats by nanogold flakes. Alcohol 47(6): 467-472 (2013)',
  'Chen SA et al. Topical treatment with anti-oxidants and Au nanoparticles. Eur J Pharm Sci. 47(5): 875-883 (2012)',
  'Hsieh DS et al. Gold-conjugated polyphenol nanoparticles as a novel delivery system. Int J Nanomedicine 7: 1623-1633 (2012)',
  'Leu JG et al. Effects of gold nanoparticles in wound healing with EGCG and α-lipoic acid. Nanomedicine 8(5): 767-775 (2012)',
  'Tsai YY et al. Identification of nanogold particle-induced ER stress. ACS Nano 5(12): 9354-9369 (2011)',
  'Hsieh DS et al. Treatment of bladder cancer by EGCG-gold nanoparticles. Biomaterials 32(30): 7633-7640 (2011)',
  'Yen HJ et al. Cytotoxicity and immunological response of gold and silver nanoparticles. Small 5(13): 1553-1561 (2009)',
  'Hung HS et al. Behavior of endothelial cells on polyurethane nanocomposites. Biomaterials 30(8): 1502-1511 (2009)',
  'Hsu SH et al. Biostability and biocompatibility of poly(ester urethane)-gold nanocomposites. Acta Biomater. 4(6): 1797-1808 (2008)',
  'Chou CW et al. Biostability of poly(ether)urethane with gold or silver nanoparticles in porcine model. J Biomed Mater Res A. 84(3): 785-794 (2008)',
  'Hsu SH et al. Gold nanoparticles induce surface morphological transformation in polyurethane. Biomacromolecules 9(1): 241-248 (2008)',
];

type Tab = 'all' | 'foil' | 'nano';

export default function BrandTech() {
  useReveal();
  useHashScroll();
  const [tab, setTab] = useState<Tab>('all');
  const filtered = RESEARCH.filter((r) =>
    tab === 'all' ? true : tab === 'foil' ? r.line === 'foil' || r.line === 'both' : r.line === 'nano' || r.line === 'both',
  );
  const countAll = RESEARCH.length;
  const countFoil = RESEARCH.filter((r) => r.line === 'foil' || r.line === 'both').length;
  const countNano = RESEARCH.filter((r) => r.line === 'nano' || r.line === 'both').length;

  return (
    <>
      <section className="subhero">
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">首頁</Link> ／ 品牌與技術
          </div>
          <span className="sh-k rise">Brand &amp; Technology · 品牌與技術</span>
          <h1 className="rise d1">
            自 1993，<em>以科學淬煉黃金</em>
          </h1>
          <p className="sh-lead rise d2">
            京華堂（GNT）成立於 1993，是國際間少數以醫療級標準研發、製造貴金屬材料的公司。我們的根基，是一道別人沒有的汽化式工藝。
          </p>
        </div>
      </section>

      {/* 品牌歷史 */}
      <section className="sec panel">
        <div className="wrap">
          <div className="origins">
            <div className="ph reveal">
              <PhImg kw="laboratory,gold,science" lock={91} />
              <span className="cap">GNT · 研發實驗室</span>
            </div>
            <div className="body reveal d1">
              <span className="kicker" style={{ display: 'block', marginBottom: '18px' }}>
                Heritage · 品牌歷史
              </span>
              <h2 className="ed-title" style={{ fontSize: 'clamp(26px,3.4vw,42px)', marginBottom: '24px' }}>
                一道工藝，<em>三十年淬煉</em>
              </h2>
              <p>
                京華堂實業（Gold NanoTech, Inc.）成立於 <em>1993</em> 年，同年以冷凝技術將黃金帶進生醫運用。1996
                年成功開發 PVD 超純製程奈米無機材料，1998 年穩定量產多孔隙汽化金箔。
              </p>
              <p>
                2002 年取得衛福部食品添加物許可證（衛署添製字第 <em>001598</em>{' '}
                號），成為台灣<em>唯一合法</em>的食用金製造商；2018 年汽化金箔取得第一等級醫療器材許可。
              </p>
              <p>
                不同於市面以化學還原製成的奈米金，GNT 以<em>汽化式（PVD）</em>
                製程，僅用藥用級純水、無化學還原劑、無分散劑。原料採自瑞士蘇黎世銀行 9999
                純金，每批附純度證明；食用金箔薄度僅 100 nm，約傳統槌打金箔的<em>四分之一</em>。
              </p>
              <p>
                同一道工藝，依粒徑與用途延伸為食用金、奈米金與奈米銀。累計國際期刊發表 12 篇、學研合作試驗逾 40
                項，累計研發投入超過 2 億新台幣——科學，是這個黃金品牌真正的底氣。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 技術 */}
      <section className="sec-tight" id="tech" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker" style={{ color: 'var(--nano-steel)' }}>
              Technology · 汽化式 PVD 製程
            </span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>物理奈米化，四個步驟</h2>
          </div>
          <div className="proc">
            {STEPS.map((s) => (
              <div className="procstep reveal" key={s.h}>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <div className="dstats reveal d1" style={{ marginTop: '48px' }}>
            <div className="dstat">
              <div className="dv">PVD</div>
              <div className="dl">物理氣相沉積</div>
            </div>
            <div className="dstat">
              <div className="dv">H₂O</div>
              <div className="dl">僅藥用級純水</div>
            </div>
            <div className="dstat">
              <div className="dv">0</div>
              <div className="dl">化學還原劑</div>
            </div>
            <div className="dstat">
              <div className="dv">¼</div>
              <div className="dl">金箔薄度 vs 傳統</div>
            </div>
          </div>
          <div
            className="reveal d2"
            style={{
              marginTop: '44px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              gap: '16px',
            }}
          >
            <div className="ph" style={{ height: '320px', borderRadius: '6px' }}>
              <img
                className="ph-img"
                src="/images/brand-tech/evap-vs-traditional.jpg"
                alt="汽化金箔與傳統金箔的顯微與電子顯微對比"
                loading="lazy"
              />
              <span className="cap">汽化 vs 傳統 · 顯微對比</span>
            </div>
            <div className="ph" style={{ height: '320px', borderRadius: '6px' }}>
              <img
                className="ph-img"
                src="/images/brand-tech/physical-vs-chemical.jpg"
                alt="物理汽化金與化學膠體金的色澤與純度對比"
                loading="lazy"
              />
              <span className="cap">物理汽化金 vs 化學膠體金</span>
            </div>
          </div>
        </div>
      </section>

      {/* 規格 */}
      <section className="sec panel" id="specs" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '26px' }}>
            <span className="kicker" style={{ color: 'var(--nano-steel)' }}>
              Specification · 規格數據
            </span>
            <h2 style={{ marginTop: '16px', fontSize: 'clamp(24px,3vw,36px)' }}>用數字說話</h2>
          </div>
          <table className="spectable reveal">
            <tbody>
              {SPEC_ROWS.map(([k, v], i) => (
                <tr key={i}>
                  <td className="k">{k}</td>
                  <td className="v">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="specnote reveal" style={{ marginTop: '22px' }}>
            上述為通用規格示意；正式合作將提供對應品項之規格書（CoA）、檢測報告與樣品。醫療相關應用以主管機關核准為準。
          </p>
        </div>
      </section>

      {/* 金箔差異化對比（新增） */}
      <section className="sec-tight" id="vs" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker">Comparison · 金箔差異化對比</span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>
              不是所有金箔，<em>都能吃</em>
            </h2>
            <p style={{ marginTop: '18px', color: 'var(--k-mute)', maxWidth: '720px' }}>
              汽化金箔與傳統槌打金箔、進口日本食用金箔在製程、純度、安全性與法規保障上，存在本質差異。以下為各維度比較。
            </p>
          </div>
          <div className="reveal" style={{ overflowX: 'auto' }}>
            <table
              className="spectable"
              style={{ width: '100%', minWidth: '720px', borderCollapse: 'collapse' as const }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '12px', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--k-mute)' }}></th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      fontSize: '14px',
                      color: 'var(--nano-steel, #1a1a1a)',
                      borderBottom: '2px solid currentColor',
                    }}
                  >
                    汽化金箔（AUVITA）
                  </th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '14px', color: 'var(--k-mute)' }}>
                    傳統槌打金箔
                  </th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: '14px', color: 'var(--k-mute)' }}>
                    日本進口食用金箔
                  </th>
                </tr>
              </thead>
              <tbody>
                {DIFFS.map((d) => (
                  <tr key={d.k}>
                    <td className="k" style={{ verticalAlign: 'top' }}>
                      {d.k}
                    </td>
                    <td
                      className="v"
                      style={{ verticalAlign: 'top', fontWeight: 500, color: 'var(--k-text, inherit)' }}
                    >
                      {d.a}
                    </td>
                    <td className="v" style={{ verticalAlign: 'top', color: 'var(--k-mute)' }}>
                      {d.t}
                    </td>
                    <td className="v" style={{ verticalAlign: 'top', color: 'var(--k-mute)' }}>
                      {d.j}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="specnote reveal" style={{ marginTop: '26px' }}>
            傳統金箔結構緻密、無法通過胃酸消化，依現行法規亦無法進行 LD50 等完整毒理試驗——這是「能否合法作為食品」的關鍵差異。
          </p>
        </div>
      </section>

      {/* 認證 */}
      <section className="sec panel" id="cert" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker">Certifications · 認證與安全</span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>真金，禁得起檢驗</h2>
          </div>
          <div className="certgrid">
            {CERTS.map((c, i) => (
              <div className={'certcard reveal d' + (i % 3)} key={c.seal}>
                <div className="cc-seal">{c.seal}</div>
                <h4>{c.h}</h4>
                <div className="cc-en">{c.en}</div>
                <p>{c.p}</p>
                <div className="cc-meta">
                  <span>{c.meta[0]}</span>
                  <span>{c.meta[1]}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="specnote reveal" style={{ marginTop: '26px' }}>
            另取得汽化金箔第一等級醫療器材許可（衛署醫器製壹字第 007305 號，2018）。完整證書與檢測報告可於洽談時提供。
          </p>
        </div>
      </section>

      {/* 歷年研究全收錄（新增） */}
      <section className="sec-tight" id="research" style={{ scrollMarginTop: '90px' }}>
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '32px' }}>
            <span className="kicker" style={{ color: 'var(--nano-steel)' }}>
              Research · 歷年研究全收錄
            </span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>
              二十年學研沉澱，<em>逾 40 項試驗、12 篇期刊</em>
            </h2>
            <p style={{ marginTop: '18px', color: 'var(--k-mute)', maxWidth: '720px' }}>
              GNT 自 2000 年起與國內外大學、研究機構與醫療單位合作，內容涵蓋安全性、製程、生醫材料、生物相容性等。以下為公開可揭示的合作主題清單。
            </p>
          </div>

          {/* Tab chips */}
          <div
            className="reveal"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}
          >
            {(
              [
                { k: 'all', l: '全部', n: countAll },
                { k: 'foil', l: '金箔線', n: countFoil },
                { k: 'nano', l: '奈米金線', n: countNano },
              ] as { k: Tab; l: string; n: number }[]
            ).map((c) => (
              <button
                key={c.k}
                onClick={() => setTab(c.k)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '999px',
                  border: '1px solid currentColor',
                  background: tab === c.k ? 'var(--k-text, #1a1a1a)' : 'transparent',
                  color: tab === c.k ? 'var(--k-bg, #fff)' : 'var(--k-text, #1a1a1a)',
                  fontSize: '13px',
                  letterSpacing: '.08em',
                  cursor: 'pointer',
                  transition: 'all .25s ease',
                }}
              >
                {c.l} · {c.n}
              </button>
            ))}
          </div>

          {/* Research grid */}
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
              gap: '12px',
            }}
          >
            {filtered.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: '16px 18px',
                  border: '1px solid var(--k-line, rgba(0,0,0,.12))',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-latin-sc)',
                    fontSize: '12px',
                    letterSpacing: '.2em',
                    color: 'var(--nano-steel, var(--k-mute))',
                  }}
                >
                  {r.year}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>{r.partner}</div>
                <div style={{ fontSize: '13px', color: 'var(--k-mute)', lineHeight: 1.55 }}>{r.topic}</div>
              </div>
            ))}
          </div>

          {/* Journals */}
          <div className="reveal" style={{ marginTop: '56px' }}>
            <h3 style={{ fontSize: 'clamp(18px,2.2vw,24px)', marginBottom: '16px' }}>
              國際期刊發表（SCI ／同儕審查）
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))',
                gap: '10px',
              }}
            >
              {JOURNALS.map((j, i) => (
                <li
                  key={i}
                  style={{
                    padding: '12px 14px',
                    fontSize: '12px',
                    color: 'var(--k-mute)',
                    borderLeft: '2px solid var(--nano-steel, currentColor)',
                    lineHeight: 1.65,
                  }}
                >
                  {j}
                </li>
              ))}
            </ul>
          </div>

          <p className="specnote reveal" style={{ marginTop: '32px' }}>
            研究內容為材料與技術之沉澱記錄，非療效宣稱；完整研究文獻可於洽談時提供。
          </p>
        </div>
      </section>

      <section className="page-cta">
        <div className="wrap pc-in">
          <h2 className="reveal">
            想了解製程細節
            <br />
            或索取規格書？
          </h2>
          <p className="reveal d1">我們可在保密前提下，提供更深入的技術說明、規格書與測試數據。</p>
          <div className="pc-row reveal d2">
            <Link className="btn btn-gold" href="/contact">
              技術洽詢
            </Link>
            <Link className="btn btn-out" href="/applications">
              看產品應用
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

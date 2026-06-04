'use client';
// 金的歷史 — 黃金文化／工藝／藥用脈絡，以金箔 KB 真相檔填寫（文案暫內嵌，i18n 留收尾）。
import { Link } from '@/i18n/navigation';
import { useReveal } from '@/lib/reveal';
import PhImg from '@/components/PhImg';

const ERAS = [
  {
    y: '古代',
    zh: '金之為貴',
    p: '黃金元素符號 Au 來自拉丁文 Aurum，原意為「光輝燦爛的黎明」。古羅馬以黎明女神 Aurora 為名、古埃及視黃金為太陽神象徵。古埃及第四王朝（西元前 2613–2494 年）麥列魯布法老陵墓壁畫，已記錄 4,000 多年前金匠加工金器的場景。人類使用黃金，至少已逾 7,000 年。',
  },
  {
    y: '東方',
    zh: '食金傳統',
    p: '《本經逢原》記金「無毒」，《海藥本草》、葛洪、陶弘景、李時珍皆有用金之載。安宮牛黃丸（1798）、至寶丹（1078）、十香返魂丹（1846）等漢方延續至今；日本樋屋奇應丸至今仍用於幼兒保健。世界衛生組織於 1983 年將黃金列為食品添加物，台灣於 2002 年公告同等。',
  },
  {
    y: '工藝',
    zh: '槌打金箔',
    p: '中華金箔工藝源於東晉、成熟於南朝，相傳發明者為西晉煉丹家葛洪，傳承近 1,700 年。一兩（31.25 克）純金，可錘成厚度萬分之一毫米、面積 16.2 平方公尺的金箔。傳統製作需 12 道工序、6–8 小時手工錘打。日本石川縣金澤的金箔產量，佔全日本 99%。',
  },
  {
    y: '當代',
    zh: '汽化金箔',
    p: '1993 年，京華堂以物理氣相沉積（PVD）技術，於真空中將純金汽化、再凝結成奈米級薄膜——以物理取代槌打、以純水取代化學還原劑。汽化金箔純度 99.99%，薄度約傳統金箔的 1/4。1998 年穩定量產，2002 年取得衛福部食品添加物許可證（衛署添製字第 001598 號），為台灣唯一合法食用金製造商。',
  },
];

const MED_ERAS = [
  {
    h: '十八世紀之前',
    p: '古代阿拉伯、印度、埃及、中國醫師均以黃金作為藥材入方。中古歐洲煉金士將金粉混入飲料；古羅馬以黃金藥膏外敷。記載各異，皆為早期文獻所述。',
  },
  {
    h: '1890',
    p: '1905 年諾貝爾獎得主 Robert Koch 於 1890 年體外研究中觀察到金對結核桿菌的抑制作用；1931 年 Amberson 等以臨床試驗評估。',
  },
  {
    h: '1920s',
    p: 'aurothioglucose（Solganal）等金化合物進入類風濕性關節炎相關臨床試驗，後續發展出注射液 Myochrysine 與口服 Auranofin 等品項，為西方醫療史上具代表性的金化合物用藥階段。',
  },
  {
    h: '當代',
    p: '金合金廣泛運用於牙科鑲牙、心臟起搏器、神經修復微探針等醫療器材。日本牙科用金量居世界第一，年消耗約 20 噸。',
  },
];

export default function GoldHistory() {
  useReveal();
  return (
    <>
      <section className="subhero">
        <div className="wrap">
          <div className="crumbs rise">
            <Link href="/">首頁</Link> ／ 金的歷史
          </div>
          <span className="sh-k rise">Heritage of Gold · 金的歷史</span>
          <h1 className="rise d1">
            人類與<em>黃金</em>，一段七千年的故事
          </h1>
          <p className="sh-lead rise d2">
            從信仰到餐桌、從鍛打到汽化——黃金始終是人類最鄭重的物質。這一頁，娓娓道來金的文化、藥用與工藝史，以及汽化金箔如何承先啟後。
          </p>
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          <div className="ph-timeline">
            {ERAS.map((e, i) => (
              <div className={'ph-era reveal d' + (i % 3)} key={e.y}>
                <span className="ph-era-y">{e.y}</span>
                <h3>{e.zh}</h3>
                <p>{e.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 黃金博物館 mini-section */}
      <section className="sec panel">
        <div className="wrap">
          <div className="origins">
            <div className="ph reveal">
              <PhImg kw="goldmine,mountain,heritage" lock={73} />
              <span className="cap">金瓜石 · 黃金博物園區</span>
            </div>
            <div className="body reveal d1">
              <span className="kicker" style={{ display: 'block', marginBottom: '18px' }}>
                Local · 台灣黃金紀錄
              </span>
              <h2 className="ed-title" style={{ fontSize: 'clamp(26px,3.4vw,42px)', marginBottom: '24px' }}>
                金瓜石，<em>台灣的黃金時代</em>
              </h2>
              <p>
                十三世紀初宋寶慶元年（1225），趙汝適《諸蕃志》已記「流求國」產有「土金」——史地學者認為「流求」即台灣。台灣黃金紀錄，已逾<em>七百年</em>。
              </p>
              <p>
                清光緒年間，工人於基隆河淘金，掀起台灣東北角採金熱潮。金瓜石礦床由七十餘個礦體組成，被列為台灣世界遺產潛力點。民國七十六年金屬礦業公司結束營業，百年金瓜石的礦業時代落幕。
              </p>
              <p>
                如今，金瓜石黃金博物園區是台灣首座以生態博物館為理念打造的博物園區；AUVITA 食用金文創館即設於此館內。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 藥用小史 mini-section */}
      <section className="sec-tight">
        <div className="wrap">
          <div className="sec-head reveal" style={{ marginBottom: '40px' }}>
            <span className="kicker">Medicinal · 藥用小史</span>
            <h2 style={{ marginTop: '18px', fontSize: 'clamp(26px,3.4vw,40px)' }}>金作為藥材，已有千年</h2>
          </div>
          <div className="proc">
            {MED_ERAS.map((e) => (
              <div className="procstep reveal" key={e.h}>
                <h4>{e.h}</h4>
                <p>{e.p}</p>
              </div>
            ))}
          </div>
          <p className="specnote reveal" style={{ marginTop: '26px' }}>
            上述為黃金於藥用領域之歷史脈絡整理，非療效宣稱；AUVITA 產品定位為食用金箔／食品添加物，使用範圍以主管機關核准之糖果、糕餅、巧克力、酒類為準。
          </p>
        </div>
      </section>

      <section className="page-cta">
        <div className="wrap pc-in">
          <h2 className="reveal">
            從七千年走到汽化金箔<br />
            這就是 <em>AUVITA</em> 的承先
          </h2>
          <p className="reveal d1">看汽化式 PVD 製程如何把黃金帶進當代食品與生醫運用。</p>
          <div className="pc-row reveal d2">
            <Link className="btn btn-gold" href="/brand-tech">
              品牌與技術
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

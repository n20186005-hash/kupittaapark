import type { Locale } from '@/i18n/routing';
import type { Area } from './nearby';

type Labels = {
  title: string;
  intro: string;
  home: string;
  management: string;
  pending: string;
  official: string;
  history: string;
  plan: string;
  walk: string;
  transit: string;
  placeMap: string;
  areaMap: string;
  location: string;
  photo: string;
  photoPending: string;
  faq: string;
  accessQuestion: string;
  nearbyQuestion: string;
  accessAnswer: string;
  onward: string;
  verified: string;
  groups: Record<Area, string>;
};

export const nearbyLabels: Record<Locale, Labels> = {
  en: {
    title: 'Places to visit near Kupittaa Park',
    intro: 'Explore Kupittaa’s sports and family stops, Turku’s old town, the city centre and the Aura River. Choose an area and check the walking map before setting out.',
    home: 'Kupittaa Park', management: 'Who runs this place?', pending: 'Management to be verified',
    official: 'Visitor information from the source', history: 'History',
    plan: 'Plan your visit', walk: 'Walking route from Kupittaa Park', transit: 'Plan by bus with Föli',
    placeMap: 'Open the place on Google Maps', areaMap: 'Map of the surrounding area', location: 'Find the place',
    photo: 'Photography', photoPending: 'Photo of this place to be added',
    faq: 'Frequently asked questions', nearbyQuestion: 'What can I visit nearby on the same walk?', accessQuestion: 'Where can I check access before leaving?',
    accessAnswer: 'Use the visitor information linked above for opening, entry or route changes. If you are walking from Kupittaa Park, select the venue entrance rather than the centre of its postcode.',
    onward: 'Continue exploring', verified: 'Sources checked 20 November 2026',
    groups: { kupittaa: 'In and around Kupittaa', 'old-town': 'Old Turku and Cathedral Quarter', centre: 'Turku city centre', river: 'Along the lower Aura River' },
  },
  fi: {
    title: 'Käyntikohteita Kupittaanpuiston lähellä',
    intro: 'Tutustu Kupittaan liikunta- ja perhekohteisiin, vanhaan Turkuun, keskustaan ja Aurajokeen. Valitse alue ja tarkista kävelyreitti ennen lähtöä.',
    home: 'Kupittaanpuisto', management: 'Kuka vastaa kohteesta?', pending: 'Ylläpitäjä tarkistetaan',
    official: 'Tietoa vierailusta lähteen sivulla', history: 'Historia',
    plan: 'Suunnittele käynti', walk: 'Kävelyreitti Kupittaanpuistosta', transit: 'Suunnittele bussimatka Fölillä',
    placeMap: 'Avaa kohde Google Mapsissa', areaMap: 'Lähialueen kartta', location: 'Kohteen sijainti',
    photo: 'Valokuvaus', photoPending: 'Kohteen valokuva lisätään myöhemmin',
    faq: 'Usein kysyttyä', nearbyQuestion: 'Mihin voin jatkaa samalla kävelyllä?', accessQuestion: 'Mistä tarkistan pääsyn ennen lähtöä?',
    accessAnswer: 'Tarkista aukiolo, sisäänpääsy ja reittimuutokset yllä olevasta lähteestä. Jos kävelet Kupittaanpuistosta, valitse kartalta kohteen sisäänkäynti.',
    onward: 'Jatka tutustumista', verified: 'Lähteet tarkistettu 20.11.2026',
    groups: { kupittaa: 'Kupittaa ja lähikohteet', 'old-town': 'Vanha Turku ja tuomiokirkon ympäristö', centre: 'Turun keskusta', river: 'Aurajoen alajuoksu' },
  },
  sv: {
    title: 'Besöksmål nära Kuppisparken',
    intro: 'Upptäck idrott och familjeutflykter i Kuppis, gamla Åbo, stadskärnan och Aura å. Välj ett område och kontrollera gångvägen före avfärd.',
    home: 'Kuppisparken', management: 'Vem ansvarar för platsen?', pending: 'Ansvarig aktör ska bekräftas',
    official: 'Besöksinformation hos källan', history: 'Historia',
    plan: 'Planera besöket', walk: 'Gångväg från Kuppisparken', transit: 'Planera bussresan med Föli',
    placeMap: 'Öppna platsen på Google Maps', areaMap: 'Karta över närområdet', location: 'Hitta platsen',
    photo: 'Fotografering', photoPending: 'Ett foto av platsen läggs till senare',
    faq: 'Vanliga frågor', nearbyQuestion: 'Vad kan jag besöka på samma promenad?', accessQuestion: 'Var kontrollerar jag tillträdet före avfärd?',
    accessAnswer: 'Använd källan ovan för öppettider, tillträde och omledningar. Om du går från Kuppisparken, välj besöksmålets entré på kartan.',
    onward: 'Fortsätt upptäcka Åbo', verified: 'Källorna kontrollerades 20 november 2026',
    groups: { kupittaa: 'Kuppis med omnejd', 'old-town': 'Gamla Åbo och domkyrkokvarteren', centre: 'Åbo centrum', river: 'Längs Aura ås nedre lopp' },
  },
  zh: {
    title: '库皮塔公园周边景点',
    intro: '从库皮塔的亲子与运动场所出发，探索图尔库旧城、市中心及奥拉河。按区域选择目的地，出门前查看步行地图。',
    home: '库皮塔公园', management: '场地管理方', pending: '管理方待核实',
    official: '查看来源和参观信息', history: '历史',
    plan: '游览和交通', walk: '从库皮塔公园步行', transit: '用 Föli 规划公交',
    placeMap: '在 Google 地图打开地点', areaMap: '查看周边地区地图', location: '地点地图',
    photo: '拍照建议', photoPending: '实景待补',
    faq: '常见问题', nearbyQuestion: '同一趟步行还能游览哪里？', accessQuestion: '出发前如何确认能否参观？',
    accessAnswer: '用上方来源链接查询开放、入场及路线变化。从库皮塔公园步行时，请把场馆入口设为目的地。',
    onward: '继续游览', verified: '资料核于 2026 年 11 月 20 日',
    groups: { kupittaa: '库皮塔及近邻', 'old-town': '图尔库旧城与教堂街区', centre: '图尔库市中心', river: '奥拉河下游' },
  },
};


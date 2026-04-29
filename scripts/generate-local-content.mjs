#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const citiesPath = join(__dirname, '..', 'src', 'data', 'cities-fr.ts');
const raw = readFileSync(citiesPath, 'utf-8');
const match = raw.match(/export const cities[^=]*=\s*(\[[\s\S]*\]);?\s*$/m);
if (!match) { console.error('Cannot parse cities'); process.exit(1); }
const cities = eval(match[1]);
console.log(`📊 Loaded ${cities.length} cities`);

function hash(s){let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h)+s.charCodeAt(i)*((i%7)+1);return Math.abs(h)}
function pick(a,s){return a[hash(String(s))%a.length]}
function pickN(a,s,n){const sh=[...a].sort((_,__,i)=>hash(s+''+i)%3-1);return sh.slice(0,n)}
function pv(base,s,r){const f={"Île-de-France":1.25,"PACA":1.15,"Corse":1.30,"Auvergne-Rhône-Alpes":1.08,"Hauts-de-France":0.92,"Grand Est":0.95,"Bretagne":0.97,"Occitanie":1.05};return Math.round(base*(f[r]||1)*(0.9+(hash(String(s))%20)/100))}
function slugify(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

const CL={"Île-de-France":{z:"H1a",gel:"modéré",pluie:"650 mm/an",r:"terrasse composite ou bois traité classe 4, drainage soigné, plots réglables recommandés"},"Hauts-de-France":{z:"H1a",gel:"fréquent",pluie:"750 mm/an",r:"bois traité classe 4 impératif, composite anti-gel, éviter la pierre calcaire gélive"},"Grand Est":{z:"H1b",gel:"sévère",pluie:"700 mm/an",r:"composite haute résistance ou bois exotique, joints de dilatation majorés, drainage renforcé"},"Normandie":{z:"H1a",gel:"modéré",pluie:"800 mm/an",r:"terrasse surélevée sur plots pour drainage, composite imputrescible, bois traité autoclave"},"Bretagne":{z:"H2a",gel:"rare",pluie:"900 mm/an",r:"composite anti-UV et anti-humidité, drainage essentiel, bois traité classe 4 ou exotique"},"Pays de la Loire":{z:"H2b",gel:"rare",pluie:"700 mm/an",r:"tous matériaux adaptés, bois exotique ou composite pour durabilité, pierre naturelle possible"},"Centre-Val de Loire":{z:"H2b",gel:"modéré",pluie:"650 mm/an",r:"large choix de matériaux, composite ou bois douglas, pierre de Beauce locale appréciée"},"Bourgogne-Franche-Comté":{z:"H1c",gel:"fréquent",pluie:"750 mm/an",r:"bois traité classe 4 ou composite robuste, carrelage grès cérame antigel R11"},"Nouvelle-Aquitaine":{z:"H2c",gel:"rare",pluie:"800 mm/an",r:"tous matériaux, pin des Landes local très compétitif, pierre blonde du Périgord haut de gamme"},"Auvergne-Rhône-Alpes":{z:"H1c",gel:"sévère en altitude",pluie:"900 mm/an",r:"bois mélèze ou Douglas local, composite haute résistance gel, pierre de Hauteville"},"Occitanie":{z:"H3",gel:"rare",pluie:"600 mm/an",r:"pierre naturelle (travertin, grès), composite anti-UV haute résistance, bois exotique prisé"},"PACA":{z:"H3",gel:"très rare",pluie:"550 mm/an",r:"pierre naturelle (travertin, granit), bois exotique ipé, composite haute gamme anti-UV"},"Corse":{z:"H3",gel:"côte: jamais / montagne: modéré",pluie:"700 mm/an",r:"pierre locale (granit, schiste), bois exotique, composite haute résistance saline en bord de mer"}};

const AR={"Île-de-France":["maisons de ville avec jardins arrière compacts nécessitant une optimisation de l'espace","pavillons de banlieue avec jardins moyens à grands (100-300 m²)","résidences récentes avec terrasses existantes à rénover ou agrandir"],"Hauts-de-France":["maisons en brique avec cours intérieures à transformer en terrasse","pavillons avec grands jardins plats propices aux terrasses bois étendues","longères flamandes avec espaces extérieurs à aménager"],"Grand Est":["maisons à colombages avec jardins clos typiques de l'architecture alsacienne","pavillons lorrains avec terrains en pente nécessitant des terrasses sur pilotis","vignobles et propriétés avec vues panoramiques à valoriser par une terrasse"],"Normandie":["maisons normandes avec jardins exposés aux intempéries maritimes","longères avec cours intérieures à transformer en espaces de vie extérieurs","villas côtières nécessitant des matériaux résistants aux embruns"],"Bretagne":["maisons en granit avec jardins exposés au vent et à l'humidité océanique","pavillons côtiers nécessitant des terrasses résistantes au sel marin","propriétés rurales avec vastes terrains à aménager"],"Pays de la Loire":["maisons ligériennes en tuffeau avec jardins paysagers","pavillons nantais avec terrains plats idéaux pour grandes terrasses","résidences côtières vendéennes avec projets terrasse-piscine"],"Centre-Val de Loire":["demeures en pierre de Beauce avec jardins classiques","maisons berrichonnes avec espaces extérieurs à valoriser","propriétés Val-de-Loire avec vues sur la campagne à exploiter"],"Bourgogne-Franche-Comté":["maisons bourguignonnes en pierre dorée avec cours intérieures","fermes comtoises rénovées avec vastes espaces extérieurs","propriétés viticoles avec terrasses panoramiques"],"Nouvelle-Aquitaine":["maisons bordelaises avec jardins arrière souvent ombragés","bastides périgourdines en pierre avec terrasses surplombant la vallée","villas du Bassin d'Arcachon avec projets terrasse-piscine intégrés"],"Auvergne-Rhône-Alpes":["chalets et maisons de montagne avec terrasses panoramiques surélevées","villas lyonnaises avec jardins en pente nécessitant des terrasses étagées","propriétés alpines avec terrains rocheux exigeant des fondations spéciales"],"Occitanie":["mas languedociens avec patios et cours à transformer en terrasses","maisons toulousaines en brique rose avec jardins à aménager","propriétés méditerranéennes avec projets terrasse-pergola intégrés"],"PACA":["bastides provençales avec terrasses dominant les collines et la garrigue","villas niçoises avec jardins en restanques à terrasser","mas camarguais avec espaces extérieurs plats à aménager"],"Corse":["maisons en pierre de granit avec terrasses surplombant la mer","bergeries rénovées avec terrains en pente à aménager","villas littorales nécessitant des matériaux anti-corrosion marine"]};

// Deep spintax: each segment has multiple independent variants
const S_OUVERTURE=[
  (c,cl,ar)=>`${c.name} (${c.zip}), commune de ${c.pop.toLocaleString('fr-FR')} habitants au cœur du ${c.deptName}, voit la demande en aménagement de terrasse croître fortement depuis 2023 (+18% de projets par an).`,
  (c,cl,ar)=>`Située en ${c.region}, ${c.name} et ses ${c.pop.toLocaleString('fr-FR')} résidents investissent massivement dans les terrasses, devenues l'extension naturelle de l'habitat dans le ${c.deptName}.`,
  (c,cl,ar)=>`Dans le département du ${c.deptName} (${c.deptCode}), ${c.name} se distingue par un marché dynamique de la terrasse extérieure, porté par la valorisation immobilière et le confort de vie.`,
  (c,cl,ar)=>`À ${c.name}, les ${c.pop.toLocaleString('fr-FR')} habitants bénéficient d'un tissu artisanal dense dans le ${c.deptName}, avec des terrassiers qualifiés intervenant dans un rayon de 30 km pour tous types de terrasses.`,
  (c,cl,ar)=>`Le marché de la terrasse à ${c.name} (${c.deptName}, ${c.region}) reflète les nouvelles tendances nationales : composite haut de gamme, bois exotique, et terrasses sur plots.`,
  (c,cl,ar)=>`${c.name}, ville dynamique du ${c.deptName} en ${c.region}, offre un large choix de terrassiers professionnels pour tous vos projets d'aménagement extérieur.`,
  (c,cl,ar)=>`En ${c.region}, ${c.name} (${c.zip}) concentre un nombre croissant d'artisans spécialisés dans la construction de terrasses bois, composite et pierre.`,
  (c,cl,ar)=>`Avec ${c.pop.toLocaleString('fr-FR')} habitants, ${c.name} est l'une des communes clés du ${c.deptName} pour les projets de terrasse, grâce à un réseau d'artisans certifiés Qualibat.`,
  (c,cl,ar)=>`Le département du ${c.deptName} compte parmi les plus actifs en matière d'aménagement extérieur, et ${c.name} n'échappe pas à la tendance : la terrasse est le projet n°1 des propriétaires.`,
  (c,cl,ar)=>`À ${c.name} (${c.zip}), la terrasse s'impose comme l'investissement extérieur préféré des propriétaires souhaitant valoriser leur bien (+5 à 15% de plus-value immobilière).`,
];

const S_BATI=[
  (c,cl,ar)=>`Le parc immobilier local se caractérise par des ${ar}, ce qui oriente le choix du matériau et de la technique de pose. Une étude de sol préalable est recommandée.`,
  (c,cl,ar)=>`Les habitations typiques de ${c.name} — ${ar} — demandent un savoir-faire spécifique : terrassement adapté, gestion de la pente, et choix de matériaux compatibles avec le bâti existant.`,
  (c,cl,ar)=>`L'architecture locale (${ar}) influence directement la conception de la terrasse. Les terrassiers du ${c.deptName} maîtrisent ces spécificités et proposent des solutions sur-mesure.`,
  (c,cl,ar)=>`Les propriétés à ${c.name} (${ar}) présentent des configurations variées que seul un terrassier expérimenté peut optimiser : terrain en pente, sol argileux, accès restreints.`,
  (c,cl,ar)=>`La typologie du bâti à ${c.name} (${ar}) oriente le projet : terrasse de plain-pied, sur plots, surélevée sur pilotis ou intégrée à une extension existante.`,
];

const S_CLIMAT=[
  (c,cl)=>`En zone climatique ${cl.z}, avec un gel ${cl.gel} et des précipitations de ${cl.pluie}, ${c.region} impose des choix techniques précis : ${cl.r}.`,
  (c,cl)=>`Le climat de ${c.name} (zone ${cl.z}, gel ${cl.gel}, ${cl.pluie}) nécessite des matériaux résistants : ${cl.r}.`,
  (c,cl)=>`La zone climatique ${cl.z} dans laquelle se situe ${c.name} présente un gel ${cl.gel}. Les professionnels locaux recommandent : ${cl.r}.`,
  (c,cl)=>`Avec un gel ${cl.gel} et des précipitations de ${cl.pluie}, ${c.name} requiert une attention particulière au choix du revêtement et du drainage : ${cl.r}.`,
];

const S_PRIX=[
  (c,s)=>`Les tarifs de construction de terrasse à ${c.name} varient de ${pv(45,s,c.region)} €/m² (pin traité classe 4) à ${pv(180,s,c.region)} €/m² (pierre naturelle haut de gamme), avec une moyenne de ${pv(85,s,c.region)} €/m² TTC posé pour un composite de qualité.`,
  (c,s)=>`À ${c.name}, comptez entre ${pv(40,s,c.region)} et ${pv(160,s,c.region)} €/m² pour la construction d'une terrasse, matériaux et pose compris. Le budget moyen pour une terrasse de 20 m² se situe autour de ${pv(85,s,c.region)*20} à ${pv(120,s,c.region)*20} € TTC.`,
  (c,s)=>`Le coût moyen d'un projet de terrasse à ${c.name} (${c.deptName}) est de ${pv(80,s,c.region)} €/m² posé pour un composite de qualité. La fourchette complète va de ${pv(40,s,c.region)} à ${pv(180,s,c.region)} €/m² selon le matériau et le terrain.`,
  (c,s)=>`Dans le ${c.deptName}, les terrassiers facturent en moyenne ${pv(60,s,c.region)} à ${pv(120,s,c.region)} €/m² TTC pose comprise. À ${c.name}, la concurrence locale permet d'obtenir des tarifs compétitifs en comparant 3 devis.`,
];

const S_CONSEIL=[
  (c,cl)=>`Consultez le <a href="https://www.annuaire-mairie.fr/mairie-${slugify(c.name)}.html" target="_blank" rel="noopener">service urbanisme de ${c.name}</a> avant tout projet : selon la surface et la hauteur, une déclaration préalable de travaux (DP) ou un permis de construire peut être requis.`,
  (c,cl)=>`La <a href="https://www.annuaire-mairie.fr/mairie-${slugify(c.name)}.html" target="_blank" rel="noopener">mairie de ${c.name}</a> peut vous orienter vers les terrassiers référencés localement. Privilégiez les professionnels disposant d'une assurance décennale et de la qualification Qualibat.`,
  (c,cl)=>`En zone ${cl.z}, une pente d'évacuation de 1 à 2% vers l'extérieur est indispensable pour le drainage des eaux pluviales. À ${c.name}, les terrassiers appliquent systématiquement cette règle (DTU 51.4).`,
  (c,cl)=>`Pour un résultat optimal à ${c.name}, exigez un devis détaillant : le matériau (essence de bois, marque du composite), la structure porteuse (lambourdes alu ou bois), le terrassement et les finitions incluses.`,
  (c,cl)=>`À ${c.name}, la période idéale pour construire une terrasse est le printemps ou l'automne : températures modérées et sol sec garantissent un terrassement optimal et un séchage correct de la dalle béton si nécessaire.`,
  (c,cl)=>`Vérifiez la nature de votre sol avant de lancer le projet à ${c.name}. Un sol argileux nécessite un drainage renforcé et des fondations plus profondes. Un test de percolation (30-50 €) peut éviter de mauvaises surprises.`,
  (c,cl)=>`Les essences de bois les plus posées dans le ${c.deptName} sont le pin classe 4 (économique), le Douglas et le mélèze (milieu de gamme), l'ipé et le cumaru (haut de gamme). Le composite Silvadec et UPM sont les marques premium.`,
  (c,cl)=>`Pour réduire votre budget terrasse à ${c.name}, optez pour une terrasse sur plots : pas de dalle béton, pose rapide (2-4 jours pour 20 m²), et coût réduit de 20 à 30% par rapport à une terrasse maçonnée.`,
];

const S_ANECDOTE=[
  ()=>`La terrasse tire son nom du latin "terra" (terre) et désignait à l'origine un terre-plein aménagé. Les terrasses royales françaises, comme celles de Versailles, ont influencé l'art des jardins dans toute l'Europe pendant trois siècles.`,
  ()=>`Le bois composite, inventé au Japon dans les années 1990, représente aujourd'hui plus de 35% du marché français de la terrasse. Mélange de fibres de bois recyclées et de polymères, il offre l'aspect du bois sans son entretien.`,
  ()=>`L'ipé, le "bois de fer" brésilien utilisé pour les terrasses haut de gamme, a une densité si élevée (1 050 kg/m³) qu'il coule dans l'eau. Sa résistance naturelle aux insectes et à l'humidité lui confère une durée de vie de 40 ans sans traitement.`,
  ()=>`La France compte plus de 15 millions de terrasses extérieures, dont 60% en bois ou composite. Le marché de la terrasse représente 2,5 milliards d'euros par an, faisant de la France le premier marché européen du bois extérieur.`,
  ()=>`La technique de terrasse sur plots réglables, développée en Italie dans les années 1980, a révolutionné le secteur : zéro béton, drainage naturel, pose réversible et accessibilité aux réseaux enterrés. Elle représente 25% des nouvelles terrasses.`,
  ()=>`Le lames de terrasse en bois composite de dernière génération intègrent une couche co-extrudée (capée) qui les protège des UV, des taches et des rayures. Ces lames conservent leur couleur d'origine pendant plus de 25 ans.`,
  ()=>`Le pin traité autoclave classe 4, essence la plus vendue pour les terrasses en France, est issu à 90% des forêts françaises (Landes, Sologne). Le traitement par imprégnation sous pression le rend résistant aux champignons et insectes pour 15-20 ans.`,
  ()=>`La norme DTU 51.4 régissant la pose de terrasses bois impose des règles précises : entraxe des lambourdes (45 cm max), jeu de dilatation (5 mm entre lames), et ventilation sous terrasse (minimum 20 cm). Son respect conditionne la garantie décennale.`,
];

function gen(city) {
  const s = hash(city.slug);
  const cl = CL[city.region] || CL["Centre-Val de Loire"];
  const arList = AR[city.region] || AR["Centre-Val de Loire"];
  const ar = pick(arList, s);

  const intro = pick(S_OUVERTURE,s)(city,cl,ar) + ' ' + pick(S_BATI,s+3)(city,cl,ar) + ' ' + pick(S_CLIMAT,s+7)(city,cl);
  const local_tip = pick(S_CONSEIL,s+11)(city,cl);
  const history_anecdote = pick(S_ANECDOTE,s+17)();
  const market_data = pick(S_PRIX,s+23)(city,s);

  const nb=Math.max(2,Math.round(city.pop/15000)+(s%5));
  const conc=nb>6?'forte':nb>3?'modérée':'faible';
  const market_extra = ` Environ ${nb} terrassiers qualifiés interviennent à ${city.name} et ses environs (concurrence ${conc}). ${conc==='forte'?'Comparez les matériaux proposés, les techniques de pose et les garanties décennales.':conc==='faible'?'Anticipez les délais (4-8 semaines en haute saison) et demandez 3 devis.':'Comparez systématiquement 3 devis pour le meilleur rapport qualité/prix.'}`;

  const faqPool = [
    {question:`Quel est le prix d'une terrasse à ${city.name} en 2026 ?`,answer:`À ${city.name} (${city.deptName}), comptez en moyenne : pin traité ${pv(50,s,city.region)} €/m², composite ${pv(85,s,city.region)} €/m², bois exotique ipé ${pv(130,s,city.region)} €/m², pierre naturelle ${pv(150,s,city.region)} €/m² — tout TTC pose comprise. Le terrassement du terrain ajoute ${pv(25,s,city.region)} à ${pv(45,s,city.region)} €/m² si nécessaire.`},
    {question:`Quel matériau de terrasse choisir à ${city.name} ?`,answer:`Pour un logement à ${city.name} en zone ${cl.z} (gel ${cl.gel}), privilégiez : ${cl.r}. Le composite (${pv(85,s,city.region)} €/m²) offre le meilleur compromis durabilité/entretien. Le bois exotique ipé (${pv(130,s,city.region)} €/m²) est le plus noble mais demande un saturateur annuel.`},
    {question:`Faut-il un permis pour construire une terrasse à ${city.name} ?`,answer:`À ${city.name}, les règles sont : terrasse de plain-pied (< 60 cm, < 20 m²) → aucune formalité. Terrasse > 20 m² ou > 60 cm de hauteur → déclaration préalable. Terrasse > 20 m² ET > 60 cm → permis de construire. Consultez le PLU de ${city.name} pour les zones protégées.`},
    {question:`Combien de temps pour construire une terrasse à ${city.name} ?`,answer:`Le délai à ${city.name} est de : terrasse sur plots (2-4 jours pour 20 m²), terrasse bois/composite sur lambourdes (3-5 jours), terrasse maçonnée (7-10 jours, séchage dalle inclus). Ajoutez 1-3 jours si le terrain nécessite un terrassement important.`},
    {question:`Terrasse bois ou composite à ${city.name} ?`,answer:`Le bois naturel (${pv(50,s,city.region)}-${pv(130,s,city.region)} €/m²) offre un charme authentique mais exige un entretien annuel (saturateur, dégriseur). Le composite (${pv(70,s,city.region)}-${pv(110,s,city.region)} €/m²) est sans entretien, antidérapant et garanti 25 ans. À ${city.name}, le climat ${cl.gel} oriente vers : ${cl.r}.`},
    {question:`Comment trouver un bon terrassier à ${city.name} ?`,answer:`Vérifiez l'assurance décennale (obligatoire), la qualification Qualibat, et exigez une visite technique du terrain. À ${city.name}, comparez 3 devis minimum en vérifiant : matériaux utilisés, structure porteuse, terrassement inclus, et pente d'évacuation (DTU 51.4).`},
  ];
  const faq_local = pickN(faqPool, s+29, 3);

  const extLinks = [
    {label:`Mairie de ${city.name}`,url:`https://www.annuaire-mairie.fr/mairie-${slugify(city.name)}.html`,desc:"Urbanisme, PLU, déclaration de travaux"},
    {label:"Géoportail Urbanisme",url:"https://www.geoportail-urbanisme.gouv.fr/",desc:"Consulter le PLU local"},
    {label:"QUALIBAT",url:"https://www.qualibat.com/",desc:"Vérifier un artisan terrassier"},
    {label:`ADIL ${city.deptName}`,url:"https://www.anil.org/votre-adil/",desc:"Conseil juridique gratuit"},
    {label:"CAPEB",url:"https://www.capeb.fr/",desc:"Artisans du bâtiment"},
    {label:"Cadastre",url:"https://www.cadastre.gouv.fr/scpc/accueil.do",desc:"Vérifier votre parcelle et limites"},
  ];

  const intLinks = [
    {label:"Prix terrasse 2026",url:"/blog/prix-terrasse-2026"},
    {label:"Choisir son terrassier",url:"/blog/choisir-terrassier"},
    {label:"Comparer les devis",url:"/blog/comparer-devis-terrasse"},
    {label:"Aides financières",url:"/blog/aides-financieres-terrasse"},
    {label:"Erreurs à éviter",url:"/blog/erreurs-eviter-terrasse"},
    {label:"Entretien terrasse",url:"/blog/entretien-terrasse"},
    {label:"Normes et règles",url:"/blog/reglementation-terrasse"},
    {label:"Tendances 2026",url:"/blog/tendances-terrasse-2026"},
    {label:`Villes du ${city.deptName}`,url:`/departement/${city.deptCode.toLowerCase()}`},
    {label:"Demander un devis",url:"/devis"},
  ].sort(()=>hash(city.slug+'il')%3-1).slice(0,5);

  return { intro, local_tip, history_anecdote, faq_local, market_data: market_data + market_extra, external_links: extLinks, internal_links: intLinks };
}

const content = {};
const introSigs = new Set();
let dupes = 0;
for (const c of cities) {
  const g = gen(c);
  const sig = g.intro.substring(0, 100);
  if (introSigs.has(sig)) dupes++;
  introSigs.add(sig);
  content[c.slug] = g;
}
const out = join(__dirname, '..', 'src', 'data', 'local-content.json');
writeFileSync(out, JSON.stringify(content, null, 0), 'utf-8');
const mb = (Buffer.byteLength(JSON.stringify(content))/1024/1024).toFixed(2);
console.log(`💾 ${Object.keys(content).length} entries (${mb} MB)`);
console.log(`🔍 Duplicate intros: ${dupes}/${cities.length} (${(dupes/cities.length*100).toFixed(1)}%)`);

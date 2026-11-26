"use strict";var q=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports);var Me=q((xs,$e)=>{"use strict";var Dt=require("node:path");function Nt(r=process.env){let e={token:r.DISCORD_TOKEN,guild:r.DISCORD_GUILD_ID,channel:r.GAMES_CHANNEL_ID||null,staffRole:r.STAFF_ROLE_ID||null,data:Dt.resolve(
r.DATA_DIR||"./data"),myparis:r.MYPARIS_URL||"https://myparis.psg.fr/fr/",year:Number(r.EVENT_YEAR||2026),attempts:Number(r.MAX_RANKED_ATTEMPTS||1),auto:r.AUTO_PUBLISH==="true",practice:r.ALLOW_PRACTICE!=="false",openHour:Number(
r.OPEN_HOUR_PARIS||0),closeHour:Number(r.CLOSE_HOUR_PARIS||24)};if(!e.token||!/^\d{17,20}$/.test(e.guild||""))throw Error("DISCORD_TOKEN et DISCORD_GUILD_ID sont requis.");for(let t of["channel","staffRole"])if(e[t]&&!/^\d{17,20}$/.
test(e[t]))throw Error("ID incorrect : "+t);for(let[t,a,n]of[["year",2026,2100],["attempts",1,5],["openHour",0,23],["closeHour",1,24]])if(!Number.isInteger(e[t])||e[t]<a||e[t]>n)throw Error("Réglage incorrect : "+t);if(e.
closeHour<=e.openHour)throw Error("La clôture doit suivre l’ouverture.");let s=new URL(e.myparis);if(s.protocol!=="https:"||s.username||s.password)throw Error("MyParis nécessite un lien HTTPS.");if(r.RAILWAY_ENVIRONMENT_ID&&
!r.RAILWAY_VOLUME_MOUNT_PATH)throw Error("Monter un volume persistant sur /data.");return e}function Pt(r=Date.now()){return Object.fromEntries(new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Paris",year:"numeric",month:"\
2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(r).filter(e=>e.type!=="literal").map(e=>[e.type,e.value]))}function xt(r){if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.
test(r||"")||!Number.isFinite(Date.parse(r)))throw Error("Date ISO avec fuseau attendue, ex. 2026-12-04T20:00:00+01:00.");return Date.parse(r)}var Ct=(r,e,s)=>Date.UTC(r,11,e,s-1);$e.exports={config:Nt,paris:Pt,parseDate:xt,
epoch:Ct}});var qe=q((Cs,It)=>{It.exports=[{day:1,title:"La tournée du Père Noël #1",description:"Guider le ballon jusqu’au cadeau sur un terrain quadrillé, en évitant les obstacles."},{day:2,title:"Les cadeaux jumeaux #1",description:"\
Un jeu de memory : retourner les cadeaux et retrouver les paires de joueurs et joueuses."},{day:3,title:"Pénaltys de Noël #1",description:"Choisir où tirer ou plonger pour marquer et arrêter des pénaltys. Le jeu ouvre \
pendant 24 heures."},{day:4,title:"Pronos Toulouse - PSG",description:"Les pronostics habituels autour du match : résultat, score, buteurs et passeurs."},{day:5,title:"Le mystère sous la neige #1",description:"Reconnaî\
tre un élément emblématique du club sur une image qui se dévoile progressivement."},{day:6,title:"Les cadeaux jumeaux #2",description:"Retrouver les paires dans une nouvelle grille consacrée au handball parisien."},
{day:7,title:"La compo gelée #1",description:"Observer une composition, puis retrouver les noms qui ont disparu."},{day:8,title:"Pronos Aston Villa - PSG",description:"Les pronostics habituels pour le rendez-vous de Lig\
ue des champions."},{day:9,title:"Les cadeaux jumeaux #3",description:"Une nouvelle grille de memory avec des maillots historiques du club."},{day:10,title:"Pénaltys de Noël #2",description:"Nouvelle session de pénalty\
s : choisir ses tirs et ses plongeons pour obtenir le meilleur score."},{day:11,title:"La tournée du Père Noël #2",description:"Atteindre le cadeau sur un nouveau parcours, avec davantage d’obstacles."},{day:12,title:"\
Pronos PSG - Paris FC",description:"Les pronostics habituels autour du derby parisien."},{day:13,title:"La hotte des souvenirs",description:"Remettre dans l’ordre chronologique plusieurs moments marquants de l’histoire d\
u PSG."},{day:14,title:"Le mystère sous la neige #2",description:"Reconnaître un élément emblématique du club sur une image qui se dévoile progressivement."},{day:15,title:"La tournée du Père Noël #3",description:"\
Trouver le chemin jusqu’au cadeau avec le moins de déplacements possible."},{day:16,title:"Pronos de la finale intercontinentale",description:"Pronostiquer le résultat, le score, les buteurs et les passeurs de la fina\
le. Adversaire à confirmer."},{day:17,title:"Pénaltys de Noël #3",description:"Une nouvelle série de pénaltys à jouer pendant 24 heures, avec des points pour les buts et les arrêts."},{day:18,title:"La compo gelée\
 #2",description:"Mémoriser une composition de l’équipe féminine, puis retrouver les noms manquants."},{day:19,title:"Le vestiaire du Père Noël",description:"Reconnaître des maillots du club à partir de détails : \
col, manche ou motif."},{day:20,title:"Pronos Coupe de France",description:"Pronostiquer le match de Coupe de France. Case à déplacer selon la programmation ; date et adversaire à confirmer."},{day:21,title:"Les cadea\
ux jumeaux #4",description:"Dernière grille de memory, avec un mélange des sections et des symboles du club."},{day:22,title:"Le mystère sous la neige #3",description:"Une nouvelle image du club se dévoile sous la nei\
ge. Plus on reconnaît tôt ce qu’elle représente, plus on marque."},{day:23,title:"La tournée du Père Noël #4",description:"Guider le ballon jusqu’au cadeau sur le dernier parcours, avec un nombre de déplacements \
limité."},{day:24,title:"La finale des Pénaltys de Noël",description:"Dernière session de tirs et d’arrêts pour marquer des points avant la clôture du classement Noël."}]});var se=q((Is,_e)=>{"use strict";var $t=qe(),Mt={1:"maze",2:"memory",3:"penalty",4:"prediction",5:"mystery",6:"memory",7:"lineup",8:"prediction",9:"memory",10:"penalty",11:"maze",12:"prediction",13:"chrono",14:"mystery",15:"\
maze",16:"prediction",17:"penalty",18:"lineup",19:"shirts",20:"prediction",21:"memory",22:"mystery",23:"maze",24:"penalty"},qt={maze:"La tournée du Père Noël",memory:"Les cadeaux jumeaux",penalty:"Pénaltys de Noël",
prediction:"Pronostics",mystery:"Le mystère sous la neige",lineup:"La compo gelée",chrono:"La hotte des souvenirs",shirts:"Le vestiaire du Père Noël"},ue=$t.map(r=>({...r,type:Mt[r.day],date:`2026-12-${String(r.day).
padStart(2,"0")}`}));_e.exports={days:ue,labels:qt,day:r=>ue.find(e=>e.day===Number(r)),playable:ue.filter(r=>r.type!=="prediction")}});var ae=q(($s,je)=>{"use strict";var{createHash:_t}=require("node:crypto"),re={up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]};function Ge(r){let e=_t("sha256").update(String(r)).digest().readUInt32LE(0)||1;return()=>(e^=e<<
13,e^=e>>>17,e^=e<<5,(e>>>0)/4294967296)}function z(r,e){r=[...r];for(let s=r.length-1;s>0;s--){let t=Math.floor(e()*(s+1));[r[s],r[t]]=[r[t],r[s]]}return r}function Oe(r,e,s=e+1,t=e*e-e-2){let a=new Set(r),n=[[s]],i=new Set(
[s]);for(let l=0;l<n.length;l++){let u=n[l],m=u.at(-1);if(m===t)return u;for(let[h,v]of Object.values(re)){let w=m%e+h,S=Math.floor(m/e)+v,R=S*e+w;w>=0&&w<e&&S>=0&&S<e&&!a.has(R)&&!i.has(R)&&(i.add(R),n.push([...u,R]))}}
return null}function Lt(r,e){let s=r===1?11:r===23?15:13,t=r===1?30:r===23?50:40,a=null;for(let n=0;n<100;n++){let i=new Set([s+1]),l=[s+1];for(;l.length;){let h=l.at(-1),v=h%s,w=Math.floor(h/s),S=z(Object.values(re),e).
map(([M,E])=>[v+M*2,w+E*2,M,E]).filter(([M,E])=>M>0&&M<s-1&&E>0&&E<s-1&&!i.has(E*s+M));if(!S.length){l.pop();continue}let[R,P,N,I]=S[0];i.add((w+I)*s+v+N),i.add(P*s+R),l.push(P*s+R)}let u=Array.from({length:s*s},(h,v)=>v).
filter(h=>!i.has(h)),m=Oe(u,s);if((!a||m.length>a.path.length)&&(a={walls:u,path:m}),m.length-1>=t)break}return{size:s,walls:a.walls,position:s+1,goal:s*s-s-2,optimal:a.path.length-1,budget:a.path.length-1+(r===23?6:r===
15?8:r===1?12:10),trail:[s+1]}}var Le=r=>String(r||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"");function pe(r,e){return[e.name,...e.aliases||[]].some(s=>Le(s)===Le(r))}function O(r,e,s){
return r.phase="done",r.finished=s,r.score=Math.max(0,Math.min(1e3,Math.round(e))),r.won=r.score===1e3,r.version++,r}function Gt(r,e,s=Date.now(),t={},a=1){let n=Ge(e),i={type:r,day:a,content:t,phase:"playing",started:s,
expires:s+12*6e4,version:0,score:0,moves:0};if(r==="maze")Object.assign(i,Lt(a,n));else if(r==="memory")Object.assign(i,{cards:z(Array.from({length:16},(l,u)=>u%8),n),labels:t.labels,found:[],flipped:[],pairs:0,turns:0});else if(r===
"penalty")Object.assign(i,{shots:[],keeperPlan:Array.from({length:5},()=>Math.floor(n()*3)),stage:"waiting"});else if(r==="lineup")Object.assign(i,{players:t.players,formation:"4-3-3",ready:s+1e4,stage:"show",answers:Array(
11).fill("")});else if(r==="chrono")Object.assign(i,{events:z(t.events,n),chosen:[]});else if(["mystery","shirts"].includes(r))Object.assign(i,{questions:z(t.questions,n).slice(0,5).map(l=>{let u=l.options[l.answer],m=z(
l.options,n);return{...l,options:m,answer:m.indexOf(u)}}),round:0,reveals:0,totalScore:0,history:[],stage:"answer"});else throw Error("Cette case est gérée par le bot de pronostics séparé.");return i}function ce(r,e=Date.
now()){return r.phase!=="playing"?r:e>=r.expires?(r.phase="expired",r.finished=e,r.version++,r):(r.hideAt&&e>=r.hideAt&&(r.flipped=[],delete r.hideAt,r.version++),r.type==="lineup"&&r.stage==="show"&&e>=r.ready&&(r.stage=
"answer",r.version++),r)}function Ot(r,e,s=Date.now()){let t=structuredClone(r);if(ce(t,s),t.phase!=="playing")return t;if(e==="giveup"){if(t.type==="lineup")return t.corrections=t.players.map((a,n)=>({position:a.position,
expected:a.name,answer:t.answers[n]||"Sans réponse",ok:pe(t.answers[n],a)})),O(t,t.corrections.filter(a=>a.ok).length/11*1e3,s);if(t.type==="chrono"){let a=[...t.events].sort((n,i)=>n.year-i.year);return t.corrections=a.
map((n,i)=>({expected:n.label+" ("+n.year+")",answer:t.chosen[i]===void 0?"Sans réponse":t.events[t.chosen[i]].label+" ("+t.events[t.chosen[i]].year+")",ok:t.chosen[i]!==void 0&&n.year===t.events[t.chosen[i]].year})),O(
t,t.corrections.filter(n=>n.ok).length*200,s)}if(["mystery","shirts"].includes(t.type)){for(let a=t.history.length;a<t.questions.length;a++){let n=t.questions[a];t.history.push({prompt:n.prompt,answer:"Sans réponse",expected:n.
options[n.answer],ok:!1,score:0,source:n.source||"",explanation:n.explanation||""})}return O(t,t.totalScore/t.questions.length,s)}return O(t,t.type==="memory"?t.pairs*50:t.type==="penalty"?t.shots.filter(a=>a.goal).length*
200:0,s)}if(t.type==="maze"){let a=re[e];if(!a)throw Error("Direction invalide.");let n=t.position%t.size+a[0],i=Math.floor(t.position/t.size)+a[1],l=i*t.size+n;if(n<0||i<0||n>=t.size||i>=t.size||t.walls.includes(l))throw Error(
"Un obstacle bloque ce passage.");if(t.position=l,t.trail.push(l),t.moves++,l===t.goal)return O(t,1e3-25*(t.moves-t.optimal),s);if(t.moves>=t.budget)return O(t,0,s)}if(t.type==="memory"){let a=Number(e);if(!Number.isInteger(
a)||a<0||a>15||t.found.includes(a)||t.flipped.includes(a)||t.hideAt)throw Error("Choisis un cadeau encore caché.");if(t.flipped.push(a),t.flipped.length===2)if(t.turns++,t.cards[t.flipped[0]]===t.cards[t.flipped[1]]){if(t.
found.push(...t.flipped),t.flipped=[],t.pairs++,t.pairs===8)return O(t,Math.max(500,1e3-20*(t.turns-8)),s)}else t.hideAt=s+1600}if(t.type==="penalty")if(e==="next"){if(t.stage!=="result")throw Error("Choisis ton tir.");t.
stage="waiting"}else{if(t.stage!=="waiting")throw Error("Appuie sur Tir suivant.");let a=Number(e);if(![0,1,2].includes(a))throw Error("Direction invalide.");let n=t.keeperPlan[t.shots.length];if(t.shots.push({shot:a,dive:n,
goal:a!==n}),t.shots.length===5)return O(t,t.shots.filter(i=>i.goal).length*200,s);t.stage="result"}if(t.type==="lineup"){if(t.stage!=="answer")throw Error("Observe la composition pendant dix secondes.");if(e==="submit")
return t.corrections=t.players.map((a,n)=>({position:a.position,expected:a.name,answer:t.answers[n]||"Sans réponse",ok:pe(t.answers[n],a)})),O(t,t.corrections.filter(a=>a.ok).length/11*1e3,s);throw Error("Utilise les bo\
utons pour saisir les joueurs.")}if(t.type==="chrono")if(e==="clear")t.chosen=[];else if(e==="submit"){if(t.chosen.length!==5)throw Error("Sélectionne les cinq souvenirs.");let a=[...t.events].sort((n,i)=>n.year-i.year);
return t.corrections=a.map((n,i)=>({expected:n.label+" ("+n.year+")",answer:t.events[t.chosen[i]].label+" ("+t.events[t.chosen[i]].year+")",ok:n.year===t.events[t.chosen[i]].year})),O(t,t.corrections.filter(n=>n.ok).length*
200,s)}else{let a=Number(e);if(!Number.isInteger(a)||a<0||a>4||t.chosen.includes(a))throw Error("Souvenir déjà sélectionné.");t.chosen.push(a)}if(["mystery","shirts"].includes(t.type))if(e==="next"){if(t.stage!=="res\
ult")throw Error("Réponds d’abord.");t.round++,t.reveals=0,t.stage="answer"}else if(e==="reveal"){if(t.type==="shirts"||t.stage!=="answer"||t.reveals>=4)throw Error("Image déjà dévoilée.");t.reveals++}else{if(t.stage!==
"answer")throw Error("Appuie sur Question suivante.");let a=Number(e),n=t.questions[t.round];if(![0,1,2,3].includes(a))throw Error("Choix invalide.");let i=a===n.answer?t.type==="shirts"?1e3:1e3-t.reveals*200:0;if(t.history.
push({prompt:n.prompt,answer:n.options[a],expected:n.options[n.answer],ok:a===n.answer,score:i,source:n.source||"",explanation:n.explanation||""}),t.totalScore+=i,t.stage="result",t.round===t.questions.length-1)return O(
t,t.totalScore/t.questions.length,s)}return t.version++,t}function jt(r,e,s,t=Date.now()){let a=structuredClone(r);if(ce(a,t),a.phase!=="playing"||a.type!=="lineup"||a.stage!=="answer")throw Error("La saisie n’est pas ou\
verte.");let n=[[0],[1,2,3,4],[5,6,7],[8,9,10]],i=n[e];if(!i)throw Error("Groupe invalide.");for(let l of i){let u=String(s[l]||"").trim();if(u.length>60)throw Error("Nom trop long.");a.answers[l]=u}return a.version++,a}
var Ft=r=>({maze:"Trouve le cadeau dans le labyrinthe. Les déplacements sont limités : repère ton chemin avant de partir.",memory:"Retrouve les huit paires. Moins de tours, plus de points.",penalty:"Cinq tirs, trois c\
ôtés. Le gardien a déjà choisi où plonger. Un but = 200 points.",lineup:"Mémorise les onze joueurs pendant dix secondes, puis saisis les noms aux bons postes. Confirme quand tu as terminé.",chrono:"Sélectionne les\
 souvenirs du plus ancien au plus récent. Ton ordre apparaît à droite. Confirme pour voir la correction.",mystery:"Identifie la photo. Tu peux la dévoiler davantage, avec moins de points à la clé.",shirts:"Ce maill\
ot domicile du PSG appartient à quelle saison ? Cinq photos, cinq réponses."})[r];je.exports={create:Gt,act:Ot,advance:ce,fillLineup:jt,shortest:Oe,V:re,shuffle:z,rng:Ge,instructions:Ft,matches:pe}});var Fe=q((Ms,Bt)=>{Bt.exports={"2":{ready:!0,labels:["Raí","Pauleta","Cavani","Verratti","Formiga","Katoto","Diani","Kiedrzynek"]},"6":{ready:!0,labels:["Karabatic","Hansen","Omeyer","Abalo","Remili","Syprzak","Narcisse",
"Gérard"]},"7":{ready:!0,players:[{name:"Donnarumma",position:"GB",photo:"portrait-gianluigi-donnarumma.png",aliases:["gianluigi donnarumma","Donnarumma"]},{name:"Hakimi",position:"DD",photo:"portrait-achraf-hakimi.png",
aliases:["achraf hakimi","Hakimi"]},{name:"Marquinhos",position:"DC droit",photo:"portrait-marquinhos.png",aliases:["marquinhos","Marquinhos"]},{name:"Pacho",position:"DC gauche",photo:"portrait-willian-pacho.png",aliases:[
"willian pacho","Pacho"]},{name:"Nuno Mendes",position:"DG",photo:"portrait-nuno-mendes.png",aliases:["nuno mendes","Mendes"]},{name:"João Neves",position:"MC droit",photo:"portrait-joao-neves.png",aliases:["joao neves",
"Neves"]},{name:"Vitinha",position:"MC axial",photo:"portrait-vitinha.png",aliases:["vitinha","Vitinha"]},{name:"Fabián Ruiz",position:"MC gauche",photo:"portrait-fabian-ruiz.png",aliases:["fabian ruiz","Ruiz"]},{name:"\
Doué",position:"AD",photo:"portrait-desire-doue.png",aliases:["desire doue","Doué"]},{name:"Dembélé",position:"BU",photo:"portrait-ousmane-dembele.png",aliases:["ousmane dembele","Dembélé"]},{name:"Kvaratskhelia",position:"\
AG",photo:"portrait-khvicha-kvaratskhelia.png",aliases:["khvicha kvaratskhelia","Kvaratskhelia"]}],note:"Sélection de jeu en 4-3-3, pas une feuille de match actuelle."},"18":{ready:!0,players:[{name:"Earps",position:"GB",
photo:"portrait-mary-earps.png",aliases:["mary earps","Earps"]},{name:"De Almeida",position:"DD",photo:"portrait-elisa-de-almeida.png",aliases:["elisa de almeida","Almeida"]},{name:"Gaetino",position:"DC droit",photo:"po\
rtrait-eva-gaetino.png",aliases:["eva gaetino","Gaetino"]},{name:"Dudek",position:"DC gauche",photo:"portrait-paulina-dudek.png",aliases:["paulina dudek","Dudek"]},{name:"Karchaoui",position:"DG",photo:"portrait-sakina-k\
archaoui.png",aliases:["sakina karchaoui","Karchaoui"]},{name:"Albert",position:"MC droit",photo:"portrait-korbin-albert.png",aliases:["korbin albert","Albert"]},{name:"Groenen",position:"MC axial",photo:"portrait-jackie\
-groenen.png",aliases:["jackie groenen","Groenen"]},{name:"Geyoro",position:"MC gauche",photo:"portrait-grace-geyoro.png",aliases:["grace geyoro","Geyoro"]},{name:"Traoré",position:"AD",photo:"portrait-manssita-traore.p\
ng",aliases:["manssita traore","Traoré"]},{name:"Katoto",position:"BU",photo:"portrait-marie-antoinette-katoto.png",aliases:["marie antoinette katoto","Katoto"]},{name:"Leuchter",position:"AG",photo:"portrait-romee-leuc\
hter.png",aliases:["romee leuchter","Leuchter"]}],note:"Sélection de joueuses de plusieurs saisons en 4-3-3, pas une feuille de match actuelle."},"13":{ready:!0,events:[{label:"Création du club",year:1970},{label:"Prem\
ière Coupe de France",year:1982},{label:"Premier titre de champion de France",year:1986},{label:"Coupe des vainqueurs de coupe",year:1996},{label:"Première Ligue des champions",year:2025}]},"21":{ready:!0,labels:["Foot\
ball masculin","Football féminin","Handball","Parc des Princes","Tour Eiffel","Fleur de lys","Rouge et Bleu","Paris"]},"19":{ready:!0,questions:[{prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2011\
-2012","2012-2013","2014-2015","2018-2019"],answer:0,image:"kit-01.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Maillot domicile du Paris Saint-Germain, saison 2011-2012."},{
prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2012-2013","2013-2014","2015-2016","2019-2020"],answer:0,image:"kit-02.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"\
Maillot domicile du Paris Saint-Germain, saison 2012-2013."},{prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2013-2014","2014-2015","2016-2017","2020-2021"],answer:0,image:"kit-03.avif",source:"http\
s://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Maillot domicile du Paris Saint-Germain, saison 2013-2014."},{prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2014-2015","2015\
-2016","2017-2018","2021-2022"],answer:0,image:"kit-04.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Maillot domicile du Paris Saint-Germain, saison 2014-2015."},{prompt:"De q\
uelle saison est ce maillot domicile du PSG ?",options:["2015-2016","2016-2017","2018-2019","2022-2023"],answer:0,image:"kit-05.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"M\
aillot domicile du Paris Saint-Germain, saison 2015-2016."},{prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2016-2017","2017-2018","2019-2020","2023-2024"],answer:0,image:"kit-06.avif",source:"https\
://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Maillot domicile du Paris Saint-Germain, saison 2016-2017."},{prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2017-2018","2018-\
2019","2020-2021","2024-2025"],answer:0,image:"kit-07.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Maillot domicile du Paris Saint-Germain, saison 2017-2018."},{prompt:"De qu\
elle saison est ce maillot domicile du PSG ?",options:["2018-2019","2019-2020","2021-2022","2025-2026"],answer:0,image:"kit-08.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Ma\
illot domicile du Paris Saint-Germain, saison 2018-2019."},{prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2019-2020","2020-2021","2022-2023","2011-2012"],answer:0,image:"kit-09.avif",source:"https:\
//www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Maillot domicile du Paris Saint-Germain, saison 2019-2020."},{prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2020-2021","2021-2\
022","2023-2024","2012-2013"],answer:0,image:"kit-10.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Maillot domicile du Paris Saint-Germain, saison 2020-2021."},{prompt:"De que\
lle saison est ce maillot domicile du PSG ?",options:["2021-2022","2022-2023","2024-2025","2013-2014"],answer:0,image:"kit-11.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Mai\
llot domicile du Paris Saint-Germain, saison 2021-2022."},{prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2022-2023","2023-2024","2025-2026","2014-2015"],answer:0,image:"kit-12.avif",source:"https:/\
/www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Maillot domicile du Paris Saint-Germain, saison 2022-2023."},{prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2023-2024","2024-20\
25","2011-2012","2015-2016"],answer:0,image:"kit-13.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Maillot domicile du Paris Saint-Germain, saison 2023-2024."},{prompt:"De quel\
le saison est ce maillot domicile du PSG ?",options:["2024-2025","2025-2026","2012-2013","2016-2017"],answer:0,image:"kit-14.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Mail\
lot domicile du Paris Saint-Germain, saison 2024-2025."},{prompt:"De quelle saison est ce maillot domicile du PSG ?",options:["2025-2026","2011-2012","2013-2014","2017-2018"],answer:0,image:"kit-15.avif",source:"https://\
www.footylogos.com/fr/kits/paris-saint-germain-history",explanation:"Maillot domicile du Paris Saint-Germain, saison 2025-2026."}]},"9":{ready:!0,labels:["2011-2012","2012-2013","2013-2014","2014-2015","2015-2016","2016-\
2017","2017-2018","2018-2019"],images:["kit-01.avif","kit-02.avif","kit-03.avif","kit-04.avif","kit-05.avif","kit-06.avif","kit-07.avif","kit-08.avif"]},"5":{ready:!0,questions:[{prompt:"Quel lieu lié au PSG se cache sur\
 cette photo ?",options:["Parc des Princes","Campus PSG","Stade Pierre de Coubertin","Stade de France"],answer:0,image:"parc.jpg",source:"https://www.psg.fr/le-club/installations/parc-des-princes",explanation:"Parc des P\
rinces : le stade du PSG."},{prompt:"Quel lieu lié au PSG se cache sur cette photo ?",options:["Parc des Princes","Campus PSG","Stade Pierre de Coubertin","Stade de France"],answer:1,image:"campus.jpg",source:"https://w\
ww.psg.fr/le-club/installations/campus",explanation:"Campus PSG : le centre d’entraînement du club."},{prompt:"Quel lieu lié au PSG se cache sur cette photo ?",options:["Parc des Princes","Campus PSG","Stade Pierre d\
e Coubertin","Stade de France"],answer:2,image:"coubertin.jpg",source:"https://www.psg.fr/le-club/installations/stade-pierre-de-coubertin",explanation:"Stade Pierre de Coubertin : la salle du PSG Handball."}]},"14":{ready:!0,
questions:[{prompt:"Quel lieu lié au PSG se cache sur cette photo ?",options:["Parc des Princes","Campus PSG","Stade Pierre de Coubertin","Stade de France"],answer:0,image:"parc.jpg",source:"https://www.psg.fr/le-club/i\
nstallations/parc-des-princes",explanation:"Parc des Princes : le stade du PSG."},{prompt:"Quel lieu lié au PSG se cache sur cette photo ?",options:["Parc des Princes","Campus PSG","Stade Pierre de Coubertin","Stade de \
France"],answer:1,image:"campus.jpg",source:"https://www.psg.fr/le-club/installations/campus",explanation:"Campus PSG : le centre d’entraînement du club."},{prompt:"Quel lieu lié au PSG se cache sur cette photo ?",options:[
"Parc des Princes","Campus PSG","Stade Pierre de Coubertin","Stade de France"],answer:2,image:"coubertin.jpg",source:"https://www.psg.fr/le-club/installations/stade-pierre-de-coubertin",explanation:"Stade Pierre de Coube\
rtin : la salle du PSG Handball."}]},"22":{ready:!0,questions:[{prompt:"Quel lieu lié au PSG se cache sur cette photo ?",options:["Parc des Princes","Campus PSG","Stade Pierre de Coubertin","Stade de France"],answer:0,image:"\
parc.jpg",source:"https://www.psg.fr/le-club/installations/parc-des-princes",explanation:"Parc des Princes : le stade du PSG."},{prompt:"Quel lieu lié au PSG se cache sur cette photo ?",options:["Parc des Princes","Camp\
us PSG","Stade Pierre de Coubertin","Stade de France"],answer:1,image:"campus.jpg",source:"https://www.psg.fr/le-club/installations/campus",explanation:"Campus PSG : le centre d’entraînement du club."},{prompt:"Quel l\
ieu lié au PSG se cache sur cette photo ?",options:["Parc des Princes","Campus PSG","Stade Pierre de Coubertin","Stade de France"],answer:2,image:"coubertin.jpg",source:"https://www.psg.fr/le-club/installations/stade-pi\
erre-de-coubertin",explanation:"Stade Pierre de Coubertin : la salle du PSG Handball."}]}}});var Ue=q((qs,Be)=>{"use strict";var Ut=Fe(),de=r=>typeof r=="string"&&/^[a-zA-Z0-9_.-]+$/.test(r);function Ht(r,e,s){if(!e||typeof e.ready!="boolean")throw Error("Champ ready requis.");let t=a=>Array.isArray(a)&&a.every(
n=>typeof n=="string"&&n.trim()&&n.length<=60)&&new Set(a).size===a.length;if(s==="memory"&&(!t(e.labels)||e.labels.length!==8||e.images&&(!Array.isArray(e.images)||e.images.length!==8||!e.images.every(de))))throw Error(
"Memory : huit libellés et, facultativement, huit images.");if(s==="lineup"&&(!Array.isArray(e.players)||e.players.length!==11||!t(e.players.map(a=>a.name))||!e.players.every(a=>typeof a.position=="string"&&de(a.photo)&&
(!a.aliases||t(a.aliases)))))throw Error("Composition : onze joueurs avec name, position, photo et aliases facultatifs.");if(s==="chrono"&&(!Array.isArray(e.events)||e.events.length!==5||!e.events.every(a=>typeof a.label==
"string"&&a.label.length<=90&&Number.isInteger(a.year))||new Set(e.events.map(a=>a.year)).size!==5))throw Error("Chronologie : cinq événements avec cinq années distinctes.");if(["mystery","shirts"].includes(s)&&(!Array.
isArray(e.questions)||!e.questions.length||e.questions.length>20||!e.questions.every(a=>typeof a.prompt=="string"&&a.prompt.length<150&&t(a.options)&&a.options.length===4&&Number.isInteger(a.answer)&&a.answer>=0&&a.answer<
4&&de(a.image))))throw Error("Questions : photo réelle, quatre options et answer entre 0 et 3.");return e}Be.exports={defaults:Ut,validate:Ht}});var He=q((_s,Vt)=>{Vt.exports={"kit-01.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2011-12-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germa\
in-history",season:"2011-2012"},"kit-02.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2012-13-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-germ\
ain-history",season:"2012-2013"},"kit-03.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2013-14-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-ger\
main-history",season:"2013-2014"},"kit-04.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2014-15-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-ge\
rmain-history",season:"2014-2015"},"kit-05.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2015-16-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-g\
ermain-history",season:"2015-2016"},"kit-06.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2016-17-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-saint-\
germain-history",season:"2016-2017"},"kit-07.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2017-18-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-saint\
-germain-history",season:"2017-2018"},"kit-08.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2018-19-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-sain\
t-germain-history",season:"2018-2019"},"kit-09.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2019-20-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-sai\
nt-germain-history",season:"2019-2020"},"kit-10.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2020-21-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-sa\
int-germain-history",season:"2020-2021"},"kit-11.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2021-22-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-s\
aint-germain-history",season:"2021-2022"},"kit-12.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2022-23-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris-\
saint-germain-history",season:"2022-2023"},"kit-13.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2023-24-home-kit.avif",source:"https://www.footylogos.com/fr/kits/paris\
-saint-germain-history",season:"2023-2024"},"kit-14.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2024-25-home-kit.avif",source:"https://www.footylogos.com/fr/kits/pari\
s-saint-germain-history",season:"2024-2025"},"kit-15.avif":{url:"https://www.footylogos.com/images/kit-history/paris-saint-germain/paris-saint-germain-2025-26-home-kit.avif",source:"https://www.footylogos.com/fr/kits/par\
is-saint-germain-history",season:"2025-2026"},"parc.jpg":{url:"https://media.psg.fr/image/upload/w_1200,f_jpg,q_85/_S3O8536_ifpnxo",source:"https://www.psg.fr/le-club/installations/parc-des-princes"},"campus.jpg":{url:"h\
ttps://media.psg.fr/image/upload/w_1200,f_jpg,q_85/2024_Poissy_Campus_PSG_C_S-Grazia_3_djxgou",source:"https://www.psg.fr/le-club/installations/campus"},"coubertin.jpg":{url:"https://media.psg.fr/image/upload/w_1200,f_jp\
g,q_85/_JHA7378_j13bkk",source:"https://www.psg.fr/le-club/installations/stade-pierre-de-coubertin"},"portrait-gianluigi-donnarumma.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/2526-Motion-Donnarumma_ztb\
ebg",source:"https://www.psg.fr/joueurs/gianluigi-donnarumma"},"portrait-achraf-hakimi.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/Hakimi-Motion-2627_inxpl3",source:"https://www.psg.fr/joueurs/achraf-ha\
kimi"},"portrait-marquinhos.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/Marquinhos-Motion-2627_xihdkm",source:"https://www.psg.fr/joueurs/marquinhos"},"portrait-willian-pacho.png":{url:"https://media.ps\
g.fr/image/upload/w_500,f_png,q_85/Pacho-Motion-2627_slvelw",source:"https://www.psg.fr/joueurs/willian-pacho"},"portrait-nuno-mendes.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/Mendes-Motion-2627_rvpya\
z",source:"https://www.psg.fr/joueurs/nuno-mendes"},"portrait-joao-neves.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/Neves-Motion-2627_jld03b",source:"https://www.psg.fr/joueurs/joao-neves"},"portrait-v\
itinha.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/Vitinha-Motion-2627_hvfafn",source:"https://www.psg.fr/joueurs/vitinha"},"portrait-fabian-ruiz.png":{url:"https://media.psg.fr/image/upload/w_500,f_png\
,q_85/Ruiz-Motion-2627_vwakyp",source:"https://www.psg.fr/joueurs/fabian-ruiz"},"portrait-desire-doue.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/Doue-Motion-2627_flkdu1",source:"https://www.psg.fr/joue\
urs/desire-doue"},"portrait-ousmane-dembele.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/Dembele-Motion-2627_muowar",source:"https://www.psg.fr/joueurs/ousmane-dembele"},"portrait-khvicha-kvaratskhelia.p\
ng":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/Kvara-Motion-2627_siwjyr",source:"https://www.psg.fr/joueurs/khvicha-kvaratskhelia"},"portrait-mary-earps.png":{url:"https://media.psg.fr/image/upload/w_500,f_\
png,q_85/Motion-25-26-earps_f3gkdb",source:"https://www.psg.fr/joueurs/mary-earps"},"portrait-elisa-de-almeida.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/DeAlmeida-Motion-2627_blvvxb",source:"https://w\
ww.psg.fr/joueurs/elisa-de-almeida"},"portrait-eva-gaetino.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/Motion-25-26-Gaetino_wauf4b",source:"https://www.psg.fr/joueurs/eva-gaetino"},"portrait-paulina-dud\
ek.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/hero-dudek_onlnwc",source:"https://www.psg.fr/joueurs/paulina-dudek"},"portrait-sakina-karchaoui.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q\
_85/hero-karchaoui_uaxj9c",source:"https://www.psg.fr/joueurs/sakina-karchaoui"},"portrait-korbin-albert.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/source-cards-24-25_albert_q40nre",source:"https://www\
.psg.fr/joueurs/korbin-albert"},"portrait-jackie-groenen.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/hero-groenen_zkzlfw",source:"https://www.psg.fr/joueurs/jackie-groenen"},"portrait-grace-geyoro.png":{
url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/Motion-25-26-Geyoro_zxlfiv",source:"https://www.psg.fr/joueurs/grace-geyoro"},"portrait-manssita-traore.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_8\
5/source-cards-24-25_manssita_b3mmh4",source:"https://www.psg.fr/joueurs/manssita-traore"},"portrait-marie-antoinette-katoto.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/source-cards-24-25_ma-katoto_heku\
yk",source:"https://www.psg.fr/joueurs/marie-antoinette-katoto"},"portrait-romee-leuchter.png":{url:"https://media.psg.fr/image/upload/w_500,f_png,q_85/hero-leuchter_vaevzf",source:"https://www.psg.fr/joueurs/romee-leuch\
ter"},"BarlowCondensed-Regular.ttf":{url:"https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/BarlowCondensed-Regular.ttf",source:"https://github.com/google/fonts/tree/main/ofl/barlowcondensed",font:!0},
"BarlowCondensed-Bold.ttf":{url:"https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/BarlowCondensed-Bold.ttf",source:"https://github.com/google/fonts/tree/main/ofl/barlowcondensed",font:!0}}});var he=q((Ls,Ye)=>{"use strict";var F=require("node:fs"),_=require("node:path"),Yt=require("sharp"),Ve=He(),me=new Map,Q=r=>_.join(process.env.DATA_DIR||"./data","media",r);async function Xt(){F.mkdirSync(_.dirname(Q("x")),
{recursive:!0});for(let t of["fond-bleu.png","calendrier.jpg","logo.png"]){let a=_.join(__dirname,"assets",t),n=_.join(__dirname,t);if(!F.existsSync(a)&&!F.existsSync(n))throw Error("Ajouter "+t+" à côté de index.js sur \
GitHub.")}let r=Object.entries(Ve);await Promise.all(Array.from({length:4},async()=>{for(;r.length;){let[t,a]=r.shift();if(F.existsSync(Q(t))||F.existsSync(_.join(__dirname,"assets",t)))continue;let n=await fetch(a.url,{
headers:{"User-Agent":"Mozilla/5.0"},signal:AbortSignal.timeout(3e4)});if(!n.ok)throw Error("Photo indisponible : "+t+" ("+n.status+")");let i=Buffer.from(await n.arrayBuffer());if(i.length>12e6)throw Error("Photo trop g\
rande : "+t);let l=a.font?i:await Yt(i,{limitInputPixels:4e7}).resize(1200,1200,{fit:"inside",withoutEnlargement:!0}).png().toBuffer();F.writeFileSync(Q(t)+".tmp",l),F.renameSync(Q(t)+".tmp",Q(t))}}));let e=_.resolve(_.dirname(
fe("BarlowCondensed-Regular.ttf"))),s=_.resolve(process.env.DATA_DIR||"./data","fonts.conf");F.mkdirSync(_.dirname(s),{recursive:!0}),F.writeFileSync(s,'<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontc\
onfig><dir>'+e.replaceAll("&","&amp;").replaceAll("<","&lt;")+"</dir><alias><family>Arial</family><prefer><family>Barlow Condensed</family></prefer></alias></fontconfig>"),process.env.FONTCONFIG_FILE=s}function fe(r,e=process.
env.DATA_DIR||"./data"){let t=[_.join(e,"images",r),_.join(e,"media",r),_.join(__dirname,"assets",r),_.join(__dirname,r)].find(a=>F.existsSync(a));if(!t)throw Error("Image absente : "+r);return t}async function Wt(r,e){let s=fe(
r,e);if(!me.has(s)){let{loadImage:t}=require("@napi-rs/canvas");me.set(s,t(s))}return me.get(s)}Ye.exports={prepare:Xt,file:fe,image:Wt,manifest:Ve}});var We=q((Gs,Xe)=>{"use strict";var zt=require("sharp"),Kt=r=>String(r).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"})[e]),ie=r=>[350,600,850][r];function Jt(r,e,s="#FFFFFF"){return`\

    <g transform="translate(${r},${e})">
      <ellipse
        cy="90"
        rx="85"
        ry="13"
        fill="#000"
        opacity=".3"
      />

      <path
        d="M-52 74V-16a52 52 0 0 1 104 0v90L26 54 0 77 -26 54Z"
        fill="${s}"
      />

      <path d="M-48 -50 Q-20 -130 50 -55 L78 -46 L42 -40Z" fill="#B91020"/>
      <path d="M-48 -50 Q0 -68 50 -55" stroke="#fff" stroke-width="14" stroke-linecap="round" fill="none"/>
      <circle cx="78" cy="-46" r="12" fill="#fff"/>

      <ellipse
        cx="-18"
        cy="-12"
        rx="8"
        ry="13"
        fill="#081A32"
      />

      <ellipse
        cx="18"
        cy="-12"
        rx="8"
        ry="13"
        fill="#081A32"
      />

      <ellipse
        cy="20"
        rx="10"
        ry="13"
        fill="#081A32"
      />

      <path
        d="M-45 22 -83 5M45 22 83 5"
        stroke="${s}"
        stroke-width="17"
        stroke-linecap="round"
      />
    </g>
  `}function Qt(r,e,s=22){return`
    <g transform="translate(${r},${e})">
      <circle
        r="${s}"
        fill="#fff"
        stroke="#A7B3C2"
        stroke-width="2"
      />

      <path
        d="
          M0 -${s*.5}
          ${s*.5} -${s*.12}
          ${s*.32} ${s*.5}
          -${s*.32} ${s*.5}
          -${s*.5} -${s*.12}Z
        "
        fill="#081A32"
      />

      <path
        d="
          M0 -${s*.5} 0 -${s}
          M${s*.5} -${s*.12}
          ${s*.95} -${s*.3}
          M${s*.32} ${s*.5}
          ${s*.55} ${s*.84}
          M-${s*.32} ${s*.5}
          -${s*.55} ${s*.84}
          M-${s*.5} -${s*.12}
          -${s*.95} -${s*.3}
        "
        stroke="#081A32"
        stroke-width="3"
      />
    </g>
  `}async function Zt(r,e="fr",s="normal"){s==="run"&&(r={...r,phase:"waiting",shots:r.shots.slice(0,-1)});let t=e==="en",a=r.shots.at(-1),n=["result","finished"].includes(r.phase)&&a&&s!=="run",i=r.type==="duel",l=r.phase===
"finished",u=s==="run"?t?"HERE COMES THE SHOT…":"LE TIREUR S’ÉLANCE…":l?t?"FULL TIME":"FIN DE LA SÉRIE":n?a.goal?t?"GOOOAL!":"BUUUUT !":t?"SAVED!":"ARRÊT DU GARDIEN !":t?"PICK YOUR CORNER":"CHOISIS TON CÔTÉ";[
"invited","cancelled","expired"].includes(r.phase)&&(u=r.phase==="invited"?t?"A DUEL AWAITS":"LE DUEL T’ATTEND":t?"DUEL CLOSED":"DUEL TERMINÉ"),s==="cover"&&(u=t?"THE KEEPER IS WAITING":"LE GARDIEN T’ATTEND");let m=(E,C,Y)=>Array.
from({length:5},(Pe,B)=>`
        <circle
          cx="${C+B*37}"
          cy="${Y}"
          r="12"
          fill="${E[B]?E[B].goal?"#5BE9BB":"#FF657D":"#233B56"}"
        />

        ${E[B]?`
              <text
                x="${C+B*37}"
                y="${Y+5}"
                text-anchor="middle"
                font-size="17"
                fill="#06172B"
              >${E[B].goal?"✓":"×"}</text>
            `:""}
      `).join(""),h=r.users.map((E,C)=>r.shots.filter(Y=>(!i||Y.shooter===C)&&Y.goal).length),v=(E,C=22)=>Kt(E.length>C?E.slice(0,C-1)+"…":E),w=s==="cover"?t?"NOËL • THE SUPPORTERS’ CHALLENGE":"NOËL • LE DÉFI DES \
SUPPORTERS":i?`${t?"PENALTY":"TIR"} ${Math.min(r.shots.length+(n?0:1),10)}/10  •  ${t?"FRIENDLY DUEL":"DUEL AMICAL"}`:`${t?"PENALTY":"TIR"} ${Math.min(r.shots.length+(n?0:1),5)}/5  •  ${r.type==="training"?t?"TRAININ\
G":"ENTRAÎNEMENT":t?"DAILY CHALLENGE":"DÉFI DU JOUR"}`,S=n?a.goal?"#5BE9BB":"#FF657D":"#FFAF67",R="";for(let E=225;E<=975;E+=30)R+=`
      <path
        d="M${E} 250V465"
        stroke="#739AB7"
        stroke-opacity=".25"
      />
    `;for(let E=250;E<=465;E+=24)R+=`
      <path
        d="M225 ${E}H975"
        stroke="#739AB7"
        stroke-opacity=".25"
      />
    `;let N=(t?["LEFT","CENTRE","RIGHT"]:["GAUCHE","CENTRE","DROITE"]).map((E,C)=>`
        <g>
          <rect
            x="${ie(C)-103}"
            y="276"
            width="206"
            height="160"
            rx="14"
            fill="${n&&a.shot===C?S:"#1A5475"}"
            fill-opacity="${n&&a.shot===C?".23":".18"}"
            stroke="${n&&a.shot===C?S:"#537C99"}"
            stroke-opacity=".7"
            stroke-dasharray="8 8"
          />

          <text
            x="${ie(C)}"
            y="458"
            text-anchor="middle"
            fill="#B4CCDC"
            font-size="14"
            letter-spacing="3"
          >${E}</text>
        </g>
      `).join(""),I;s==="cover"?I=`
      <text
        x="80"
        y="605"
        fill="#FFF"
        font-size="26"
        font-weight="800"
      >${t?"5 SHOTS. YOUR TURN.":"5 TIRS. À TOI DE JOUER."}</text>

      <text
        x="80"
        y="635"
        fill="#9CB9CF"
        font-size="17"
      >${t?"One goal. 200 points.":"Un but. 200 points."}</text>

      <text
        x="1120"
        y="618"
        text-anchor="end"
        fill="#FFAF67"
        font-size="21"
        font-weight="800"
      >${t?"COME BACK EVERY DAY":"REVIENS CHAQUE JOUR"}</text>
    `:i?I=`
      <text
        x="70"
        y="595"
        fill="#C8D8E7"
        font-size="18"
      >${v(r.names[0],25)}</text>

      ${m(r.shots.filter(E=>E.shooter===0),82,626)}

      <text
        x="1130"
        y="595"
        text-anchor="end"
        fill="#C8D8E7"
        font-size="18"
      >${v(r.names[1],25)}</text>

      ${m(r.shots.filter(E=>E.shooter===1),970,626)}

      <text
        x="600"
        y="622"
        text-anchor="middle"
        fill="#FFFFFF"
        font-size="45"
        font-weight="800"
      >${h[0]} : ${h[1]}</text>
    `:I=`
      <text
        x="70"
        y="600"
        fill="#C8D8E7"
        font-size="19"
      >${v(r.names[0],30)}</text>

      ${m(r.shots,84,630)}

      <text
        x="1130"
        y="602"
        text-anchor="end"
        fill="#FFF"
        font-weight="800"
        font-size="40"
      >${h[0]} / 5</text>

      <text
        x="1130"
        y="630"
        text-anchor="end"
        fill="#A0B9D0"
        font-size="16"
      >${t?"GOALS":"BUTS"}</text>
    `;let M=`
    <svg
      width="1200"
      height="675"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bg" x2="0" y2="1">
          <stop stop-color="#102F50"/>
          <stop offset="1" stop-color="#030D1D"/>
        </linearGradient>

        <linearGradient id="pitch" x2="0" y2="1">
          <stop stop-color="#0A3342"/>
          <stop offset="1" stop-color="#061724"/>
        </linearGradient>

        <radialGradient id="glow">
          <stop
            stop-color="#43A9DF"
            stop-opacity=".32"
          />
          <stop
            offset="1"
            stop-color="#43A9DF"
            stop-opacity="0"
          />
        </radialGradient>
      </defs>

      <rect
        width="1200"
        height="675"
        fill="url(#bg)"
      />

      <ellipse
        cx="600"
        cy="240"
        rx="650"
        ry="300"
        fill="url(#glow)"
      />

      <path
        d="M28 0H35V675H28Z"
        fill="#E92647"
      />

      <path
        d="M1165 0H1172V675H1165Z"
        fill="#E92647"
      />

      <g font-family="Arial,Helvetica,sans-serif">
        <text
          x="70"
          y="54"
          fill="#FFF"
          font-size="21"
          font-weight="800"
          letter-spacing="6"
        >PARIS</text>

        <text
          x="1130"
          y="54"
          text-anchor="end"
          fill="#FFAF67"
          font-size="16"
          font-weight="700"
          letter-spacing="3"
        >${t?"CHRISTMAS PENALTIES":"LES PÉNALTYS DE NOËL"}</text>

        <path
          d="M70 77H1130"
          stroke="#34506D"
        />

        <text
          x="600"
          y="117"
          fill="#A0B9D0"
          text-anchor="middle"
          font-size="16"
          letter-spacing="3"
        >${w}</text>

        <text
          x="600"
          y="177"
          fill="${S}"
          text-anchor="middle"
          font-size="39"
          font-weight="900"
        >${u}</text>

        <g opacity=".4">
          <path
            d="M105 225 335 420 0 420Z"
            fill="#A6D7FF"
            fill-opacity=".13"
          />

          <path
            d="M1095 225 865 420 1200 420Z"
            fill="#A6D7FF"
            fill-opacity=".13"
          />
        </g>

        <path
          d="M0 452H1200V555H0Z"
          fill="url(#pitch)"
        />

        <ellipse
          cx="600"
          cy="570"
          rx="360"
          ry="81"
          fill="none"
          stroke="#6FA3AE"
          stroke-opacity=".22"
          stroke-width="2"
        />

        ${R}
        ${N}

        <path
          d="M220 468V244H980V468"
          stroke="#D7EAF6"
          stroke-width="10"
          fill="none"
          stroke-linejoin="round"
        />

        <path
          d="M225 250H975V465H225Z"
          fill="none"
          stroke="#365A72"
          stroke-width="2"
        />

        ${Jt(n?ie(a.dive):600,n?350:352)}

        ${Qt(n?ie(a.shot):600,n?a.goal?290:390:s==="run"?460:513,n?17:22)}

        <rect
          x="50"
          y="565"
          width="1100"
          height="92"
          rx="18"
          fill="#081B30"
          stroke="#233F59"
        />

        ${I}
      </g>
    </svg>
  `;return zt(Buffer.from(M)).png().toBuffer()}Xe.exports={arena:Zt}});var et=q((Os,Ze)=>{"use strict";var{createCanvas:Je,loadImage:es,GlobalFonts:ts}=require("@napi-rs/canvas"),U=he(),{arena:ss}=We(),ge=ae(),ze=!1;function Qe(){if(!ze){for(let r of["Regular","Bold"])ts.registerFromPath(U.
file("BarlowCondensed-"+r+".ttf"),"Barlow Condensed");ze=!0}}var y={navy:"#061b40",red:"#a50710",gold:"#ddcf98",white:"#fff9e9",blue:"#123769"};function b(r,e,s,t,a=24,n=y.white,i=1100){for(r.font=`${a>=28?"bold ":""}${a}\
px "Barlow Condensed",Arial,sans-serif`,r.fillStyle=n,e=String(e);r.measureText(e).width>i&&e.length>2;)e=e.slice(0,-2)+"…";r.fillText(e,s,t)}function $(r,e,s,t,a,n="#061b40df",i=14){r.fillStyle=n,r.beginPath(),r.roundRect(
e,s,t,a,i),r.fill(),r.strokeStyle="#ddcf9840",r.lineWidth=1,r.stroke()}function ye(r,e,s,t,a,n){let i=Math.min(a/e.width,n/e.height);r.drawImage(e,s+(a-e.width*i)/2,t+(n-e.height*i)/2,e.width*i,e.height*i)}async function we(r,e){
Qe();let s=Je(1200,900),t=s.getContext("2d");return t.drawImage(await U.image("fond-bleu.png"),0,0,1200,900),t.fillStyle="#03132b44",t.fillRect(0,0,1200,900),t.drawImage(await U.image("logo.png"),36,14,104,104),b(t,"CALE\
NDRIER DE L’AVENT 2026",160,48,27,y.gold),b(t,r.title,160,91,34,y.white,900),$(t,1080,23,88,70,y.red),b(t,String(r.day).padStart(2,"0"),1100,72,40,y.gold,70),b(t,e,40,145,22,y.gold,1110),t.fillStyle="#ddcf9866",t.fillRect(
40,165,1120,1),b(t,"ICI C’EST PARIS",42,870,19,y.gold),b(t,"Prolonge l’expérience sur MyParis ↗",750,870,19,y.gold,420),{cv:s,c:t}}function Ke(r){return r.phase==="done"?`${r.score} / 1 000 points`:"Partie expirée"}
async function rs(r,e,s,t="normal",a="Supporter"){if(e.type==="penalty"){Qe();let l={type:"solo",users:["self"],names:[a],shots:e.shots,phase:e.phase==="done"?"finished":e.stage==="result"?"result":"waiting"},u=await es(
await ss(l,"fr",t)),m=Je(1200,675),h=m.getContext("2d");return h.drawImage(u,0,0),h.drawImage(await U.image("logo.png"),65,13,50,50),h.fillStyle="#102b49",h.fillRect(120,20,220,44),b(h,"PARIS • NOËL 2026",128,49,18,y.
gold,210),m.toBuffer("image/png")}let{cv:n,c:i}=await we(r,e.phase==="playing"?ge.instructions(e.type):Ke(e));if(e.type==="lineup"){$(i,120,200,960,600,"#0a493eea"),i.strokeStyle="#ffffff55",i.lineWidth=2,i.strokeRect(145,
220,910,560),i.beginPath(),i.moveTo(145,200+600/2),i.lineTo(1055,200+600/2),i.stroke(),i.beginPath(),i.arc(600,200+600/2,60,0,Math.PI*2),i.stroke(),i.strokeRect(390,690,420,90),b(i,"4-3-3",1060,195,24,y.gold,100);let v=[
[.5,.84],[.86,.62],[.62,.62],[.38,.62],[.14,.62],[.74,.38],[.5,.38],[.26,.38],[.78,.13],[.5,.13],[.22,.13]];for(let w=0;w<11;w++){let[S,R]=v[w],P=120+960*S,N=200+600*R,I=e.players[w],M=e.stage==="show"||e.phase!=="playin\
g";if($(i,P-105,N-35,210,105,"#041c37ee",10),M){let E=await U.image(I.photo,s);ye(i,E,P-37,N-39,74,80),b(i,I.name,P-94,N+62,18,y.white,190)}else b(i,String(w+1),P-10,N+7,26,y.gold,35),b(i,e.answers[w]||"À compléter",P-
94,N+62,17,y.white,190);b(i,`${w+1}. ${I.position}`,P-90,N+85,13,y.gold,180)}return b(i,e.stage==="show"&&e.phase==="playing"?"Mémorise les noms et leurs postes • 10 secondes":e.phase==="done"?`${e.corrections?.filter(
w=>w.ok).length||0}/11 joueurs bien placés`:"Saisis les noms avec les boutons, puis confirme.",180,830,24,y.gold,950),n.toBuffer("image/png")}if(e.type==="maze"){let l=e.size,u=Math.floor(590/l),m=80,h=204;$(i,m-8,h-8,u*
l+16,u*l+16,"#030e22");for(let v=0;v<l*l;v++){let w=m+v%l*u,S=h+Math.floor(v/l)*u;i.fillStyle=e.walls.includes(v)?"#09214a":"#d9d2b2",i.fillRect(w+1,S+1,u-2,u-2),e.trail.includes(v)&&!e.walls.includes(v)&&(i.fillStyle="#\
bfa34f",i.beginPath(),i.arc(w+u/2,S+u/2,3,0,Math.PI*2),i.fill()),v===e.goal&&($(i,w+u*.18,S+u*.22,u*.64,u*.54,y.red,2),i.fillStyle=y.gold,i.fillRect(w+u*.46,S+u*.22,u*.12,u*.54)),v===e.position&&(i.fillStyle=y.red,i.beginPath(),
i.arc(w+u/2,S+u/2,u*.27,0,Math.PI*2),i.fill(),i.fillStyle="white",i.beginPath(),i.arc(w+u/2,S+u/2,u*.1,0,Math.PI*2),i.fill())}return $(i,760,240,370,340),b(i,"LA TOURNÉE",790,290,28,y.gold,310),b(i,`${e.budget-e.moves} \
déplacements restants`,790,345,23,y.white,310),b(i,`${e.moves} déplacements utilisés`,790,390,21,y.white,310),b(i,"Le cadeau est en bas à droite.",790,450,20,y.white,310),e.phase!=="playing"&&(b(i,`${e.score}/1 000`,
790,510,37,y.gold,310),b(i,`Chemin optimal : ${e.optimal} pas`,790,550,19,y.white,310)),n.toBuffer("image/png")}if(e.type==="chrono"){b(i,"LES SOUVENIRS",65,207,24,y.gold),b(i,"TON ORDRE • ANCIEN → RÉCENT",650,207,22,
y.gold,500);for(let l=0;l<5;l++){$(i,50,235+l*105,520,88),b(i,`${l+1}. ${e.events[l].label}`,68,273+l*105,21,y.white,485);let u=e.chosen[l]!==void 0?e.events[e.chosen[l]]:null;$(i,620,235+l*105,530,88,e.phase==="done"?e.
corrections?.[l]?.ok?"#145a48":"#692530":"#061b40df"),b(i,`${l+1}. ${u?u.label:"…"}`,640,272+l*105,20,y.white,490),u&&e.phase==="done"&&b(i,`Attendu : ${e.corrections[l].expected}`,640,303+l*105,16,y.gold,490)}return n.
toBuffer("image/png")}if(e.type==="memory"){for(let l=0;l<16;l++){let u=e.found.includes(l)||e.flipped.includes(l)||e.phase==="done",m=50+l%4*280,h=205+Math.floor(l/4)*145;$(i,m,h,260,130,u?"#ddcf98":"#082452"),u&&e.content.
images?(ye(i,await U.image(e.content.images[e.cards[l]],s),m+60,h+4,140,96),b(i,e.labels[e.cards[l]],m+14,h+119,19,y.navy,230)):u?b(i,e.labels[e.cards[l]],m+18,h+77,25,y.navy,225):($(i,m+95,h+32,70,60,y.red,6),i.fillStyle=
y.gold,i.fillRect(m+125,h+32,10,60),b(i,String(l+1),m+13,h+25,17,y.gold,35))}return b(i,`${e.pairs}/8 paires • ${e.turns} tours${e.phase==="done"?" • "+e.score+" points":""}`,65,825,24,y.gold),n.toBuffer("image/png")}
if(["mystery","shirts"].includes(e.type)){let l=e.questions[Math.min(e.round,e.questions.length-1)],u=await U.image(l.image,s);$(i,170,195,860,570,"#f6f3e9"),ye(i,u,180,205,840,550);let m=e.stage==="result"||e.phase!=="p\
laying";if(e.type==="mystery"&&!m){let v=16+e.reveals*16,w=ge.shuffle(Array.from({length:80},(S,R)=>R),ge.rng(l.image));for(let S=v;S<80;S++){let R=w[S],P=180+R%10*84,N=205+Math.floor(R/10)*68.75;$(i,P,N,84,69,"#e2e8ed",
0),i.fillStyle="#fff",i.beginPath(),i.arc(P+42,N+34,5,0,Math.PI*2),i.fill()}}return b(i,l.prompt,65,806,25,y.gold,1100),b(i,`Photo ${Math.min(e.round+1,e.questions.length)}/${e.questions.length}${m?" • Correction affiché\
e sous le visuel":""}`,65,838,19,y.white,1100),n.toBuffer("image/png")}return b(i,Ke(e),65,420,64,y.gold),n.toBuffer("image/png")}async function as(r){let{cv:e,c:s}=await we(r,"Chaque jour, un nouveau défi à relever."),
t=await U.image("calendrier.jpg");return s.drawImage(t,45,192,1110,624),$(s,60,696,1080,100,"#03152cee"),b(s,r.title,85,739,30,y.gold,1020),b(s,"Joue • Gagne des points • Suis ton classement",85,777,23,y.white,1020),
e.toBuffer("image/png")}async function is(r,e,s=0){let{cv:t,c:a}=await we({day:24,title:r},"Classement des mini-jeux • Les pronos ne sont pas comptabilisés.");return e.slice(0,10).forEach((n,i)=>{$(a,50,208+i*59,1100,
51,i===0?y.red:"#061b40df",9),b(a,`${s+i+1}. ${n.name}`,70,242+i*59,24,y.white,870),b(a,String(n.score),990,242+i*59,25,y.gold,140)}),t.toBuffer("image/png")}Ze.exports={board:rs,banner:as,ranking:is,palette:y}});var it=q((js,at)=>{"use strict";var{EmbedBuilder:be,ActionRowBuilder:ve,ButtonBuilder:tt,ButtonStyle:D,AttachmentBuilder:Se}=require("discord.js"),os=se(),ns=ae(),Te=et(),oe={parse:[]},H=r=>String(r).replace(/([\\`*_~|>])/g,
"\\$1").replace(/@/g,"@​"),k=(r,e,s=D.Secondary,t=!1)=>new tt().setCustomId(r).setLabel(e.slice(0,80)).setStyle(s).setDisabled(t),x=r=>Array.from({length:Math.ceil(r.length/5)},(e,s)=>new ve().addComponents(r.slice(s*5,
s*5+5))),Ee=r=>new tt().setStyle(D.Link).setLabel("Prolonge l’expérience sur MyParis").setURL(r.myparis);function X(r,e){if(r=[...r],r.length&&r.at(-1).components.length<5?r.at(-1).addComponents(Ee(e)):r.push(new ve().
addComponents(Ee(e))),r.length>5)throw Error("Trop de boutons.");return r}function st(r,e){let s=r.state,t=n=>`pg:s:${r.id}:${s.version}:${n}`;if(s.phase!=="playing")return X(x([k(`pg:l:day:${r.day}:0`,"Classement du jou\
r"),k("pg:l:general:0:0","Classement général")]),e);let a=[];return s.type==="memory"?(a=Array.from({length:4},(n,i)=>new ve().addComponents(...Array.from({length:4},(l,u)=>{let m=i*4+u,h=s.found.includes(m)||s.flipped.
includes(m);return k(t(m),h?s.labels[s.cards[m]]:String(m+1),s.found.includes(m)?D.Success:D.Secondary,h||!!s.hideAt)}))),a.push(...x([k(t("giveup"),"Terminer",D.Danger)])),X(a,e)):(s.type==="maze"&&(a=x(["left","up","do\
wn","right"].map((n,i)=>k(t(n),["←","↑","↓","→"][i],D.Primary)))),s.type==="penalty"&&(a=s.stage==="result"?x([k(t("next"),"Tir suivant",D.Primary)]):x(["Gauche","Centre","Droite"].map((n,i)=>k(t(i),n,D.Primary)))),
s.type==="lineup"&&(s.stage==="show"?a=x([k(t("wait"),"Observe la composition • 10 secondes",D.Secondary,!0)]):(a=x(["Gardien","Défense","Milieu","Attaque"].map((n,i)=>k(`pg:fill:${r.id}:${s.version}:${i}`,n,D.Primary))),
a.push(...x([k(t("submit"),"Valider ma composition",D.Success)])))),s.type==="chrono"&&(a=x(s.events.map((n,i)=>k(t(i),`${i+1}. ${n.label}`,D.Primary,s.chosen.includes(i)))),a.push(...x([k(t("submit"),"Confirmer mon ordr\
e",D.Success,s.chosen.length!==5),k(t("clear"),"Recommencer")]))),["mystery","shirts"].includes(s.type)&&(s.stage==="result"?a=x([k(t("next"),"Question suivante",D.Primary)]):(a=x(s.questions[s.round].options.map((n,i)=>k(
t(i),n,D.Primary))),s.type==="mystery"&&a.push(...x([k(t("reveal"),"Dévoiler davantage",D.Secondary,s.reveals>=4)])))),a.push(...x([k(t("giveup"),"Terminer la tentative",D.Danger)])),X(a,e))}function rt(r){if(r.type==="\
lineup"&&r.corrections)return r.corrections.map(e=>`${e.ok?"✅":"❌"} **${H(e.position)}** : ${H(e.answer)}${e.ok?"":` → **${H(e.expected)}**`}`).join(`
`);if(r.type==="chrono"&&r.corrections)return r.corrections.map((e,s)=>`${e.ok?"✅":"❌"} **${s+1}.** ${H(e.answer)}${e.ok?"":`
↳ Attendu : **${H(e.expected)}**`}`).join(`
`);if(["mystery","shirts"].includes(r.type)&&r.history.length)return(r.phase==="done"?r.history:[r.history.at(-1)]).map((s,t)=>`${s.ok?"✅":"❌"} **${H(s.expected)}**
Ta réponse : ${H(s.answer)} • ${s.score}/1 000
${H(s.explanation)}${s.source?`
[Voir la source](${s.source})`:""}`).join(`

`);if(r.type==="penalty"&&r.shots.length){let e=["gauche","centre","droite"];return r.shots.map((s,t)=>`${s.goal?"⚽":"🧤"} Tir ${t+1} : **${e[s.shot]}**, gardien à **${e[s.dive]}** → ${s.goal?"but":"arrêt"}`).join(
`
`)}return r.type==="maze"&&r.phase==="done"?`Chemin optimal : **${r.optimal} déplacements**.
Ton parcours : **${r.moves} déplacements** sur ${r.budget} autorisés.
${r.position===r.goal?"Cadeau atteint. 25 points retirés par déplacement au-delà du chemin optimal.":"Le cadeau n’a pas été atteint avant la limite."}`:r.type==="memory"&&r.phase==="done"?`**${r.pairs}/8 paires**,\
 en **${r.turns} tours**. Toutes les cartes sont dévoilées sur le visuel.`:""}async function ls(r,e,s,t=!1){return{embeds:[new be().setColor(11142928).setTitle(`Case ${r.day} • ${r.title}`).setDescription(r.description+
`

`+(t?"Aperçu privé, sans points.":`Ouverture <t:${Math.floor(e.opens/1e3)}:f>
Clôture <t:${Math.floor(e.closes/1e3)}:f>
**${s.attempts} tentative(s) classée(s), meilleur score retenu.**`)).setImage("attachment://case.png").setFooter({text:`PSG Avent V2 • pgday:${s.year}:${r.day}`})],files:[new Se(await Te.banner(r),{name:"case.png"})],
components:X(x([k(`pg:p:${r.day}:${t?"practice":"ranked"}`,t?"Tester":"Jouer / Reprendre",D.Primary,!!e.closed&&!t),k(`pg:l:day:${r.day}:0`,"Classement du jour"),k("pg:l:general:0:0","Classement général")]),s),allowedMentions:oe}}
async function us(r,e,s,t="normal"){let a=r.state,n=rt(a),i=new be().setColor(11142928).setTitle(e.title).setDescription(a.phase==="playing"?ns.instructions(a.type):a.phase==="done"?`**${a.score}/1 000 points**
${r.ranked?"Résultat enregistré au classement.":"Entraînement, sans points classés."}`:"Partie expirée, sans score classé.").setImage("attachment://partie.png").setFooter({text:`${r.ranked?"Classée":"Entraînement"}\
 • ${r.id}`});if(n){let l=[""];for(let u of n.split(`
`))(l.at(-1)+`
`+u).length>950&&l.push(""),l[l.length-1]+=(l.at(-1)?`
`:"")+u;l.forEach((u,m)=>i.addFields({name:m?"Suite de la correction":a.phase==="done"?"Tes résultats et les bonnes réponses":"Résultat",value:u}))}return a.type==="lineup"&&a.phase==="playing"&&i.addFields({name:"Com\
position",value:a.stage==="show"?"Dix secondes pour mémoriser les onze joueurs.":"Saisis tes réponses par ligne. Tu peux les modifier avant de valider."}),{content:r.ranked?`Tentative ${r.attempt}/${s.attempts}`:"Entra\
înement",embeds:[i],attachments:[],files:[new Se(await Te.board(e,a,s.data,t,r.name),{name:"partie.png"})],components:t==="run"?X([],s):st(r,s),allowedMentions:oe}}async function ps(r,e,{day:s=null,type:t=null,page:a=0}={}){
let n=r.ranking(e.year,{day:s,type:t}),i=Math.max(1,Math.ceil(n.length/10));a=Math.max(0,Math.min(a,i-1));let l=n.slice(a*10,a*10+10),u=s?`Classement du ${s} décembre`:t?os.labels[t]:"Classement général",m=s?"day":t?"\
type":"general",h=s||t||0;return{embeds:[new be().setColor(11142928).setTitle(u).setDescription(l.length?l.map((v,w)=>`**${a*10+w+1}.** <@${v.uid}> • **${v.score} points** • ${v.days} défi(s)`).join(`
`):"Aucun résultat classé.").setImage("attachment://classement.png").setFooter({text:`Page ${a+1}/${i} • Mini-jeux uniquement • Les pronos sont exclus`})],attachments:[],files:[new Se(await Te.ranking(u,l,a*10),{name:"\
classement.png"})],components:X(x([k(`pg:l:${m}:${h}:${a-1}`,"Précédent",D.Secondary,a===0),k(`pg:l:${m}:${h}:${a+1}`,"Suivant",D.Secondary,a===i-1)]),e),allowedMentions:oe}}at.exports={quiet:oe,btn:k,rows:x,link:Ee,withLink:X,
buttons:st,correction:rt,panel:ls,game:us,leaderboard:ps}});var ut=q((Fs,lt)=>{"use strict";var{DatabaseSync:cs}=require("node:sqlite"),{mkdirSync:ot,readdirSync:ds,unlinkSync:ms}=require("node:fs"),ne=require("node:path"),{randomUUID:nt,randomInt:fs}=require("node:crypto"),Re=class{constructor(e){
ot(e,{recursive:!0}),this.dir=e,this.db=new cs(ne.join(e,"psg-avent-v2.sqlite")),this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=5000;
 CREATE TABLE IF NOT EXISTS settings(k TEXT PRIMARY KEY,v TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS days(year INTEGER,day INTEGER,channel TEXT,message TEXT,opens INTEGER,closes INTEGER,closed INTEGER DEFAULT 0,publishing INTEGER DEFAULT 0,PRIMARY KEY(year,day));
 CREATE TABLE IF NOT EXISTS sessions(id TEXT PRIMARY KEY,year INTEGER,day INTEGER,type TEXT,uid TEXT,name TEXT,ranked INTEGER,attempt INTEGER,state TEXT,version INTEGER,created INTEGER);
 CREATE INDEX IF NOT EXISTS sessions_member ON sessions(year,day,uid);
 CREATE TABLE IF NOT EXISTS results(id TEXT PRIMARY KEY,year INTEGER,day INTEGER,type TEXT,uid TEXT,name TEXT,score INTEGER,duration INTEGER,won INTEGER,finished INTEGER,valid INTEGER DEFAULT 1);
 CREATE INDEX IF NOT EXISTS result_rank ON results(year,day,valid,score);
 CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY,ts INTEGER,actor TEXT,action TEXT,detail TEXT);
 CREATE TABLE IF NOT EXISTS draws(year INTEGER,day INTEGER,uid TEXT,method TEXT,created INTEGER,PRIMARY KEY(year,day));
 CREATE TABLE IF NOT EXISTS lease(id INTEGER PRIMARY KEY CHECK(id=1),owner TEXT,until INTEGER);`)}tx(e){this.db.exec("BEGIN IMMEDIATE");try{let s=e();return this.db.exec("COMMIT"),s}catch(s){throw this.db.exec("ROLLBACK"),
s}}acquire(){this.owner=nt(),this.tx(()=>{let e=this.db.prepare("SELECT * FROM lease WHERE id=1").get();if(e&&e.until>Date.now())throw Error("Une autre instance du bot utilise déjà ce volume. Garde une seule réplique.");
this.db.prepare("INSERT OR REPLACE INTO lease VALUES(1,?,?)").run(this.owner,Date.now()+45e3)})}heartbeat(){if(!this.db.prepare("UPDATE lease SET until=? WHERE id=1 AND owner=?").run(Date.now()+45e3,this.owner).changes)throw Error(
"Verrou de stockage perdu.")}close(){this.owner&&this.db.prepare("DELETE FROM lease WHERE owner=?").run(this.owner),this.db.close()}get(e,s=null){let t=this.db.prepare("SELECT v FROM settings WHERE k=?").get(e);return t?
JSON.parse(t.v):s}set(e,s){this.db.prepare("INSERT OR REPLACE INTO settings VALUES(?,?)").run(e,JSON.stringify(s))}log(e,s,t){this.db.prepare("INSERT INTO audit(ts,actor,action,detail) VALUES(?,?,?,?)").run(Date.now(),e,
s,JSON.stringify(t))}day(e,s){return this.db.prepare("SELECT * FROM days WHERE year=? AND day=?").get(e,s)}claimDay(e,s,t,a,n){return this.tx(()=>{let i=this.day(e,s);if(i?.message||i?.publishing)throw Error("Ce défi a d\
éjà un panneau ou une publication à vérifier. Utilise /psg statut.");this.db.prepare("INSERT INTO days(year,day,channel,opens,closes,publishing) VALUES(?,?,?,?,?,1) ON CONFLICT(year,day) DO UPDATE SET publishing=1,ch\
annel=excluded.channel,opens=excluded.opens,closes=excluded.closes").run(e,s,t,a,n)})}posted(e,s,t){this.db.prepare("UPDATE days SET message=?,publishing=0 WHERE year=? AND day=?").run(t,e,s)}releaseDay(e,s){this.db.prepare(
"UPDATE days SET publishing=0 WHERE year=? AND day=?").run(e,s)}closeDay(e,s){this.db.prepare("UPDATE days SET closed=1 WHERE year=? AND day=?").run(e,s)}load(e){let s=this.db.prepare("SELECT * FROM sessions WHERE id=?").
get(e);if(!s)throw Error("Partie introuvable. Reviens au panneau du jeu.");return s.state=JSON.parse(s.state),s}newSession({year:e,day:s,type:t,uid:a,name:n,ranked:i,max:l,create:u,now:m=Date.now()}){return this.tx(()=>{
let h=this.db.prepare("SELECT id,state FROM sessions WHERE year=? AND day=? AND uid=? AND ranked=? ORDER BY created DESC").all(e,s,a,Number(i)).find(P=>{let N=JSON.parse(P.state);return N.phase==="playing"&&N.expires>m});
if(h)return this.load(h.id);let v=this.db.prepare("SELECT COUNT(*) n FROM sessions WHERE year=? AND day=? AND uid=? AND ranked=1").get(e,s,a).n;if(i&&v>=l)throw Error(`Tu as utilisé tes ${l} tentatives classées. Tu peux\
 encore t’entraîner.`);let w=nt().replaceAll("-","").slice(0,16),S=i?v+1:0,R=u(w,S);return this.db.prepare("INSERT INTO sessions VALUES(?,?,?,?,?,?,?,?,?,?,?)").run(w,e,s,t,a,n,Number(i),S,JSON.stringify(R),R.version,
m),this.load(w)})}save(e,s){return this.tx(()=>{if(!this.db.prepare("UPDATE sessions SET state=?,version=? WHERE id=? AND version=?").run(JSON.stringify(e.state),e.state.version,e.id,s).changes)throw Error("Le plateau a \
déjà changé. Rouvre ta partie avec Reprendre.");let a=e.state;return e.ranked&&a.phase==="done"&&this.db.prepare("INSERT OR IGNORE INTO results(id,year,day,type,uid,name,score,duration,won,finished) VALUES(?,?,?,?,?,?\
,?,?,?,?)").run(e.id,e.year,e.day,e.type,e.uid,e.name,a.score,Math.max(0,a.finished-a.started),Number(a.won),a.finished),e})}active(){return this.db.prepare("SELECT COUNT(*) n FROM sessions WHERE json_extract(state,'$.ph\
ase')='playing' AND json_extract(state,'$.expires')>?").get(Date.now()).n}attempts(e,s,t){return this.db.prepare("SELECT COUNT(*) n FROM sessions WHERE year=? AND day=? AND uid=? AND ranked=1").get(e,s,t).n}ranking(e,{day:s=null,
type:t=null}={}){let a="year=? AND valid=1 AND type != 'prediction'",n=[e];return s&&(a+=" AND day=?",n.push(s)),t&&(a+=" AND type=?",n.push(t)),this.db.prepare(`WITH ranked AS(SELECT *,ROW_NUMBER() OVER(PARTITION BY uid\
,day ORDER BY score DESC,duration ASC,finished ASC,id ASC) rn FROM results WHERE ${a}), totals AS(SELECT uid,SUM(score) score,SUM(duration) duration,COUNT(*) days,MIN(finished) first FROM ranked WHERE rn=1 GROUP BY uid) \
SELECT totals.*, (SELECT name FROM results r WHERE r.year=? AND r.uid=totals.uid ORDER BY finished DESC LIMIT 1) name FROM totals ORDER BY score DESC,duration ASC,first ASC,uid ASC`).all(...n,e)}exportDay(e,s){return this.
ranking(e,{day:s})}void(e,s,t,a,n){this.db.prepare("UPDATE results SET valid=0 WHERE year=? AND day=? AND uid=?").run(e,s,t),this.log(n,"invalidate",{year:e,day:s,uid:t,reason:a})}draw(e,s,t,a){return this.tx(()=>{let n=this.
day(e,s);if(!n||!n.closed&&Date.now()<n.closes)throw Error("Clôture le défi avant de désigner un gagnant.");let i=this.db.prepare("SELECT * FROM draws WHERE year=? AND day=?").get(e,s);if(i)return{...i,existing:!0};let l=this.
ranking(e,{day:s});if(!l.length)throw Error("Aucune participation classée terminée et valide.");let u=t==="top"?l[0]:l[fs(l.length)];return this.db.prepare("INSERT INTO draws VALUES(?,?,?,?,?)").run(e,s,u.uid,t,Date.now()),
this.log(a,"draw",{year:e,day:s,method:t,uid:u.uid,candidates:l.map(m=>m.uid)}),{uid:u.uid,method:t,existing:!1}})}async backup(){let e=ne.join(this.dir,"backups");ot(e,{recursive:!0});let s=`psg-avent-${new Date().toISOString().
replaceAll(":","-")}.sqlite`,t=ne.join(e,s),{backup:a}=require("node:sqlite");await a(this.db,t);for(let n of ds(e).filter(i=>i.endsWith(".sqlite")).sort().slice(0,-14))ms(ne.join(e,n));return t}};lt.exports={Store:Re}});var mt=q((Bs,dt)=>{"use strict";var{SlashCommandBuilder:Z,PermissionFlagsBits:hs,ChannelType:pt}=require("discord.js"),gs=se(),j=(r,e=!0)=>r.addIntegerOption(s=>s.setName("jour").setDescription("Jour de la case (1 à 24)").
setMinValue(1).setMaxValue(24).setRequired(e)),ct=r=>r.addAttachmentOption(e=>e.setName("fichier").setDescription("Fichier JSON ou image selon la commande").setRequired(!0)),ys=new Z().setName("psg").setDescription("Cale\
ndrier de l’Avent PSG").setDefaultMemberPermissions(hs.ManageGuild).addSubcommand(r=>r.setName("config").setDescription("Choisir le salon et la publication automatique").addChannelOption(e=>e.setName("salon").setDescription(
"Salon des animations").addChannelTypes(pt.GuildText,pt.GuildAnnouncement).setRequired(!0)).addBooleanOption(e=>e.setName("automatique").setDescription("Publier automatiquement aux horaires définis").setRequired(!0))).addSubcommand(
r=>j(r.setName("publier").setDescription("Publier le panneau de cette case"))).addSubcommand(r=>j(r.setName("apercu").setDescription("Tester en privé sans points"))).addSubcommand(r=>j(r.setName("horaires").setDescription(
"Déplacer ou fixer une case avant publication")).addStringOption(e=>e.setName("ouverture").setDescription("ISO avec fuseau, ex. 2026-12-04T00:00:00+01:00").setRequired(!0)).addStringOption(e=>e.setName("fermeture").setDescription(
"ISO avec fuseau").setRequired(!0))).addSubcommand(r=>ct(j(r.setName("contenu").setDescription("Importer la banque validée pour cette case")))).addSubcommand(r=>ct(j(r.setName("image").setDescription("Ajouter une image \
au stock de cette case")))).addSubcommand(r=>j(r.setName("cloturer").setDescription("Fermer immédiatement une case"))).addSubcommand(r=>j(r.setName("exporter").setDescription("Exporter les résultats et rangs"),!1)).addSubcommand(
r=>j(r.setName("invalider").setDescription("Exclure un membre pour cette case")).addUserOption(e=>e.setName("membre").setDescription("Membre").setRequired(!0)).addStringOption(e=>e.setName("motif").setDescription("Motif \
conservé dans le journal").setRequired(!0))).addSubcommand(r=>j(r.setName("reparer").setDescription("Retrouver un panneau après une publication interrompue"))).addSubcommand(r=>r.setName("statut").setDescription("Voir \
les 24 cases et les prérequis")).addSubcommand(r=>r.setName("sauvegarde").setDescription("Sauvegarde privée de la base")).addSubcommand(r=>r.setName("finaliser").setDescription("Figer le classement après toutes les clô\
tures et résultats").addStringOption(e=>e.setName("confirmation").setDescription("Saisir FINALISER").setRequired(!0))),ws=j(new Z().setName("jouer-psg").setDescription("Jouer ou reprendre une animation PSG"),!1).addBooleanOption(
r=>r.setName("entrainement").setDescription("Sans score classé")),Es=j(new Z().setName("classement-psg").setDescription("Classement du calendrier PSG"),!1).addStringOption(r=>r.setName("animation").setDescription("Filtr\
er une famille de jeux").addChoices(...Object.entries(gs.labels).filter(([e])=>e!=="prediction").map(([e,s])=>({name:s,value:e})))).addIntegerOption(r=>r.setName("page").setDescription("Page").setMinValue(1));dt.exports=
[ys,ws,Es,new Z().setName("mon-score-psg").setDescription("Mes résultats et mon rang"),new Z().setName("regles-psg").setDescription("Barèmes et classement du calendrier")].map(r=>r.setDMPermission(!1).toJSON())});var{Client:bs,GatewayIntentBits:vs,Events:ke,MessageFlags:Ae,PermissionFlagsBits:ee,AttachmentBuilder:ft,ModalBuilder:Ss,TextInputBuilder:Ts,TextInputStyle:Rs,ActionRowBuilder:ks,REST:As,Routes:ht}=require("discord.js"),
gt=require("node:fs"),yt=require("node:path"),Ds=require("node:http"),{config:bt,paris:Ns,parseDate:wt,epoch:Et}=Me(),te=se(),V=ae(),le=Ue(),L=it(),De=he(),{Store:vt}=ut();function St(r){return"\uFEFF"+r.map(e=>e.map(s=>{
let t=String(s??"");return/^[=+\-@\t\r]/.test(t)&&(t="'"+t),'"'+t.replaceAll('"','""')+'"'}).join(";")).join(`\r
`)}function Tt(){let r=new Map;return async(e,s)=>{let t=(r.get(e)||Promise.resolve()).catch(()=>{}).then(s);r.set(e,t);try{return await t}finally{r.get(e)===t&&r.delete(e)}}}async function Ne(r,e=2e5){if(!r||r.size>e)throw Error(
"Fichier absent ou trop grand.");let s=new URL(r.url);if(s.protocol!=="https:"||!["cdn.discordapp.com","media.discordapp.net"].includes(s.hostname))throw Error("Joindre le fichier dans Discord.");let t=await fetch(s,{redirect:"\
error",signal:AbortSignal.timeout(15e3)});if(!t.ok)throw Error("Pièce jointe inaccessible.");let a=Buffer.from(await t.arrayBuffer());if(a.length>e)throw Error("Fichier trop grand.");return a}async function Rt(r=process.
env){let e=bt(r);await De.prepare();let s=new vt(e.data);s.acquire(),s.db.exec("CREATE TABLE IF NOT EXISTS exclusions(year INTEGER,day INTEGER,uid TEXT,PRIMARY KEY(year,day,uid))");let t=new bs({intents:[vs.Guilds]}),a=Tt(),
n=new Map,i=!1,l=!1,u=0,m=o=>s.get("content:"+o.day,le.defaults[o.day]||{ready:!0}),h=o=>s.day(e.year,o.day),v=o=>o.memberPermissions?.has(ee.ManageGuild)||e.staffRole&&o.member?.roles?.cache?.has(e.staffRole);function w(o){
let p=te.day(o);if(!p||p.type==="prediction")throw Error("Cette date utilise le bot de pronostics habituel, hors classement du calendrier.");return p}let S=o=>{let p=h(o);return{opens:p?.opens??Et(e.year,o.day,e.openHour),
closes:p?.closes??Et(e.year,o.day,e.closeHour),closed:p?.closed||0}};function R(o){if(le.validate(o.day,m(o),o.type),!m(o).ready)throw Error("Contenu non validé.");let p=m(o);for(let f of[...(p.questions||[]).map(g=>g.image),
...(p.players||[]).map(g=>g.photo),...p.images||[]])De.file(f,e.data)}function P(o,p){let f=S(o);if(s.get("final",!1)||!h(o)?.message||f.closed||Date.now()<f.opens||Date.now()>=f.closes)throw Error("Ce défi est fermé aux\
 parties classées.");if(s.db.prepare("SELECT 1 FROM exclusions WHERE year=? AND day=? AND uid=?").get(e.year,o.day,p))throw Error("Participation exclue pour ce défi.")}function N(o,p){let f=s.load(p);if(f.year!==e.year||
f.uid!==o.user.id)throw Error("Cette partie ne t’appartient pas.");return f.ranked&&P(w(f.day),f.uid),f}async function I(o,p,f="normal"){if(await o.editReply(await L.game(p,w(p.day),e,f)),clearTimeout(n.get(p.id)),n.delete(
p.id),f==="run")return;let g=p.state,d=g.hideAt||(g.type==="lineup"&&g.stage==="show"?g.ready:null);if(d&&g.phase==="playing"){let c=setTimeout(()=>a("user:"+p.uid,async()=>{if(i)return;let T=s.load(p.id),A=T.state.version;
V.advance(T.state),A!==T.state.version&&(s.save(T,A),await o.editReply(await L.game(T,w(T.day),e)).catch(()=>{})),n.delete(p.id)}).catch(T=>console.error("Plateau :",T.message)),Math.max(50,d-Date.now()+25));c.unref(),n.
set(p.id,c)}}async function M(o,p,f){let g=w(p);if(R(g),!f&&!e.practice&&!v(o))throw Error("Entraînement désactivé.");f&&P(g,o.user.id);let d=s.newSession({year:e.year,day:g.day,type:g.type,uid:o.user.id,name:o.member?.
displayName||o.user.username,ranked:f,max:e.attempts,create:T=>{let A=V.create(g.type,T+":"+o.user.id,Date.now(),m(g),g.day);return f&&(A.expires=Math.min(A.expires,S(g).closes)),A}}),c=d.state.version;return V.advance(d.
state),c!==d.state.version&&s.save(d,c),I(o,d)}async function E(o,p="auto"){let f=w(o);R(f);let g=S(f);if(g.closes<=g.opens||g.closes<=Date.now())throw Error("Horaires de publication à corriger.");let d=await t.channels.
fetch(s.get("channel",e.channel));if(!d||d.guildId!==e.guild||!d.isTextBased()||!d.send)throw Error("Configurer le salon avec /psg config.");if(!d.permissionsFor(t.user)?.has([ee.ViewChannel,ee.SendMessages,ee.EmbedLinks,
ee.AttachFiles]))throw Error("Permissions Voir, Envoyer, Intégrer et Joindre requises.");let c=await L.panel(f,g,e);s.claimDay(e.year,o,d.id,g.opens,g.closes);try{let T=await d.send({...c,nonce:`psgV2${e.year}${o}`,enforceNonce:!0});
return s.posted(e.year,o,T.id),s.log(p,"publish",{day:o,message:T.id}),T.url}catch{throw Error("Publication à vérifier avec /psg reparer, pour éviter un doublon.")}}async function C(o){let p=h(o);if(!p?.message)return;
await(await(await t.channels.fetch(p.channel)).messages.fetch(p.message)).edit({...await L.panel(o,S(o),e),attachments:[]})}async function Y(o){if(!v(o))throw Error("Commande réservée au staff.");let p=o.options.getSubcommand(),
f=o.options.getInteger("jour"),g=f?w(f):null;if(s.get("final",!1)&&!["statut","exporter","sauvegarde"].includes(p))throw Error("Classement final figé.");if(p==="config"){let d=o.options.getChannel("salon");if(d.guildId!==
e.guild)throw Error("Salon du serveur requis.");return s.set("channel",d.id),s.set("auto",o.options.getBoolean("automatique")),o.editReply("Salon enregistré. Publication automatique : "+(s.get("auto")?"activée":"désact\
ivée")+".")}if(p==="apercu")return o.editReply(await L.panel(g,S(g),e,!0));if(p==="publier")return o.editReply("Panneau publié : "+await E(f,o.user.id));if(p==="statut")return o.editReply(te.days.map(d=>`${d.day}. ${d.
type==="prediction"?"Pronos sur l’autre bot, hors classement":h(d)?.closed?"Fermé":h(d)?.message?"Publié":h(d)?.publishing?"Publication à vérifier":m(d).ready?"Prêt":"Contenu à valider"}`).join(`
`));if(p==="horaires"){if(h(g)?.message)throw Error("Horaires figés après publication.");let d=wt(o.options.getString("ouverture")),c=wt(o.options.getString("fermeture"));if(c<=d)throw Error("Fermeture après l’ouvertur\
e requise.");return s.db.prepare("INSERT INTO days(year,day,opens,closes) VALUES(?,?,?,?) ON CONFLICT(year,day) DO UPDATE SET opens=excluded.opens,closes=excluded.closes").run(e.year,f,d,c),s.log(o.user.id,"hours",{day:f,
opens:d,closes:c}),o.editReply("Horaires enregistrés.")}if(p==="image"||p==="contenu"){if(h(g)?.message)throw Error("Contenu figé après publication.");if(p==="image"){let c=await Ne(o.options.getAttachment("fichier"),
4e6),T=require("sharp"),A=yt.join(e.data,"images"),G=`jour-${f}-${Date.now()}.png`,W=await T(c,{limitInputPixels:2e7}).resize(1600,1600,{fit:"inside",withoutEnlargement:!0}).png().toBuffer();return gt.mkdirSync(A,{recursive:!0}),
gt.writeFileSync(yt.join(A,G),W),o.editReply("Photo enregistrée : "+G+`
Utilise ce nom dans le JSON de contenu.`)}let d=JSON.parse((await Ne(o.options.getAttachment("fichier"))).toString("utf8"));return le.validate(f,d,g.type),s.set("content:"+f,d),s.log(o.user.id,"content",{day:f}),o.editReply(
"Contenu enregistré. Tester avec /psg apercu.")}if(p==="cloturer"){if(!h(g)?.message)throw Error("Défi non publié.");return s.closeDay(e.year,f),await C(g),o.editReply("Défi fermé.")}if(p==="invalider"){let d=o.options.
getUser("membre").id;return s.tx(()=>{s.db.prepare("INSERT OR IGNORE INTO exclusions VALUES(?,?,?)").run(e.year,f,d),s.void(e.year,f,d,o.options.getString("motif"),o.user.id)}),o.editReply("Résultats exclus et nouvelle t\
entative classée bloquée.")}if(p==="exporter"){let d=s.ranking(e.year,{day:f});return o.editReply({content:"Classement des mini-jeux uniquement. Les pronos sont exclus.",files:[new ft(Buffer.from(St([["rang","discord_i\
d","pseudo","points","defis","duree_ms"],...d.map((c,T)=>[T+1,c.uid,c.name,c.score,c.days,c.duration])])),{name:"classement-psg.csv"})]})}if(p==="sauvegarde")return o.editReply({content:"Sauvegarde privée de la base. Con\
server aussi le volume et les médias.",files:[new ft(await s.backup())]});if(p==="reparer"){let d=h(g);if(!d)throw Error("Pas de publication en attente.");if(d.message)return o.editReply(`https://discord.com/channels/${e.
guild}/${d.channel}/${d.message}`);let c=await t.channels.fetch(d.channel),T=await c.messages.fetch({limit:100}),A=T.find(G=>G.author.id===t.user.id&&G.embeds.some(W=>W.footer?.text?.includes(`pgday:${e.year}:${f}`)));if(!A)
throw Error("Panneau non retrouvé. Vérifier le salon avant tout déblocage.");return s.posted(e.year,f,A.id),o.editReply("Panneau retrouvé : "+A.url)}if(p==="finaliser"){if(o.options.getString("confirmation")!=="FINAL\
ISER")throw Error("Saisir FINALISER.");let d=te.playable.filter(c=>!h(c)?.message||!h(c).closed&&Date.now()<h(c).closes);if(d.length)throw Error("Défis encore à terminer : "+d.map(c=>c.day).join(", "));return s.set("fi\
nal",!0),s.log(o.user.id,"finalize",{}),o.editReply("Classement final figé sur 19 mini-jeux. Les pronos sont exclus.")}}async function Pe(o){if(!o.inGuild()||o.guildId!==e.guild)return;if(o.isChatInputCommand())return["\
psg","jouer-psg","classement-psg","mon-score-psg","regles-psg"].includes(o.commandName)?(await o.deferReply({flags:Ae.Ephemeral}),a("user:"+o.user.id,async()=>{if(o.commandName==="psg")return Y(o);if(o.commandName==="jou\
er-psg")return M(o,o.options.getInteger("jour")||Number(Ns().day),!o.options.getBoolean("entrainement"));if(o.commandName==="classement-psg")return o.editReply(await L.leaderboard(s,e,{day:o.options.getInteger("jour"),type:o.
options.getString("animation"),page:(o.options.getInteger("page")||1)-1}));if(o.commandName==="mon-score-psg"){let c=s.ranking(e.year),T=c.findIndex(A=>A.uid===o.user.id);return o.editReply({content:T<0?"Aucun score clas\
sé.":`Tu es ${T+1}/${c.length} avec ${c[T].score} points sur ${c[T].days} défi(s).`,components:L.withLink([],e)})}return o.editReply({content:`**Calendrier PSG • 19 mini-jeux classés**
${e.attempts} tentative(s) classée(s) par défi, meilleur score retenu. 1 000 points maximum par case, 19 000 au général.
Labyrinthe : 1 000 points au chemin optimal, -25 par pas supplémentaire. Memory : 1 000 points en huit tours, -20 par tour supplémentaire, minimum 500 si terminé. Pénaltys : cinq tirs, 200 points par but. Compo : onze po\
stes, score proportionnel aux réponses justes. Chronologie : 200 points par position correcte. Mystère : jusqu’à 1 000 par photo, -200 par dévoilement ; moyenne des questions. Maillots : proportion de saisons trouvées.
Les corrections apparaissent en fin de jeu. Une partie expirée ne rapporte aucun point. L’entraînement ne compte pas.
Égalités : points, durée cumulée, date du premier résultat, puis ID Discord. Le staff valide les éventuels lots.
**Les pronos utilisent l’autre bot et ne comptent pas ici.** Les points ne sont pas synchronisés avec MyParis.`,components:L.withLink([],e)})})):void 0;if(!(o.isButton()||o.isModalSubmit())||!o.customId.startsWith("pg\
:"))return;let[,p,f,g,d]=o.customId.split(":");return o.isButton()&&p==="fill"?a("user:"+o.user.id,async()=>{let c=N(o,f),T=c.state.version;if(V.advance(c.state),T!==c.state.version&&s.save(c,T),c.state.phase!=="playing"||
c.state.stage!=="answer")throw Error("Attends la fin des dix secondes.");if(c.state.version!==Number(g))throw Error("Le terrain a changé. Rouvre ta partie.");let A=[[0],[1,2,3,4],[5,6,7],[8,9,10]],G=A[Number(d)];if(!G)throw Error(
"Groupe invalide.");let W=new Ss().setCustomId(`pg:form:${f}:${c.state.version}:${d}`).setTitle(["Gardien","Défense","Milieu","Attaque"][Number(d)]);for(let J of G){let Ie=new Ts().setCustomId("p"+J).setLabel(`${J+1}. ${c.
state.players[J].position}`).setStyle(Rs.Short).setMaxLength(60).setRequired(!1);c.state.answers[J]&&Ie.setValue(c.state.answers[J]),W.addComponents(new ks().addComponents(Ie))}return o.showModal(W)}):(p==="p"||p==="l"||
o.isModalSubmit()?await o.deferReply({flags:Ae.Ephemeral}):await o.deferUpdate(),a("user:"+o.user.id,async()=>{if(p==="p")return M(o,Number(f),g==="ranked");if(p==="l")return o.editReply(await L.leaderboard(s,e,{day:f===
"day"?Number(g):null,type:f==="type"?g:null,page:Number(d)||0}));if(p==="s"||p==="form"){let c=N(o,f),T=c.state.version;if(V.advance(c.state),c.state.version!==Number(g)||c.state.phase!=="playing")return T!==c.state.version&&
s.save(c,T),I(o,c);if(p==="form"){let A={};for(let G of[[0],[1,2,3,4],[5,6,7],[8,9,10]][Number(d)]||[])A[G]=o.fields.getTextInputValue("p"+G);c.state=V.fillLineup(c.state,Number(d),A)}else c.state=V.act(c.state,d);return s.
save(c,T),p==="s"&&c.state.type==="penalty"&&[0,1,2].includes(Number(d))&&(await I(o,c,"run"),await new Promise(A=>setTimeout(A,650))),I(o,c)}}))}t.on(ke.InteractionCreate,o=>Pe(o).catch(async p=>{let f=String(p.message).
replaceAll(e.token,"[secret]");console.error(f);let g={content:f.slice(0,1600),flags:Ae.Ephemeral,components:L.withLink([],e),allowedMentions:L.quiet};try{o.deferred||o.replied?await o.followUp(g):await o.reply(g)}catch{}}));
async function B(){if(!(i||l||!t.isReady())){l=!0;try{for(let o of te.playable){let p=h(o),f=S(o);if(p?.message&&!p.closed&&Date.now()>=f.closes&&(s.closeDay(e.year,o.day),await C(o).catch(()=>{})),!s.get("final",!1)&&s.
get("auto",e.auto)&&!p?.message&&!p?.publishing&&!p?.closed&&Date.now()>=f.opens&&Date.now()<f.closes)try{await E(o.day)}catch(g){console.error("Case "+o.day+" : "+g.message)}}Date.now()-u>216e5&&(await s.backup(),u=Date.
now())}finally{l=!1}}}let xe=setInterval(()=>{try{s.heartbeat()}catch{K()}},15e3),Ce=setInterval(()=>B().catch(o=>console.error(o.message)),3e4);xe.unref(),Ce.unref(),t.once(ke.ClientReady,()=>{console.log("PSG Avent V2 \
prêt • 19 mini-jeux • pronos exclus."),B().catch(o=>console.error(o.message))}),t.on(ke.Error,o=>console.error(o.message));let At=r.PORT?Ds.createServer((o,p)=>{p.writeHead(t.isReady()?200:503),p.end(JSON.stringify(
{ready:t.isReady()}))}).listen(Number(r.PORT),"0.0.0.0"):null;function K(){if(!i){i=!0,clearInterval(xe),clearInterval(Ce);for(let o of n.values())clearTimeout(o);At?.close(),t.destroy(),s.close()}}process.once("SIGTERM",
K),process.once("SIGINT",K);try{await t.login(e.token)}catch(o){throw K(),o}return{client:t,store:s,shutdown:K}}async function kt(){let r=bt(),e=new As({version:"10"}).setToken(r.token),s=await e.get(ht.user("@me"));await e.
put(ht.applicationGuildCommands(s.id,r.guild),{body:mt()}),console.log("Commandes PSG V2 enregistrées.")}require.main===module&&(process.argv.includes("--register")?kt():Rt()).catch(r=>{console.error(r.message),process.
exitCode=1});module.exports={run:Rt,register:kt,csv:St,locks:Tt,attachment:Ne,_test:{G:V,D:le,C:te,UI:L,Store:vt,media:De}};

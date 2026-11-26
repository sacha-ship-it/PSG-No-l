"use strict";

/*
 * PSG - Calendrier de l’Avent 2026
 * Node.js 24
 * Dépendances : discord.js@14.22.1 et @napi-rs/canvas@0.1.80
 *
 * Enregistrer les commandes :
 *   node --env-file-if-exists=.env index.js --register
 *
 * Démarrer :
 *   node --env-file-if-exists=.env index.js
 *
 * Utiliser une application Discord dédiée à ce bot.
 * Le dossier DATA_DIR doit être persistant.
 * Une seule instance doit utiliser la même base.
 */

var P = (t, e) => () => (
  e || t((e = { exports: {} }).exports, e),
  e.exports
);

// Configuration

var ie = P((dr, De) => {
  var dt = require("node:path");

  function pt(t = process.env) {
    let e = {
      token: t.DISCORD_TOKEN,
      guild: t.DISCORD_GUILD_ID,
      channel: t.GAMES_CHANNEL_ID || null,
      staffRole: t.STAFF_ROLE_ID || null,
      data: dt.resolve(t.DATA_DIR || "./data"),
      myparis: t.MYPARIS_URL || "https://myparis.psg.fr/fr/",
      year: Number(t.EVENT_YEAR || 2026),
      attempts: Number(t.MAX_RANKED_ATTEMPTS || 1),
      auto: t.AUTO_PUBLISH === "true",
      practice: t.ALLOW_PRACTICE !== "false",
      openHour: Number(t.OPEN_HOUR_PARIS || 0),
      closeHour: Number(t.CLOSE_HOUR_PARIS || 24)
    };

    if (!e.token || !/^\d{17,20}$/.test(e.guild || ""))
      throw Error("DISCORD_TOKEN et DISCORD_GUILD_ID sont requis.");

    for (let r of ["channel", "staffRole"])
      if (e[r] && !/^\d{17,20}$/.test(e[r]))
        throw Error("ID incorrect : " + r);

    for (let [r, n, i] of [
      ["year", 2026, 2100],
      ["attempts", 1, 5],
      ["openHour", 0, 23],
      ["closeHour", 1, 24]
    ])
      if (!Number.isInteger(e[r]) || e[r] < n || e[r] > i)
        throw Error("Réglage incorrect : " + r);

    if (e.closeHour <= e.openHour)
      throw Error("La clôture doit suivre l’ouverture.");

    let s = new URL(e.myparis);

    if (s.protocol !== "https:" || s.username || s.password)
      throw Error("MyParis nécessite un lien HTTPS.");

    if (t.RAILWAY_ENVIRONMENT_ID && !t.RAILWAY_VOLUME_MOUNT_PATH)
      throw Error("Monter un volume persistant sur /data.");

    return e;
  }

  function mt(t = Date.now()) {
    return Object.fromEntries(
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      })
        .formatToParts(t)
        .filter(e => e.type !== "literal")
        .map(e => [e.type, e.value])
    );
  }

  function ft(t) {
    if (
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(t || "") ||
      !Number.isFinite(Date.parse(t))
    )
      throw Error(
        "Date ISO avec fuseau attendue, ex. 2026-12-04T20:00:00+01:00."
      );

    return Date.parse(t);
  }

  var ht = (t, e, s) => Date.UTC(t, 11, e, s - 1);

  De.exports = {
    config: pt,
    paris: mt,
    parseDate: ft,
    epoch: ht
  };
});

// Calendrier

var Ce = P((pr, yt) => {
  yt.exports = [
    {
      day: 1,
      title: "La tournée du Père Noël #1",
      description:
        "Guider le ballon jusqu’au cadeau sur un terrain quadrillé, en évitant les obstacles."
    },
    {
      day: 2,
      title: "Les cadeaux jumeaux #1",
      description:
        "Un jeu de memory : retourner les cadeaux et retrouver les paires de joueurs et joueuses."
    },
    {
      day: 3,
      title: "Pénaltys de Noël #1",
      description:
        "Choisir où tirer ou plonger pour marquer et arrêter des pénaltys. Le jeu ouvre pendant 24 heures."
    },
    {
      day: 4,
      title: "Pronos Toulouse - PSG",
      description:
        "Les pronostics habituels autour du match : résultat, score, buteurs et passeurs."
    },
    {
      day: 5,
      title: "Le mystère sous la neige #1",
      description:
        "Reconnaître un élément emblématique du club sur une image qui se dévoile progressivement."
    },
    {
      day: 6,
      title: "Les cadeaux jumeaux #2",
      description:
        "Retrouver les paires dans une nouvelle grille consacrée au handball parisien."
    },
    {
      day: 7,
      title: "La compo gelée #1",
      description:
        "Observer une composition, puis retrouver les noms qui ont disparu."
    },
    {
      day: 8,
      title: "Pronos Aston Villa - PSG",
      description:
        "Les pronostics habituels pour le rendez-vous de Ligue des champions."
    },
    {
      day: 9,
      title: "Les cadeaux jumeaux #3",
      description:
        "Une nouvelle grille de memory avec des maillots historiques du club."
    },
    {
      day: 10,
      title: "Pénaltys de Noël #2",
      description:
        "Nouvelle session de pénaltys : choisir ses tirs et ses plongeons pour obtenir le meilleur score."
    },
    {
      day: 11,
      title: "La tournée du Père Noël #2",
      description:
        "Atteindre le cadeau sur un nouveau parcours, avec davantage d’obstacles."
    },
    {
      day: 12,
      title: "Pronos PSG - Paris FC",
      description:
        "Les pronostics habituels autour du derby parisien."
    },
    {
      day: 13,
      title: "La hotte des souvenirs",
      description:
        "Remettre dans l’ordre chronologique plusieurs moments marquants de l’histoire du PSG."
    },
    {
      day: 14,
      title: "Le mystère sous la neige #2",
      description:
        "Reconnaître un élément emblématique du club sur une image qui se dévoile progressivement."
    },
    {
      day: 15,
      title: "La tournée du Père Noël #3",
      description:
        "Trouver le chemin jusqu’au cadeau avec le moins de déplacements possible."
    },
    {
      day: 16,
      title: "Pronos de la finale intercontinentale",
      description:
        "Pronostiquer le résultat, le score, les buteurs et les passeurs de la finale. Adversaire à confirmer."
    },
    {
      day: 17,
      title: "Pénaltys de Noël #3",
      description:
        "Une nouvelle série de pénaltys à jouer pendant 24 heures, avec des points pour les buts et les arrêts."
    },
    {
      day: 18,
      title: "La compo gelée #2",
      description:
        "Mémoriser une composition de l’équipe féminine, puis retrouver les noms manquants."
    },
    {
      day: 19,
      title: "Le vestiaire du Père Noël",
      description:
        "Reconnaître des maillots du club à partir de détails : col, manche ou motif."
    },
    {
      day: 20,
      title: "Pronos Coupe de France",
      description:
        "Pronostiquer le match de Coupe de France. Case à déplacer selon la programmation ; date et adversaire à confirmer."
    },
    {
      day: 21,
      title: "Les cadeaux jumeaux #4",
      description:
        "Dernière grille de memory, avec un mélange des sections et des symboles du club."
    },
    {
      day: 22,
      title: "Le mystère sous la neige #3",
      description:
        "Une nouvelle image du club se dévoile sous la neige. Plus on reconnaît tôt ce qu’elle représente, plus on marque."
    },
    {
      day: 23,
      title: "La tournée du Père Noël #4",
      description:
        "Guider le ballon jusqu’au cadeau sur le dernier parcours, avec un nombre de déplacements limité."
    },
    {
      day: 24,
      title: "La finale des Pénaltys de Noël",
      description:
        "Dernière session de tirs et d’arrêts pour marquer des points avant la clôture du classement Noël."
    }
  ];
});

var J = P((mr, Pe) => {
  var gt = Ce();

  var Et = {
    1: "maze",
    2: "memory",
    3: "penalty",
    4: "prediction",
    5: "mystery",
    6: "memory",
    7: "lineup",
    8: "prediction",
    9: "memory",
    10: "penalty",
    11: "maze",
    12: "prediction",
    13: "chrono",
    14: "mystery",
    15: "maze",
    16: "prediction",
    17: "penalty",
    18: "lineup",
    19: "shirts",
    20: "prediction",
    21: "memory",
    22: "mystery",
    23: "maze",
    24: "penalty"
  };

  var bt = {
    maze: "La tournée du Père Noël",
    memory: "Les cadeaux jumeaux",
    penalty: "Pénaltys de Noël",
    prediction: "Pronostics",
    mystery: "Le mystère sous la neige",
    lineup: "La compo gelée",
    chrono: "La hotte des souvenirs",
    shirts: "Le vestiaire du Père Noël"
  };

  var Oe = gt.map(t => ({
    ...t,
    type: Et[t.day],
    date: `2026-12-${String(t.day).padStart(2, "0")}`
  }));

  Pe.exports = {
    days: Oe,
    labels: bt,
    day: t => Oe.find(e => e.day === Number(t))
  };
});

// Moteur des jeux

var ue = P((fr, qe) => {
  var { createHash: Tt } = require("node:crypto");

  function Le(t) {
    let e = Tt("sha256").update(String(t)).digest().readUInt32LE(0) || 1;

    return () => (
      e ^= e << 13,
      e ^= e >>> 17,
      e ^= e << 5,
      (e >>> 0) / 4294967296
    );
  }

  function U(t, e) {
    t = [...t];

    for (let s = t.length - 1; s > 0; s--) {
      let r = Math.floor(e() * (s + 1));
      [t[s], t[r]] = [t[r], t[s]];
    }

    return t;
  }

  var le = {
    up: [0, -1],
    right: [1, 0],
    down: [0, 1],
    left: [-1, 0]
  };

  function oe(t) {
    let e = [[0]], s = new Set([0]);

    while (e.length) {
      let r = e.shift(), n = r.at(-1);

      if (n === 24) return r;

      for (let [i, o] of Object.values(le)) {
        let l = n % 5 + i;
        let h = Math.floor(n / 5) + o;
        let g = h * 5 + l;

        if (
          l >= 0 && l < 5 &&
          h >= 0 && h < 5 &&
          !s.has(g) && !t.includes(g)
        ) {
          s.add(g);
          e.push([...r, g]);
        }
      }
    }

    return null;
  }

  function $(t, e, s) {
    t.phase = "done";
    t.finished = s;
    t.score = Math.max(0, Math.min(1000, Math.round(e)));
    t.won = t.score === 1000;
    t.version++;
    return t;
  }

  function Nt(t, e, s = Date.now(), r = {}, n = 1) {
    let i = Le(e);

    let o = {
      type: t,
      phase: "playing",
      started: s,
      expires: s + 12 * 60000,
      version: 0,
      score: 0,
      moves: 0,
      content: r,
      day: n
    };

    if (t === "maze") {
      let l, h;

      for (let g = 0; g < 500; g++) {
        l = U(Array.from({ length: 23 }, (E, T) => T + 1), i)
          .slice(0, n === 1 ? 6 : 9);
        h = oe(l);
        if (h) break;
      }

      if (!h) {
        l = [];
        h = oe(l);
      }

      Object.assign(o, {
        walls: l,
        position: 0,
        optimal: h.length - 1,
        budget: h.length - 1 + (n === 23 ? 3 : n === 15 ? 5 : 8)
      });
    } else if (t === "memory") {
      Object.assign(o, {
        cards: U(Array.from({ length: 16 }, (l, h) => h % 8), i),
        labels: r.labels,
        found: [],
        flipped: [],
        pairs: 0,
        turns: 0
      });
    } else if (t === "penalty") {
      Object.assign(o, {
        round: 0,
        total: 10,
        opponent: Array.from({ length: 10 }, () => Math.floor(i() * 3)),
        goals: 0,
        saves: 0,
        history: []
      });
    } else if (t === "lineup") {
      Object.assign(o, {
        names: r.names,
        hidden: U(Array.from({ length: 11 }, (l, h) => h), i).slice(0, 5),
        round: 0,
        correct: 0,
        stage: "show",
        ready: s + 8000
      });
    } else if (t === "chrono") {
      Object.assign(o, {
        events: U(r.events, i),
        chosen: []
      });
    } else if (["mystery", "shirts"].includes(t)) {
      Object.assign(o, {
        questions: U(r.questions, i),
        round: 0,
        reveals: 0,
        totalScore: 0
      });
    } else {
      throw Error("Jeu inconnu.");
    }

    return o;
  }

  function Me(t, e = Date.now()) {
    if (t.phase !== "playing") return t;

    if (e >= t.expires) {
      t.phase = "expired";
      t.finished = e;
      t.version++;
      return t;
    }

    if (t.hideAt && e >= t.hideAt) {
      t.flipped = [];
      delete t.hideAt;
      t.version++;
    }

    if (t.type === "lineup" && t.stage === "show" && e >= t.ready) {
      t.stage = "answer";
      t.version++;
    }

    return t;
  }

  function St(t, e, s = Date.now()) {
    let r = structuredClone(t);
    Me(r, s);

    if (r.phase !== "playing") return r;

    if (e === "giveup") {
      return $(
        r,
        r.type === "memory" ? r.pairs * 50 :
          r.type === "penalty" ? (r.goals + r.saves) * 100 : 0,
        s
      );
    }

    if (r.type === "maze") {
      let n = le[e];
      if (!n) throw Error("Direction inconnue.");

      let i = r.position % 5 + n[0];
      let o = Math.floor(r.position / 5) + n[1];
      let l = o * 5 + i;

      if (i < 0 || i > 4 || o < 0 || o > 4 || r.walls.includes(l))
        throw Error("Passage bloqué.");

      r.position = l;
      r.moves++;

      if (l === 24) return $(r, 1000 - 50 * (r.moves - r.optimal), s);
      if (r.moves >= r.budget) return $(r, 0, s);
    }

    if (r.type === "memory") {
      let n = Number(e);

      if (
        !Number.isInteger(n) || n < 0 || n > 15 ||
        r.found.includes(n) || r.flipped.includes(n) || r.hideAt
      )
        throw Error("Choisis un cadeau caché.");

      r.flipped.push(n);

      if (r.flipped.length === 2) {
        r.turns++;

        if (r.cards[r.flipped[0]] === r.cards[r.flipped[1]]) {
          r.found.push(...r.flipped);
          r.flipped = [];
          r.pairs++;

          if (r.pairs === 8)
            return $(r, Math.max(500, 1000 - 20 * (r.turns - 8)), s);
        } else {
          r.hideAt = s + 1600;
        }
      }
    }

    if (r.type === "penalty") {
      let n = Number(e);

      if (![0, 1, 2].includes(n))
        throw Error("Choisis gauche, centre ou droite.");

      let i = r.round % 2 === 0;
      let o = i ? n !== r.opponent[r.round] : n === r.opponent[r.round];

      if (o) {
        if (i) r.goals++;
        else r.saves++;
      }

      r.history.push({
        tir: i,
        success: o,
        choice: n,
        opponent: r.opponent[r.round]
      });

      r.round++;

      if (r.round === r.total)
        return $(r, (r.goals + r.saves) * 100, s);
    }

    if (r.type === "lineup") {
      if (r.stage !== "answer")
        throw Error("Observe la composition pendant 8 secondes.");

      let n = Number(e);

      if (!Number.isInteger(n) || n < 0 || n > 10)
        throw Error("Choix invalide.");

      if (n === r.hidden[r.round]) r.correct++;
      r.round++;

      if (r.round === 5) return $(r, r.correct * 200, s);
    }

    if (r.type === "chrono") {
      if (e === "clear") {
        r.chosen = [];
      } else if (e === "submit") {
        if (r.chosen.length !== 5)
          throw Error("Classe les 5 souvenirs.");

        let n = [...r.events].sort((i, o) => i.year - o.year);

        return $(
          r,
          r.chosen.filter((i, o) => r.events[i].year === n[o].year).length * 200,
          s
        );
      } else {
        let n = Number(e);

        if (!Number.isInteger(n) || n < 0 || n > 4 || r.chosen.includes(n))
          throw Error("Choisis un souvenir encore disponible.");

        r.chosen.push(n);
      }
    }

    if (["mystery", "shirts"].includes(r.type)) {
      if (e === "reveal") {
        if (r.reveals >= 4)
          throw Error("Image entièrement dévoilée.");

        r.reveals++;
      } else {
        let n = Number(e);
        let i = r.questions[r.round];

        if (![0, 1, 2, 3].includes(n))
          throw Error("Choix invalide.");

        if (n === i.answer)
          r.totalScore += 1000 - r.reveals * 200;

        r.round++;
        r.reveals = 0;

        if (r.round === r.questions.length)
          return $(r, r.totalScore / r.questions.length, s);
      }
    }

    r.version++;
    return r;
  }

  var vt = t => ({
    maze:
      "Guide le ballon jusqu’au cadeau avec les flèches, sans épuiser tes déplacements.",
    memory:
      "Retourne deux cadeaux et retrouve les 8 paires. Moins de tours = plus de points.",
    penalty:
      "Alterne 5 tirs et 5 plongeons. Choisis gauche, centre ou droite : 100 points par but ou arrêt.",
    lineup:
      "Observe les 11 noms pendant 8 secondes, puis retrouve les 5 noms manquants.",
    chrono:
      "Classe les 5 souvenirs du plus ancien au plus récent, puis confirme.",
    mystery:
      "Reconnais l’image sous la neige. Dévoiler une étape supplémentaire réduit les points de la question.",
    shirts:
      "Reconnais les maillots à partir des détails. Dévoile davantage d’image si nécessaire."
  })[t];

  qe.exports = {
    create: Nt,
    act: St,
    advance: Me,
    shortest: oe,
    V: le,
    shuffle: U,
    rng: Le,
    instructions: vt
  };
});

// Contenus modifiables

var $e = P((hr, xe) => {
  var Rt = [
    { label: "Création du club", year: 1970 },
    { label: "Première Coupe de France", year: 1982 },
    { label: "Premier titre de champion de France", year: 1986 },
    { label: "Victoire en Coupe des vainqueurs de coupe", year: 1996 },
    { label: "Première Champions League", year: 2025 }
  ];

  var ce = {
    2: {
      ready: true,
      labels: [
        "Raí", "Pauleta", "Cavani", "Verratti",
        "Formiga", "Katoto", "Diani", "Kiedrzynek"
      ]
    },
    6: {
      ready: true,
      labels: [
        "Karabatic", "Hansen", "Omeyer", "Abalo",
        "Remili", "Syprzak", "Narcisse", "Gérard"
      ]
    },
    9: {
      ready: true,
      labels: [
        "Domicile 1973", "Domicile 1986", "Domicile 1994", "Domicile 1996",
        "Domicile 2000", "Domicile 2013", "Domicile 2020", "Domicile 2025"
      ],
      note:
        "Libellés de démonstration à valider. Cette grille utilise des noms, pas des photos de maillots."
    },
    21: {
      ready: true,
      labels: [
        "Football masculin", "Football féminin", "Handball", "Parc des Princes",
        "Tour Eiffel", "Fleur de lys", "Rouge et Bleu", "Paris"
      ]
    },
    7: {
      ready: true,
      names: [
        "Donnarumma", "Hakimi", "Marquinhos", "Pacho", "Nuno Mendes",
        "Vitinha", "João Neves", "Fabián Ruiz", "Doué", "Dembélé",
        "Kvaratskhelia"
      ],
      note: "Composition de jeu, pas une feuille de match actuelle."
    },
    18: {
      ready: true,
      names: [
        "Endler", "Lawrence", "Paredes", "Dudek", "Morroni",
        "Geyoro", "Däbritz", "Formiga", "Diani", "Katoto", "Bachmann"
      ],
      note: "Noms de l’histoire du PSG féminin, pas une feuille de match actuelle."
    },
    13: {
      ready: true,
      events: Rt
    }
  };

  for (let t of [5, 14, 22])
    ce[t] = {
      ready: false,
      questions: [{
        prompt: "Quel symbole se cache sous la neige ?",
        options: ["Tour Eiffel", "Parc des Princes", "Ballon", "Fleur de lys"],
        answer: 0,
        illustration: "tower"
      }],
      note: "Démonstration : importer le contenu validé avant publication."
    };

  ce[19] = {
    ready: false,
    questions: [{
      prompt: "Quel maillot reconnais-tu ?",
      options: ["Bande centrale", "Bande diagonale", "Blanc", "Noir"],
      answer: 0,
      illustration: "shirt"
    }],
    note: "Démonstration : importer les photos et réponses validées."
  };

  function wt(t, e, s) {
    if (!e || typeof e.ready !== "boolean")
      throw Error("ready doit être true ou false.");

    let r = n =>
      Array.isArray(n) &&
      n.every(i => typeof i === "string" && i.trim() && i.length <= 60) &&
      new Set(n).size === n.length;

    if (s === "memory" && (!r(e.labels) || e.labels.length !== 8))
      throw Error("Il faut 8 libellés distincts.");

    if (s === "lineup" && (!r(e.names) || e.names.length !== 11))
      throw Error("Il faut 11 noms distincts.");

    if (
      s === "chrono" && (
        !Array.isArray(e.events) ||
        e.events.length !== 5 ||
        !e.events.every(
          n => typeof n.label === "string" &&
            n.label.length < 90 && Number.isInteger(n.year)
        ) ||
        new Set(e.events.map(n => n.year)).size !== 5
      )
    )
      throw Error("Il faut 5 événements datés distincts.");

    if (
      ["mystery", "shirts"].includes(s) && (
        !Array.isArray(e.questions) ||
        e.questions.length < 1 ||
        e.questions.length > 5 ||
        !e.questions.every(
          n => typeof n.prompt === "string" &&
            n.prompt.length < 150 &&
            r(n.options) &&
            n.options.length === 4 &&
            Number.isInteger(n.answer) &&
            n.answer >= 0 && n.answer < 4 &&
            (!n.image || /^[a-zA-Z0-9_.-]+$/.test(n.image))
        )
      )
    )
      throw Error(
        "Questions : 4 choix distincts, answer entre 0 et 3, image = nom local sans chemin."
      );

    return e;
  }

  xe.exports = { defaults: ce, validate: wt };
});

// Pronostics

var de = P((yr, ke) => {
  var { parseDate: It } = ie();

  function At(t) {
    if (
      !t ||
      typeof t.home !== "string" ||
      typeof t.away !== "string" ||
      !["home", "away"].includes(t.psg) ||
      t.home.length > 60 || t.away.length > 60
    )
      throw Error("Rencontre : home, away et psg=home/away requis.");

    let e = It(t.kickoff);

    if (
      !Array.isArray(t.players) ||
      t.players.length < 1 || t.players.length > 24 ||
      !t.players.every(s => typeof s === "string" && s.trim() && s.length < 60) ||
      new Set(t.players).size !== t.players.length
    )
      throw Error("players : 1 à 24 noms PSG distincts.");

    return { ...t, start: e };
  }

  function Dt(t, e) {
    if (
      !t ||
      ![t.home, t.away].every(r => Number.isInteger(r) && r >= 0 && r <= 20) ||
      ![t.scorer, t.assist].every(r => r === "NONE" || e.players.includes(r))
    )
      throw Error("Pronostic incomplet : score, buteur et passeur requis.");

    if (
      (e.psg === "home" ? t.home : t.away) === 0 &&
      (t.scorer !== "NONE" || t.assist !== "NONE")
    )
      throw Error("Pour zéro but PSG, choisir Aucun en buteur et passeur.");

    return t;
  }

  function Ct(t, e) {
    if (
      !t ||
      ![t.home, t.away].every(r => Number.isInteger(r) && r >= 0 && r <= 50) ||
      !/^https:\/\//.test(t.source || "") ||
      !Array.isArray(t.scorers) ||
      !Array.isArray(t.assists)
    )
      throw Error(
        "Résultat : home/away, scorers/assists et source HTTPS requis."
      );

    for (let r of [...t.scorers, ...t.assists])
      if (!e.players.includes(r))
        throw Error("Nom absent de la liste initiale : " + r);

    let s = e.psg === "home" ? t.home : t.away;

    if (s === 0 && (t.scorers.length || t.assists.length))
      throw Error("Zéro but PSG : listes vides.");

    if (t.scorers.length > s || t.assists.length > s)
      throw Error("Trop de buteurs/passeurs.");

    return t;
  }

  function Ge(t, e) {
    let s = (n, i) => Math.sign(n - i);

    let r = {
      resultat: s(t.home, t.away) === s(e.home, e.away) ? 300 : 0,
      score: t.home === e.home && t.away === e.away ? 400 : 0,
      buteur: (
        t.scorer === "NONE" ? e.scorers.length === 0 : e.scorers.includes(t.scorer)
      ) ? 150 : 0,
      passeur: (
        t.assist === "NONE" ? e.assists.length === 0 : e.assists.includes(t.assist)
      ) ? 150 : 0
    };

    return {
      score: Object.values(r).reduce((n, i) => n + i, 0),
      detail: r
    };
  }

  function Ot(t) {
    t.db.exec(`
      CREATE TABLE IF NOT EXISTS predictions(
        year INTEGER, day INTEGER, uid TEXT, name TEXT,
        pick TEXT, confirmed INTEGER DEFAULT 0, created INTEGER,
        PRIMARY KEY(year,day,uid)
      );
      CREATE TABLE IF NOT EXISTS settlements(
        year INTEGER, day INTEGER, outcome TEXT, actor TEXT, created INTEGER,
        PRIMARY KEY(year,day)
      );
    `);
  }

  function Pt(t, e, s, r, n) {
    let i = t.db.prepare(
      "SELECT * FROM predictions WHERE year=? AND day=? AND uid=?"
    ).get(e, s, r);

    return i ? { ...i, pick: JSON.parse(i.pick) } : {
      year: e,
      day: s,
      uid: r,
      name: n,
      pick: { home: null, away: null, scorer: null, assist: null },
      confirmed: 0,
      created: Date.now()
    };
  }

  function Lt(t, e) {
    t.tx(() => {
      if (
        t.db.prepare(
          "SELECT confirmed FROM predictions WHERE year=? AND day=? AND uid=?"
        ).get(e.year, e.day, e.uid)?.confirmed
      )
        throw Error("Ton pronostic est déjà confirmé.");

      t.db.prepare(`
        INSERT INTO predictions VALUES(?,?,?,?,?,?,?)
        ON CONFLICT(year,day,uid)
        DO UPDATE SET
          pick=excluded.pick,
          confirmed=excluded.confirmed,
          name=excluded.name
      `).run(
        e.year, e.day, e.uid, e.name,
        JSON.stringify(e.pick), e.confirmed, e.created
      );
    });

    return e;
  }

  function Mt(t, e, s, r, n) {
    return t.tx(() => {
      if (
        t.db.prepare(
          "SELECT * FROM settlements WHERE year=? AND day=?"
        ).get(e, s)
      )
        throw Error(
          "Résultat déjà enregistré. Une correction nécessite une intervention documentée du staff."
        );

      let o = t.db.prepare(
        "SELECT * FROM predictions WHERE year=? AND day=? AND confirmed=1"
      ).all(e, s);

      for (let l of o) {
        if (
          t.db.prepare(
            "SELECT 1 FROM exclusions WHERE year=? AND day=? AND uid=?"
          ).get(e, s, l.uid)
        )
          continue;

        let h = Ge(JSON.parse(l.pick), r);

        t.db.prepare(`
          INSERT INTO results(
            id,year,day,type,uid,name,score,duration,won,finished
          ) VALUES(?,?,?,?,?,?,?,?,?,?)
        `).run(
          `prono-${e}-${s}-${l.uid}`,
          e, s, "prediction", l.uid, l.name,
          h.score, 0, Number(h.score === 1000), l.created
        );
      }

      t.db.prepare(
        "INSERT INTO settlements VALUES(?,?,?,?,?)"
      ).run(e, s, JSON.stringify(r), n, Date.now());

      t.log(n, "settle", {
        year: e,
        day: s,
        outcome: r,
        participants: o.length
      });

      return o.length;
    });
  }

  ke.exports = {
    fixture: At,
    pick: Dt,
    outcome: Ct,
    points: Ge,
    init: Ot,
    draft: Pt,
    save: Lt,
    settle: Mt
  };
});

// Visuels PSG

var Ue = P((gr, Fe) => {
  var { createCanvas: qt, loadImage: pe } = require("@napi-rs/canvas");
  var K = require("node:path");
  var me = require("node:fs");

  var y = {
    navy: "#061a3b",
    blue: "#123467",
    red: "#aa0710",
    gold: "#ddcf98",
    white: "#f7f4e9"
  };

  var z;
  var je = K.join(__dirname, "assets");

  function N(t, e, s, r, n = 26, i = y.white, o = 1000) {
    t.font = `${n >= 35 ? "bold " : ""}${n}px sans-serif`;
    t.fillStyle = i;

    while (t.measureText(String(e)).width > o && String(e).length > 2)
      e = String(e).slice(0, -2) + "…";

    t.fillText(String(e), s, r);
  }

  function D(t, e, s, r, n, i, o = 12) {
    t.fillStyle = i;
    t.beginPath();
    t.roundRect(e, s, r, n, o);
    t.fill();
  }

  async function fe(t, e) {
    let s = qt(1200, 800);
    let r = s.getContext("2d");
    let n = process.env.PSG_BACKGROUND_FILE || K.join(je, "fond-bleu.png");

    if (!z && me.existsSync(n)) z = await pe(n);

    if (z) {
      r.drawImage(z, 0, 0, 1200, 800);
    } else {
      let i = r.createLinearGradient(0, 0, 1200, 800);
      i.addColorStop(0, y.navy);
      i.addColorStop(1, y.blue);
      r.fillStyle = i;
      r.fillRect(0, 0, 1200, 800);
      r.strokeStyle = "#ddcf9818";
      r.lineWidth = 3;

      for (let [o, l] of [[1080, 110], [110, 650], [1000, 600]]) {
        for (let h = 0; h < 6; h++) {
          r.beginPath();
          r.moveTo(o, l);
          r.lineTo(
            o + 150 * Math.cos(h * Math.PI / 3),
            l + 150 * Math.sin(h * Math.PI / 3)
          );
          r.stroke();
        }
      }
    }

    r.fillStyle = "#061a3b88";
    r.fillRect(0, 0, 1200, 800);

    D(r, 35, 30, 90, 70, y.red);
    N(r, String(t.day).padStart(2, "0"), 52, 80, 44, y.gold, 80);
    N(r, "PARIS SAINT-GERMAIN", 150, 55, 24, y.gold);
    N(r, "CALENDRIER DE L’AVENT", 150, 91, 30);
    N(r, t.title, 40, 155, 38, y.white, 1120);
    N(r, e, 42, 193, 22, y.gold, 1110);
    N(
      r,
      "Prolonge l’expérience sur MyParis avec le bouton sous le jeu",
      42, 768, 20, y.gold, 1110
    );

    return { cv: s, c: r };
  }

  function xt(t, e, s, r, n, i) {
    D(t, s, r, n, i, "#f2ecd3");
    t.strokeStyle = y.navy;
    t.lineWidth = 12;

    if (e.illustration === "shirt") {
      t.fillStyle = y.navy;
      t.beginPath();
      t.moveTo(s + n * .3, r + i * .15);
      t.lineTo(s + n * .1, r + i * .35);
      t.lineTo(s + n * .25, r + i * .5);
      t.lineTo(s + n * .3, r + i * .42);
      t.lineTo(s + n * .3, r + i * .9);
      t.lineTo(s + n * .7, r + i * .9);
      t.lineTo(s + n * .7, r + i * .42);
      t.lineTo(s + n * .75, r + i * .5);
      t.lineTo(s + n * .9, r + i * .35);
      t.lineTo(s + n * .7, r + i * .15);
      t.closePath();
      t.fill();
      D(t, s + n * .46, r + i * .2, n * .08, i * .7, y.red, 0);
    } else {
      t.beginPath();
      t.moveTo(s + n * .5, r + i * .1);
      t.lineTo(s + n * .2, r + i * .9);
      t.moveTo(s + n * .5, r + i * .1);
      t.lineTo(s + n * .8, r + i * .9);

      for (let o of [.45, .65, .82]) {
        t.moveTo(s + n * (.5 - .3 * (o - .1) / .8), r + i * o);
        t.lineTo(s + n * (.5 + .3 * (o - .1) / .8), r + i * o);
      }

      t.stroke();
    }
  }

  async function $t(t, e, s) {
    let { cv: r, c: n } = await fe(
      t,
      e.phase === "done" ? `Résultat : ${e.score} / 1 000 points` :
        e.phase === "expired" ? "Partie expirée" : "Partie en cours"
    );

    if (e.phase !== "playing") {
      N(
        n,
        e.phase === "done" ? `${e.score} / 1 000` : "Temps écoulé",
        65, 385, 85, y.gold
      );
      N(
        n,
        e.phase === "done"
          ? "Ton meilleur résultat est conservé au classement."
          : "Reviens au panneau pour voir tes possibilités de jeu.",
        65, 470, 27
      );
      return r.toBuffer("image/png");
    }

    if (e.type === "memory") {
      for (let i = 0; i < 16; i++) {
        let o = e.found.includes(i) || e.flipped.includes(i);
        let l = 45 + i % 4 * 280;
        let h = 225 + Math.floor(i / 4) * 115;

        D(n, l, h, 260, 95, o ? y.gold : y.blue);
        N(
          n,
          o ? e.labels[e.cards[i]] : String(i + 1),
          l + 15, h + 56, 25,
          o ? y.navy : y.white, 232
        );
      }
    }

    if (e.type === "maze") {
      for (let i = 0; i < 25; i++) {
        let o = 70 + i % 5 * 135;
        let l = 215 + Math.floor(i / 5) * 91;

        D(n, o, l, 123, 80, e.walls.includes(i) ? "#061428" : y.gold, 6);

        if (e.position === i) {
          n.beginPath();
          n.fillStyle = y.red;
          n.arc(o + 61, l + 40, 24, 0, Math.PI * 2);
          n.fill();
          N(n, "●", o + 48, l + 49, 28, y.white);
        } else if (i === 24) {
          D(n, o + 35, l + 18, 55, 45, y.red, 4);
          D(n, o + 58, l + 18, 10, 45, y.white, 0);
        }
      }

      N(n, `${e.budget - e.moves} déplacements`, 810, 370, 28);
    }

    if (e.type === "penalty") {
      n.strokeStyle = y.gold;
      n.lineWidth = 9;
      n.strokeRect(155, 255, 880, 300);

      for (let i = 0; i < 3; i++) {
        D(n, 185 + i * 285, 335, 245, 130, y.blue);
        N(n, ["GAUCHE", "CENTRE", "DROITE"][i], 205 + i * 285, 410, 28);
      }

      N(
        n,
        `${e.round % 2 === 0 ? "À toi de tirer" : "À toi de plonger"} • ${e.round + 1}/10`,
        165, 610, 34, y.gold
      );
      N(n, `${e.goals} buts • ${e.saves} arrêts`, 165, 665, 28);
    }

    if (e.type === "lineup") {
      for (let i = 0; i < 11; i++) {
        let o = 55 + i % 4 * 285;
        let l = 245 + Math.floor(i / 4) * 115;
        let h = e.stage !== "show" && e.hidden.includes(i);

        D(n, o, l, 265, 90, y.blue);
        N(n, `${i + 1}. ${h ? "?" : e.names[i]}`, o + 12, l + 52, 24, y.white, 240);
      }

      N(
        n,
        e.stage === "show"
          ? "Mémorise les noms"
          : `Quel nom occupait la case ${e.hidden[e.round] + 1} ?`,
        60, 675, 32, y.gold
      );
    }

    if (e.type === "chrono") {
      e.events.forEach((i, o) => {
        D(n, 50, 235 + o * 80, 1100, 65, y.blue);
        N(n, `${o + 1}. ${i.label}`, 70, 278 + o * 80, 25, y.white, 1060);
      });

      N(n, "Ordre : " + e.chosen.map(i => i + 1).join(" → "), 60, 700, 26, y.gold);
    }

    if (["mystery", "shirts"].includes(e.type)) {
      let i = e.questions[e.round];
      let o;

      if (i.image) {
        let g = K.join(s, "images", i.image);
        let E = K.join(je, i.image);

        if (me.existsSync(g)) o = await pe(g);
        else if (me.existsSync(E)) o = await pe(E);
      }

      if (o) n.drawImage(o, 200, 230, 800, 430);
      else xt(n, i, 200, 230, 800, 430);

      let l = 40;
      let h = 8 + e.reveals * 8;

      for (let g = h; g < l; g++)
        D(n, 200 + g % 8 * 100, 230 + Math.floor(g / 8) * 86, 100, 86, y.navy, 0);

      N(n, i.prompt, 70, 711, 27, y.gold, 1100);
    }

    return r.toBuffer("image/png");
  }

  async function Gt(t) {
    let { cv: e, c: s } = await fe(t, "Une nouvelle case, un nouveau défi");

    N(
      s,
      t.type === "prediction" ? "À VOUS DE PRONOSTIQUER" : "À VOUS DE JOUER",
      65, 375, 62, y.gold
    );
    N(s, "Classement du jour • par animation • général", 65, 460, 30);
    N(s, "ICI C’EST PARIS", 65, 605, 37, y.white);

    return e.toBuffer("image/png");
  }

  async function kt(t, e, s = 0) {
    let { cv: r, c: n } = await fe(
      { day: 24, title: t },
      "Classement du calendrier"
    );

    e.slice(0, 10).forEach((i, o) => {
      let l = 225 + o * 46;
      D(n, 45, l, 1110, 41, o === 0 ? y.red : y.blue, 6);
      N(n, `${s + o + 1}. ${i.name}`, 62, l + 29, 24, y.white, 850);
      N(n, String(i.score), 1000, l + 29, 25, y.gold);
    });

    return r.toBuffer("image/png");
  }

  Fe.exports = {
    board: $t,
    banner: Gt,
    ranking: kt,
    palette: y
  };
});

// Interface Discord

var We = P((Er, _e) => {
  var {
    EmbedBuilder: Q,
    ActionRowBuilder: L,
    ButtonBuilder: Be,
    ButtonStyle: v,
    AttachmentBuilder: ye,
    StringSelectMenuBuilder: jt
  } = require("discord.js");

  var Ft = J();
  var H = ue();
  var ge = Ue();
  var Ut = de();
  var _ = { parse: [] };

  var S = (t, e, s = v.Secondary, r = false) =>
    new Be()
      .setCustomId(t)
      .setLabel(e.slice(0, 80))
      .setStyle(s)
      .setDisabled(r);

  var C = t => Array.from(
    { length: Math.ceil(t.length / 5) },
    (e, s) => new L().addComponents(t.slice(s * 5, s * 5 + 5))
  );

  function he(t) {
    return new Be()
      .setStyle(v.Link)
      .setLabel("Prolonge l’expérience sur MyParis")
      .setURL(t.myparis);
  }

  function k(t, e) {
    let s = [...t];

    if (
      s.length &&
      s.at(-1).components.length < 5 &&
      !s.at(-1).components.some(r => r.data.type === 3)
    )
      s.at(-1).addComponents(he(e));
    else
      s.push(new L().addComponents(he(e)));

    if (s.length > 5)
      throw Error("Trop de composants Discord.");

    return s;
  }

  function He(t, e) {
    let s = t.state;
    let r = i => `pg:s:${t.id}:${s.version}:${i}`;

    if (s.phase !== "playing")
      return k(C([
        S(`pg:l:day:${t.day}:0`, "Classement du jour"),
        S("pg:l:general:0:0", "Classement général")
      ]), e);

    let n = [];

    if (s.type === "memory") {
      n = Array.from({ length: 4 }, (i, o) =>
        new L().addComponents(
          ...Array.from({ length: 4 }, (l, h) => {
            let g = o * 4 + h;
            let E = s.found.includes(g) || s.flipped.includes(g);

            return S(
              r(g),
              E ? s.labels[s.cards[g]] : String(g + 1),
              s.found.includes(g) ? v.Success : v.Secondary,
              E || !!s.hideAt
            );
          })
        )
      );

      n.push(new L().addComponents(
        S(r("giveup"), "Terminer la tentative", v.Danger)
      ));

      return k(n, e);
    }

    if (s.type === "maze")
      n = C(
        ["left", "up", "down", "right"]
          .map((i, o) => S(r(i), ["←", "↑", "↓", "→"][o], v.Primary))
      );

    if (s.type === "penalty")
      n = C(
        ["Gauche", "Centre", "Droite"]
          .map((i, o) => S(r(o), i, v.Primary))
      );

    if (s.type === "lineup") {
      if (s.stage === "show") {
        n = C([
          S(r("wait"), "Observe la composition…", v.Secondary, true)
        ]);
      } else {
        let i = s.hidden[s.round];

        let o = H.shuffle([
          i,
          ...H.shuffle(
            s.names.map((l, h) => h).filter(l => l !== i),
            H.rng(t.id + ":" + s.round)
          ).slice(0, 3)
        ], H.rng(t.id + "opts" + s.round));

        n = C(o.map(l => S(r(l), s.names[l], v.Primary)));
      }
    }

    if (s.type === "chrono") {
      n = C(
        s.events.map((i, o) =>
          S(r(o), `${o + 1}. ${i.label}`, v.Primary, s.chosen.includes(o))
        )
      );

      n.push(new L().addComponents(
        S(r("submit"), "Confirmer", v.Success, s.chosen.length !== 5),
        S(r("clear"), "Recommencer l’ordre")
      ));
    }

    if (["mystery", "shirts"].includes(s.type)) {
      let i = s.questions[s.round];

      n = C(i.options.map((o, l) => S(r(l), o, v.Primary)));

      n.push(new L().addComponents(
        S(r("reveal"), "Dévoiler davantage", v.Secondary, s.reveals >= 4)
      ));
    }

    n.push(new L().addComponents(
      S(r("giveup"), "Terminer la tentative", v.Danger)
    ));

    return k(n, e);
  }

  async function Bt(t, e, s, r = false) {
    return {
      embeds: [
        new Q()
          .setColor(11142928)
          .setTitle(`Case ${t.day} • ${t.title}`)
          .setDescription(
            t.description + "\n\n" +
            (r
              ? "Aperçu privé : aucune participation classée."
              : `**Ouverture <t:${Math.floor(e.opens / 1000)}:f>**
**Clôture <t:${Math.floor(e.closes / 1000)}:f>**
${t.type === "prediction"
  ? "Un seul pronostic confirmé, définitif."
  : `${s.attempts} tentative(s) classée(s), meilleur score retenu.`}
Jusqu’à **1 000 points** pour ce défi.`)
          )
          .setImage("attachment://psg-case.png")
          .setFooter({
            text: `PSG Avent ${s.year} • pgday:${s.year}:${t.day}`
          })
      ],
      files: [
        new ye(await ge.banner(t), { name: "psg-case.png" })
      ],
      components: k(C([
        S(
          `pg:p:${t.day}:${r ? "practice" : "ranked"}`,
          t.type === "prediction" ? "Mon pronostic" :
            r ? "Tester" : "Jouer / Reprendre",
          v.Primary,
          !!e.closed && !r
        ),
        S(`pg:l:day:${t.day}:0`, "Classement du jour"),
        S("pg:l:general:0:0", "Classement général")
      ]), s),
      allowedMentions: _
    };
  }

  async function Ht(t, e, s) {
    let r = t.state;

    let n = new Q()
      .setColor(11142928)
      .setTitle(e.title)
      .setDescription(
        r.phase === "playing" ? H.instructions(r.type) :
          r.phase === "done"
            ? `**${r.score}/1 000 points**
${t.ranked ? "Résultat classé enregistré." : "Entraînement, sans points au classement."}`
            : "Partie expirée, sans score classé."
      )
      .setImage("attachment://partie.png")
      .setFooter({
        text: `${t.ranked ? "Classée" : "Entraînement"} • ${t.id} • ${t.uid}`
      });

    if (r.type === "penalty" && r.history.length) {
      let i = r.history.at(-1);

      n.addFields({
        name: "Action précédente",
        value: i.tir
          ? i.success ? "But !" : "Arrêt du gardien."
          : i.success ? "Bien joué, arrêt !" : "But encaissé."
      });
    }

    return {
      content:
        `${t.ranked ? "Tentative " + t.attempt + "/" + s.attempts : "Entraînement"}` +
        `${r.content?.ready === false ? " • CONTENU DE DÉMONSTRATION" : ""}`,
      embeds: [n],
      attachments: [],
      files: [
        new ye(await ge.board(e, r, s.data), { name: "partie.png" })
      ],
      components: He(t, s),
      allowedMentions: _
    };
  }

  async function _t(t, e, { day: s = null, type: r = null, page: n = 0 } = {}) {
    let i = t.ranking(e.year, { day: s, type: r });
    let o = Math.max(1, Math.ceil(i.length / 10));

    n = Math.max(0, Math.min(n, o - 1));

    let l = i.slice(n * 10, n * 10 + 10);
    let h = s ? `Classement du ${s} décembre` :
      r ? Ft.labels[r] : "Classement général";

    let g = new Q()
      .setTitle(h)
      .setColor(11142928)
      .setDescription(
        l.length
          ? l.map((q, G) =>
            `**${G + 1 + n * 10}.** <@${q.uid}> • **${q.score} pts** • ${q.days} défi(s)`
          ).join("\n")
          : "Aucun résultat classé. Les pronos apparaissent après leur règlement."
      )
      .setFooter({
        text: `Page ${n + 1}/${o} • Points Discord distincts des points MyParis`
      })
      .setImage("attachment://classement.png");

    let E = s ? "day" : r ? "type" : "general";
    let T = s || r || 0;

    return {
      embeds: [g],
      attachments: [],
      files: [
        new ye(await ge.ranking(h, l, n * 10), { name: "classement.png" })
      ],
      components: k(C([
        S(`pg:l:${E}:${T}:${n - 1}`, "Précédent", v.Secondary, n === 0),
        S(`pg:l:${E}:${T}:${n + 1}`, "Suivant", v.Secondary, n === o - 1)
      ]), e),
      allowedMentions: _
    };
  }

  function Wt(t, e, s, r = null) {
    let n = t.pick;
    let i = r && t.confirmed ? Ut.points(n, r) : null;

    let o = new Q()
      .setTitle(`${e.home} - ${e.away}`)
      .setColor(11142928)
      .setDescription(
        `**Ton score : ${n.home ?? "?"} - ${n.away ?? "?"}**
Buteur PSG : ${n.scorer === "NONE" ? "Aucun" : n.scorer || "À choisir"}
Passeur PSG : ${n.assist === "NONE" ? "Aucun" : n.assist || "À choisir"}

${i
  ? `Résultat : **${i.score}/1 000 points**`
  : t.confirmed
    ? "Pronostic confirmé et définitif."
    : "Complète ton score et tes choix, puis confirme."}

Match <t:${Math.floor(e.start / 1000)}:f>
Score retenu à la fin du temps réglementaire, hors prolongation et tirs au but.`
      );

    let l = [];

    if (!t.confirmed && !s.predReadOnly) {
      l.push(new L().addComponents(
        S(`pg:score:${t.day}`, "Choisir le score", v.Primary)
      ));

      for (let h of ["scorer", "assist"]) {
        l.push(new L().addComponents(
          new jt()
            .setCustomId(`pg:select:${t.day}:${h}`)
            .setPlaceholder(h === "scorer" ? "Buteur PSG" : "Passeur PSG")
            .addOptions([
              { label: "Aucun", value: "NONE" },
              ...e.players.map((g, E) => ({ label: g, value: String(E) }))
            ])
        ));
      }

      l.push(new L().addComponents(
        S(`pg:confirm:${t.day}`, "Confirmer définitivement", v.Success)
      ));
    } else {
      l = C([S(`pg:l:day:${t.day}:0`, "Classement du match")]);
    }

    return {
      content: "",
      embeds: [o],
      attachments: [],
      components: k(l, s),
      allowedMentions: _
    };
  }

  _e.exports = {
    quiet: _,
    btn: S,
    rows: C,
    link: he,
    withLink: k,
    buttons: He,
    panel: Bt,
    game: Ht,
    leaderboard: _t,
    prediction: Wt
  };
});

// Base de données et classements

var Je = P((br, Ye) => {
  var { DatabaseSync: Xt } = require("node:sqlite");
  var {
    mkdirSync: Xe,
    readdirSync: Vt,
    unlinkSync: Yt
  } = require("node:fs");
  var Z = require("node:path");
  var { randomUUID: Ve, randomInt: Jt } = require("node:crypto");

  var Ee = class {
    constructor(e) {
      Xe(e, { recursive: true });
      this.dir = e;
      this.db = new Xt(Z.join(e, "psg-avent.sqlite"));

      this.db.exec(`
        PRAGMA journal_mode=WAL;
        PRAGMA synchronous=FULL;
        PRAGMA busy_timeout=5000;

        CREATE TABLE IF NOT EXISTS settings(
          k TEXT PRIMARY KEY,
          v TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS days(
          year INTEGER, day INTEGER, channel TEXT, message TEXT,
          opens INTEGER, closes INTEGER,
          closed INTEGER DEFAULT 0,
          publishing INTEGER DEFAULT 0,
          PRIMARY KEY(year,day)
        );

        CREATE TABLE IF NOT EXISTS sessions(
          id TEXT PRIMARY KEY,
          year INTEGER, day INTEGER, type TEXT, uid TEXT, name TEXT,
          ranked INTEGER, attempt INTEGER, state TEXT,
          version INTEGER, created INTEGER
        );

        CREATE INDEX IF NOT EXISTS sessions_member
        ON sessions(year,day,uid);

        CREATE TABLE IF NOT EXISTS results(
          id TEXT PRIMARY KEY,
          year INTEGER, day INTEGER, type TEXT, uid TEXT, name TEXT,
          score INTEGER, duration INTEGER, won INTEGER,
          finished INTEGER, valid INTEGER DEFAULT 1
        );

        CREATE INDEX IF NOT EXISTS result_rank
        ON results(year,day,valid,score);

        CREATE TABLE IF NOT EXISTS audit(
          id INTEGER PRIMARY KEY,
          ts INTEGER, actor TEXT, action TEXT, detail TEXT
        );

        CREATE TABLE IF NOT EXISTS draws(
          year INTEGER, day INTEGER, uid TEXT, method TEXT, created INTEGER,
          PRIMARY KEY(year,day)
        );

        CREATE TABLE IF NOT EXISTS lease(
          id INTEGER PRIMARY KEY CHECK(id=1),
          owner TEXT,
          until INTEGER
        );
      `);
    }

    tx(e) {
      this.db.exec("BEGIN IMMEDIATE");

      try {
        let s = e();
        this.db.exec("COMMIT");
        return s;
      } catch (s) {
        this.db.exec("ROLLBACK");
        throw s;
      }
    }

    acquire() {
      this.owner = Ve();

      this.tx(() => {
        let e = this.db.prepare("SELECT * FROM lease WHERE id=1").get();

        if (e && e.until > Date.now())
          throw Error(
            "Une autre instance du bot utilise déjà ce volume. Garde une seule réplique."
          );

        this.db.prepare(
          "INSERT OR REPLACE INTO lease VALUES(1,?,?)"
        ).run(this.owner, Date.now() + 45000);
      });
    }

    heartbeat() {
      if (
        !this.db.prepare(
          "UPDATE lease SET until=? WHERE id=1 AND owner=?"
        ).run(Date.now() + 45000, this.owner).changes
      )
        throw Error("Verrou de stockage perdu.");
    }

    close() {
      if (this.owner)
        this.db.prepare("DELETE FROM lease WHERE owner=?").run(this.owner);

      this.db.close();
    }

    get(e, s = null) {
      let r = this.db.prepare("SELECT v FROM settings WHERE k=?").get(e);
      return r ? JSON.parse(r.v) : s;
    }

    set(e, s) {
      this.db.prepare(
        "INSERT OR REPLACE INTO settings VALUES(?,?)"
      ).run(e, JSON.stringify(s));
    }

    log(e, s, r) {
      this.db.prepare(
        "INSERT INTO audit(ts,actor,action,detail) VALUES(?,?,?,?)"
      ).run(Date.now(), e, s, JSON.stringify(r));
    }

    day(e, s) {
      return this.db.prepare(
        "SELECT * FROM days WHERE year=? AND day=?"
      ).get(e, s);
    }

    claimDay(e, s, r, n, i) {
      return this.tx(() => {
        let o = this.day(e, s);

        if (o?.message || o?.publishing)
          throw Error(
            "Ce défi a déjà un panneau ou une publication à vérifier. Utilise /psg statut."
          );

        this.db.prepare(`
          INSERT INTO days(year,day,channel,opens,closes,publishing)
          VALUES(?,?,?,?,?,1)
          ON CONFLICT(year,day)
          DO UPDATE SET
            publishing=1,
            channel=excluded.channel,
            opens=excluded.opens,
            closes=excluded.closes
        `).run(e, s, r, n, i);
      });
    }

    posted(e, s, r) {
      this.db.prepare(
        "UPDATE days SET message=?,publishing=0 WHERE year=? AND day=?"
      ).run(r, e, s);
    }

    releaseDay(e, s) {
      this.db.prepare(
        "UPDATE days SET publishing=0 WHERE year=? AND day=?"
      ).run(e, s);
    }

    closeDay(e, s) {
      this.db.prepare(
        "UPDATE days SET closed=1 WHERE year=? AND day=?"
      ).run(e, s);
    }

    load(e) {
      let s = this.db.prepare(
        "SELECT * FROM sessions WHERE id=?"
      ).get(e);

      if (!s)
        throw Error("Partie introuvable. Reviens au panneau du jeu.");

      s.state = JSON.parse(s.state);
      return s;
    }

    newSession({
      year: e, day: s, type: r, uid: n, name: i,
      ranked: o, max: l, create: h, now: g = Date.now()
    }) {
      return this.tx(() => {
        let E = this.db.prepare(`
          SELECT id,state FROM sessions
          WHERE year=? AND day=? AND uid=? AND ranked=?
          ORDER BY created DESC
        `).all(e, s, n, Number(o)).find(x => {
          let j = JSON.parse(x.state);
          return j.phase === "playing" && j.expires > g;
        });

        if (E) return this.load(E.id);

        let T = this.db.prepare(`
          SELECT COUNT(*) n FROM sessions
          WHERE year=? AND day=? AND uid=? AND ranked=1
        `).get(e, s, n).n;

        if (o && T >= l)
          throw Error(
            `Tu as utilisé tes ${l} tentatives classées. Tu peux encore t’entraîner.`
          );

        let q = Ve().replaceAll("-", "").slice(0, 16);
        let G = o ? T + 1 : 0;
        let A = h(q, G);

        this.db.prepare(
          "INSERT INTO sessions VALUES(?,?,?,?,?,?,?,?,?,?,?)"
        ).run(
          q, e, s, r, n, i, Number(o), G,
          JSON.stringify(A), A.version, g
        );

        return this.load(q);
      });
    }

    save(e, s) {
      return this.tx(() => {
        if (
          !this.db.prepare(`
            UPDATE sessions SET state=?,version=?
            WHERE id=? AND version=?
          `).run(
            JSON.stringify(e.state), e.state.version, e.id, s
          ).changes
        )
          throw Error(
            "Le plateau a déjà changé. Rouvre ta partie avec Reprendre."
          );

        let n = e.state;

        if (e.ranked && n.phase === "done") {
          this.db.prepare(`
            INSERT OR IGNORE INTO results(
              id,year,day,type,uid,name,score,duration,won,finished
            ) VALUES(?,?,?,?,?,?,?,?,?,?)
          `).run(
            e.id, e.year, e.day, e.type, e.uid, e.name,
            n.score, Math.max(0, n.finished - n.started),
            Number(n.won), n.finished
          );
        }

        return e;
      });
    }

    active() {
      return this.db.prepare(`
        SELECT COUNT(*) n FROM sessions
        WHERE json_extract(state,'$.phase')='playing'
          AND json_extract(state,'$.expires')>?
      `).get(Date.now()).n;
    }

    attempts(e, s, r) {
      return this.db.prepare(`
        SELECT COUNT(*) n FROM sessions
        WHERE year=? AND day=? AND uid=? AND ranked=1
      `).get(e, s, r).n;
    }

    ranking(e, { day: s = null, type: r = null } = {}) {
      let n = "year=? AND valid=1";
      let i = [e];

      if (s) {
        n += " AND day=?";
        i.push(s);
      }

      if (r) {
        n += " AND type=?";
        i.push(r);
      }

      return this.db.prepare(`
        WITH ranked AS (
          SELECT *,
            ROW_NUMBER() OVER(
              PARTITION BY uid,day
              ORDER BY score DESC,duration ASC,finished ASC,id ASC
            ) rn
          FROM results
          WHERE ${n}
        ),
        totals AS (
          SELECT
            uid,
            SUM(score) score,
            SUM(duration) duration,
            COUNT(*) days,
            MIN(finished) first
          FROM ranked
          WHERE rn=1
          GROUP BY uid
        )
        SELECT totals.*,
          (
            SELECT name FROM results r
            WHERE r.year=? AND r.uid=totals.uid
            ORDER BY finished DESC
            LIMIT 1
          ) name
        FROM totals
        ORDER BY score DESC,duration ASC,first ASC,uid ASC
      `).all(...i, e);
    }

    exportDay(e, s) {
      return this.ranking(e, { day: s });
    }

    void(e, s, r, n, i) {
      this.db.prepare(
        "UPDATE results SET valid=0 WHERE year=? AND day=? AND uid=?"
      ).run(e, s, r);

      this.log(i, "invalidate", {
        year: e, day: s, uid: r, reason: n
      });
    }

    draw(e, s, r, n) {
      return this.tx(() => {
        let i = this.day(e, s);

        if (!i || (!i.closed && Date.now() < i.closes))
          throw Error("Clôture le défi avant de désigner un gagnant.");

        let o = this.db.prepare(
          "SELECT * FROM draws WHERE year=? AND day=?"
        ).get(e, s);

        if (o) return { ...o, existing: true };

        let l = this.ranking(e, { day: s });

        if (!l.length)
          throw Error("Aucune participation classée terminée et valide.");

        let h = r === "top" ? l[0] : l[Jt(l.length)];

        this.db.prepare(
          "INSERT INTO draws VALUES(?,?,?,?,?)"
        ).run(e, s, h.uid, r, Date.now());

        this.log(n, "draw", {
          year: e,
          day: s,
          method: r,
          uid: h.uid,
          candidates: l.map(g => g.uid)
        });

        return { uid: h.uid, method: r, existing: false };
      });
    }

    async backup() {
      let e = Z.join(this.dir, "backups");
      Xe(e, { recursive: true });

      let s = `psg-avent-${new Date().toISOString().replaceAll(":", "-")}.sqlite`;
      let r = Z.join(e, s);
      let { backup: n } = require("node:sqlite");

      await n(this.db, r);

      for (
        let i of Vt(e)
          .filter(o => o.endsWith(".sqlite"))
          .sort()
          .slice(0, -14)
      )
        Yt(Z.join(e, i));

      return r;
    }
  };

  Ye.exports = { Store: Ee };
});

// Commandes

var Qe = P((Tr, Ke) => {
  var {
    SlashCommandBuilder: W,
    PermissionFlagsBits: zt,
    ChannelType: ze
  } = require("discord.js");

  var Kt = J();

  var w = (t, e = true) => t.addIntegerOption(
    s => s
      .setName("jour")
      .setDescription("Jour de la case (1 à 24)")
      .setMinValue(1)
      .setMaxValue(24)
      .setRequired(e)
  );

  var ee = t => t.addAttachmentOption(
    e => e
      .setName("fichier")
      .setDescription("Fichier JSON ou image selon la commande")
      .setRequired(true)
  );

  var Qt = new W()
    .setName("psg")
    .setDescription("Calendrier de l’Avent PSG")
    .setDefaultMemberPermissions(zt.ManageGuild)
    .addSubcommand(t => t
      .setName("config")
      .setDescription("Choisir le salon et la publication automatique")
      .addChannelOption(e => e
        .setName("salon")
        .setDescription("Salon des animations")
        .addChannelTypes(ze.GuildText, ze.GuildAnnouncement)
        .setRequired(true))
      .addBooleanOption(e => e
        .setName("automatique")
        .setDescription("Publier automatiquement aux horaires définis")
        .setRequired(true)))
    .addSubcommand(t => w(t
      .setName("publier")
      .setDescription("Publier le panneau de cette case")))
    .addSubcommand(t => w(t
      .setName("apercu")
      .setDescription("Tester en privé sans points")))
    .addSubcommand(t => w(t
      .setName("horaires")
      .setDescription("Déplacer ou fixer une case avant publication"))
      .addStringOption(e => e
        .setName("ouverture")
        .setDescription("ISO avec fuseau, ex. 2026-12-04T00:00:00+01:00")
        .setRequired(true))
      .addStringOption(e => e
        .setName("fermeture")
        .setDescription("ISO avec fuseau")
        .setRequired(true)))
    .addSubcommand(t => ee(w(t
      .setName("contenu")
      .setDescription("Importer la banque validée pour cette case"))))
    .addSubcommand(t => ee(w(t
      .setName("image")
      .setDescription("Ajouter une image au stock de cette case"))))
    .addSubcommand(t => ee(w(t
      .setName("match")
      .setDescription("Importer la rencontre et la liste PSG"))))
    .addSubcommand(t => ee(w(t
      .setName("resultat")
      .setDescription("Régler les pronos après le match"))))
    .addSubcommand(t => w(t
      .setName("cloturer")
      .setDescription("Fermer immédiatement une case")))
    .addSubcommand(t => w(t
      .setName("exporter")
      .setDescription("Exporter les résultats et rangs"), false))
    .addSubcommand(t => w(t
      .setName("invalider")
      .setDescription("Exclure un membre pour cette case"))
      .addUserOption(e => e
        .setName("membre")
        .setDescription("Membre")
        .setRequired(true))
      .addStringOption(e => e
        .setName("motif")
        .setDescription("Motif conservé dans le journal")
        .setRequired(true)))
    .addSubcommand(t => w(t
      .setName("reparer")
      .setDescription("Retrouver un panneau après une publication interrompue")))
    .addSubcommand(t => t
      .setName("statut")
      .setDescription("Voir les 24 cases et les prérequis"))
    .addSubcommand(t => t
      .setName("sauvegarde")
      .setDescription("Sauvegarde privée de la base"))
    .addSubcommand(t => t
      .setName("finaliser")
      .setDescription("Figer le classement après toutes les clôtures et résultats")
      .addStringOption(e => e
        .setName("confirmation")
        .setDescription("Saisir FINALISER")
        .setRequired(true)));

  var Zt = w(
    new W()
      .setName("jouer-psg")
      .setDescription("Jouer ou reprendre une animation PSG"),
    false
  ).addBooleanOption(t => t
    .setName("entrainement")
    .setDescription("Sans score classé"));

  var er = w(
    new W()
      .setName("classement-psg")
      .setDescription("Classement du calendrier PSG"),
    false
  )
    .addStringOption(t => t
      .setName("animation")
      .setDescription("Filtrer une famille de jeux")
      .addChoices(...Object.entries(Kt.labels).map(
        ([e, s]) => ({ name: s, value: e })
      )))
    .addIntegerOption(t => t
      .setName("page")
      .setDescription("Page")
      .setMinValue(1));

  Ke.exports = [
    Qt,
    Zt,
    er,
    new W()
      .setName("mon-score-psg")
      .setDescription("Mes résultats et mon rang"),
    new W()
      .setName("regles-psg")
      .setDescription("Barèmes et classement du calendrier")
  ].map(t => t.setDMPermission(false).toJSON());
});

// Application

var {
  Client: tr,
  GatewayIntentBits: rr,
  Events: be,
  MessageFlags: Ze,
  PermissionFlagsBits: X,
  AttachmentBuilder: et,
  ModalBuilder: sr,
  TextInputBuilder: nr,
  TextInputStyle: ar,
  ActionRowBuilder: ir
} = require("discord.js");

var te = require("node:fs");
var re = require("node:path");
var or = require("node:http");

var {
  config: nt,
  paris: lr,
  parseDate: tt,
  epoch: rt
} = ie();

var se = J();
var V = ue();
var st = $e();
var M = de();
var I = We();
var { Store: ur } = Je();

function at(t) {
  return "\uFEFF" + t.map(e =>
    e.map(s => {
      let r = String(s ?? "");
      if (/^[=+\-@\t\r]/.test(r)) r = "'" + r;
      return '"' + r.replaceAll('"', '""') + '"';
    }).join(";")
  ).join("\r\n");
}

function it() {
  let t = new Map();

  return async (e, s) => {
    let r = (t.get(e) || Promise.resolve())
      .catch(() => {})
      .then(s);

    t.set(e, r);

    try {
      return await r;
    } finally {
      if (t.get(e) === r) t.delete(e);
    }
  };
}

async function ne(t, e = 160000) {
  if (!t || t.size > e)
    throw Error("Fichier absent ou trop volumineux.");

  let s = new URL(t.url);

  if (
    !["cdn.discordapp.com", "media.discordapp.net"].includes(s.hostname) ||
    s.protocol !== "https:"
  )
    throw Error("Joindre le fichier directement dans Discord.");

  let r = await fetch(s, {
    signal: AbortSignal.timeout(15000),
    redirect: "error"
  });

  if (!r.ok) throw Error("Fichier inaccessible.");

  let n = Buffer.from(await r.arrayBuffer());

  if (n.length > e) throw Error("Fichier trop volumineux.");

  return n;
}

async function ot(t = process.env) {
  let e = nt(t);
  let s = new ur(e.data);

  s.acquire();
  M.init(s);

  s.db.exec(`
    CREATE TABLE IF NOT EXISTS exclusions(
      year INTEGER, day INTEGER, uid TEXT,
      PRIMARY KEY(year,day,uid)
    )
  `);

  let r = new tr({ intents: [rr.Guilds] });
  let n = it();
  let i = new Map();
  let o = false;
  let l = false;
  let h = 0;

  let g = a => s.get(
    "content:" + a.day,
    st.defaults[a.day] || { ready: true }
  );

  let E = a => s.get("fixture:" + a.day);
  let T = a => s.day(e.year, a.day);
  let q = () => s.get("channel", e.channel);

  let G = a =>
    a.memberPermissions?.has(X.ManageGuild) ||
    (e.staffRole && a.member?.roles?.cache?.has(e.staffRole));

  let A = a => {
    let c = se.day(a);
    if (!c) throw Error("Jour incorrect.");
    return c;
  };

  let x = a => {
    let c = T(a);
    let u = E(a);

    return {
      opens: c?.opens ?? rt(e.year, a.day, e.openHour),
      closes: c?.closes ?? (
        a.type === "prediction" && u
          ? u.start
          : rt(e.year, a.day, e.closeHour)
      ),
      closed: c?.closed || 0
    };
  };

  function j(a) {
    if (a.type === "prediction" && !E(a))
      throw Error(
        "Configurer la rencontre, le coup d’envoi et les joueurs via /psg match."
      );

    if (!g(a).ready)
      throw Error(
        "Contenu de démonstration : importer une banque validée avec /psg contenu avant publication classée."
      );

    let c = g(a);

    for (let u of c.questions || [])
      if (
        u.image &&
        !te.existsSync(re.join(e.data, "images", u.image)) &&
        !te.existsSync(re.join(__dirname, "assets", u.image))
      )
        throw Error("Image manquante : " + u.image);
  }

  function Y(a, c) {
    let u = x(a);

    if (
      s.get("final", false) ||
      !T(a)?.message ||
      u.closed ||
      Date.now() < u.opens ||
      Date.now() >= u.closes
    )
      throw Error("Cette case n’est pas ouverte aux participations classées.");

    if (
      c &&
      s.db.prepare(
        "SELECT uid FROM exclusions WHERE year=? AND day=? AND uid=?"
      ).get(e.year, a.day, c)
    )
      throw Error("Participation exclue pour cette case.");

    if (a.type === "prediction" && Date.now() >= E(a).start)
      throw Error("Le match a commencé.");
  }

  let Te = () => ({ ...e });

  async function ae(a, c) {
    await a.editReply(await I.game(c, A(c.day), Te()));

    clearTimeout(i.get(c.id));
    i.delete(c.id);

    let u = c.state;
    let m = u.hideAt || (
      u.type === "lineup" && u.stage === "show" ? u.ready : null
    );

    if (m && u.phase === "playing") {
      let d = setTimeout(
        () => n("member:" + c.uid, async () => {
          if (o) return;

          let p = s.load(c.id);
          let f = p.state.version;

          V.advance(p.state);

          if (p.state.version !== f) {
            s.save(p, f);
            await a.editReply(
              await I.game(p, A(p.day), Te())
            ).catch(() => {});
          }

          i.delete(c.id);
        }).catch(p => console.error("Plateau :", p.message)),
        Math.max(100, m - Date.now() + 40)
      );

      d.unref();
      i.set(c.id, d);
    }
  }

  async function Ne(a, c) {
    let u = E(c);

    if (!u) throw Error("Rencontre non configurée.");

    let m = M.draft(
      s, e.year, c.day, a.user.id, a.user.username
    );

    let d = s.db.prepare(
      "SELECT outcome FROM settlements WHERE year=? AND day=?"
    ).get(e.year, c.day);

    await a.editReply(
      I.prediction(m, u, e, d ? JSON.parse(d.outcome) : null)
    );
  }

  async function Se(a, c, u) {
    let m = A(c);

    if (m.type === "prediction")
      return Ne(a, m);

    if (!u && !e.practice && !G(a))
      throw Error("Entraînement fermé.");

    if (u) {
      j(m);
      Y(m, a.user.id);
    }

    let d = s.newSession({
      year: e.year,
      day: m.day,
      type: m.type,
      uid: a.user.id,
      name: a.member?.displayName || a.user.username,
      ranked: u,
      max: e.attempts,
      create: f => {
        let b = V.create(
          m.type,
          `${e.year}:${m.day}:${a.user.id}:${f}`,
          Date.now(),
          g(m),
          m.day
        );

        if (u)
          b.expires = Math.min(b.expires, x(m).closes);

        return b;
      }
    });

    let p = d.state.version;
    V.advance(d.state);

    if (p !== d.state.version)
      s.save(d, p);

    await ae(a, d);
  }

  async function ve(a, c = "automatic") {
    let u = A(a);
    j(u);

    let m = x(u);

    if (m.closes <= m.opens)
      throw Error("Définir les horaires de la case avant publication.");

    if (u.type === "prediction" && m.closes > E(u).start)
      throw Error(
        "La fermeture doit précéder ou coïncider avec le coup d’envoi."
      );

    let d = await r.channels.fetch(q());

    if (
      !d || d.guildId !== e.guild ||
      !d.isTextBased() || !d.send
    )
      throw Error("Salon invalide.");

    if (
      !d.permissionsFor(r.user)?.has([
        X.ViewChannel,
        X.SendMessages,
        X.EmbedLinks,
        X.AttachFiles
      ])
    )
      throw Error(
        "Permissions Voir/Envoyer/Intégrer/Joindre requises."
      );

    let p = await I.panel(u, m, e);

    s.claimDay(e.year, a, d.id, m.opens, m.closes);

    try {
      let f = await d.send({
        ...p,
        nonce: `psga${e.year}${String(a).padStart(2, "0")}`,
        enforceNonce: true
      });

      s.posted(e.year, a, f.id);
      s.log(c, "publish", { day: a, message: f.id });

      return f.url;
    } catch {
      throw Error(
        "Publication incertaine. Utiliser /psg reparer avant toute autre tentative."
      );
    }
  }

  async function Re(a) {
    let c = A(a);
    let u = T(c);

    if (!u?.message) return;

    let channel = await r.channels.fetch(u.channel);
    let message = await channel.messages.fetch(u.message);

    await message.edit({
      ...await I.panel(c, x(c), e),
      attachments: []
    });
  }

  async function lt(a) {
    if (!G(a))
      throw Error("Commande réservée au staff.");

    let c = a.options.getSubcommand();
    let u = a.options.getInteger("jour");
    let m = u ? A(u) : null;

    if (
      s.get("final", false) &&
      !["statut", "exporter", "sauvegarde"].includes(c)
    )
      throw Error("Classement final figé.");

    if (c === "config") {
      let d = a.options.getChannel("salon");

      if (d.guildId !== e.guild)
        throw Error("Choisir un salon de ce serveur.");

      s.set("channel", d.id);
      s.set("auto", a.options.getBoolean("automatique"));

      s.log(a.user.id, "config", {
        channel: d.id,
        auto: s.get("auto")
      });

      return a.editReply(
        "Configuration enregistrée. Les annonces restent manuelles."
      );
    }

    if (c === "apercu") {
      if (m.type === "prediction") {
        if (!E(m))
          return a.editReply(
            "Importer une rencontre via /psg match pour tester le formulaire."
          );

        return a.editReply(
          I.prediction(
            M.draft(s, e.year, m.day, a.user.id, a.user.username),
            E(m),
            { ...e, predReadOnly: true }
          )
        );
      }

      return a.editReply(await I.panel(m, x(m), e, true));
    }

    if (c === "publier")
      return a.editReply(
        "Panneau publié : " + await ve(u, a.user.id)
      );

    if (c === "statut") {
      let d = se.days.map(p =>
        `${p.day}. ${p.title} : ${
          T(p)?.closed ? "fermé" :
            T(p)?.message ? "publié" :
              T(p)?.publishing ? "publication à vérifier" :
                p.type === "prediction" && !E(p)
                  ? "rencontre à configurer" :
                  g(p).ready ? "à publier" : "contenu à valider"
        }`
      );

      return a.editReply(d.join("\n").slice(0, 1950));
    }

    if (c === "horaires") {
      if (T(m)?.message)
        throw Error(
          "Horaires figés après publication. En cas de report réel, fermer puis traiter le report avec le staff."
        );

      let d = tt(a.options.getString("ouverture"));
      let p = tt(a.options.getString("fermeture"));

      if (p <= d)
        throw Error("Clôture après ouverture requise.");

      if (m.type === "prediction" && E(m) && p > E(m).start)
        throw Error("Clôture au plus tard au coup d’envoi.");

      s.db.prepare(`
        INSERT INTO days(year,day,opens,closes) VALUES(?,?,?,?)
        ON CONFLICT(year,day)
        DO UPDATE SET opens=excluded.opens,closes=excluded.closes
      `).run(e.year, u, d, p);

      s.log(a.user.id, "hours", {
        day: u, opens: d, closes: p
      });

      return a.editReply(
        "Horaires enregistrés. La date de la case peut être déplacée avant publication."
      );
    }

    if (["contenu", "image", "match"].includes(c)) {
      if (T(m)?.message)
        throw Error("Configuration figée après publication.");

      if (c === "image") {
        let p = await ne(a.options.getAttachment("fichier"), 4000000);
        let { loadImage: f } = require("@napi-rs/canvas");
        let b = await f(p);

        if (b.width * b.height > 20000000)
          throw Error("Image trop grande.");

        let R = re.join(e.data, "images");
        te.mkdirSync(R, { recursive: true });

        let O = `jour-${u}-${Date.now()}.png`;
        let F = require("@napi-rs/canvas")
          .createCanvas(b.width, b.height);

        F.getContext("2d").drawImage(b, 0, 0);
        te.writeFileSync(re.join(R, O), F.toBuffer("image/png"));

        return a.editReply(
          "Image enregistrée : " + O +
          "\nUtiliser ce nom dans le champ image du JSON de contenu."
        );
      }

      let d = JSON.parse(
        (await ne(a.options.getAttachment("fichier"))).toString("utf8")
      );

      if (c === "match") {
        if (m.type !== "prediction")
          throw Error("Cette case n’est pas un prono.");

        let p = M.fixture(d);
        s.set("fixture:" + u, p);

        let f = T(m);

        if (f?.closes && f.closes > p.start)
          throw Error(
            "Rencontre enregistrée ; ajuster la fermeture avant le coup d’envoi avec /psg horaires."
          );
      } else {
        st.validate(u, d, m.type);
        s.set("content:" + u, d);
      }

      s.log(a.user.id, c, { day: u });

      return a.editReply(
        "Données enregistrées. Tester /psg apercu puis vérifier /psg statut."
      );
    }

    if (c === "cloturer") {
      if (!T(m)?.message)
        throw Error("Case non publiée.");

      s.closeDay(e.year, u);
      await Re(u);

      return a.editReply("Case fermée.");
    }

    if (c === "resultat") {
      if (m.type !== "prediction" || !E(m) || !T(m)?.message)
        throw Error("Prono publié requis.");

      if (Date.now() < x(m).closes)
        throw Error("Attendre la clôture des participations.");

      let d = E(m);

      let p = M.outcome(
        JSON.parse(
          (await ne(a.options.getAttachment("fichier"))).toString("utf8")
        ),
        d
      );

      if (Date.now() < d.start + 90 * 60000)
        throw Error(
          "Attendre au moins la fin théorique du temps réglementaire."
        );

      let f = M.settle(s, e.year, u, p, a.user.id);

      return a.editReply(
        `${f} pronostics réglés. Vérifier /classement-psg jour:${u}. Aucun résultat n’est annoncé automatiquement.`
      );
    }

    if (c === "invalider") {
      let d = a.options.getUser("membre").id;

      s.tx(() => {
        s.db.prepare(
          "INSERT OR IGNORE INTO exclusions VALUES(?,?,?)"
        ).run(e.year, u, d);

        s.void(
          e.year, u, d,
          a.options.getString("motif"),
          a.user.id
        );
      });

      return a.editReply(
        "Résultats exclus et nouvelle participation bloquée pour cette case."
      );
    }

    if (c === "exporter") {
      let d = s.ranking(e.year, { day: u });

      return a.editReply({
        content:
          "Classement provisoire si des cases ou des pronos attendent encore leur règlement. Points Discord distincts de MyParis.",
        files: [
          new et(
            Buffer.from(at([
              ["rang", "discord_id", "pseudo", "points", "defis", "duree_ms"],
              ...d.map((p, f) =>
                [f + 1, p.uid, p.name, p.score, p.days, p.duration]
              )
            ])),
            { name: "psg-classement.csv" }
          )
        ]
      });
    }

    if (c === "sauvegarde")
      return a.editReply({
        content:
          "Base privée. Les images ajoutées dans /data/images doivent être sauvegardées séparément avec le volume.",
        files: [new et(await s.backup())]
      });

    if (c === "reparer") {
      let d = T(m);

      if (!d)
        throw Error("Aucune publication en attente.");

      if (d.message)
        return a.editReply(
          `https://discord.com/channels/${e.guild}/${d.channel}/${d.message}`
        );

      let p = await r.channels.fetch(d.channel);
      let f = await p.messages.fetch({ limit: 100 });

      let b = f.find(R =>
        R.author.id === r.user.id &&
        R.embeds.some(O =>
          O.footer?.text?.includes(`pgday:${e.year}:${u}`)
        )
      );

      if (!b)
        throw Error(
          "Panneau non retrouvé dans les 100 derniers messages. Vérification staff requise avant déblocage."
        );

      s.posted(e.year, u, b.id);

      return a.editReply("Panneau retrouvé : " + b.url);
    }

    if (c === "finaliser") {
      if (a.options.getString("confirmation") !== "FINALISER")
        throw Error("Saisir FINALISER.");

      let d = se.days.filter(p =>
        !T(p)?.message ||
        (!T(p).closed && Date.now() < T(p).closes) ||
        (
          p.type === "prediction" &&
          !s.db.prepare(
            "SELECT 1 FROM settlements WHERE year=? AND day=?"
          ).get(e.year, p.day)
        )
      );

      if (d.length)
        throw Error("Cases à terminer : " + d.map(p => p.day).join(", "));

      s.set("final", true);
      s.log(a.user.id, "finalize", {});

      return a.editReply(
        "Classement final figé. Consulter /classement-psg et /psg exporter. Aucun lot n’est attribué automatiquement."
      );
    }
  }

  async function ut(a) {
    if (
      !a.inGuild() ||
      a.guildId !== e.guild ||
      !(
        a.isChatInputCommand() ||
        a.isButton() ||
        a.isStringSelectMenu() ||
        a.isModalSubmit()
      ) ||
      (!a.isChatInputCommand() && !a.customId.startsWith("pg:"))
    )
      return;

    if (a.isButton() && a.customId.startsWith("pg:score:")) {
      let u = A(a.customId.split(":")[2]);

      Y(u, a.user.id);

      if (
        M.draft(
          s, e.year, u.day, a.user.id, a.user.username
        ).confirmed
      )
        throw Error("Pronostic définitif.");

      let d = E(u);

      let p = new sr()
        .setCustomId("pg:modal:" + u.day)
        .setTitle("Ton score à la fin des 90 minutes");

      for (let [f, b] of [["home", d.home], ["away", d.away]]) {
        p.addComponents(
          new ir().addComponents(
            new nr()
              .setCustomId(f)
              .setLabel(b.slice(0, 45))
              .setStyle(ar.Short)
              .setMaxLength(2)
              .setRequired(true)
          )
        );
      }

      return a.showModal(p);
    }

    if (
      !a.isChatInputCommand() &&
      !a.isModalSubmit() &&
      !a.customId.startsWith("pg:p:") &&
      !a.customId.startsWith("pg:l:")
    )
      await a.deferUpdate();
    else
      await a.deferReply({ flags: Ze.Ephemeral });

    return n("member:" + a.user.id, async () => {
      if (a.isChatInputCommand()) {
        if (a.commandName === "psg")
          return lt(a);

        if (a.commandName === "jouer-psg") {
          let f = a.options.getInteger("jour") || Number(lr().day);
          return Se(a, f, !a.options.getBoolean("entrainement"));
        }

        if (a.commandName === "classement-psg")
          return a.editReply(await I.leaderboard(s, e, {
            day: a.options.getInteger("jour"),
            type: a.options.getString("animation"),
            page: (a.options.getInteger("page") || 1) - 1
          }));

        if (a.commandName === "mon-score-psg") {
          let f = s.ranking(e.year);
          let b = f.findIndex(R => R.uid === a.user.id);

          return a.editReply({
            content: b < 0
              ? "Pas encore de score classé."
              : `Ton rang : ${b + 1}/${f.length} • ${f[b].score} points • ${f[b].days} case(s).`,
            components: I.withLink([], e)
          });
        }

        if (a.commandName === "regles-psg")
          return a.editReply({
            content: `**Calendrier PSG**

${e.attempts} tentative(s) classée(s) par mini-jeu, meilleur résultat retenu, maximum 1 000 points par case et 24 000 au général. Les familles de jeux regroupent leurs journées. Un seul pronostic confirmé par match, définitif.

Pronos : résultat 300, score exact 400, buteur PSG 150, passeur PSG 150. Temps réglementaire uniquement, hors prolongation et tirs au but. Aucun = aucun buteur/passeur PSG crédité dans le résultat officiel saisi.

Égalités : points, durée cumulée des meilleurs mini-jeux, premier résultat, puis ordre stable par ID. Le staff valide tout départage et les éventuels lots avant annonce.

Les points de ce bot restent sur Discord. Le bouton MyParis ouvre le site ; il ne synchronise ni compte ni points.`,
            components: I.withLink([], e)
          });

        return;
      }

      let [, u, m, d, p] = a.customId.split(":");

      if (u === "p")
        return Se(a, Number(m), d === "ranked");

      if (u === "l")
        return a.editReply(await I.leaderboard(s, e, {
          day: m === "day" ? Number(d) : null,
          type: m === "type" ? d : null,
          page: Number(p) || 0
        }));

      if (u === "s") {
        let f = s.load(m);

        if (f.uid !== a.user.id || f.year !== e.year)
          throw Error("Cette partie ne t’appartient pas.");

        if (f.ranked)
          Y(A(f.day), f.uid);

        let b = f.state.version;
        V.advance(f.state);

        if (
          f.state.version !== Number(d) ||
          f.state.phase !== "playing"
        ) {
          if (f.state.version !== b)
            s.save(f, b);

          return ae(a, f);
        }

        f.state = V.act(f.state, p);
        s.save(f, b);

        return ae(a, f);
      }

      if (["modal", "select", "confirm"].includes(u)) {
        let f = A(m);
        Y(f, a.user.id);

        let b = E(f);
        let R = M.draft(
          s, e.year, f.day, a.user.id, a.user.username
        );

        if (R.confirmed)
          throw Error("Pronostic confirmé et définitif.");

        if (u === "modal") {
          for (let O of ["home", "away"]) {
            let F = a.fields.getTextInputValue(O).trim();

            if (!/^\d{1,2}$/.test(F) || Number(F) > 20)
              throw Error("Score entier entre 0 et 20.");

            R.pick[O] = Number(F);
          }
        }

        if (u === "select") {
          if (!["scorer", "assist"].includes(d))
            throw Error("Champ invalide.");

          let O = a.values[0];
          R.pick[d] = O === "NONE" ? "NONE" : b.players[Number(O)];

          if (!R.pick[d])
            throw Error("Joueur invalide.");
        }

        if (u === "confirm") {
          M.pick(R.pick, b);
          R.confirmed = 1;
          R.created = Date.now();
        }

        M.save(s, R);
        return Ne(a, f);
      }
    });
  }

  r.on(be.InteractionCreate, a =>
    ut(a).catch(async c => {
      console.error(
        "Interaction :",
        c.message.replaceAll(e.token, "[secret]")
      );

      let u = {
        content: c.message.replaceAll(e.token, "[secret]").slice(0, 1600),
        flags: Ze.Ephemeral,
        components: I.withLink([], e),
        allowedMentions: I.quiet
      };

      try {
        if (a.replied || a.deferred)
          await a.followUp(u);
        else
          await a.reply(u);
      } catch {}
    })
  );

  async function we() {
    if (l || o || !r.isReady()) return;

    l = true;

    try {
      for (let a of se.days) {
        let c = T(a);
        let u = x(a);

        if (c?.message && !c.closed && Date.now() >= u.closes) {
          s.closeDay(e.year, a.day);
          await Re(a.day).catch(() => {});
        }

        if (
          !s.get("final", false) &&
          s.get("auto", e.auto) &&
          !c?.message &&
          !c?.publishing &&
          !c?.closed &&
          Date.now() >= u.opens &&
          Date.now() < u.closes
        ) {
          try {
            j(a);
            await ve(a.day);
          } catch (m) {
            console.error("Case " + a.day + " : " + m.message);
          }
        }
      }

      if (Date.now() - h > 21600000) {
        await s.backup();
        h = Date.now();
      }
    } finally {
      l = false;
    }
  }

  let Ie = setInterval(() => {
    try {
      s.heartbeat();
    } catch {
      B();
    }
  }, 15000);

  let Ae = setInterval(
    () => we().catch(a => console.error(a.message)),
    30000
  );

  Ie.unref();
  Ae.unref();

  r.once(be.ClientReady, () => {
    console.log("PSG Avent prêt.");
    we().catch(a => console.error(a.message));
  });

  r.on(be.Error, a => console.error(a.message));

  let ct = t.PORT
    ? or.createServer((a, c) => {
      c.writeHead(r.isReady() ? 200 : 503);
      c.end(JSON.stringify({ ready: r.isReady() }));
    }).listen(Number(t.PORT), "0.0.0.0")
    : null;

  function B() {
    if (o) return;

    o = true;
    clearInterval(Ie);
    clearInterval(Ae);

    for (let a of i.values())
      clearTimeout(a);

    ct?.close();
    r.destroy();
    s.close();
  }

  process.once("SIGTERM", B);
  process.once("SIGINT", B);

  try {
    await r.login(e.token);
  } catch (a) {
    B();
    throw a;
  }

  return { client: r, store: s, shutdown: B };
}

// Installation des commandes ou lancement

if (require.main === module) {
  (
    process.argv.includes("--register")
      ? (async () => {
        let { REST: t, Routes: e } = require("discord.js");
        let s = nt();
        let r = new t({ version: "10" }).setToken(s.token);
        let n = await r.get(e.user("@me"));

        await r.put(
          e.applicationGuildCommands(n.id, s.guild),
          { body: Qe() }
        );

        console.log("Commandes PSG enregistrées.");
      })()
      : ot()
  ).catch(t => {
    console.error(t.message);
    process.exitCode = 1;
  });
}

module.exports = {
  run: ot,
  csv: at,
  locks: it,
  attachment: ne
};

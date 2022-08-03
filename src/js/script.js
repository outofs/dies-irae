import * as Stats from "./config.js";

/// Players
let players = {};

let playing = true;
let activePlayer = 0;
let passivePlayer = 1;
const player0El = document.querySelector(".player__0");
const player1El = document.querySelector(".player__1");

let player0Hero;
let player1Hero;
let player0Ready = false;
let player1Ready = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////HEROES///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Hero {
  constructor(
    id,
    name,
    icon,
    startedHp,
    hp,
    startedAttack,
    attack,
    startedDefence,
    defence,
    startedAgility,
    agility,
    healing,
    healingTurns,
    damageMovements,
    skill1Enable,
    skill2Enable,
    skill3Enable,
    turnsSkill1,
    turnsSkill2,
    turnsSkill3,
    skill1DamageProgression
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.startedHp = startedHp;
    this.hp = hp;
    this.startedAttack = startedAttack;
    this.attack = attack;
    this.startedDefence = startedDefence;
    this.defence = defence;
    this.startedAgility = startedAgility;
    this.agility = agility;
    this.healing = healing;
    this.healingTurns = healingTurns;
    this.damageMovements = damageMovements;
    this.skill1Enable = skill1Enable;
    this.skill2Enable = skill2Enable;
    this.skill3Enable = skill3Enable;
    this.turnsSkill1 = turnsSkill1;
    this.turnsSkill2 = turnsSkill2;
    this.turnsSkill3 = turnsSkill3;
    this.skill1DamageProgression = skill1DamageProgression;
  }
}

/////////////////////////////Betryaed King/////////////////////////////

const betrayedKing = new Hero(
  Stats.BK_ID,
  Stats.BK_NAME,
  Stats.BK_ICON,
  Stats.BK_STARTED_HP,
  Stats.BK_HP,
  Stats.BK_STARTED_ATTACK,
  Stats.BK_ATTACK,
  Stats.BK_STARTED_DEFENCE,
  Stats.BK_DEFENCE,
  Stats.BK_STARTED_AGILITY,
  Stats.BK_AGILITY,
  Stats.BK_HEALING,
  Stats.BK_HEALING_TURNS,
  Stats.BK_DAMAGE_MOVEMENTS,
  Stats.BK_SKILL1_ENABLE,
  Stats.BK_SKILL2_ENABLE,
  Stats.BK_SKILL3_ENABLE,
  Stats.BK_TURNS_SKILL1,
  Stats.BK_TURNS_SKILL2,
  Stats.BK_TURNS_SKILL3
);

///////Skills///////

/// Skill1 (Ravenge)
betrayedKing.skill_1 = function () {
  const accumDamage = players[passivePlayer].hero["damageMovements"]
    .slice(-3)
    .reduce((sum, curr) => sum + curr, 0);
  const calculatingSkill1Damage = accumDamage + calculatingAttackDamage(1);

  if (playing) {
    attackAction(calculatingSkill1Damage);

    switchPlayer();
  }
};

/// Skill2 (War)
betrayedKing.skill_2 = function () {
  this.skill2Enable = true;
  this.turnsSkill2 = 3;
  this.defence = this.defence + 0.3;
  this.attack = this.attack + 50;
  this.hp = this.hp + 300;
  switchPlayer();
};

betrayedKing.checkSkill2 = function () {
  if (this.skill2Enable) {
    if (this.turnsSkill2 > 0) {
      this.turnsSkill2--;
    } else {
      this.skill2Enable = false;
      this.defence = this.startedDefence;
      this.attack = this.stertedAttack;
      this.hp = this.hp - 200;
    }
  }
};

/// Skill3 (Blessing and Curse)
betrayedKing.skill_3 = function () {
  this.skill3Enable = true;
  this.turnsSkill3 = 3;
};
betrayedKing.checkSkill3 = function () {
  if (this.skill3Enable) {
    if (this.turnsSkill3 > 0) {
      this.turnsSkill3--;
      players[activePlayer].hero.hp += 50;
      players[activePlayer].hero.defence += 0.1;
      players[activePlayer].hero.hp -= 50;
      players[activePlayer].hero.defence >= 0.1
        ? (players[passivePlayer].hero.defence =
            players[passivePlayer].hero.defence - 0.1)
        : (players[passivePlayer].hero.defence = 0);
    } else {
      this.skill2Enable = false;
      players[activePlayer].hero.defence =
        players[activePlayer].hero.startedDefence;
      players[passivePlayer].hero.defence =
        players[passivePlayer].hero.startedDefence;
    }
  }
};

/////////////////////////////Siren/////////////////////////////

const siren = new Hero(
  Stats.SI_ID,
  Stats.SI_NAME,
  Stats.SI_ICON,
  Stats.SI_STARTED_HP,
  Stats.SI_HP,
  Stats.SI_STARTED_ATTACK,
  Stats.SI_ATTACK,
  Stats.SI_STARTED_DEFENCE,
  Stats.SI_DEFENCE,
  Stats.SI_STARTED_AGILITY,
  Stats.SI_AGILITY,
  Stats.SI_HEALING,
  Stats.SI_HEALING_TURNS,
  Stats.SI_DAMAGE_MOVEMENTS,
  Stats.SI_SKILL1_ENABLE,
  Stats.SI_SKILL2_ENABLE,
  Stats.SI_SKILL3_ENABLE,
  Stats.SI_TURNS_SKILL1,
  Stats.SI_TURNS_SKILL2,
  Stats.SI_TURNS_SKILL3
);

///////Skills///////

/// Skill1 (Drain Vitality)
siren.skill_1 = function () {
  this.skill1Enable = true;
  this.turnsSkill1 = 3;
  switchPlayer();
};
siren.checkSkill1 = function () {
  if (this.skill1Enable) {
    if (this.turnsSkill1 > 0) {
      this.turnsSkill1--;
      players[passivePlayer].hero.hp = players[passivePlayer].hero.hp - 50;
      this.hp = this.hp + 70;
    } else this.skill1Enable = false;
  }
};

/// Skill2 (Semi-Spiritual)
siren.skill_2 = function () {
  this.skill2Enable = true;
  this.turnsSkill2 = 3;
};
siren.checkSkill2 = function () {
  if (this.skill2Enable) {
    if (this.turnsSkill2 > 0) {
      this.turnsSkill2--;
      players[activePlayer].hero.agility = 100;
      if (playing) {
        attackAction(calculatingAttackDamage(0.5));
      }
    } else {
      this.skill2Enable = false;
      players[activePlayer].hero.agility =
        players[activePlayer].hero.startedAgility;
    }
  }
};

/// Skill3 (Note of Death)
siren.skill_3 = function () {
  const persentHp = (this.hp / this.startedHp) * 100;

  const skill3Attack = function (
    attackAction,
    calculatingAttackDamage,
    multiplier
  ) {
    if (playing) {
      attackAction(calculatingAttackDamage(multiplier));
    }
  };

  if (persentHp >= 100) {
    skill3Attack(attackAction, calculatingAttackDamage, 1.5);
    // console.log("skill 3 with damage lvl 0", `persentHp = ${persentHp}`);
  }
  if (persentHp < 100 && persentHp >= 70) {
    players[passivePlayer].hero.defence =
      players[passivePlayer].hero.defence - 0.1;
    skill3Attack(attackAction, calculatingAttackDamage, 2);
    // console.log("skill 3 with damage lvl 1", `persentHp = ${persentHp}`);
  }
  if (persentHp < 70 && persentHp >= 30) {
    players[passivePlayer].hero.defence > 0.2
      ? (players[passivePlayer].hero.defence -= 0.2)
      : (players[passivePlayer].hero.defence = 0);
    skill3Attack(attackAction, calculatingAttackDamage, 2.5);
    // console.log("skill 3 with damage lvl 2", `persentHp = ${persentHp}`);
  }
  if (persentHp < 30 && persentHp >= 20) {
    players[passivePlayer].hero.defence > 0.3
      ? (players[passivePlayer].hero.defence -= 0.3)
      : (players[passivePlayer].hero.defence = 0);
    skill3Attack(attackAction, calculatingAttackDamage, 3);
    // console.log("skill 3 with damage lvl 3", `persentHp = ${persentHp}`);
  }
  if (persentHp < 20) {
    players[passivePlayer].hero.defence = 0;
    skill3Attack(attackAction, calculatingAttackDamage, 4);
    // console.log("skill 3 with damage lvl 4", `persentHp = ${persentHp}`);
  }
  // console.log(players[passivePlayer].hero);
  players[passivePlayer].hero.defence =
    players[passivePlayer].hero.startedDefence;
  switchPlayer();
};

/////////////////////////////Swamp Demon/////////////////////////////

const swampDemon = new Hero(
  Stats.SD_ID,
  Stats.SD_NAME,
  Stats.SD_ICON,
  Stats.SD_STARTED_HP,
  Stats.SD_HP,
  Stats.SD_STARTED_ATTACK,
  Stats.SD_ATTACK,
  Stats.SD_STARTED_DEFENCE,
  Stats.SD_DEFENCE,
  Stats.SD_STARTED_AGILITY,
  Stats.SD_AGILITY,
  Stats.SD_HEALING,
  Stats.SD_HEALING_TURNS,
  Stats.SD_DAMAGE_MOVEMENTS,
  Stats.SD_SKILL1_ENABLE,
  Stats.SD_SKILL2_ENABLE,
  Stats.SD_SKILL3_ENABLE,
  Stats.SD_TURNS_SKILL1,
  Stats.SD_TURNS_SKILL2,
  Stats.SD_TURNS_SKILL3
);

///////Skills///////

/// Skill1 (Poisonous Bite)
swampDemon.skill_1 = function () {
  this.skill1Enable = true;
  this.turnsSkill1 = 3;
  this.skill1DamageProgression = calculatingAttackDamage(2);
  attackAction(this.skill1DamageProgression);
  switchPlayer();
};
swampDemon.checkSkill1 = function () {
  if (this.skill1Enable) {
    if (this.turnsSkill1 > 0) {
      this.turnsSkill1--;
      this.skill1DamageProgression = this.skill1DamageProgression - 70;
      players[passivePlayer].hero.hp -= Math.abs(this.skill1DamageProgression);
      players[passivePlayer].hero.attack -= 20;
      if (players[passivePlayer].hero.defence < 0.1)
        players[passivePlayer].hero.defence = 0;
      else players[passivePlayer].hero.defence -= 0.1;
    } else {
      this.skill1Enable = false;
      players[passivePlayer].hero.attack =
        players[passivePlayer].hero.startedDefence;
      players[passivePlayer].hero.defence =
        players[passivePlayer].hero.startedDefence;
    }
  }
};

/// Skill2 (Molt)
swampDemon.skill_2 = function () {
  this.skill2Enable = true;
  this.turnsSkill2 = 3;
};

swampDemon.checkSkill2 = function () {
  if (this.skill2Enable) {
    if (this.turnsSkill2 > 0) {
      this.turnsSkill2--;
      players[activePlayer].hero.defence =
        players[activePlayer].hero.startedDefence;
      players[activePlayer].hero.attack =
        players[activePlayer].hero.startedAttack;
      players[activePlayer].hero.agility =
        players[activePlayer].hero.startedAgility;
      players[activePlayer].hero.hp += 40;
    } else {
      this.skill2Enable = false;
    }
  }
};

/// Skill3 (Demon Rage)
swampDemon.skill_3 = function () {
  this.skill3Enable = true;
  this.turnsSkill3 = 2;
};
swampDemon.checkSkill3 = function () {
  if (this.skill3Enable) {
    if (this.turnsSkill3 > 0) {
      this.turnsSkill3--;
      players[activePlayer].hero.defence = 0.4;
      players[activePlayer].hero.attack = 150;
      players[activePlayer].hero.agility = 40;
    } else {
      this.skill3Enable = false;
      players[activePlayer].hero.defence =
        players[activePlayer].hero.startedDefence;
      players[activePlayer].hero.attack =
        players[activePlayer].hero.startedAttack;
      players[activePlayer].hero.agility =
        players[activePlayer].hero.startedAgility;
    }
  }
};

const heroes = {
  0: betrayedKing,
  1: siren,
  2: swampDemon,
};

const characters = document.querySelector(".characters");
const mainGame = document.querySelector(".main__game");
const btnFight = document.querySelector(".btn__fight");
btnFight.disabled = true;
btnFight.classList.add("disabled");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////SLIDER///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const slider = function (player) {
  const slides = document.querySelectorAll(`.slide__player--${player}`);
  const btnLeft = document.querySelector(`.slider__${player}--left`);
  const btnRight = document.querySelector(`.slider__${player}--right`);
  const btnReady = document.querySelector(`.player__${player}--ready`);
  const btnCancel = document.querySelector(`.player__${player}--cancel`);

  let currentSlide = 0;
  const maxSlide = slides.length;

  /// Functions
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const initData = function () {
    goToSlide(0);
  };
  initData();

  const nextSlide = function () {
    if (currentSlide == maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide == 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide = 0;
    }
    goToSlide(currentSlide);
  };

  const readyFunc = function () {
    if (player == 0) player0Hero = currentSlide;
    if (player == 1) player1Hero = currentSlide;
    console.log(`Player ${player + 1} choose Hero ${currentSlide}`);
    btnReady.disabled = true;
    btnLeft.disabled = true;
    btnRight.disabled = true;
    if (player == 0) player0Ready = true;
    if (player == 1) player1Ready = true;
    checkFight();
  };
  const cancelFunc = function () {
    btnReady.disabled = false;
    btnLeft.disabled = false;
    btnRight.disabled = false;
    if (player == 0) player0Ready = false;
    if (player == 1) player1Ready = false;
    checkFight();
  };
  ///   Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  btnReady.addEventListener("click", readyFunc);
  btnCancel.addEventListener("click", cancelFunc);
};
slider(0);
slider(1);

const checkFight = function () {
  if (player0Ready && player1Ready) {
    btnFight.disabled = false;
    btnFight.classList.remove("disabled");
  } else {
    btnFight.disabled = true;
    btnFight.classList.add("disabled");
  }
};

btnFight.addEventListener("click", function (e) {
  e.preventDefault();
  players = {
    0: {
      hero: Object.assign({}, heroes[player0Hero]),
    },
    1: {
      hero: Object.assign({}, heroes[player1Hero]),
    },
  };

  characters.classList.add("hidden");
  mainGame.classList.remove("hidden");
  gamePlay();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////FUNCTIONS///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const randomDamage = function (max) {
  const min = -max;
  return Math.floor((Math.random() * (max - min) + 1 + min) * 0.25);
};

const buttonsDesable = function (active, passive) {
  document
    .querySelectorAll(`.btn__player--${passive}`)
    .forEach((btn) => (btn.disabled = true));
  document
    .querySelectorAll(`.btn__player--${active}`)
    .forEach((btn) => (btn.disabled = false));
};

buttonsDesable(activePlayer, passivePlayer);

const checkSkills = function () {
  if (players[activePlayer].hero.hasOwnProperty("checkSkill1"))
    players[activePlayer].hero.checkSkill1();
  if (players[activePlayer].hero.hasOwnProperty("checkSkill2"))
    players[activePlayer].hero.checkSkill2();
  if (players[activePlayer].hero.hasOwnProperty("checkSkill3"))
    players[activePlayer].hero.checkSkill3();
};

const switchPlayer = function () {
  endRoundFunction();
  if (playing) {
    if (activePlayer == 0) {
      checkSkills();
      activePlayer = 1;
      passivePlayer = 0;
      buttonsDesable(activePlayer, passivePlayer);
    } else {
      checkSkills();
      activePlayer = 0;
      passivePlayer = 1;
      buttonsDesable(activePlayer, passivePlayer);
    }
    if (players[activePlayer].hero.healingTurns <= 0) {
      document.querySelector(
        `.btn__player--${activePlayer}--healing`
      ).disabled = true;
    }
    document.getElementById(
      `current__${activePlayer}`
    ).textContent = `${players[activePlayer].hero.hp} / ${players[activePlayer].hero.startedHp}`;
    document.getElementById(`hp__${activePlayer}`).style.width = `${Math.round(
      (players[activePlayer].hero.hp / players[activePlayer].hero.startedHp) *
        100
    )}%`;

    document.getElementById(
      `current__${passivePlayer}`
    ).textContent = `${players[passivePlayer].hero.hp} / ${players[passivePlayer].hero.startedHp}`;
    document.getElementById(`hp__${passivePlayer}`).style.width = `${Math.round(
      (players[passivePlayer].hero.hp / players[passivePlayer].hero.startedHp) *
        100
    )}%`;

    player1El.classList.toggle("player__active");
    player0El.classList.toggle("player__active");
  }
};

const endGameWindow = document.querySelector(".window__end--game");
const overlay = document.querySelector(".overlay");
const endRoundFunction = function () {
  if (players[passivePlayer].hero.hp <= 0) {
    playing = false;
    document.getElementById(`current__${passivePlayer}`).textContent = 0;
    document.getElementById(`hp__${passivePlayer}`).style.width = "0%";
    console.log("End of Game");
    const html = `<h1 class="player__winner">Victory for Player ${
      activePlayer + 1
    }</h1>`;
    endGameWindow.insertAdjacentHTML("afterBegin", html);
    endGameWindow.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.querySelector(`.player__${passivePlayer}`).style.filter =
      "saturate(0)";
    document.querySelector(`.player__${passivePlayer}`).style.opacity = "30%";
  }
};

const calculatingAttackDamage = function (multiplier) {
  return Math.floor(
    (players[activePlayer].hero.attack +
      randomDamage(players[activePlayer].hero.attack)) *
      (1 - players[activePlayer].hero.defence) *
      multiplier
  );
};

const attackAction = function (funcDamage) {
  const dodgeChance = Math.floor(Math.random() * 100);

  if (players[passivePlayer].hero.agility >= dodgeChance) {
    players[activePlayer].hero.damageMovements.push(0);
  } else {
    funcDamage;
    players[activePlayer].hero.damageMovements.push(funcDamage);

    players[passivePlayer].hero.hp =
      players[passivePlayer].hero.hp - funcDamage;
    document.getElementById(`current__${passivePlayer}`).textContent =
      players[passivePlayer].hero.hp;

    document.getElementById(`hp__${passivePlayer}`).style.width = `${Math.round(
      (players[passivePlayer].hero.hp / players[passivePlayer].hero.startedHp) *
        100
    )}%`;
  }
};

const attackFunction = function () {
  if (playing) {
    attackAction(calculatingAttackDamage(1));

    switchPlayer();
  }
};

const healingFunction = function () {
  if (players[activePlayer].hero.healingTurns) {
    players[activePlayer].hero.hp += players[activePlayer].hero.healing;
    document.getElementById(
      `current__${activePlayer}`
    ).textContent = `${players[activePlayer].hero.hp} / ${players[activePlayer].hero.startedHp}`;

    document.getElementById(`hp__${activePlayer}`).style.width = `${Math.round(
      (players[activePlayer].hero.hp / players[activePlayer].hero.startedHp) *
        100
    )}%`;

    players[activePlayer].hero.healingTurns--;
    if (players[activePlayer].hero.healingTurns < 1) {
      document.querySelector(
        `.btn__player__${activePlayer}__healing`
      ).disabled = true;
    }
  }
};

const gamePlay = function () {
  /// Creating html page of game

  const htmlPlayer0Img = `<img src="${players[0]["hero"].icon}" alt="" class="player__hero player__1--hero" />
  <h3 class="hero__name hero__name__0">${players[0]["hero"].name}</h3>`;
  const htmlPlayer1Img = ` <img src="${players[1]["hero"].icon}" alt="" class="player__hero player__2--hero" />
  <h3 class="hero__name hero__name__1">${players[1]["hero"].name}</h3>`;
  document
    .querySelector(".name__img--0")
    .insertAdjacentHTML("beforeend", htmlPlayer0Img);
  document
    .querySelector(".name__img--1")
    .insertAdjacentHTML("beforeend", htmlPlayer1Img);

  /// Elements

  // Buttons
  const btnPlayer0Atk = document.querySelector(".btn__player--0--attack");
  const btnPlayer0Skill1 = document.querySelector(".btn__player--0--skill1");
  const btnPlayer0Skill2 = document.querySelector(".btn__player--0--skill2");
  const btnPlayer0Skill3 = document.querySelector(".btn__player--0--skill3");
  const btnPlayer0Heal = document.querySelector(".btn__player--0--healing");

  const btnPlayer1Atk = document.querySelector(".btn__player--1--attack");
  const btnPlayer1Skill1 = document.querySelector(".btn__player--1--skill1");
  const btnPlayer1Skill2 = document.querySelector(".btn__player--1--skill2");
  const btnPlayer1Skill3 = document.querySelector(".btn__player--1--skill3");
  const btnPlayer1Heal = document.querySelector(".btn__player--1--healing");

  const btnNewGame = document.querySelector(".btn__new--game");
  const btnExitGame = document.querySelector(".btn__exit");

  //Hit Points
  const currentHpPlayer0 = document.getElementById("current__0");
  const currentHpPlayer1 = document.getElementById("current__1");

  //HP bar
  const hpPlayer0 = document.getElementById("hp__0");
  const hpPlayer1 = document.getElementById("hp__1");

  ///////////////////////////////////////////////////////////////////////////

  endGameWindow.classList.add("hidden");
  overlay.classList.add("hidden");

  /////////////////////////Player 0 BUTTONS//////////////////////
  btnPlayer0Atk.addEventListener("click", function (e) {
    e.preventDefault();
    attackFunction();
  });

  btnPlayer0Heal.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Heal!");
    healingFunction();
  });

  btnPlayer0Skill1.addEventListener("click", function (e) {
    e.preventDefault();
    players[activePlayer].hero.skill_1();
  });

  btnPlayer0Skill2.addEventListener("click", function (e) {
    e.preventDefault();
    players[activePlayer].hero.skill_2();
  });

  btnPlayer0Skill3.addEventListener("click", function (e) {
    e.preventDefault();
    players[activePlayer].hero.skill_3();
  });

  /////////////////////////Player 1 BUTTONS//////////////////////
  btnPlayer1Atk.addEventListener("click", function (e) {
    e.preventDefault();
    attackFunction();
  });

  btnPlayer1Heal.addEventListener("click", function (e) {
    e.preventDefault();
    healingFunction();
  });

  btnPlayer1Skill1.addEventListener("click", function (e) {
    e.preventDefault();
    players[activePlayer].hero.skill_1();
  });

  btnPlayer1Skill2.addEventListener("click", function (e) {
    e.preventDefault();
    players[activePlayer].hero.skill_2();
  });

  btnPlayer1Skill3.addEventListener("click", function (e) {
    e.preventDefault();
    players[activePlayer].hero.skill_3();
  });

  currentHpPlayer0.textContent = `${players[0].hero.hp} / ${players[0].hero.startedHp}`;
  hpPlayer0.style.width = `${Math.round(
    (players[0].hero.hp / players[0].hero.startedHp) * 100
  )}%`;

  currentHpPlayer1.textContent = `${players[1].hero.hp} / ${players[1].hero.startedHp}`;
  hpPlayer1.style.width = `${Math.round(
    (players[1].hero.hp / players[1].hero.startedHp) * 100
  )}%`;
};

/// Players
let players = {};

let playing = true;
let activePlayer = 0;
let passivePlayer = 1;
let currentRound = 1;
let globalScore = [0, 0];
const player0El = document.querySelector(".player__0");
const player1El = document.querySelector(".player__1");
/// Heroes and stats
///////////////////////////////Betryaed King/////////////////////////////

const heroes = {
  0: {
    id: 1,
    name: "Betryaed King",
    icon: "https://github.com/outofs/dies-irae/blob/master/img/1.png?raw=true",
    startedHp: 1000,
    hp: 1000,
    startedAttack: 100,
    attack: 100,
    startedDefence: 0.3,
    defence: 0.3,
    startedAgility: 20,
    agility: 20,
    healing: 80,
    healingTurns: 3,
    damageMovements: [],
    skill2Enable: false,
    skill3Enable: false,
    turnsSkill2: 0,
    turnsSkill3: 0,

    /// Skill1 (Ravenge)
    skill_1: function () {
      const accumDamage = players[passivePlayer].hero["damageMovements"]
        .slice(-3)
        .reduce((sum, curr) => sum + curr, 0);
      const calculatingSkill1Damage = accumDamage + calculatingAttackDamage(1);

      if (playing) {
        attackAction(calculatingSkill1Damage);

        switchPlayer();
      }

      console.log(calculatingSkill1Damage);
    },

    /// Skill2 (War)
    skill_2() {
      this.skill2Enable = true;
      this.turnsSkill2 = 3;
      this.defence = this.defence + 0.3;
      this.attack = this.attack + 50;
      this.hp = this.hp + 300;
      switchPlayer();
    },
    checkSkill2() {
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
    },

    /// Skill3 (Blessing and Curse)
    skill_3() {
      this.skill3Enable = true;
      this.turnsSkill3 = 3;
    },
    checkSkill3() {
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
    },
  },

  ///////////////////////////////Siren/////////////////////////////
  1: {
    id: 2,
    name: "Siren",
    icon: "https://github.com/outofs/dies-irae/blob/master/img/2.png?raw=true",
    startedHp: 800,
    hp: 800,
    startedAttack: 90,
    attack: 90,
    startedDefence: 0.1,
    defence: 0.1,
    startedAgility: 40,
    agility: 40,
    healing: 120,
    healingTurns: 3,
    damageMovements: [],
    turnsSkill1: 0,
    skill1Enable: false,
    skill2Enable: false,

    /// Skill1 (Drain Vitality)
    skill_1() {
      this.skill1Enable = true;
      this.turnsSkill1 = 3;
      switchPlayer();
    },
    checkSkill1() {
      if (this.skill1Enable) {
        if (this.turnsSkill1 > 0) {
          this.turnsSkill1--;
          players[passivePlayer].hero.hp = players[passivePlayer].hero.hp - 50;
          this.hp = this.hp + 70;
        } else this.skill1Enable = false;
      }
    },

    /// Skill3 (Semi-Spiritual)
    skill_2() {
      this.skill2Enable = true;
      this.turnsSkill2 = 3;
    },

    checkSkill2() {
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
    },

    /// Skill3 (Note of Death)
    skill_3() {
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
    },
  },
  ///////////////////////////////Swamp Demon/////////////////////////////
  2: {
    id: 3,
    name: "Swamp Demon",
    icon: "https://github.com/outofs/dies-irae/blob/master/img/3.png?raw=true",
    startedHp: 1100,
    hp: 1100,
    startedAttack: 90,
    attack: 90,
    startedDefence: 0.1,
    defence: 0.1,
    startedAgility: 20,
    agility: 30,
    healing: 120,
    healingTurns: 3,
    damageMovements: [],
    turnsSkill1: 0,
    turnsSkill2: 0,
    turnsSkill3: 0,
    skill1Enable: false,
    skill2Enable: false,
    skill2Enable: false,
    skill1DamageProgression: 0,

    /// Skill1 (Poisonous Bite)
    skill_1() {
      this.skill1Enable = true;
      this.turnsSkill1 = 3;
      this.skill1DamageProgression = calculatingAttackDamage(2);
      attackAction(this.skill1DamageProgression);
      switchPlayer();
    },
    checkSkill1() {
      if (this.skill1Enable) {
        if (this.turnsSkill1 > 0) {
          this.turnsSkill1--;
          this.skill1DamageProgression = this.skill1DamageProgression - 70;
          players[passivePlayer].hero.hp -= Math.abs(
            this.skill1DamageProgression
          );
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
    },

    /// Skill2 (Molt)
    skill_2() {
      this.skill2Enable = true;
      this.turnsSkill2 = 3;
    },

    checkSkill2() {
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
    },

    /// Skill3 (Demon Rage)
    skill_3() {
      this.skill3Enable = true;
      this.turnsSkill3 = 2;
    },
    checkSkill3() {
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
    },
  },
};

let player0Hero = 2;
let player1Hero = 0;
let player0Ready = false;
let player1Ready = false;
const characters = document.querySelector(".characters");
const mainGame = document.querySelector(".main__game");
const btnFight = document.querySelector(".btn__fight");
btnFight.disabled = true;
btnFight.classList.add("disabled");

/// Slider
const slider = function (player) {
  const slides = document.querySelectorAll(`.slide__player--${player}`);
  const btnLeft = document.querySelector(`.slider__${player}--left`);
  const btnRight = document.querySelector(`.slider__${player}--right`);
  const btnReady = document.querySelector(`.player__${player}--ready`);
  const btnCancel = document.querySelector(`.player__${player}--cancel`);

  let currentSlide = 0;
  const maxSlide = slides.length;
  console.log(maxSlide);

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
    console.log(`Player ${player} choose Hero ${currentSlide}`);
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

  console.log(players);
  characters.classList.add("hidden");
  mainGame.classList.remove("hidden");
  gamePlay();
});

console.log(players);

//  Functions

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

const endRoundFunction = function () {
  if (players[passivePlayer].hero.hp <= 0) {
    playing = false;
    document.getElementById(`current__${passivePlayer}`).textContent = 0;
    document.getElementById(`hp__${passivePlayer}`).style.width = "0%";
    console.log("End of Game");
    globalScore[activePlayer]++;
    currentRound++;
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
  console.log(`Dodging ${dodgeChance}`);

  if (players[passivePlayer].hero.agility >= dodgeChance) {
    console.log("Dodge!");
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
    // damageMessage(funcDamage, "Damage");
    console.log(funcDamage);
  }
};

const attackFunction = function () {
  if (playing) {
    attackAction(calculatingAttackDamage(1));
    console.log(players[activePlayer].hero);

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

// const damageMessage = function (value, type) {
//   const dmgMssg = document.querySelector(`damage__message__${passivePlayer}`);
//   document.querySelector(
//     `damage__message__type__${passivePlayer}`
//   ).textContent = type;
//   document.querySelector(
//     `damage__message__value__${passivePlayer}`
//   ).textContent = value;
//   dmgMssg.classList.remove("hidden");
// };

// const closeDmgMssg = function () {
//   dmgMssg.classList.add("hidden");
// };

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

  btnNewGame.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("new");
    // window.location.reload();
  });

  btnExitGame.addEventListener("click", function (e) {
    console.log("exit");
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
// for (let i = 0; i < 3; i++) {
//   gamePlay();
// }

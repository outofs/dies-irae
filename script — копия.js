/// Players
let players = {};

/// Heroes and stats
///////////////////////////////Betryaed King/////////////////////////////

const heroes = {
  0: {
    id: 1,
    name: "Betryaed King",
    icon: "img/1.png",
    startedHp: 1000,
    hp: 1000,
    startedAttack: 100,
    attack: 100,
    startedDefence: 0.3,
    defence: 0.3,
    startedAgility: 20,
    agility: 20,
    healing: 80,
    damageMovements: [],
    skill2Enable: false,
    skill3Enable: false,
    turnsSkill2: 0,
    turnsSkill3: 0,

    /// Skill1 (Ravenge)
    skill_1: function () {
      this.checkSkill2();

      const accumDamage = heroes[passivePlayer]["damageMovements"]
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
          heroes[activePlayer].hp += 50;
          heroes[activePlayer].defence += 0.1;
          heroes[passivePlayer].hp -= 50;
          heroes[passivePlayer].defence >= 0.1
            ? (heroes[passivePlayer].defence =
                heroes[passivePlayer].defence - 0.1)
            : (heroes[passivePlayer].defence = 0);
        } else {
          this.skill2Enable = false;
          heroes[activePlayer].defence = heroes[activePlayer].startedDefence;
          heroes[passivePlayer].defence = heroes[passivePlayer].startedDefence;
        }
      }
    },
  },

  ///////////////////////////////Siren/////////////////////////////
  1: {
    id: 2,
    name: "Siren",
    icon: "img/2.png",
    startedHp: 800,
    hp: 800,
    startedAttack: 90,
    attack: 90,
    startedDefence: 0.1,
    defence: 0.1,
    startedAgility: 40,
    agility: 40,
    healing: 120,
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
          heroes[passivePlayer].hp = heroes[passivePlayer].hp - 50;
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
          heroes[activePlayer].agility = 100;
          if (playing) {
            attackAction(calculatingAttackDamage(0.5));
          }
        } else {
          this.skill2Enable = false;
          heroes[activePlayer].agility = heroes[activePlayer].startedAgility;
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
      }
      if (persentHp < 100 && persentHp >= 70) {
        heroes[passivePlayer].defence = heroes[passivePlayer].defence - 0.1;
        skill3Attack(attackAction, calculatingAttackDamage, 2);
      }
      if (persentHp < 70 && persentHp >= 30) {
        heroes[passivePlayer].defence > 0.2
          ? (heroes[passivePlayer].defence -= 0.2)
          : (heroes[passivePlayer].defence = 0);
        skill3Attack(attackAction, calculatingAttackDamage, 2.5);
      }
      if (persentHp < 30 && persentHp >= 20) {
        heroes[passivePlayer].defence > 0.3
          ? (heroes[passivePlayer].defence -= 0.3)
          : (heroes[passivePlayer].defence = 0);
        skill3Attack(attackAction, calculatingAttackDamage, 3);
      }
      if (persentHp < 20) {
        heroes[passivePlayer].defence = 0;
        skill3Attack(attackAction, calculatingAttackDamage, 4);
      }
      console.log(heroes[passivePlayer]);
      heroes[passivePlayer].defence = heroes[passivePlayer].startedDefence;
      switchPlayer();
    },
  },
  ///////////////////////////////Swamp Demon/////////////////////////////
  2: {
    id: 3,
    name: "Swamp Demon",
    icon: "img/3.png",
    startedHp: 1100,
    hp: 1100,
    startedAttack: 90,
    attack: 90,
    startedDefence: 0.1,
    defence: 0.1,
    startedAgility: 20,
    agility: 40,
    healing: 120,
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
          heroes[passivePlayer].hp -= Math.abs(this.skill1DamageProgression);
          heroes[passivePlayer].attack -= 20;
          if (heroes[passivePlayer].defence < 0.1)
            heroes[passivePlayer].defence = 0;
          else heroes[passivePlayer].defence -= 0.1;
        } else {
          this.skill1Enable = false;
          heroes[passivePlayer].attack = heroes[passivePlayer].startedDefence;
          heroes[passivePlayer].defence = heroes[passivePlayer].startedDefence;
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
          heroes[activePlayer].defence = heroes[activePlayer].startedDefence;
          heroes[activePlayer].attack = heroes[activePlayer].startedAttack;
          heroes[activePlayer].agility = heroes[activePlayer].startedAgility;
          heroes[activePlayer].hp += 40;
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
          heroes[activePlayer].defence = 0.4;
          heroes[activePlayer].attack = 150;
          heroes[activePlayer].agility = 40;
        } else {
          this.skill3Enable = false;
          heroes[activePlayer].defence = heroes[activePlayer].startedDefence;
          heroes[activePlayer].attack = heroes[activePlayer].startedAttack;
          heroes[activePlayer].agility = heroes[activePlayer].startedAgility;
        }
      }
    },
  },
};

let player0Hero;
let player1Hero;
let player0Ready = false;
let player1Ready = false;
const characters = document.querySelector(".characters");
const mainGame = document.querySelector(".main--game");
const btnFight = document.querySelector(".btn--fight");
btnFight.disabled = true;
btnFight.classList.add("disabled");

///Slider
const slider = function (player) {
  const slides = document.querySelectorAll(`.slide--player--${player}`);
  const btnLeft = document.querySelector(`.slider--${player}__btn--left`);
  const btnRight = document.querySelector(`.slider--${player}__btn--right`);
  const btnReady = document.querySelector(`.player--${player}--ready`);
  const btnCancel = document.querySelector(`.player--${player}--cancel`);

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
});

console.log(players);

/// Creating html page of game

const html = `<section class="player player--0 player--active">
<h2 class="name" id="name--0">Player 1</h2>
<img src="${heroes[0].icon}" alt="" class="player--hero player--1--hero" />
<div class="current-dmage">Damage</div>
<div class="current">
  <p class="current-label">Hit points</p>
  <p class="current-hp" id="current--0">0</p>
</div>
<button class="btn btn--player--0 btn--player--0--attack">
  Attack
</button>
<button class="btn btn--player--0 btn--player--0--skill--1">
  Skill 1
</button>
<button class="btn btn--player--0 btn--player--0--skill--2">
  Skill 2
</button>
<button class="btn btn--player--0 btn--player--0--skill--3">
  Skill 3
</button>
<button class="btn btn--player--0 btn--player--0--healing">
  📥 Healing
</button>
</section>
<section class="player player--1">
<h2 class="name" id="name--1">Player 2</h2>
<img src="${heroes[1].icon}" alt="" class="player--hero player--2--hero" />
<div class="current">
  <p class="current-label">Hit points</p>
  <p class="current-hp" id="current--1">0</p>
</div>
<button class="btn btn--player--1 btn--player--1--attack">
  Attack
</button>
<button class="btn btn--player--1 btn--player--1--skill--1">
  Skill 1
</button>
<button class="btn btn--player--1 btn--player--1--skill--2">
  Skill 2
</button>
<button class="btn btn--player--1 btn--player--1--skill--3">
  Skill 3
</button>
<button class="btn btn--player--1 btn--player--1--healing">
  📥 Healing
</button>
</section>`;

mainGame.insertAdjacentHTML("afterbegin", html);

/// Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// Buttons
const btnPlayer0Atk = document.querySelector(".btn--player--0--attack");
const btnPlayer0Skill1 = document.querySelector(".btn--player--0--skill--1");
const btnPlayer0Skill2 = document.querySelector(".btn--player--0--skill--2");
const btnPlayer0Skill3 = document.querySelector(".btn--player--0--skill--3");
const btnPlayer0Heal = document.querySelector(".btn--player--0--healing");

const btnPlayer1Atk = document.querySelector(".btn--player--1--attack");
const btnPlayer1Skill1 = document.querySelector(".btn--player--1--skill--1");
const btnPlayer1Skill2 = document.querySelector(".btn--player--1--skill--2");
const btnPlayer1Skill3 = document.querySelector(".btn--player--1--skill--3");
const btnPlayer1Heal = document.querySelector(".btn--player--1--healing");

//Hit Points
const currentHpPlayer0 = document.getElementById("current--0");
const currentHpPlayer1 = document.getElementById("current--1");

///////////////////////////////////////////////////////////////////////////
// console.log(hero1);
// console.log(hero2);

let playing = true;
let activePlayer = 0;
let passivePlayer = 1;

//  Functions

const randomDamage = function (max) {
  const min = -max;
  return Math.floor((Math.random() * (max - min) + 1 + min) * 0.25);
};

const buttonsDesable = function (active, passive) {
  document
    .querySelectorAll(`.btn--player--${passive}`)
    .forEach((btn) => (btn.disabled = true));
  document
    .querySelectorAll(`.btn--player--${active}`)
    .forEach((btn) => (btn.disabled = false));
};

buttonsDesable(activePlayer, passivePlayer);

const checkSkills = function () {
  if (heroes[activePlayer].hasOwnProperty("checkSkill1"))
    heroes[activePlayer].checkSkill1();
  if (heroes[activePlayer].hasOwnProperty("checkSkill2"))
    heroes[activePlayer].checkSkill2();
  if (heroes[activePlayer].hasOwnProperty("checkSkill3"))
    heroes[activePlayer].checkSkill3();
};

const switchPlayer = function () {
  if (playing) {
    if (activePlayer == 0) {
      endGameFunction();
      checkSkills();
      activePlayer = 1;
      passivePlayer = 0;
      buttonsDesable(activePlayer, passivePlayer);
    } else {
      endGameFunction();
      checkSkills();
      activePlayer = 0;
      passivePlayer = 1;
      buttonsDesable(activePlayer, passivePlayer);
    }
    document.getElementById(`current--${activePlayer}`).textContent =
      heroes[activePlayer].hp;
    document.getElementById(`current--${passivePlayer}`).textContent =
      heroes[passivePlayer].hp;

    player1El.classList.toggle("player--active");
    player0El.classList.toggle("player--active");
  }
};

const endGameFunction = function () {
  if (heroes[passivePlayer].hp <= 0) {
    playing = false;
    document.getElementById(`current--${passivePlayer}`).textContent = 0;
    console.log("End of Game");
  }
};

const calculatingAttackDamage = function (multiplier) {
  return Math.floor(
    (heroes[activePlayer].attack + randomDamage(heroes[activePlayer].attack)) *
      (1 - heroes[passivePlayer].defence) *
      multiplier
  );
};

const attackAction = function (funcDamage) {
  const dodgeChance = Math.floor(Math.random() * 100);
  console.log(`Dodging ${dodgeChance}`);

  if (heroes[passivePlayer].agility >= dodgeChance) {
    console.log("Dodge!");
    heroes[activePlayer].damageMovements.push(0);
  } else {
    funcDamage;
    heroes[activePlayer].damageMovements.push(funcDamage);

    heroes[passivePlayer].hp = heroes[passivePlayer].hp - funcDamage;
    document.getElementById(`current--${passivePlayer}`).textContent =
      heroes[passivePlayer].hp;
    console.log(funcDamage);
  }
};

const attackFunction = function () {
  if (playing) {
    attackAction(calculatingAttackDamage(1));
    console.log(heroes[activePlayer]);

    switchPlayer();
  }
};
// console.log(heroes[activePlayer]);

btnPlayer0Atk.addEventListener("click", function (e) {
  e.preventDefault();
  attackFunction();
});
btnPlayer1Atk.addEventListener("click", function (e) {
  e.preventDefault();
  attackFunction();
});
btnPlayer0Skill1.addEventListener("click", function (e) {
  e.preventDefault();
  heroes[activePlayer].skill_1();
});
btnPlayer0Skill2.addEventListener("click", function (e) {
  e.preventDefault();
  heroes[activePlayer].skill_2();
});
btnPlayer0Skill3.addEventListener("click", function (e) {
  e.preventDefault();
  heroes[activePlayer].skill_3();
});

btnPlayer1Skill1.addEventListener("click", function (e) {
  e.preventDefault();
  heroes[activePlayer].skill_1();
});
btnPlayer1Skill2.addEventListener("click", function (e) {
  e.preventDefault();
  heroes[activePlayer].skill_2();
});
btnPlayer1Skill3.addEventListener("click", function (e) {
  e.preventDefault();
  heroes[activePlayer].skill_3();
});
currentHpPlayer0.textContent = heroes[0].hp;
currentHpPlayer1.textContent = heroes[1].hp;
console.log(heroes[0].hasOwnProperty("checkSkill2"));
//////////////////
// const example = {
//   a: {
//     def: 100,
//     atk: 100,
//     hp: 100,
//     func1Add() {
//       this.def = this.def + 20;
//     },
//     funcRemove() {
//       this.def = 100;
//     },
//   },
//   b: {
//     def: 100,
//     atk: 100,
//     hp: 100,
//     func2Add() {
//       this.atk = this.atk + 50;
//       this.hp = 200;
//       console.log(example.b);
//     },
//   },
// };

// example.a.func1Add();
// example.a.funcRemove();
// // example.b.func2Add();

// console.log(example.a);
// console.log(example.b);

// btnPlayer0Skill3.addEventListener("click", function (e) {
//   e.preventDefault();
//   example.b.func2Add();
// });

const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 35;

const enteredValue = prompt('Maximum Life for You and Monster.', '100');

let chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('YOU WON!');
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('YOU LOST')
        reset();
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('DRAW');
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else {
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler() {
   attackMonster('ATTACK')
}

function strongAttackHandler() {
   attackMonster('STRONG_ATTACK')
}
function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You cant heal more than your initial health!");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
rese
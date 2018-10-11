// FIGHT GENERATOR

const fighters = [{
  icon: '🥊👺🥊',
  name: 'Rudoph Fister',
  special: 'Fist hurricane',
  HP: 30,
  isStunned: false
}, {
  icon: '💪🐴💪',
  name: 'Your Horset Nightmare',
  special: '50 cm long devastation',
  HP: 30,
  isStunned: false
}]

const attacks = [
  {
    name: 'special',
    stun: true,
    damage: 20,
    chance: 101
  },
  {
    name: 'kick',
    chance: 25,
    damage: 6,
    stun: true
  },
  {
    name: 'smack',
    chance: 69,
    damage: 3,
    stun: true
  },
  {
    name: 'punch',
    chance: 20,
    damage: 8
  },
  {
    name: 'bite',
    chance: 10,
    damage: 10
  }
]

function fight() {
  let bothAlive = true
  let attack1, attack2, attack1Succeds, attack2succeds, first
  let round = 1;
  console.log("WELCOME TO THE ARENA!!!")
  console.log("IN ONE CORNER WE HAVE ... " + getFighterName(fighters[0]))
  console.log("IN THE OTHER CORNER ... " + getFighterName(fighters[1]))
  console.log("THE FIGHT BEGINS!")
  console.log("\nDING DING DING!\n")

  while (bothAlive) {
    
    first = Math.round(Math.random())
    second = !first ? 1 : 0
    first = fighters[first]
    second = fighters[second]
    attack1 = getRandomItem(attacks)
    attack2 = getRandomItem(attacks)
    attack1Succeds = rollProbability(attack1.chance)
    attack2succeds = rollProbability(attack2.chance)

    if (first.isStunned) {
      first.isStunned = false
      battleLog(first, true)
    } else {
      if (attack1Succeds) {
        if (attack1.stun) {
          second.isStunned = true
        }
        second.HP -= attack1.damage
        battleLog(first, false, attack1, true)
      } else {
        battleLog(first, false, attack1, false)
      }
    }

    if (fighters[0].HP <= 0 || fighters[1].HP <= 0) {
      break;
    }

    if (second.isStunned) {
      second.isStunned = false
      battleLog(second, true)
    } else {
      if (attack2succeds) {
        if (attack2.stun) {
          first.isStunned = true
        }
        first.HP -= attack2.damage
        battleLog(second, false, attack2, true)
      } else {
        battleLog(second, false, attack2, false)
      }
    }


    if (fighters[0].HP <= 0 || fighters[1].HP <= 0) {
      bothAlive = false;
      break;
    }

    /*console.log("\nBOTH FIGHTERS ARE STILL BREATHING! " + getFighterName(fighters[0]) + " has " + fighters[0].HP + " hitpoints left and " + getFighterName(fighters[1]) + " has " + fighters[1].HP + " hitpoints remaining. ROUND " + round + ", GO! \n")*/

    round++
  }

  const winner = (fighters[0].HP > 0) ? fighters[0] : fighters[1];
  loser = (fighters[0].HP > 0) ? fighters[1] : fighters[0];
  console.log(getFighterName(winner) + " HAS WON THE BATTLE!! \nWe sure won't miss " + getFighterName(loser) + ".");
}

function battleLog(fighter, stunned, attack, success) {
  if (stunned) {
    console.log(getFighterName(fighter) + 'is still stunned ...')
  } else if (!success) {
    console.log(getFighterName(fighter) + " tried to " + attack.name + " but missed!")
  } else if (attack.name === 'special'){
    console.log("\n!!! " + getFighterName(fighter) + " does his special move, the much feared " + fighter.special + " !!! The opponent is stunned! DEVASTATING DAMAGE!\n")
  } else {
    let attackString = getFighterName(fighter) + " manages to " + attack.name + " the opponent dealing " + attack.damage + " damage.";
    if (attack.stun) {
      attackString += " The opponent is stunned!"
    }
    console.log(attackString)
  }
}

function getFighterName(fighter) {
  return fighter.name + " " + fighter.icon + " [" + fighter.HP + " HP]"
}

function getRandomItem(items) {
  return items[Math.floor(Math.random()*items.length)];
}

function rollProbability(probability) {
  return (Math.random() * 100) < probability
}

fight()

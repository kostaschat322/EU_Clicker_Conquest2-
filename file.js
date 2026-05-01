const resources = {
  wood: 0,
  stone: 0,
  food: 0,
  gold: 10,
  soldiers: 0
};

const regionData = {
  FranceNorth:  { name: "France North", bonus: "+3% wood", loot: { wood: 50 }, power: 85 },
  ItalyNorth:   { name: "Italy North",  bonus: "+1.25% gold", loot: { gold: 25 }, power: 65 },
  GermanyWest:  { name: "Germany West", bonus: "+2% stone", loot: { stone: 40 }, power: 95 }
};

function updateUI() {
  for (let k in resources)
    document.getElementById(k).innerText = Math.floor(resources[k]);
}

setInterval(() => {
  resources.wood += 0.5;
  resources.stone += 0.4;
  resources.food += 0.3;
  resources.gold += 0.05;
  updateUI();
}, 1000);

// επιλογή περιοχής
document.querySelectorAll("area").forEach(area => {
  area.addEventListener("click", e => {
    const key = e.target.dataset.region;
    const data = regionData[key];
    document.getElementById("regionName").innerText = data.name;
    document.getElementById("regionBonus").innerText = 
      `Bonus: ${data.bonus} | Loot: ${Object.keys(data.loot)} | Power: ${data.power}`;
    const btn = document.getElementById("attackBtn");
    btn.disabled = false;
    btn.onclick = () => attack(key);
  });
});

function attack(id) {
  const region = regionData[id];
  const playerPower = resources.soldiers * 10;
  if (playerPower >= region.power) {
    for (let res in region.loot) resources[res] += region.loot[res];
    alert(`✅ Νίκη! Κατέκτησες το ${region.name}`);
  } else {
    resources.soldiers = Math.max(0, resources.soldiers - 2);
    alert(`❌ Ήττα! Ο στρατός σου δεν ήταν αρκετά ισχυρός.`);
  }
  updateUI();
}

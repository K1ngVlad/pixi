"use strict";

const game = mapSize => {
const genereateMatrixTwin = size => {
const genLine = deep => {
if (deep === 0) return 0;
const matrix = [];
for (let i = 0; i < size; i++) {
matrix.push(genLine(deep - 1));
}
return matrix;
}
return genLine(2);
}


const renderMap = (map) => {
const htmlMap = map.map(i => `${i.map(cell => cell ? '<span><img src="images/grass.png"></img></span>' : '<span><img src="images/grass.png"></img></span>')} </br>`);
document.body.innerHTML = `<div style="border: 2px solid red; display: inline-block;">${htmlMap}</div>`;
console.log(htmlMap.join);
}

const currentPosition = {x: 0, y: 0};

let data = genereateMatrixTwin(mapSize);

console.log(data);

data[currentPosition.y][currentPosition.x] = 1;
renderMap(data);

addEventListener('keydown', e => {
switch (e.code) {
case 'KeyW':
if(currentPosition.y === 0) break;
currentPosition.y = currentPosition.y - 1;
break;
case 'KeyA':
if(currentPosition.x === 0) break;
currentPosition.x = currentPosition.x - 1;
break;
case 'KeyS':
if(currentPosition.y === mapSize - 1) break;
currentPosition.y++;
break;
case 'KeyD':
if(currentPosition.x === mapSize) break;
currentPosition.x++;
}
data = genereateMatrixTwin(mapSize)
data[currentPosition.y][currentPosition.x] = 1;
renderMap(data);
})
}
 
game(16)



let arr = [];

arr.push('1');
arr.push('2');
arr.push('3');
arr.join('');
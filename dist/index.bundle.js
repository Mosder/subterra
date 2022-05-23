/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Bullet.ts":
/*!***********************!*\
  !*** ./src/Bullet.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bullet\": () => (/* binding */ Bullet)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n\nclass Bullet {\n    position;\n    speed = 5;\n    speedDelay = 1;\n    interval;\n    done = false;\n    constructor(position) {\n        this.position = position;\n        this.nyoom();\n    }\n    nyoom() {\n        this.interval = setInterval(() => {\n            this.position.x += this.speed;\n            if (this.position.x > _consts__WEBPACK_IMPORTED_MODULE_0__.boardSize.width) {\n                this.kill();\n            }\n        }, this.speedDelay);\n    }\n    kill() {\n        clearInterval(this.interval);\n        this.done = true;\n    }\n}\n\n\n\n//# sourceURL=webpack://subterra/./src/Bullet.ts?");

/***/ }),

/***/ "./src/Enemy.ts":
/*!**********************!*\
  !*** ./src/Enemy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Enemy\": () => (/* binding */ Enemy)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _enemyAis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemyAis */ \"./src/enemyAis.ts\");\n\n\nclass Enemy {\n    position;\n    ai;\n    done = false;\n    interval;\n    constructor(ai, startY) {\n        this.ai = (0,_enemyAis__WEBPACK_IMPORTED_MODULE_1__.getEnemyAi)(ai);\n        this.position = { x: _consts__WEBPACK_IMPORTED_MODULE_0__.boardSize.width, y: startY };\n        this.newInterval(0);\n    }\n    moveTo(coords) {\n        this.position = coords;\n    }\n    newInterval(stage) {\n        clearInterval(this.interval);\n        this.interval = setInterval(() => {\n            this.moveTo({\n                x: this.position.x + this.ai[stage].direction.x * this.ai[stage].speed,\n                y: this.position.y + this.ai[stage].direction.y * this.ai[stage].speed,\n            });\n            this.ai[stage].distance -= this.ai[stage].speed;\n            if (this.ai[stage].distance <= 0)\n                if (++stage >= this.ai.length) {\n                    this.kill();\n                }\n                else {\n                    this.newInterval(stage);\n                }\n        }, this.ai[stage].speedDelay);\n    }\n    kill() {\n        clearInterval(this.interval);\n        this.done = true;\n    }\n}\n\n\n\n//# sourceURL=webpack://subterra/./src/Enemy.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enemy */ \"./src/Enemy.ts\");\n/* harmony import */ var _levels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./levels */ \"./src/levels.ts\");\n\n\n\n\nclass Game {\n    player;\n    controls;\n    bullets = [];\n    enemies = [];\n    level;\n    timePassed = 0;\n    scrollSpeed = 1;\n    showHitboxes = false;\n    constructor(controls) {\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_0__.Player();\n        this.controls = controls;\n        this.level = (0,_levels__WEBPACK_IMPORTED_MODULE_3__.getLevel)(0);\n        this.movement();\n        this.live();\n    }\n    movement() {\n        document.body.addEventListener(\"keydown\", (e) => {\n            for (const [action, key] of Object.entries(this.controls)) {\n                if (e.key === key && action !== \"shoot\" && action !== \"hitboxes\") {\n                    this.player.move(action, key);\n                }\n            }\n        });\n        document.body.addEventListener(\"keyup\", (e) => {\n            if (this.controls.shoot === e.key)\n                this.bullets.push(this.player.shoot());\n            else if (this.controls.hitboxes === e.key)\n                this.showHitboxes = !this.showHitboxes;\n        });\n    }\n    live() {\n        setInterval(() => {\n            // this.timePassed += 10;\n            this.entityRemover();\n            this.bulletCollisionChecker();\n            this.playerCollisionChecker();\n            this.enemySpawner();\n            this.draw();\n        }, 1000 / 100);\n    }\n    draw() {\n        //background\n        let backgroundGfx = new Image();\n        backgroundGfx.src = \"./gfx/background.png\";\n        _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(backgroundGfx, -this.timePassed * this.scrollSpeed, 0);\n        //lines\n        if (this.showHitboxes === true) {\n            _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.strokeStyle = \"red\";\n            _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.lineWidth = 5;\n            for (const line of this.level.lines) {\n                _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.beginPath();\n                _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.moveTo(line.start.x - this.timePassed * this.scrollSpeed, line.start.y);\n                _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.lineTo(line.end.x - this.timePassed * this.scrollSpeed, line.end.y);\n                _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.stroke();\n            }\n        }\n        //bullets\n        _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = \"gray\";\n        for (const bullet of this.bullets)\n            _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.fillRect(bullet.position.x, bullet.position.y, _consts__WEBPACK_IMPORTED_MODULE_1__.bulletSize.width, _consts__WEBPACK_IMPORTED_MODULE_1__.bulletSize.height);\n        //enemies\n        let enemyGfx = new Image();\n        enemyGfx.src = \"./gfx/enemySample.png\";\n        for (const enemy of this.enemies)\n            _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(enemyGfx, enemy.position.x, enemy.position.y);\n        //player\n        let playerGfx = new Image();\n        playerGfx.src = \"./gfx/player.png\";\n        _consts__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(playerGfx, this.player.position.x, this.player.position.y);\n    }\n    entityRemover() {\n        this.bullets = this.bullets.filter(bullet => bullet.done === false);\n        this.enemies = this.enemies.filter(enemy => enemy.done === false);\n    }\n    bulletCollisionChecker() {\n        for (const bullet of this.bullets) {\n            for (const enemy of this.enemies) {\n                this.bulletEnemyCollision(bullet, enemy);\n            }\n        }\n    }\n    playerCollisionChecker() {\n        for (const enemy of this.enemies) {\n            this.playerEnemyCollision(enemy);\n        }\n    }\n    bulletEnemyCollision(bullet, enemy) {\n        if (bullet.position.x + _consts__WEBPACK_IMPORTED_MODULE_1__.bulletSize.width > enemy.position.x &&\n            bullet.position.x + _consts__WEBPACK_IMPORTED_MODULE_1__.bulletSize.width < enemy.position.x + _consts__WEBPACK_IMPORTED_MODULE_1__.enemySize.width &&\n            bullet.position.y + _consts__WEBPACK_IMPORTED_MODULE_1__.bulletSize.height > enemy.position.y &&\n            bullet.position.y < enemy.position.y + _consts__WEBPACK_IMPORTED_MODULE_1__.enemySize.height) {\n            bullet.kill();\n            enemy.kill();\n        }\n    }\n    playerEnemyCollision(enemy) {\n        if (this.player.position.x + _consts__WEBPACK_IMPORTED_MODULE_1__.playerSize.width > enemy.position.x &&\n            this.player.position.x < enemy.position.x + _consts__WEBPACK_IMPORTED_MODULE_1__.enemySize.width &&\n            this.player.position.y + _consts__WEBPACK_IMPORTED_MODULE_1__.playerSize.height > enemy.position.y &&\n            this.player.position.y < enemy.position.y + _consts__WEBPACK_IMPORTED_MODULE_1__.enemySize.height) {\n            enemy.kill();\n        }\n    }\n    spawnEnemy(ai, startY) {\n        let newEnemy = new _Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(ai, startY);\n        this.enemies.push(newEnemy);\n    }\n    enemySpawner() {\n        for (const enemySpawn of this.level.enemySpawns) {\n            if (this.timePassed >= enemySpawn.spawnTime)\n                this.spawnEnemy(enemySpawn.ai, enemySpawn.startY);\n        }\n        this.level.enemySpawns = this.level.enemySpawns.filter(spawn => this.timePassed < spawn.spawnTime);\n    }\n}\n\n\n\n//# sourceURL=webpack://subterra/./src/Game.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bullet */ \"./src/Bullet.ts\");\n\n\nclass Player {\n    position;\n    shield;\n    speed = 1;\n    speedDelay = 3;\n    blockedMovement = [];\n    constructor() {\n        this.moveTo({ x: 10, y: (_consts__WEBPACK_IMPORTED_MODULE_0__.boardSize.height - _consts__WEBPACK_IMPORTED_MODULE_0__.playerSize.height) / 2 });\n    }\n    moveTo(coords) {\n        this.position = this.stayInBox(coords);\n    }\n    move(dir, key) {\n        if (this.blockedMovement.includes(key))\n            return;\n        let direction = this.getDirection(dir);\n        let moving = setInterval(() => {\n            this.moveTo({ x: this.position.x + direction.x * this.speed, y: this.position.y + direction.y * this.speed });\n        }, this.speedDelay);\n        this.blockedMovement.push(key);\n        document.body.addEventListener(\"keyup\", (e) => {\n            if (e.key === key) {\n                clearInterval(moving);\n                this.blockedMovement = this.blockedMovement.filter(val => val !== key);\n            }\n        });\n    }\n    getDirection(direction) {\n        if (direction == \"up\")\n            return { x: 0, y: -1 };\n        else if (direction == \"right\")\n            return { x: 1, y: 0 };\n        else if (direction == \"down\")\n            return { x: 0, y: 1 };\n        else if (direction == \"left\")\n            return { x: -1, y: 0 };\n    }\n    stayInBox(coords) {\n        const bounds = {\n            x: _consts__WEBPACK_IMPORTED_MODULE_0__.boardSize.width - _consts__WEBPACK_IMPORTED_MODULE_0__.playerSize.width,\n            y: _consts__WEBPACK_IMPORTED_MODULE_0__.boardSize.height - _consts__WEBPACK_IMPORTED_MODULE_0__.playerSize.height\n        };\n        coords.x = coords.x < 0 ? 0 : (coords.x > bounds.x ? bounds.x : coords.x);\n        coords.y = coords.y < 0 ? 0 : (coords.y > bounds.y ? bounds.y : coords.y);\n        return coords;\n    }\n    shoot() {\n        return new _Bullet__WEBPACK_IMPORTED_MODULE_1__.Bullet({ x: this.position.x + _consts__WEBPACK_IMPORTED_MODULE_0__.playerSize.width, y: this.position.y + (_consts__WEBPACK_IMPORTED_MODULE_0__.playerSize.height - _consts__WEBPACK_IMPORTED_MODULE_0__.bulletSize.height) / 2 });\n    }\n}\n\n\n\n//# sourceURL=webpack://subterra/./src/Player.ts?");

/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"boardSize\": () => (/* binding */ boardSize),\n/* harmony export */   \"bulletSize\": () => (/* binding */ bulletSize),\n/* harmony export */   \"canvas\": () => (/* binding */ canvas),\n/* harmony export */   \"ctx\": () => (/* binding */ ctx),\n/* harmony export */   \"enemySize\": () => (/* binding */ enemySize),\n/* harmony export */   \"playerSize\": () => (/* binding */ playerSize)\n/* harmony export */ });\nconst canvas = document.getElementById(\"game\");\nconst ctx = canvas.getContext(\"2d\");\nconst boardSize = { width: 2188, height: 1267 };\nconst playerSize = { width: 172, height: 71 };\nconst bulletSize = { width: 30, height: 10 };\nconst enemySize = { width: 172, height: 150 };\n\n\n\n//# sourceURL=webpack://subterra/./src/consts.ts?");

/***/ }),

/***/ "./src/enemyAis.ts":
/*!*************************!*\
  !*** ./src/enemyAis.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getEnemyAi\": () => (/* binding */ getEnemyAi)\n/* harmony export */ });\nfunction getEnemyAi(ai) {\n    let enemyAi;\n    if (ai === 0) {\n        enemyAi = [\n            { direction: { x: -1, y: 0 }, distance: 800, speed: 2, speedDelay: 1 },\n            { direction: { x: 0, y: -1 }, distance: 200, speed: 2, speedDelay: 1 },\n            { direction: { x: 1, y: 0 }, distance: 800, speed: 2, speedDelay: 1 }\n        ];\n    }\n    else if (ai === 1) {\n        enemyAi = [\n            { direction: { x: -1, y: 0 }, distance: 800, speed: 2, speedDelay: 1 },\n            { direction: { x: 0, y: 1 }, distance: 200, speed: 2, speedDelay: 1 },\n            { direction: { x: 1, y: 0 }, distance: 700, speed: 2, speedDelay: 1 },\n            { direction: { x: 0, y: 1 }, distance: 200, speed: 2, speedDelay: 1 },\n            { direction: { x: -1, y: 0 }, distance: 700, speed: 2, speedDelay: 1 },\n            { direction: { x: 0, y: 1 }, distance: 200, speed: 2, speedDelay: 1 },\n            { direction: { x: 1, y: 0 }, distance: 800, speed: 2, speedDelay: 1 }\n        ];\n    }\n    return enemyAi;\n}\n\n\n\n//# sourceURL=webpack://subterra/./src/enemyAis.ts?");

/***/ }),

/***/ "./src/levels.ts":
/*!***********************!*\
  !*** ./src/levels.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getLevel\": () => (/* binding */ getLevel)\n/* harmony export */ });\nlet levels = [\n    {\n        ceilPoints: [\n            [100, 0],\n            [175, 190],\n            [320, 190],\n            [360, 260],\n            [470, 70],\n            [600, 220],\n            [800, 110],\n            [880, 450],\n            [1032, 79],\n            [1120, 210],\n            [1287, 96],\n            [1333, 174],\n            [1480, 182],\n            [1508, 250],\n            [1665, 11],\n            [1850, 11],\n            [1906, 167],\n            [2048, 190],\n            [2085, 259],\n            [2179, 72],\n            [2326, 234],\n            [2483, 104],\n            [2605, 576],\n            [2704, 557],\n            [2744, 245],\n            [2907, 245],\n            [2959, 125],\n            [3114, 123],\n            [3176, 433],\n            [3289, 213],\n            [3423, 247],\n            [3461, 178],\n            [3770, 156],\n            [3814, 243],\n            [3919, 71],\n            [4041, 248],\n            [4190, 6],\n            [4333, 413],\n            [4539, 19],\n            [4767, 79],\n            [4806, 175],\n            [4944, 60],\n            [5020, 136],\n            [5107, 19],\n            [5188, 9],\n            [5207, 240],\n            [5382, 36],\n            [5482, 435],\n            [5604, 186],\n            [5755, 220],\n            [5784, 7],\n            [5884, 9],\n            [6036, 247],\n            [5939, 457],\n            [6094, 506],\n            [6224, 247],\n            [6480, 98],\n            [6517, 177],\n            [6634, 139],\n            [6693, 250],\n            [6843, 14],\n            [6968, 15],\n            [7038, 338],\n            [7231, 79],\n            [7291, 194],\n            [7465, 7],\n            [7620, 11],\n            [7724, 178],\n            [7871, 9],\n            [7957, 161],\n            [8011, 61],\n            [8137, 251],\n            [8297, 3],\n            [8410, 167],\n            [8481, 473],\n            [8595, 281],\n            [8676, 247],\n            [8821, 85],\n            [8870, 166],\n            [8937, 611],\n        ],\n        floorPoints: [\n            [100, 0],\n            [175, 190],\n            [175, 190],\n            [175, 190],\n            [175, 190],\n        ]\n    }\n];\nfunction getLevel(lvlNumber) {\n    let level;\n    if (lvlNumber === 0) {\n        level = {\n            lines: [\n                {\n                    start: { x: levels[0].ceilPoints[0][0], y: levels[0].ceilPoints[0][1] },\n                    end: { x: levels[0].ceilPoints[1][0], y: levels[0].ceilPoints[1][1] }\n                }\n            ],\n            enemySpawns: [\n                { spawnTime: 3000, ai: 1, startY: 100 },\n                { spawnTime: 6000, ai: 0, startY: 666 },\n                { spawnTime: 9000, ai: 1, startY: 50 }\n            ]\n        };\n        for (const i in levels[0].ceilPoints.slice(1)) {\n            let prev = levels[0].ceilPoints[parseInt(i)];\n            let now = levels[0].ceilPoints[parseInt(i) + 1];\n            level.lines.push({\n                start: { x: prev[0], y: prev[1] },\n                end: { x: now[0], y: now[1] }\n            });\n        }\n    }\n    return level;\n}\n\n\n\n//# sourceURL=webpack://subterra/./src/levels.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\nlet controls = {\n    up: 'ArrowUp',\n    right: 'ArrowRight',\n    down: 'ArrowDown',\n    left: 'ArrowLeft',\n    shoot: 'z',\n    hitboxes: 'h'\n};\nlet game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(controls);\nlet canvas = document.getElementById(\"game\");\nlet screen = 0;\nlet points = \"\";\ncanvas.addEventListener(\"click\", (e) => {\n    points += `[${Math.floor((e.clientX - 10) * 2188 / 1382 + 1850 * screen)}, ` +\n        `${Math.floor((e.clientY - 10) * 1267 / 800)}],\\n`;\n});\ndocument.body.addEventListener(\"keyup\", (e) => {\n    let xd = e.key;\n    if (xd === \"Enter\")\n        console.log(points);\n    else if (xd === \"Delete\")\n        points = \"\";\n    let x = parseInt(xd);\n    if (Number.isInteger(x)) {\n        screen = x;\n        game.timePassed = x * 1850;\n    }\n});\n\n\n//# sourceURL=webpack://subterra/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
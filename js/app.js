// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.rowArr = [60, 145, 227];
    this.init();
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

//此为用来初始化敌人位置、速度的函数
Enemy.prototype.init = function() {
    this.x = 0;
    this.y = this.rowArr[Math.floor(Math.random()*3)];
    this.speed = Math.ceil(Math.random() * 10 + 2);
}

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if(this.x > 500){
        this.init();
    }
    ctx.drawImage(Resources.get(this.sprite), (this.x+=this.speed) * dt, this.y);
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
    this.init();
    this.sprite = 'images/char-boy.png'
}

// 这个函数是用来初始化玩家位置的
Player.prototype.init = function() {
    this.x = 200;
    this.y = 300;
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left': if( this.x - 100 >= 0 ) this.x-=100;
        break;
        case 'right': if( this.x + 100 <= 400 ) this.x+=100;
        break;
        case 'up':  
            if( this.y - 80 >= 0 ) {
                this.y-=80;
            } else {
                this.y = 300;
            };
        break;
        case 'down': if( this.y + 80 <= 400 ) this.y+=80;
        break;
    }
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
let allEnemies = [];
for( let i = 0; i < 3; i++ ){
    let enemy = new Enemy();
    allEnemies.push(enemy);
}

let player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


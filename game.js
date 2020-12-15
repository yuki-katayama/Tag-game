let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let w = canvas.width;
let h = canvas.height;
let playerX = w / 2;
let playerY = h / 2;
let enemyX = [0, w / 2 - 50, w - 100];
let enemyY = [h /2 - 50, 0, h / 2 - 50];
let itemX = [0, 0, 0];
let itemY = [0, 0, 0];
let time = 60;
let count = 0;
let id = setInterval(draw, 10);

function ft_draw_map(ctx, w, h)
{
	ctx.fillStyle = "#FAEFD4";
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "#662E1C";
	ctx.fillRect(0, 0, w / 2 - 50, 100);
	ctx.fillRect(w / 2 + 50, 0, w / 2 - 50, 100);
	ctx.fillRect(0, 0, 100, h / 2 - 50);
	ctx.fillRect(0, h / 2 + 50, 100, h / 2 - 50);
	ctx.fillRect(w - 100, 0, 100, h / 2 - 50);
	ctx.fillRect(w - 100, h / 2 + 50 ,100, h / 2 - 50);
}

function ft_draw_player(ctx, playerX, playerY)
{
	let player = new Image();
	player.src = "image/player.png";
	ctx.drawImage(player, playerX, playerY, 100, 100);
}

function ft_draw_enemy(ctx, enemyX, enemyY, playerX, playerY)
{
	for(let i = 0; i < 3; i ++)
	{
		let enemy = new Image();
		let enemyPath = "image/enemy"+ (i + 1) +".png";
		enemy.src = enemyPath;
		ctx.drawImage(enemy, enemyX[i], enemyY[i], 100, 100);
		if(i > Math.floor((60 - time) / 20)){
			continue;
		  }
		if(enemyY[i] > playerY - 75 && enemyY[i] < playerY + 75 &&
			enemyX[i] > playerX - 75 && enemyX[i] < playerX + 75)
			{
				ctx.font = "50px 'ＭＳ ゴシック'";
				ctx.fillStyle = "#EA5549";
				ctx.fillText("GAME OVER...", w / 2 - 150, h / 2);
				clearInterval(id);
			}
		let tilt = (playerY - enemyY[i]) / (playerX - enemyX[i]);
		let x = Math.sqrt(1 / (1 + tilt * tilt));
		if(playerX > enemyX[i]){
		  enemyX[i] += x;
		  enemyY[i] += tilt * x;
		}
		else{
		  enemyX[i] -= x;
		  enemyY[i] -= tilt * x;
		}
	}
}

function　ft_draw_item(ctx, itemX, itemY)
{
	let enemyInitialX = [0, w / 2 - 50, w - 100];
    let enemyInitialY = [h /2 - 50, 0, h / 2 - 50];
	for(let i = 0; i < 3; i ++)
	{
		let item = new Image();
		let itemPath = "image/item" + (i + 1) + ".png";
		item.src = itemPath;
		ctx.drawImage(item, itemX[i], itemY[i], 50, 50);
		if(count % 500 == 0){
			itemX[i] = Math.random() * ( w - 300 ) + 100;
			itemY[i] = Math.random() * ( h - 200 ) + 100;
		  }
		if(itemY[i] > playerY - 40 && itemY[i] < playerY + 75 &&
			itemX[i] > playerX - 40 && itemX[i] < playerX + 75)
		{
			enemyX[i] = enemyInitialX[i];
			enemyY[i] = enemyInitialY[i];
			itemX[i] = -100;
			itemY[i] = -100;
		}
	}
}

function draw()
{
  ft_draw_map(ctx, w, h);
  ft_draw_player(ctx, playerX, playerY);
  ft_draw_enemy(ctx, enemyX, enemyY, playerX, playerY);
  ft_draw_item(ctx, itemX, itemY);
  count += 1;
  if(count % 100 == 0){
	  time -= 1;
  }
  if(time == 0){
	ctx.font = "50px 'ＭＳ ゴシック'";
	ctx.fillStyle = "#333333";
	ctx.fillText("GAME CLEAR！", w / 2 - 150, h / 2);
	clearInterval(id);
  }
  ctx.font = "30px 'ＭＳ ゴシック'";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("残り時間：" + time, 50, 50);
}

document.onkeydown = keydown;
function keydown(e){
	if(e.which == 37 && playerX > 100){
	  playerX -= 20;
	}
	else if(e.which == 38 && playerY > 100){
	  playerY -= 20;
	}
	else if(e.which == 39 && playerX < w - 200){
	  playerX += 20;
	}
	else if(e.which == 40 && playerY < h - 100){
	  playerY += 20;
	}
  }
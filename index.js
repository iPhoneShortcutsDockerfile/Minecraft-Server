const express = require('express');
const mineflayer = require('mineflayer');

// UptimeRobotからのアクセスを受け付けるための簡易Webサーバー
const app = express();
app.get('/', (req, res) => res.send('Bot is running'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Manulafu.aternos.me', // 書き換える
    port: 44397, // あなたの5桁のポート番号に書き換える
    username: 'KeepAliveBot',
    version: false // 自動判別（動かない場合は "1.21.4" のように指定）
  });

  // キックされたり切断されたら5秒後に再接続
  bot.on('end', () => {
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => console.log(err));
}

createBot();

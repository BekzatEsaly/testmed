const { Telegraf,
        Markup 
    } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();
const text = require('./const');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Сәлеметсіз бе ${ctx.message.from.first_name ? ctx.message.from.first_name : 'Құрметті бот пайдаланушы'}`));
bot.help((ctx) => ctx.reply(text.commands));
/*bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));*/

bot.command('help', (ctx) => {
    ctx.replyWithHTML('<b>Анықтама алу</b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('Бірінші...', 'btn_1')]
        ]
    ))
});

bot.command('firstaids', async (ctx) => {
    try {
    await ctx.replyWithHTML('<b>Талма кезіндегі АЛҒАШҚЫ дәрігерге дейінгі медициналық көмек төменде рет-ретімен көрсетілген. Толығырақ танысу үшін батырмаларды басыңыз</b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('1. ЕСКЕРТУ!!!', 'btn_1')], 
            [Markup.button.callback('2. Тегіс жерге жатқызу','btn_2')],
            [Markup.button.callback('3. Бір қырымен жатқызу', 'btn_3')], 
            [Markup.button.callback('4. Басына жұмсақ зат қою','btn_4')],
            [Markup.button.callback('5. Жедел жәрдем шақыру','btn_5')]
        ]
    ))
    } catch(e) {
        console.error(e)
    }
});

function addAction(name, src,text){
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (e) {
            console.error(e)
        }
    })
}

addAction('btn_1', './img/1.jpg',text.text1);
addAction('btn_2', './img/2.jpg',text.text2);
addAction('btn_3', './img/3.jpg',text.text3);
addAction('btn_4', './img/4.jpg',text.text4);
addAction('btn_5', './img/5.jpg',text.text5);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

import { reactive } from "vue";

export const store = reactive (
    {
        coin: 0,
        coinEarnd : 0,
        coinValue : 12,
        clickValue: 1,
        clickLevel: 1,
        increaseClickValue: 1,
        clickPrice : 25,
        enemyLife : 10,
        enemyMaxLife : 10,
        ActualStage : 1,
        AcutalFloor : 1,
        ActualEnemies: 1,
        MaxEnemies: 10,
        timer: 30,
        totalDps : 0,
        autoAttack: false,
        allies : [
            {
                name: 'primo alleato',
                priceToBuy: 500,
                priceToLvlUp: 300,
                increasePrice: 1.4,
                startDps: 15,
                increaseDps: 3,
                atkSpd: 1000,
                Dps: 15,
                actualLevel: 1,
                unlocked: false,

            }
        ],
        enemies : [
            {
                name: 'Catra',
                img: 'Catra-defeat.webp'
            },
            {
                name: 'Dirge',
                img: 'Dirge_Beetle.webp'
            },
            {
                name: 'Flower',
                img: 'Flower_Bloop.webp'
            },
            {
                name: 'Gerbeel',
                img: 'Gerbeel.webp'
            },
            {
                name: 'Spirit Flower',
                img: 'Spit_Flower.webp'
            },
        ]
    }
)
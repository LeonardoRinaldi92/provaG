import { reactive } from "vue";

export const store = reactive (
    {
        coin: 0,
        coinValue : 12,
        clickValue: 1,
        clickLevel: 1,
        clickPrice : 25,
        enemyLife : 10,
        enemyMaxLife : 10,
        ActualStage : 1,
        AcutalFloor : 1,
        timer: 30,
        totalDps : 0,
        allies : [
            {
                name: 'pippo',
                priceToBuy: 500,
                priceToLvlUp: 700,
                increasePrice: 1.4,
                startDps: 10,
                increaseDps: 1.5,
                atkSpd: 1000,
                Dps: 10,
                actualLevel: 1,
                unlocked: false,

            }
        ]
    }
)
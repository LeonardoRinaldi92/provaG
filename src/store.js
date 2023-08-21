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
    }
)
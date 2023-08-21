import { reactive } from "vue";

export const store = reactive (
    {
        coin: 0,
        clickValue: 1,
        clickPrice : 25,
        enemyLife : 10,
        enemyMaxLife : 10,
    }
)
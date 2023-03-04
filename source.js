import Attack from "./attack.js";

class Source {
    /**
     * Creates a Source, automatically sorts the attack list given to it to
     * chronological order.
     *
     * @param {string} name
     * @param {Attack[]} attacks
     */
    constructor(name, attacks) {
        this.name = name;
        this.attacks = attacks.sort((a, b) => {a.timestamp - b.timestamp});
        this.damageDone = 0;
        this.dps = 0;

        initializeDamage(attacks);

        return;
    }

    /**
     * Calculates and initializes damageDone and dps. This function assumes
     * that all Attacks in the array passed to it have the same source.
     *
     * Based on combatLog.calculate() in the upstream project.
     *
     * @param {Attack[]} attacks
     */
    function initializeDamage(attacks) {
        let damageDone = 0;
        let dps = 0;

        // calculate damageDone
        attacks.forEach((attack) => {
            damageDone += attack.amount;
        });

        // calculate dps
        let duration = attacks[0].timestamp -
            attacks[attacks.length - 1].timestamp;
        dps = damageDone / (duration / 1000);

        this.damageDone = damageDone;
        this.dps = dps;

        return;
    }
}

export default Source;

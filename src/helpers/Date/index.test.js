import { getMonth } from './index';

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        // Vérifie que le mois "janvier" est correctement renvoyé pour la date "2022-01-01"
        it("the function return janvier for 2022-01-01 as date", () => {
            // Utilise la fonction getMonth avec une date spécifiée
            // et vérifie si le résultat est égal à "janvier" en comparant avec la méthode "toBe"
            expect(getMonth(new Date("2022-01-01"))).toBe("janvier");
        });
        // Vérifie que le mois "juillet" est correctement renvoyé pour la date "2022-07-08"
        it("the function return juillet for 2022-07-08 as date", () => {
            expect(getMonth(new Date("2022-07-08"))).toBe("juillet");
        });
        // Vérifie que le mois "août" est correctement renvoyé pour la date "2022-08-25"
        it("the function returns août for 2022-08-25 as date", () => {
            expect(getMonth(new Date("2022-08-25"))).toBe("août");
        });
    });
})


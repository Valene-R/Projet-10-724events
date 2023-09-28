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

         // Test itératif basé sur le tableau MONTHS_DATA pour tester chaque date
         it("returns the correct month for each date in TEST_MONTHS", () => {
            // Définit le tableau MONTHS_DATA avec des dates et les mois correspondants
            const MONTHS_DATA = [
                { date: "2022-01-31", response: 'janvier' },
                { date: "2022-02-18", response: 'février' },
                { date: "2022-01-01", response: 'janvier' },
            ];
            // Pour chaque élément du tableau MONTHS_DATA
            MONTHS_DATA.forEach(item => {
                // Convertit la chaîne de date en objet Date
                const date = new Date(item.date);
                // Vérifie si le mois retourné par getMonth est correct
                expect(getMonth(date)).toBe(item.response);
            });
        });
    });
})
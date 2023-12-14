import { round, toRadians } from "./DegreeConverions";

const hk = 14;
const kat_rozwarcia = 85;
const kat_nachylenia = (180 - kat_rozwarcia) / 2;
const z = round(180 - kat_rozwarcia);

const dkx = kat_rozwarcia <= 90 ? hk / Math.tan(toRadians(0.5 * kat_rozwarcia)) : hk / Math.sin(toRadians(180 - kat_rozwarcia));

const x_dk = round(hk / Math.sin(toRadians((180 - kat_rozwarcia) / 2)));
const y_dk = round(hk / Math.sin(toRadians(0.5 * kat_rozwarcia)));
const sz = round(y_dk / (2 * Math.sin(toRadians(kat_nachylenia))));


// console.log("Pierwsza dkx1: " + dkxCount())
// console.log("dkx2: " + dkx2);
// console.log("dky2: " + dky2)

const szCount = (): number => {
    let sz;
    if (kat_rozwarcia! <= 90) {
        const kat = 90 - kat_rozwarcia!;
        const c = Math.tan(toRadians(kat)) * hk;
        sz = dkx! - c;
    } else {
        sz = dkx;
    }
    return sz;
}

console.log("sz1: " + szCount());
console.log("sz2 " + sz);


console.log("dkk test ---")
console.log(Math.tan(toRadians(90 - kat_rozwarcia)) * hk);
console.log(hk / Math.tan(toRadians(180 - kat_rozwarcia)));


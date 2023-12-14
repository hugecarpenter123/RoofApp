interface RafterDistributionArgs {
    p: number, 
    s: number, 
    d_min: number, 
    d_max: number
}

export default class RafterDistribution {
    public readonly d_calkowita: number;
    public readonly s_krokwi: number;
    public readonly o_przecial_dolny: number;
    public readonly o_przecial_gorny: number;
    public readonly i_dolne: number;
    public readonly i_gorne: number;
    public readonly wyniki: number[][];

    constructor(args: RafterDistributionArgs) {
        this.d_calkowita = args.p;
        this.s_krokwi = args.s;
        this.o_przecial_dolny = args.d_min;
        this.o_przecial_gorny = args.d_max;
        this.i_dolne = this.oblicz_i_dolne();
        this.i_gorne = this.oblicz_i_gorne();
        this.wyniki = this.oblicz();
        // this.drukuj();
    }

    private oblicz_i_dolne() {
        const i_dolne = (this.d_calkowita - this.s_krokwi) / (this.o_przecial_gorny + this.s_krokwi);
        return Math.round(i_dolne * 100) / 100;
    }

    private oblicz_i_gorne(): number {
        let i_gorne = (this.d_calkowita - this.s_krokwi) / (this.o_przecial_dolny + this.s_krokwi);
        return Math.round(i_gorne * 100) / 100;
    }

    private odleglosc(ilosc_interwalow: number): number {
        const odl = ((this.d_calkowita - this.s_krokwi) / ilosc_interwalow) - this.s_krokwi;
        return odl;
    }

    private oblicz() {
        const arr: number[][] = [];

        for (let i = Math.ceil(this.i_dolne); i < this.i_gorne + 1; i++) {
            const odleglosc = Math.round(this.odleglosc(i) * 100) / 100;
            const arrInner: number[] = [i + 1, odleglosc, odleglosc + this.s_krokwi];

            arr.push(arrInner);
        }
        return arr;
    }

    public drukuj() {
        for (const innerArray of this.wyniki) {
            console.log(`Liczba krokwi: ${innerArray[0]}, Odległość ${innerArray[1]}, Rysowanie: ${innerArray[2]}`);
        }
    }
}

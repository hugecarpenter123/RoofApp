export interface GableRoofCalculatorArgs {
    p: number;
    d: number;
    g: number;
    h?: number;
    k?: number;
    hj?: number;
    mp?: number;
}

export default class GableRoofCalculator {
    p: number; // długość okapu od muru do 
    d: number; // odłegłość od murłaty do murłaty po zewnętrznej
    h?: number; // wysokość od murłaty (góra) do spodu skrzyżowania krokiew
    kat_rozwarcia?: number; // kąt rozwarcia dachu !!!
    kat_nachylenia?: number; // kąt między płaszczyzną murłaty a krokwią
    hk: number;  // grubość korkwi
    hj?: number; // wysokość od murłaty (góra) do spodu jętki
    mp?: number; // odległość od murłaty (zewnątrz) do słupka z płatwią
    kat_zaciecia: number;
    sz: number;
    x_krokwi: number;
    y_krokwi: number;
    dkpm: number; // długość krokwi poza murłatą
    x_kpm: number;
    y_kpm: number;
    dkw: number; // długość korkwi wewnęntrzej (od spodu skrzyżowania krokwi do zamka)
    dkg: number; // długość krokwi od skrzyżowania krokwii do końca u góry
    dkk: number; // długość końca krowki u góry w przypadku kąta > 90
    dk_calk: number; // długość krokwii całkowita
    djx?: number;
    djw?: number; // długość jętki wewnętrznej
    djc?: number;
    djkk?: number; // długość krokwi od końca krokwi do spodu przecięcia z jętką
    hp?: number;
    dkmp?: number; // dłguość krokwi od murłaty do płatwy (wewnętrzna)
    dkgp?: number;
    opp?: number;
    zamek?: { odleglosc: number; kat1: number; kat2: number };
    powDachu?: number; // powierzchnia dachu

    constructor(args: GableRoofCalculatorArgs) {
        this.p = args.p;
        this.d = args.d;
        this.hk = args.g;
        this.h = args.h;
        this.kat_nachylenia = args.k;
        this.hj = args.hj;
        this.mp = args.mp;

        if (this.h != null) {
            console.log("H - obecne");
            this.kat_rozwarcia = this.kat_rozwarciaCountFromH();
            this.kat_nachylenia = this.kat_nachyleniaCount();
        } else if (this.kat_nachylenia != null) {
            console.log("Kąt podany: " + this.kat_nachylenia);
            this.kat_rozwarcia = 180 - (2 * this.kat_nachylenia!);
            console.log("kąt rozwarcia obliczono: " + this.kat_rozwarcia);
            this.h = this.hCount();
        }

        this.x_krokwi = this.x_krokwiCount();
        this.y_krokwi = this.y_krokwiCount();
        this.dkpm = this.dkpmCount();
        this.x_kpm = this.x_kpmCount();
        this.y_kpm = this.y_kpmCount();

        this.kat_zaciecia = this.kat_zacieciaCount();
        this.dkw = this.dkwCount();
        this.dkg = this.dkgCount();
        this.dk_calk = this.dk_calkCount();
        this.zamek = this.zamekCount();
        this.dkk = this.dkkCount();
        this.sz = this.szCount();

        if (this.mp != null) {
            console.log("mp " + this.mp + " -  obecne");
            this.hp = this.hpCount();
            this.dkmp = this.dkmpCount();
            this.dkgp = this.dkgpCount();
            this.opp = this.oppCount();
        }

        if (this.hj != null) {
            console.log("hj: " + this.hj + " - obecne");
            this.djx = this.djxCount();
            this.djw = this.djwCount();
            this.djc = this.djcCount();
            this.djkk = this.djkkCount();
        }
        // this.podsmuwanie();
    }
    private kat_nachyleniaCount(): number {
        return (180 - this.kat_rozwarcia!) / 2;
    }

    private kat_rozwarciaCountFromH(): number {
        let k = this.toDegrees(Math.atan((this.d * 0.5) / this.h!));
        k = 2 * Math.round(k * 100.0) / 100.0;
        return Math.round(k * 100.0) / 100.0;
    }

    private hCount(): number {
        const h = 0.5 * (this.d / Math.tan(this.toRadians(this.kat_rozwarcia! * 0.5)));
        return this.round(h);
    }

    private x_krokwiCount(): number {
        return this.round(this.hk / Math.sin(this.toRadians(this.kat_nachylenia!)));
    }


    private y_krokwiCount(): number {
        return this.round(this.hk / Math.sin(this.toRadians(this.kat_rozwarcia! / 2)));
    }

    private dkpmCount(): number {
        const dkpm = this.p / Math.cos(this.toRadians(this.kat_nachylenia!));
        return this.round(dkpm);
    }

    private x_kpmCount(): number {
        return this.p;
    }

    private y_kpmCount(): number {
        return this.round(Math.tan(this.toRadians(this.kat_nachylenia!)) * this.x_kpm);
    }

    private kat_zacieciaCount(): number {
        return this.round(180 - this.kat_rozwarcia!);
    }

    private dkwCount(): number {
        const dkw = (0.5 * this.d) / Math.sin(this.toRadians(0.5 * this.kat_rozwarcia!));
        return Math.round(dkw * 100.0) / 100.0;
    }

    private dkgCount(): number {
        let x;
        if (this.kat_rozwarcia! <= 90) {
            x = this.hk / Math.tan(this.toRadians(0.5 * this.kat_rozwarcia!));
        } else {
            x = this.hk / Math.sin(this.toRadians(180 - this.kat_rozwarcia!));
        }
        return Math.round(x * 100.0) / 100.0;
    }

    private dk_calkCount(): number {
        return Math.round((this.dkg! + this.dkw! + this.dkpm!) * 100.0) / 100.0;
    }

    private zamekCount(): { odleglosc: number; kat1: number; kat2: number } {
        const distance = this.dkg! + this.dkw!;
        const kat1 = 0.5 * this.kat_rozwarcia! + this.kat_zaciecia!;
        const kat2 = 90 - 0.5 * this.kat_rozwarcia!;
        return {
            odleglosc: distance,
            kat1: Math.round(kat1 * 100.0) / 100.0,
            kat2: Math.round(kat2 * 100.0) / 100.0,
        };
    }

    private dkkCount(): number {
        return Math.abs(this.round(Math.tan(this.toRadians(90 - this.kat_rozwarcia!)) * this.hk));
    }

    // dorobić dkkCount
    private szCount(): number {
        return this.round(this.y_krokwi / (2 * Math.sin(this.toRadians(this.kat_nachylenia!))));
    }

    private hpCount(): number {
        const hp = Math.tan(this.toRadians(180 - this.kat_rozwarcia!) / 2) * this.mp!;
        return Math.round(hp * 100.0) / 100.0;
    }

    private dkmpCount(): number {
        const dkmp = this.mp! / Math.cos(this.toRadians((180 - this.kat_rozwarcia!) / 2));
        return Math.round(dkmp * 100.0) / 100.0;
    }

    private dkgpCount(): number {
        const dkgp = this.dkg! + this.dkw! - this.dkmp!;
        return Math.round(dkgp * 100) / 100;
    }

    private oppCount(): number {
        /**
         * Funkcja zwraca odległość od płatwy do płatwy po zewnętrznej
         */
        return this.d - 2 * this.mp!;
    }

    private djxCount(): number {
        /**
         * Funkcja zwraca długość jętki nachodzącej na krokwiew (równolegle do ziemi)
         *
         * @var kat_d: kąt pomiędzy prostą prostopadłą do krokwi przechodzącą przez punkt przecięcia spodu jętki z krokwią
         *                     , a jętką nachodzącą na krokwiew
         * @var djx: długość jętki nachodzącej na krokiew
         */
        const kat_d = 90 - ((180 - this.kat_rozwarcia!) / 2);
        const djx = this.hk / Math.cos(this.toRadians(kat_d));
        return Math.round(djx * 100.0) / 100.0;
    }

    private djwCount(): number {
        /**
         * Funkcja obliczająca długość jętki wewnętrznej (bez nachodzenia na krokwy)
         * @var: xd: zmienna przechowująca odległość od murłaty do prostej prostopadłej przechodzącej przez
         *           przecięcie jętki z krokwią
         */
        const xd = Math.round((this.hj! / Math.tan(this.toRadians((180 - this.kat_rozwarcia!) / 2))) * 100.0) / 100.0;
        const djw = (0.5 * this.d - xd) * 2;
        return djw;
    }

    private djcCount(): number {
        const djc = this.djw! + 2 * this.djx!;
        return Math.round(djc * 100.0) / 100.0;
    }

    private djkkCount(): number {
        /**
         * Funkcja zwracająca długość od końca krokwi do punktu przecięcia ze spodem jętki
         */
        const xd = this.hj! / Math.tan(this.toRadians((180 - this.kat_rozwarcia!) / 2));
        const kjw = Math.sqrt(xd * xd + this.hj! * this.hj!);
        const djkk = this.dkpm! + kjw;
        return Math.round(djkk * 100.0) / 100.0;
    }

    public podsmuwanie(): void {
        console.log("Długość krokwi poza murłatą: " + this.dkpm);
        console.log("Kąt zacięcia: " + this.kat_zaciecia);
        console.log("Szerokość zacięcia: " + this.sz);
        console.log("Całkowita długość krokwii: " + this.dk_calk);
        console.log("Długość krokwi wewnętrznej: " + this.dkw);
        console.log("Depka");
        console.log("Kąt (prostopadły): " + this.zamek!.kat1);
        console.log("Kąt (równoległy): " + this.zamek!.kat2);
        if (this.hj != null) {
            console.log("Długość jętki: " + this.djc);
            console.log("Rysowanie jetki od spodu krokwi: " + this.djkk);
        }
        if (this.mp != null) {
            console.log("Doległość między płatwami (zewnętrznie): " + this.opp);
            console.log("Rysowanie na depkę płatwy od góry krokwi: " + this.dkgp);
            console.log("Długość słupka od murłaty do krokwi: " + this.hp);
        }
    }
    private toRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }
    private toDegrees(radians: number): number {
        return (radians * 180) / Math.PI;
    }
    private round(value: number): number {
        return Math.round(value * 100) / 100;
    }
}


import { Polygon } from "react-native-svg";
import { round, toRadians } from "./DegreeConverions";
import GableRoofCalculator from "./GableRoofCalculator";

export default class RafterSimulation {
    private readonly gableData;
    /** Prop dla komponentu SVG, np: `0 0 300 50` */
    public readonly viewBox: string;
    /** Przeskalowana wysokość zamka */
    private readonly h_zamka: number;
    /** Przeskalowana długość zamka na osi Y */
    private readonly y_zamka: number; 
    /** Przeskalowana długość zamka na osi X */
    private readonly x_zamka: number;
    /** Przeskalowana długość na osi X od zamka do prostej prostopadłej prostej wyznaczająćej wysokość zamka */
    private readonly x_zamka1: number;
    /** kąt przyległy do kąta prostopadłego zamka */
    private readonly _kp: number;
    /** Stała wartość wektora długości krokwi na osi X dla SVG */
    private readonly x_krokwi = 300;
    /** Stała wartość wektora długości krokwi na osi Y dla SVG */
    private readonly y_krokwi = 50;
    /** Wartość X szerokości zacięcia */
    private readonly x_sz: number;

    constructor(gableData: GableRoofCalculator) {
        this.gableData = gableData;
        this.viewBox = this.calcResolutions();
        this._kp = this._kpCount();
        this.y_zamka = this.y_zamkaCount();
        this.h_zamka = this.h_zamkaCount();
        this.x_zamka = this.x_zamkaCount();
        this.x_zamka1 = this.x_zamka1Count();
        this.x_sz = this.x_szCount();
    }
    private x_szCount(): number {
        return (this.gableData.sz * this.y_krokwi) / this.gableData.hk;
    }
    private x_zamka1Count(): any {
        return Math.cos(toRadians(this._kp)) * this.h_zamka;
    }
    private _kpCount(): number {
        return 180 - this.gableData.zamek!.kat1;
    }

    private y_zamkaCount(): number {
        // return Math.sin(toRadians(this._kp)) * this.h_zamka;
        return this.y_krokwi * 0.25;
    }
    private x_zamkaCount(): number {
        return this.h_zamka / Math.cos(toRadians(this._kp));
    }

    private calcResolutions() {
        return `0 0 ${300} ${50}`;
    }

    private h_zamkaCount(): number {
        return this.y_zamka / Math.sin(toRadians(this._kp))
    }

    private rafter() {

        const rafterLeftX = 0;
        const rafterBottomY = this.y_krokwi;
        const _dkpm = this._(this.gableData.dkpm); // przeskalowana długość krokwi poza murłatą
        const _dkmp = this.gableData.dkmp ? this._(this.gableData.dkmp!) : null; // przeskalowana długość krokwi od murłaty do płatwi

        const bareRafter =
            `${rafterLeftX},${rafterBottomY} ` +
            `${rafterLeftX},${rafterBottomY - this.y_krokwi} ` +
            `${rafterLeftX + this.x_krokwi},${rafterBottomY - this.y_krokwi} ` +
            `${rafterLeftX + this.x_krokwi},${rafterBottomY} `;

        const lock =
            `${this.x_krokwi - _dkpm},${rafterBottomY} ` +
            `${this.x_krokwi - _dkpm - this.x_zamka1},${rafterBottomY - this.y_zamka} ` +
            `${this.x_krokwi - _dkpm - this.x_zamka},${rafterBottomY} `;

        const platew_lock = _dkmp ? 
        `${this.x_krokwi - _dkpm - _dkmp}, ${rafterBottomY} ` +
        `${this.x_krokwi - _dkpm - _dkmp - this.x_zamka1},${rafterBottomY - this.y_zamka} ` +
        `${this.x_krokwi - _dkpm - _dkmp - this.x_zamka},${rafterBottomY} `
        : null

        const points = bareRafter + lock + (platew_lock ? platew_lock : '');

        const fill = '#a96c23';
        const strokeWidth = 3;
        const stroke = '#90550e'
        return { points, fill, stroke, strokeWidth };
    }

    private rafterCut() {
        const _dkk = this._(this.gableData.dkk)
        const _sz = this.x_sz;
        const bottomRafterY = this.y_krokwi;
        const leftRafterX = 0;

        console.log("this.y_krokwi: " + this.y_krokwi)
        console.log("this.x_sz: " + this.x_sz)
 
        const points = this.gableData.kat_rozwarcia! > 90 
        ?
        `${leftRafterX},${bottomRafterY} ` +
        `${leftRafterX + _dkk},${bottomRafterY - this.y_krokwi} ` +
        `${leftRafterX + _dkk + _sz},${bottomRafterY - this.y_krokwi} ` +
        `${leftRafterX + _sz},${bottomRafterY} `
        :
        `${leftRafterX + _dkk},${bottomRafterY} ` +
        `${leftRafterX},${bottomRafterY - this.y_krokwi} ` +
        `${leftRafterX + _sz},${bottomRafterY - this.y_krokwi} ` +
        `${leftRafterX + _dkk + _sz},${bottomRafterY} `;
        

        const fill = '#e39231';
        const strokeWidth = 3;
        const stroke = ''
        return { points, fill, stroke, strokeWidth };
    }

    private data() {
        const points = '';
        const strokeWidth = 1;
        const stroke = 'grey';
        const fill = '';
        return { points, fill, stroke, strokeWidth };
    }

    /**
     * Function scales the real values to the SVG declared constants
     * @param value Value that is going to be scaled for the image
     * @param axis Axis on which value will be scaled, default is 'X'
     * @returns Scaled value for given SVG
     */
    private _(value: number, axis: 'X' | 'Y' = 'X'): number {
        if (axis === 'Y') {
            return (this.y_krokwi * value) / this.gableData.hk
        }
        return (value * this.x_krokwi) / this.gableData.dk_calk;
    }

    /**
     * 
     * @returns Array of objects containing props necessary to build <Polygon /> for SVG component
     */
    public getPicture(){
        const arr = [
            this.rafter(),
            this.rafterCut(),
            this.data(),
        ]
        return arr;
    }
}
import { Polygon } from "react-native-svg";
import { round, toRadians } from "./DegreeConverions";
import GableRoofCalculator from "./GableRoofCalculator";

export default class RoofSimulation {
    private readonly murlata = 15;
    private readonly h_jetki = 14;
    private readonly platew_x = 16;
    private readonly platew_y = 16;

    private readonly gableData: GableRoofCalculator;
    private readonly x: number; // całkowita długość na osi X dachu
    private readonly y: number; // całkowita długość na osi Y dachu z murłatą
    public readonly viewBox; // wymiary widoku dla komponentu <SvG />
    private readonly y_murlaty; // wysokość całkowita dachu bez uwzględnienia murłaty


    constructor(gableData: GableRoofCalculator) {
        this.gableData = gableData;
        this.x = this.calcX();
        this.y = this.calcY();
        this.viewBox = this.calcResolutions();
        this.y_murlaty = this.calcY_murlaty();
    }

    private calcX() {
        return round(this.gableData.d + 2 * this.gableData.x_kpm); // or p
    }
    private calcY() {
        return this.gableData.y_kpm > this.murlata
            ? (this.gableData.h! + this.gableData.y_kpm)
            : (this.gableData.h! + this.murlata);
    }

    private calcResolutions(): string {
        return `0 0 ${this.x} ${this.y}`;
    }

    private calcY_murlaty(): number {
        return this.gableData.y_kpm + this.gableData.h! + this.gableData.y_krokwi;
    }

    private leftWallPlate() {
        const topSideY = this.gableData.h! + this.gableData.y_krokwi;
        const leftSideX = this.gableData.x_kpm;
        const points =
            `${leftSideX},${topSideY} ` +
            `${leftSideX + this.murlata},${topSideY} ` +
            `${leftSideX + this.murlata},${topSideY + this.murlata} ` +
            `${leftSideX},${topSideY + this.murlata} `;

        const fill = '#a96c23';
        const strokeWidth = 3;
        const stroke = '#90550e'
        return { points, fill, stroke, strokeWidth }
    }

    private rightWallPlate() {
        const topSideY = this.gableData.h! + this.gableData.y_krokwi;
        const rightSideX = this.gableData.x_kpm + this.gableData.d;
        const points =
            `${rightSideX},${topSideY} ` +
            `${rightSideX},${topSideY + this.murlata} ` +
            `${rightSideX - this.murlata},${topSideY + this.murlata} ` +
            `${rightSideX - this.murlata},${topSideY} `;


        const fill = '#a96c23';
        const strokeWidth = 3;
        const stroke = '#90550e'
        return { points, fill, stroke, strokeWidth }
    }

    private rafters() {
        const points =
            `0,${this.y_murlaty} ` +
            `0,${this.y_murlaty - this.gableData.y_krokwi} ` +
            `${this.x / 2},0 ` +
            `${this.x},${this.y_murlaty - this.gableData.y_krokwi} ` +
            `${this.x},${this.y_murlaty} ` +
            `${this.x / 2},${this.gableData.y_krokwi} `;

        const fill = '#a96c23';
        const strokeWidth = 3;
        const stroke = '#90550e'
        return { points, fill, stroke, strokeWidth }
    }

    private jetka() {
        const ddx = round(this.h_jetki / Math.tan(toRadians(this.gableData.kat_nachylenia!))) // dystans dolny x
        const dgx = this.gableData.djc! - 2 * ddx;

        const botSideY = this.gableData.y_krokwi + this.gableData.h! +  - this.gableData.hj!;
        const leftBotCornerX = (this.x - this.gableData.djc!) / 2;
        const points =
            `${leftBotCornerX},${botSideY} ` +
            `${leftBotCornerX + ddx},${botSideY - this.h_jetki} ` +
            `${leftBotCornerX + ddx + dgx},${botSideY - this.h_jetki} ` +
            `${leftBotCornerX + ddx + dgx + ddx},${botSideY} `;

        const fill = '#a96c23';
        const strokeWidth = 3;
        const stroke = '#90550e'
        return { points, fill, stroke, strokeWidth }
    }

    private platewLeft() {
        const botSideY = this.gableData.y_krokwi + this.gableData.h!;
        const leftSideX = this.gableData.x_kpm + this.gableData.mp!;
        const points =
            `${leftSideX},${botSideY} ` +
            `${leftSideX},${botSideY - this.gableData.hp!} ` +
            `${leftSideX + this.platew_x},${botSideY - this.gableData.hp!} ` +
            `${leftSideX + this.platew_x},${botSideY} `;

        const fill = '#a96c23';
        const strokeWidth = 3;
        const stroke = '#90550e'
        return { points, fill, stroke, strokeWidth }
    }

    private platewRight() {
        const botSideY = this.gableData.y_krokwi + this.gableData.h!;
        const leftSideX = this.x - this.gableData.x_kpm - this.gableData.mp! - this.platew_x;
        const points =
            `${leftSideX},${botSideY} ` +
            `${leftSideX},${botSideY - this.gableData.hp!} ` +
            `${leftSideX + this.platew_x},${botSideY - this.gableData.hp!} ` +
            `${leftSideX + this.platew_x},${botSideY} `;

        const fill = '#a96c23';
        const strokeWidth = 3;
        const stroke = '#90550e'
        return { points, fill, stroke, strokeWidth }
    }

    public getPicture() {
        const arr = [
            this.leftWallPlate(),
            this.rightWallPlate(),
            this.rafters(),
        ]
        if (this.gableData.mp != undefined) {
            arr.push(this.platewLeft())
            arr.push(this.platewRight());
        }
        if (!isNaN(this.gableData.hj!)) arr.push(this.jetka())
        return arr;
    }
}
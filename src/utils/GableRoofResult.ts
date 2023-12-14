import GableRoofCalculator from "./GableRoofCalculator";
import RafterDistribution from "./RafterDistribution";

interface GableRoofResultArgs {
    gableResult: GableRoofCalculator,
    distributionResult: RafterDistribution
}

export default class GableRoofResult {
    gableResult: GableRoofCalculator
    distributionResult: RafterDistribution
    powDachu: number

    constructor({ gableResult, distributionResult }: GableRoofResultArgs) {
        this.gableResult = gableResult;
        this.distributionResult = distributionResult
        this.powDachu = this.calcPowDachu();
    }
    private calcPowDachu(): number {
        const murlata = this.distributionResult.d_calkowita / 100;
        const krokiew = (this.gableResult.dk_calk - this.gableResult.dkg) / 100;

        const pow = (murlata * krokiew) * 2;
        return Math.round(pow * 100) / 100;
    }
}
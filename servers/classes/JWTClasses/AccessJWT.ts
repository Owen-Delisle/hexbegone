import { JWT } from "./JWT";

class AccessJWT extends JWT {
    constructor(subject: string) {
        const ageString: string = "15m";
        const ageNumber: number = (15 * 60 * 1000) // 15 mins in ms

        super(subject, ageString, ageNumber);
    }
}

export { AccessJWT }
import { JWT } from "./JWT";

class RefreshJWT extends JWT {
    constructor(subject: string) {
        const ageString: string = "60d";
        const ageNumber: number = (60 * 24 * 60 * 60 * 1000) // 60 days in ms

        super(subject, ageString, ageNumber);
    }
}

export { RefreshJWT }
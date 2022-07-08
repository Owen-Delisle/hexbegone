import { JWT } from "./JWT";

class AccessJWT extends JWT {
    static title = "accessToken"
    static ageString: string = "15m";
    static ageNumber: number = (15 * 60 * 1000) // 15 mins in ms

    constructor(subject: string) {
        super(subject, AccessJWT.ageString, AccessJWT.ageNumber);
    }
}

export { AccessJWT }
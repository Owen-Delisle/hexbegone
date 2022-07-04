import { JWT } from "./JWT";

class RefreshJWT extends JWT {
    static title = "refreshToken"
    static ageString: string = "60d";
    static ageNumber: number = (60 * 24 * 60 * 60 * 1000) // 60 days in ms

    constructor(subject: string) {
        super(subject, RefreshJWT.ageString, RefreshJWT.ageNumber);
    }
}

export { RefreshJWT }
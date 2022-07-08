export default class Time {
    public static dateNowInMS(): number {
        return Math.round(new Date().getTime() / 1000)
    }
}
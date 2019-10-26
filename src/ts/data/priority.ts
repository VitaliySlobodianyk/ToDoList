export class Priority {
    static high = 2;
    static med = 1;
    static low = 0;


    public static getHigh(): number {
        return this.high;
    }
    public static getMed(): number {
        return this.med;
    }
    public static getLow(): number {
        return this.low;
    }
    public static GetName(priority: number): string {
        switch (Number(priority)) {
            case this.high:
                return "High";              
            case this.med:
                return "Medium";              
            case this.low:
                return "Low";             
            default:
                return "Unknown";
        }
    }



}
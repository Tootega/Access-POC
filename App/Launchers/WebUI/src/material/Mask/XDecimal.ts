import Decimal from "decimal.js";

class XDecimalConfig
{
    precision?: number;
    rounding?: XDecimalRounding;
    toExpNeg?: number;
    toExpPos?: number;
    minE?: number;
    maxE?: number;
    crypto?;
    modulo?: XDecimalModulo;
    defaults?;
}

type XDecimalInstance = XDecimal;
type XDecimalConstructor = typeof XDecimal;
type XDecimalValue = string | number | XDecimal | Decimal | any;
type XDecimalRounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type XDecimalModulo = XDecimalRounding | 9;

export class XDecimal extends Decimal
{
    constructor(pValue: XDecimalValue)
    {
        if (pValue.length)
            pValue = Number.parseFloat(pValue);
        super(pValue);
        //let cfg = new XDecimalConfig();
        //cfg.crypto = false;
        //cfg.maxE = 9000000000000000;
        //cfg.minE = -9000000000000000;
        //cfg.modulo = 1;
        //cfg.precision = 35;
        //cfg.rounding = 4;
        //cfg.toExpNeg = -7;
        //cfg.toExpPos = 21;
        //XDecimal.config(cfg);
    }
    AbsoluteValue(): XDecimal
    { return this.AbsoluteValue(); }
    Abs(): XDecimal { return new XDecimal(this.abs()); }
    Ceil(): XDecimal { return new XDecimal(this.ceil()); }
    ClampedTo(min: XDecimalValue, max: XDecimalValue): XDecimal { return new XDecimal(this.clampedTo(<any>min, <any>max)); }
    Clamp(min: XDecimalValue, max: XDecimalValue): XDecimal { return new XDecimal(this.clamp(<any>min, <any>max)); }
    ComparedTo(n: XDecimalValue): number { return this.comparedTo(n); }
    Cmp(n: XDecimalValue): number { return this.cmp(n); }
    Cosine(): XDecimal { return new XDecimal(this.cosine()); }
    Cos(): XDecimal { return new XDecimal(this.cos()); }
    CubeRoot(): XDecimal { return new XDecimal(this.cubeRoot()); }
    Cbrt(): XDecimal { return new XDecimal(this.cbrt()); }
    DecimalPlaces(): number { return this.decimalPlaces(); }
    Dp(): number { return this.dp(); }
    DividedBy(n: XDecimalValue): XDecimal { return new XDecimal(this.dividedBy(n)); }
    Div(n: XDecimalValue): XDecimal { return new XDecimal(this.div(n)); }
    DividedToIntegerBy(n: XDecimalValue): XDecimal { return new XDecimal(this.dividedToIntegerBy(n)); }
    DivToInt(n: XDecimalValue): XDecimal { return new XDecimal(this.divToInt(n)); }
    Equals(n: XDecimalValue): boolean { return this.equals(n); }
    Eq(n: XDecimalValue): boolean { return this.eq(n); }
    Floor(): XDecimal { return new XDecimal(this.floor()); }
    GreaterThan(n: XDecimalValue): boolean { return this.greaterThan(n); }
    Gt(n: XDecimalValue): boolean { return this.gt(n); }
    GreaterThanOrEqualTo(n: XDecimalValue): boolean { return this.greaterThanOrEqualTo(n); }
    Gte(n: XDecimalValue): boolean { return this.gte(n); }
    HyperbolicCosine(): XDecimal { return new XDecimal(this.hyperbolicCosine()); }
    Cosh(): XDecimal { return new XDecimal(this.cosh()); }
    HyperbolicSine(): XDecimal { return new XDecimal(this.hyperbolicSine()); }
    Sinh(): XDecimal { return new XDecimal(this.sinh()); }
    HyperbolicTangent(): XDecimal { return new XDecimal(this.hyperbolicTangent()); }
    Tanh(): XDecimal { return new XDecimal(this.tanh()); }
    InverseCosine(): XDecimal { return new XDecimal(this.inverseCosine()); }
    Acos(): XDecimal { return new XDecimal(this.acos()); }
    InverseHyperbolicCosine(): XDecimal { return new XDecimal(this.inverseHyperbolicCosine()); }
    Acosh(): XDecimal { return new XDecimal(this.acosh()); }
    InverseHyperbolicSine(): XDecimal { return new XDecimal(this.inverseHyperbolicSine()); }
    Asinh(): XDecimal { return new XDecimal(this.asinh()); }
    InverseHyperbolicTangent(): XDecimal { return new XDecimal(this.inverseHyperbolicTangent()); }
    Atanh(): XDecimal { return new XDecimal(this.atanh()); }
    InverseSine(): XDecimal { return new XDecimal(this.inverseSine()); }
    Asin(): XDecimal { return new XDecimal(this.asin()); }
    InverseTangent(): XDecimal { return new XDecimal(this.inverseTangent()); }
    Atan(): XDecimal { return new XDecimal(this.atan()); }
    IsFinite(): boolean { return this.isFinite(); }
    IsInteger(): boolean { return this.isInteger(); }
    IsInt(): boolean { return this.isInt(); }
    IsNaN(): boolean { return this.isNaN(); }
    IsNegative(): boolean { return this.isNegative(); }
    IsNeg(): boolean { return this.isNeg(); }
    IsPositive(): boolean { return this.isPositive(); }
    IsPos(): boolean { return this.isPos(); }
    IsZero(): boolean { return this.isZero(); }
    LessThan(n: XDecimalValue): boolean { return this.lessThan(n); }
    Lt(n: XDecimalValue): boolean { return this.lt(n); }
    LessThanOrEqualTo(n: XDecimalValue): boolean { return this.lessThanOrEqualTo(n); }
    Lte(n: XDecimalValue): boolean { return this.lte(n); }
    Logarithm(n?: XDecimalValue): XDecimal { return new XDecimal(this.logarithm(n)); }
    Log(n?: XDecimalValue): XDecimal { return new XDecimal(this.log(n)); }
    Minus(n: XDecimalValue): XDecimal { return new XDecimal(this.minus(n)); }
    Sub(n: XDecimalValue): XDecimal { return new XDecimal(this.sub(n)); }
    Modulo(n: XDecimalValue): XDecimal { return new XDecimal(this.modulo(n)); }
    Mod(n: XDecimalValue): XDecimal { return new XDecimal(this.mod(n)); }
    NaturalExponential(): XDecimal { return new XDecimal(this.naturalExponential()); }
    Exp(): XDecimal { return new XDecimal(this.exp()); }
    NaturalLogarithm(): XDecimal { return new XDecimal(this.naturalLogarithm()); }
    Ln(): XDecimal { return new XDecimal(this.ln()); }
    Negated(): XDecimal { return new XDecimal(this.negated()); }
    Neg(): XDecimal { return new XDecimal(this.neg()); }
    Plus(n: XDecimalValue): XDecimal { return new XDecimal(this.plus(n)); }
    Add(n: XDecimalValue): XDecimal { return new XDecimal(this.add(n)); }
    Precision(includeZeros?: boolean): number { return this.precision(includeZeros); }
    Sd(includeZeros?: boolean): number { return this.sd(includeZeros); }
    Round(): XDecimal { return new XDecimal(this.round()); }
    Sine(): XDecimal { return new XDecimal(this.sine()); }
    Sin(): XDecimal { return new XDecimal(this.sin()); }
    SquareRoot(): XDecimal { return new XDecimal(this.squareRoot()); }
    Sqrt(): XDecimal { return new XDecimal(this.sqrt()); }
    Tangent(): XDecimal { return new XDecimal(this.tangent()); }
    Tan(): XDecimal { return new XDecimal(this.tan()); }
    Times(n: XDecimalValue): XDecimal { return new XDecimal(this.times(n)); }
    Mul(n: XDecimalValue): XDecimal { return new XDecimal(this.mul(n)); }

    ToBinary(significantDigits?: number): string;
    ToBinary(significantDigits?: number, rounding?: XDecimalRounding): string { return this.toBinary(significantDigits, rounding); }

    ToDecimalPlaces(decimalPlaces?: number): XDecimal;
    ToDecimalPlaces(decimalPlaces?: number, rounding?: XDecimalRounding): XDecimal { return new XDecimal(this.toDecimalPlaces(decimalPlaces, rounding)); }
    ToDP(decimalPlaces?: number): XDecimal;
    ToDP(decimalPlaces?: number, rounding?: XDecimalRounding): XDecimal { return new XDecimal(this.toDP(decimalPlaces, rounding)); }
    ToExponential(decimalPlaces?: number): string;
    ToExponential(decimalPlaces?: number, rounding?: XDecimalRounding): string { return this.toExponential(decimalPlaces, rounding); }
    ToFixed(decimalPlaces?: number): string;
    ToFixed(decimalPlaces?: number, rounding?: XDecimalRounding): string { return this.toFixed(decimalPlaces, rounding); }
    ToFraction(max_denominator?: XDecimalValue): XDecimal[] { return <XDecimal[]>this.toFraction(max_denominator); }
    ToHexadecimal(significantDigits?: number): string;
    ToHexadecimal(significantDigits?: number, rounding?: XDecimalRounding): string { return this.toHexadecimal(significantDigits, rounding); }
    ToHex(significantDigits?: number): string;
    ToHex(significantDigits: number, rounding?: XDecimalRounding): string { return this.toHex(significantDigits, rounding); }
    ToJSON(): string { return this.toJSON(); }
    ToNearest(n: XDecimalValue, rounding?: XDecimalRounding): XDecimal { return new XDecimal(this.toNearest(n, rounding)); }
    ToNumber(): number { return this.toNumber(); }
    ToOctal(significantDigits?: number): string;
    ToOctal(significantDigits: number, rounding?: XDecimalRounding): string { return this.toOctal(significantDigits, rounding); }
    ToPower(n: XDecimalValue): XDecimal { return new XDecimal(this.toPower(n)); }
    Pow(n: XDecimalValue): XDecimal { return new XDecimal(this.pow(n)); }
    ToPrecision(significantDigits?: number): string;
    ToPrecision(significantDigits?: number, rounding?: XDecimalRounding): string { return this.toPrecision(significantDigits, rounding); }
    ToSignificantDigits(significantDigits?: number): XDecimal;
    ToSignificantDigits(significantDigits?: number, rounding?: XDecimalRounding): XDecimal { return new XDecimal(this.toSignificantDigits(significantDigits, rounding)); }
    ToSD(significantDigits?: number): XDecimal;
    ToSD(significantDigits: number, rounding?: XDecimalRounding): XDecimal { return new XDecimal(this.toSD(significantDigits, rounding)); }
    ToString(): string { return this.toString(); }
    Truncated(): XDecimal { return new XDecimal(this.truncated()); }
    Trunc(): XDecimal { return new XDecimal(this.trunc()); }
    ValueOf(): string { return this.valueOf(); }

    GetDecimal(pScale: number = 2): string
    {
        if (pScale == 0)
            return "";

        if (pScale == -1)
        {
            pScale = 10;
            let intv = this.Times(Math.pow(10, pScale));
            let nvlr = this.GetInteger() * Math.pow(10, pScale);
            let intf = new XDecimal(intv.GetInteger()).Minus(nvlr).Abs();
            let v = intf.GetInteger();

            if (v == 0)
                return "";

            while (v % 10 == 0 && v != 0)
            {
                v /= 10;
                pScale--;
            }
            var vString = v.toString()
            return vString.padStart(pScale, "0");
        }
        else
        {
            let intv = this.Times(Math.pow(10, pScale));
            let nvlr = this.GetInteger() * Math.pow(10, pScale);
            let intf = new XDecimal(intv.GetInteger()).Minus(nvlr).Abs();
            return intf.GetInteger().toString().padStart(pScale, "0");
        }
    }

    GetInteger(): number
    {
        return Math.trunc(this.ToNumber());
    }

    override toString(): string
    {
        return this.GetInteger().toString();
    }
    static Abs(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.abs(n)); }
    static Acos(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.acos(n)); }
    static Acosh(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.acosh(n)); }
    static Add(x: XDecimalValue, y: XDecimalValue): XDecimal { return new XDecimal(Decimal.add(x, y)); }
    static Asin(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.asin(n)); }
    static Asinh(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.asinh(n)); }
    static Atan(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.atan(n)); }
    static Atanh(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.atanh(n)); }
    static Atan2(y: XDecimalValue, x: XDecimalValue): XDecimal { return new XDecimal(Decimal.atan2(y, x)); }
    static Cbrt(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.cbrt(n)); }
    static Ceil(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.ceil(n)); }
    static Clone(object?: XDecimalConfig): XDecimalConstructor { return <XDecimalConstructor>Decimal.clone(object); }
    static Config(object: XDecimalConfig): XDecimalConstructor { return <XDecimalConstructor>Decimal.config(object); }
    static Cos(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.cos(n)); }
    static Cosh(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.cosh(n)); }
    static Div(x: XDecimalValue, y: XDecimalValue): XDecimal { return new XDecimal(Decimal.div(x, y)); }
    static Exp(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.exp(n)); }
    static Floor(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.floor(n)); }
    static Hypot(...n: XDecimalValue[]): XDecimal { return new XDecimal(Decimal.hypot(<any>n)); }
    static IsDecimal(object: any): boolean { return XDecimal.isDecimal(object); }
    static Ln(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.ln(n)); }
    static Log(n: XDecimalValue, base?: XDecimalValue): XDecimal { return new XDecimal(Decimal.log(n, base)); }
    static Log2(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.log2(n)); }
    static Log10(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.log10(n)); }
    static Max(...n: XDecimalValue[]): XDecimal { return new XDecimal(Decimal.max(<any>n)); }
    static Min(...n: XDecimalValue[]): XDecimal { return new XDecimal(Decimal.min(<any>n)); }
    static Mod(x: XDecimalValue, y: XDecimalValue): XDecimal { return new XDecimal(Decimal.mod(x, y)); }
    static Mul(x: XDecimalValue, y: XDecimalValue): XDecimal { return new XDecimal(Decimal.mul(x, y)); }
    static Pow(base: XDecimalValue, exponent: XDecimalValue): XDecimal { return new XDecimal(Decimal.pow(base, exponent)); }
    static Random(significantDigits?: number): XDecimal { return new XDecimal(Decimal.random(significantDigits)); }
    static Round(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.round(n)); }
    static Set(object: XDecimalConfig): XDecimalConstructor { return <XDecimalConstructor>Decimal.set(object); }
    static Sign(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.sign(n)); }
    static Sin(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.sin(n)); }
    static Sinh(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.sinh(n)); }
    static Sqrt(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.sqrt(n)); }
    static Sub(x: XDecimalValue, y: XDecimalValue): XDecimal { return new XDecimal(Decimal.sub(x, y)); }
    static Sum(...n: any[]): XDecimal { return new XDecimal(Decimal.sum(<any>n)); }
    static Tan(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.tan(n)); }
    static Tanh(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.tanh(n)); }
    static Trunc(n: XDecimalValue): XDecimal { return new XDecimal(Decimal.trunc(n)); }
    static get Default(): XDecimalConstructor { return <XDecimalConstructor>Decimal.default; }
    static get Precision(): number { return XDecimal.precision; }
    static get Rounding(): XDecimalRounding { return <XDecimalRounding>Decimal.rounding; }
    static get ToExpNeg(): number { return XDecimal.toExpNeg; }
    static get ToExpPos(): number { return XDecimal.toExpPos; }
    static get MinE(): number { return XDecimal.minE; }
    static get MaxE(): number { return XDecimal.maxE; }
    static get Crypto(): boolean { return XDecimal.crypto; }
    static get Modulo(): XDecimalModulo { return <XDecimalModulo>Decimal.modulo; }
}
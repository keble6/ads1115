function i2cWrite3 (addr: number, num0: number, num1: number, num2: number) {
    let buf = pins.createBuffer(3)
buf[0] = num0
    buf[1] = num1
    buf[2] = num2
    pins.i2cWriteBuffer(addr, buf)
}
let result = 0
let CONVERSION = 0
let CONFIG = 1
// slave address of the ADC
let ADCaddress = 72
// stars conversion
let OS = 1
// single-ended mode, AIN0 and GND
let MUX = 4
// 1 = +/- 4.096V FSR
let PGA = 1
// counts per volt
let SCALE = 8000
// Single shot mode
let MODE = 1
// Disable the comparator
let DIS = 3
let configHi = BitwiseLogic.bitwise2arg(BitwiseLogic.bitwise2arg(BitwiseLogic.bitwise2arg(BitwiseLogic.bitwise2arg(OS, operator.leftShift, 7), operator.or, BitwiseLogic.bitwise2arg(MUX, operator.leftShift, 4)), operator.or, BitwiseLogic.bitwise2arg(PGA, operator.leftShift, 1)), operator.or, MODE)
let configLo = DIS
loops.everyInterval(1000, function () {
    i2cWrite3(ADCaddress, CONFIG, configHi, configLo)
    pins.i2cWriteNumber(
    ADCaddress,
    CONVERSION,
    NumberFormat.Int8LE,
    false
    )
    result = pins.i2cReadNumber(ADCaddress, NumberFormat.Int16BE, false)
    serial.writeLine("reading = " + result)
    serial.writeLine("voltage = " + result / SCALE)
    basic.showNumber(result / SCALE)
})

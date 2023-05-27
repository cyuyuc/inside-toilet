let distance = 0
let availability = 1
radio.setGroup(11)
radio.setTransmitPower(7)
robotbit.Servo(robotbit.Servos.S1, 180)
basic.pause(500)
robotbit.Servo(robotbit.Servos.S1, 0)
basic.forever(function () {
    radio.sendNumber(Environment.ReadDust(DigitalPin.P16, AnalogPin.P1))
})
basic.forever(function () {
    distance = sonar.ping(
    DigitalPin.P2,
    DigitalPin.P12,
    PingUnit.Centimeters
    )
    if (distance <= 30) {
        radio.sendValue("Unavailable", 3)
        availability = 2
    } else if (distance >= 30 && availability == 2) {
        robotbit.Servo(robotbit.Servos.S1, 180)
        radio.sendValue("Flushing", 2)
        availability = 1
        basic.pause(1000)
        robotbit.Servo(robotbit.Servos.S1, 0)
    } else if (distance >= 30 && availability == 1) {
        radio.sendValue("Available", 1)
    } else {
        radio.sendValue("Error", 4)
    }
})

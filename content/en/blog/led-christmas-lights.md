---
title: "LED Christmas Tree Lights"
publishDate: 2021-12-16
tags: ["python", "hardware", "linux", "tutorial"]
translationKey: "9ba6c75b3ec8caabb54bfe85c4702c88baa55537b53fcaac0920151d5708ae67"
---

I have got an LED strip which used to light up my room, but isn't in use anymore. However, it can still light up a christmas tree!

Below is a picture of the tree and the code that runs the LEDs.

## Requirements

- An LED strip (mine has WS2801 driver chips, other chips have to be wired differently)
- Power Adaptor 5V/10A
- electrical connector
- A Raspberry Pi
- an extension cord or a breadboard if necessary

## Wiring

![[Raspberry Pi: Efa at English Wikipedia, CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:RaspberryPi_3B.svg), whole picture CC BY-SA 4.0](christmastree-raspberry-leds-wiring.svg "Wiring of the LEDs")

| LED | Raspberry      | Netzteil |
|-----|----------------|----------|
| GND | Pin 6/GND      | GND      |
| SI  | Pin 19/GPIO 10 | -        |
| CLK | PIN 23/GPIO 11 | -        |
| 5V  | -              | 5V       |

## Pic

![The tree. Merry Christmas!](christmastree-led-finished.jpg)

## Code

This code falls under the category "works for me". I build the whole thing about 5 years ago and didn't change anything since then.

It runs on Python `2.7` with Adafruit-GPIO `1.0.3` and Adafruit-WS2801 `1.0.1`.

Parts of it come from [tutorials-raspberrypi.de](https://tutorials-raspberrypi.de/raspberry-pi-ws2801-rgb-led-streifen-anschliessen-steuern/).

~~~Python
from __future__ import print_function

# Simple demo of of the WS2801/SPI-like addressable RGB LED lights.
import time
import math
import RPi.GPIO as GPIO
 
# Import the WS2801 module.
import Adafruit_WS2801
import Adafruit_GPIO.SPI as SPI
 
# Configure the count of pixels:
PIXEL_COUNT = 160
 
# Alternatively specify a hardware SPI connection on /dev/spidev0.0:
SPI_PORT   = 0
SPI_DEVICE = 0
pixels = Adafruit_WS2801.WS2801Pixels(PIXEL_COUNT, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE), gpio=GPIO)
 
white = (255, 255, 255)
green = (0, 0, 255)
red = (255, 0, 0)
 
# Define the wheel function to interpolate between different hues.
def wheel(pos):
    if pos < 85:
        return Adafruit_WS2801.RGB_to_color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Adafruit_WS2801.RGB_to_color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Adafruit_WS2801.RGB_to_color(0, pos * 3, 255 - pos * 3)
 
# Define rainbow cycle function to do a cycle of all hues.
def rainbow_cycle_successive(pixels, wait=0.1):
    for i in range(pixels.count()):
        pixels.set_pixel(i, wheel(((i * 256 // pixels.count())) % 256))
        pixels.show()
        if wait > 0:
            time.sleep(wait)
 
def rainbow_cycle(pixels, wait=0.05):
    for j in range(256):
        for i in range(pixels.count()):
            pixels.set_pixel(i, wheel(((i * 256 // pixels.count()) + j) % 256))
        pixels.show()
        if wait > 0:
            time.sleep(wait)
 
def rainbow_colors(pixels, wait=0.05):
    for j in range(256):
        for i in range(pixels.count()):
            pixels.set_pixel(i, wheel(((256 // pixels.count() + j)) % 256))
        pixels.show()
        if wait > 0:
            time.sleep(wait)
 
def brightness_decrease(pixels, wait=0.01, step=3):
    for j in range(int(256 // step)):
        rSum = 0
        gSum = 0
        bSum = 0
        for i in range(pixels.count()):
            r, g, b = pixels.get_pixel_rgb(i)
            r = int(max(0, r - step))
            g = int(max(0, g - step))
            b = int(max(0, b - step))
            rSum += r
            gSum += g
            bSum += b
            pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(r, g, b))
        pixels.show()
        if rSum == 0 and bSum == 0 and gSum == 0:
            return
        if wait > 0:
            time.sleep(wait)

def brightness_fast_decrease(pixels, t=16, step=32):
    for j in range(step):
        rSum = 0
        gSum = 0
        bSum = 0
        for i in range(pixels.count()):
            frac = float(j)/float(step)
            r, g, b = pixels.get_pixel_rgb(i)
            r = int(max(0, r - math.ceil(r*frac)))
            g = int(max(0, g - math.ceil(g*frac)))
            b = int(max(0, b - math.ceil(b*frac)))
            rSum += r
            gSum += g
            bSum += b
            pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(r, g, b))
        pixels.show()
        if rSum == 0 and bSum == 0 and gSum == 0:
            return
        time.sleep(t / step)

def brightness_increase(pixels, wait=0.01, step=3):
    for j in range(int(256 // step)):
        for i in range(pixels.count()):
            r, g, b = pixels.get_pixel_rgb(i)
            if r > 0:
                r = int(min(255, r + step))
            if g > 0:
                g = int(min(255, g + step))
            if b > 0:
                b = int(min(255, b + step))
            pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(r, g, b))
        pixels.show()
        if wait > 0:
            time.sleep(wait)

def brightness_increase_to_color(pixels, color, step=8, t=0.5):
    pixels.clear()
    for j in range(step):
        for i in range(pixels.count()):
            r = min(255, int((float(color[0])/float(step))*j))
            g = min(255, int((float(color[1])/float(step))*j))
            b = min(255, int((float(color[2])/float(step))*j))
            pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(r, g, b))
        pixels.show()
        time.sleep(t/float(step))
 
def set_color(pixels, color, mod, n):
    for k in range(pixels.count()):
        if k % mod == n:
            pixels.set_pixel(k, Adafruit_WS2801.RGB_to_color(color[0], color[1], color[2]))

def blink_rwg(pixels, blink_times=3):
    white = (1, 1, 1)
    green = (0, 0, 1)
    red = (1, 0, 0)
    for k in range(blink_times):
        brightness_decrease(pixels)
        pixels.clear()
        set_color(pixels, green, 3, k%3)
        set_color(pixels, red, 3, (k+1)%3)
        set_color(pixels, white, 3, (k+2)%3)
        pixels.show()
        brightness_increase(pixels)
        time.sleep(0.15)

def roll_rwg(pixels, blink_times=20, wait=0.25):
    color = white
    for k in range(blink_times):
        pixels.clear()
        for j in range(pixels.count()):
            if ((k+j) % 6) == 0 or ((k+j) % 6) == 1:
                color = green
            if ((k+j) % 6) == 2 or ((k+j) % 6) == 3:
                color = red
            if ((k+j) % 6) == 4 or ((k+j) % 6) == 5:
                color = white
            
            if ((k+j) % 3) == 0:
                color = green
            if ((k+j) % 3) == 1:
                color = red
            if ((k+j) % 3) == 2:
                color = white
            pixels.set_pixel(j, Adafruit_WS2801.RGB_to_color(color[0], color[1], color[2]))
        pixels.show()
        time.sleep(wait)
 
def appear_from_back(pixels, color=(255, 0, 0)):
    pos = 0
    for i in range(pixels.count()):
        for j in reversed(range(i, pixels.count())):
            pixels.clear()
            # first set all pixels at the begin
            for k in range(i):
                pixels.set_pixel(k, Adafruit_WS2801.RGB_to_color(color[0], color[1], color[2]))
            # set then the pixel at position j
            pixels.set_pixel(j, Adafruit_WS2801.RGB_to_color(color[0], color[1], color[2]))
            pixels.show()
            time.sleep(0.02)

def runAround(pixels):
    x = 32
    dimColor =  (x, 2*x, x)
    brightness_decrease(pixels)
    brightness_increase_to_color(pixels, dimColor, step=x)
    for i in range(pixels.count() -5):
        for k in range(pixels.count()):
            pixels.set_pixel(k, Adafruit_WS2801.RGB_to_color(dimColor[0], dimColor[1], dimColor[2]))
        pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(red[0], red[1], red[2]))
        pixels.set_pixel(i+1, Adafruit_WS2801.RGB_to_color(red[0], red[1], red[2]))
        pixels.set_pixel(i+2, Adafruit_WS2801.RGB_to_color(white[0], white[1], white[2]))
        pixels.set_pixel(i+3, Adafruit_WS2801.RGB_to_color(white[0], white[1], white[2]))
        pixels.set_pixel(i+4, Adafruit_WS2801.RGB_to_color(green[0], green[1], green[2]))
        pixels.set_pixel(i+5, Adafruit_WS2801.RGB_to_color(green[0], green[1], green[2]))
        pixels.show()
        time.sleep(0.00625)
    for i in reversed(range(pixels.count() -5)):
        for k in range(pixels.count()):
            pixels.set_pixel(k, Adafruit_WS2801.RGB_to_color(dimColor[0], dimColor[1], dimColor[2]))
        pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(green[0], green[1], green[2]))
        pixels.set_pixel(i+1, Adafruit_WS2801.RGB_to_color(green[0], green[1], green[2]))
        pixels.set_pixel(i+2, Adafruit_WS2801.RGB_to_color(white[0], white[1], white[2]))
        pixels.set_pixel(i+3, Adafruit_WS2801.RGB_to_color(white[0], white[1], white[2]))
        pixels.set_pixel(i+4, Adafruit_WS2801.RGB_to_color(red[0], red[1], red[2]))
        pixels.set_pixel(i+5, Adafruit_WS2801.RGB_to_color(red[0], red[1], red[2]))
        pixels.show()
        time.sleep(0.00625)
    for k in range(pixels.count()):
        pixels.set_pixel(k, Adafruit_WS2801.RGB_to_color(dimColor[0], dimColor[1], dimColor[2]))

def makeWheel(pixels, steps, j, i):
    fraction = float((i+j) % 160)/float(pixels.count())
    fracWith2Pi = fraction * 2 * math.pi
    currSin = abs(math.sin(fracWith2Pi))
    rgbCounter = int(currSin * 255)
    return (rgbCounter, 255 - rgbCounter, 0)

def increase_color_for_Wheel(pixels):
    steps = 256
    pixels.clear()
    for j in range(steps):
        for i in range(pixels.count()):
            color = makeWheel(pixels, 80, 0, i)
            r = min(255, int((float(color[0])/float(steps))*j))
            g = min(255, int((float(color[1])/float(steps))*j))
            b = min(255, int((float(color[2])/float(steps))*j))
            pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(r, g, b))
        pixels.show()
        time.sleep(0.75/float(steps))

def christmasWheel(pixels, t=3, revolutions=3):
    brightness_fast_decrease(pixels)
    increase_color_for_Wheel(pixels)
    steps = 80
    timeSleep = 0.03
    color = (0,0,0)
    for x in range(revolutions):
        for j in range(steps):
            pixels.clear()
            for i in range(pixels.count()):
                color = makeWheel(pixels, steps, j, i)
                pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(color[0],color[1],color[2]))
            pixels.show()
            time.sleep(timeSleep)
    brightness_decrease(pixels)
 
if __name__ == "__main__":
    # Clear all the pixels to turn them off.
    while True:
        blink_rwg(pixels, 1)
        roll_rwg(pixels)
        blink_rwg(pixels)
        roll_rwg(pixels)
        runAround(pixels)
        christmasWheel(pixels)

    brightness_decrease(pixels)
~~~
---
title: "Random points in a circle"
publishDate: 2021-11-10
tags: ["tutorial", "math"]
translationKey: "9f420f88758b41f4bb892e4c2010b55bdf18d9b425f0ab20aed2d5f103db0b67"
MathJax: true
description: "How do you get a uniform distribution of points in a circle?"
---

Here's a problem: How do you get a uniform distribution of points in a circle? The Solution for a square is pretty simple: you take a random $x$ and a random $y$ and you get a point $(x, y)$!

![$(x, y)$ = (random(), random())](random_distribution_square.png "Uniform distribution of 10000 points in a square")

A naive idea for a circle might be to use this approach, but ignore everything not in it (e.g. ignore every point where $ 1 \lt \sqrt{x^2 * y^2}$).

![$(x, y)$ = (random(), random()), circle coloured](random_distribution_red_outof_circle.png "10000 points in a square, points forming a circle are colored")

However, this isn't very efficient: You loose more than 20% of your points![^1]

[^1]: $$1 - \frac{A_{circle}}{A_{square}} = $$ $$ 1 - \frac{R^2\pi}{(2R)^2} = $$ $$ 1 - \frac{\pi}{4} \approx 0.2146$$

Maybe another coordinate system helps: polar coordinates use a radius and an angle, $(r, \varphi)$.

![$(r, \varphi)$ = (random(), random() * $0.5  \pi$)](random_nonuniform_distribution_circle_polar_coordinates.png "10000 points in a circle, denser in the centre than on the edge")

This doesn't work: a random radius and a random angle don't create a uniform distribution. Why is that?

On every line between the centre and the edge of the circle are approximately equal points, since a point's angle is randomly chosen. The same is true for every circle perimeter, since the radius is random as well.

Here is the problem: when the radius becomes larger, the perimeter becomes larger as well, but maintains the number of points. This leads to a decrease in point density, since the distance between those points increases.[^2]
[^2]: $$ density = \frac{points}{perimeter} = \frac{points}{2r\pi} $$ If the radius increases, the density decreases.

The solution is to take the square root of the radius.

![$(r, \varphi)$ = (sqrt(random()), random() * $0.5 \pi$)](random_uniform_distribution_circle_polar_coordinates.png "uniform distribution of 10000 points in a circle")

Why does that work? A probability density function (PDF) provides the probability of a random value being in a chosen interval. Until now, our PDF was constant ($f(r) = a$), since every radius $r$ had an equal probability of occuring. The number of points in each radius interval was therefore constant as well.

However, since the perimeter of a circle grows linearly ($2r\pi$), our PDF has to grow linearly as well to keep the density of points (instead of the number of points) constant. The most important characteristics of a PDF are that it is non-negative and that the integral of the function from $-\infty$ to $+\infty$ is 1.

We therefore need a function with an integral that is 1 between 0 and the radius $R$ of the circle. $f(r) = r$ doesn't work: $ \int_0^R f(r) dr = R^2 / 2 = 0.5$ (with $R = 1$), but the solution is simple: $f(r) = 2r/R^2$ and therefore $F(x) = \int_0^x f(r) dr = x^2 / R^2$ as our distribution function.

While a probability density function provides the probability of a random value being in a chosen interval, a distribution function calculates the probability of a value being less or equal than a given $x$.

If we invert this function, it doesn't calculate the probability of a value being less or equal to $x$, but gives the largest possible value for a given probability.

$$
F^{-1}(x): x = \frac{y^2}{R^2}
$$ $$
y^2 = R^2 * x
$$ $$
y = \sqrt{R^2 * x}
$$ $$
F^{-1}(x) = R * \sqrt{x}
$$

![The graphs of the used functions](random_uniform_circle_graphs.png)

If we take this biggest possible value as the actual value of the coordinate radius, we get a uniform distribution of points in a circle.

![$(r, \varphi)$ = (sqrt(random()), random() * $2 \pi$)](random_uniform_full_circle.png "A full circle from random values")
---
title: "Gleichverteilte Punkte in einem Kreis"
publishDate: 2021-11-10
tags: ["tutorial", "math"]
translationKey: "9f420f88758b41f4bb892e4c2010b55bdf18d9b425f0ab20aed2d5f103db0b67"
MathJax: true
description: "Wie erhält man gleichverteilte Punkte in einem Kreis mit zwei zufälligen Werten?"
---

Problem: Wie bekommt man eine Gleichverteilung von Punkten in einem Kreis? Die Idee für ein Quadrat ist einfach: Man sucht sich einen zufälligen $x$-Wert und einen zufälligen $y$-Wert, und erhält einen Punkt $(x, y)$.

![$(x, y)$ = (random(), random())](random_distribution_square.png "Gleichverteilung von 10000 Punkten in einem Quadrat")

Eine naive Idee für einen Kreis kann sein, alle Punkte zu ignorieren, die außerhalb des Kreises liegen. Dafür berechnet man $ \sqrt{x^2 \* y^2} $.

![$(x, y)$ = (random(), random()), Kreis eingefärbt](random_distribution_red_outof_circle.png "10000 Punkte in einem Quadrat, alle im Kreis sind eingefärbt")

Das ist aber nicht effizient. Man verliert mehr als ein Fünftel aller Punkte![^1]

[^1]: $$1 - A_{Kreis} / A_{Quadrat} = $$ $$ 1 - (((\frac{R}{2})^2 * \pi) / R^2) = $$ $$ 1 - \frac{\pi}{4} \approx 0.2146$$

Vielleicht hilft ein anderes Koordinatensystem. Beim Polarkoordinatensystem wird ein Punkt durch einen Radius und einen Winkel, $(r, \varphi)$, angegeben.

![$(r, \varphi)$ = (random(), random() * $0.5 \pi$)](random_nonuniform_distribution_circle_polar_coordinates.png "10000 Punkte in einem Kreis, mehr Punkte beim Ursprung als am Rand")

Ein zufälliger Radius und ein zufälliger Winkel bilden aber keine Gleichverteilung ab.

Woran liegt das? Auf allen Strecken, die zwischen dem Mittelpunkt und dem Rand des Kreises liegen, sind gleich viele Punkte, da der Winkel ein Zufallswert ist. Ebenso liegt auf jedem Radius die selbe Anzahl an Punkten, da der Radius ebenfalls zufällig ist.

Das Problem ist, das ein größerer Radius einen größeren Kreis bildet. Auf einem Radius liegt aber immer dieselbe Anzahl von Punkten. Damit wird der Abstand zwischen den Punkten größer und die Dichte der Punkte nimmt mit größerem Radius ab.[^2]

[^2]: $$ Dichte = \frac{Punkte}{Umfang} = \frac{Punkte}{2r\pi} $$ Wird der Radius größer, wird die Dichte kleiner.

Die Lösung ist, als Radius die Wurzel einer zufälligen Zahl zu nehmen.

![$(r, \varphi)$ = (sqrt(random()), random() * $0.5 \pi$)](random_uniform_distribution_circle_polar_coordinates.png "10000 gleichverteilte Punkte in einem Kreis")

Warum funktioniert das? Mit einer Wahrscheinlichkeitsdichtefunktion (WDF) berechnet man, wie wahrscheinlich es ist einen Wert zwischen zwei Punkten zu erhalten. Bisher war unsere WDF konstant, also $f(r) = a$, da jeder Radius $r$ gleich wahrscheinlich war. In jedem gleich großen Intervall waren die Anzahl der Punkte damit ebenfalls konstant.

Da der Umfang eines Kreises aber linear wächst ($2r\pi$), brauchen wir eine WDF, die ebenfalls linear wächst und damit die Dichte (und nicht die Anzahl) der Punkte konstant hält. Die wichtigen Eigenschaften einer WDF sind, das sie nichtnegativ ist und das Integral der Funktion von $-\infty$ bis $+\infty$ 1 ist.

Für unser spezielles Problem wollen wir also eine lineare Funktion, deren Integral zwischen 0 und dem Radius des Kreises $R$ gleich 1 ist. Eine Funktion $f(r) = r$ erfüllt diese Eigenschaften nicht: $ \int_0^R f(r) dr = R^2 / 2 = 0.5$ (mit $R=1$). Die Lösung ist aber naheliegend: $f(r) = 2r/R^2$ und damit $F(x) = \int_0^x f(r) dr = x^2 / R^2$ als Verteilungsfunktion.

Während man mit der Wahrscheinlichkeitsdichtefunktion berechnet, wie wahrscheinlich es ist einen Wert zwischen zwei Punkten zu erhalten, berechnet man mit einer Verteilungsfunktion die Wahrscheinlichkeit, das ein Wert kleiner/gleich einem gegebenen $x$ ist.

Wenn wir diese Funktion nun umkehren, berechnet sie nicht mehr wie wahrscheinlich ein Wert kleiner/gleich $x$ ist, sondern gibt den größtmöglichen Wert für eine gegebene Wahrscheinlichkeit an.

$$
F^{-1}(x): x = \frac{y^2}{R^2}
$$ $$
y^2 = R^2 * x
$$ $$
y = \sqrt{R^2 * x}
$$ $$
F^{-1}(x) = R * \sqrt{x}
$$

![Die Graphen der genutzten Funktionen](random_uniform_circle_graphs.png)

Wir können diesen größtmöglichen Wert als unseren tatsächlichen Wert für den Radius wählen. Damit haben wir eine Menge von gleichverteilten Punkten in einem Kreis.

![$(r, \varphi)$ = (sqrt(random()), random() * $2 \pi$)](random_uniform_full_circle.png "Ein voller Kreis")
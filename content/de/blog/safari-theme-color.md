---
title: "Safari und theme-color"
publishDate: 2021-10-04
tags: ["apple", "ui", "ios", "security"]
translationKey: "d2df5e60e26c7c57f01d52a06e0a6306b79d52179d2d55d5b7dcf4051f30756f"
description: "Warum Apple theme-color nicht in iOS 15 hätte implementieren sollen."
---

iOS 15 wurde am 20.09.2021 veröffentlicht. Eine Änderung ist mir dabei besonders aufgefallen: Apple hat den [`theme-color` meta-Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color) in Safari implementiert.

Der `theme-color` Tag ist dafür gedacht, Teile des Browsers in das Design der Website einzubinden, in dem die Farbe von einigen Elementen außerhalb der tatsächlichen Website geändert wird:

~~~
<meta name="theme-color" content="#4285f4">
~~~

![Bild von Google [Icons and Browser Colors](https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/), lizensiert unter [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Bearbeitet.](meta-tag-theme-color.png "Beispiel für die Nutzung des theme-color tags")

in iOS 15 wird die Farbe der Statusleiste am oberen Ende des Bildschirms verändert, die seit iOS 14 aber auch die [Indikatoren für Mikrophon- oder Kameranutzung](https://support.apple.com/de-de/HT211876) enthält.

![Bildschirmaufnahme, Mikrophonnutzung und Kameranutzung; normale Leiste](indicators-iOS15.png)

Vermutlich um zu verhindern das der Indikator durch den `theme-color` tag unkenntlich gemacht wird, pulsiert der Indikator jetzt über die komplette Breite der Statusleiste. Trotzdem hat der tag Einfluss auf die Farbe der Statusleiste:

![Mikrophon an und kein `theme-color` tag, pulsierend; Mikrophon an und `theme color #ff8e00`, pulsierend; kein Mikrophon, `theme color #ff8e00`, statisch](indicators-colored-iOS15.png)

Dadurch wird die Statusleiste als "sicherer Bereich", in dem nur das Betriebssystem Änderungen vornehmen kann[^1], verwässert. Solche sicheren Bereiche sind aber wichtig und sollten nicht verändert werden können.  
Ein Beispiel sind die Administratoranfragen unter Windows: Der ganze Bildschirm wird abgedunkelt, und es ist nur noch die Abfrage mit Informationen zum Programm zu sehen. Der Nutzer weiß, das etwas wichtiges passiert.
[^1]: Ausgenommen Apps im Vollbildmodus. Hier wird die Leiste komplett versteckt.

![Administratoranfrage eines Programms](uac.png)

Diesen Vorteil hat Apple zumindest in Safari verspielt.
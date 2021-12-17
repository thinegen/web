---
title: "Daten in Firefox"
publishDate: 2021-11-24
tags: ["firefox", "network"]
translationKey: "37257ea300fd9c0e206720629723a330b27e3d1613c6294df5a210a970218750"
---

Wenn man ein Datum in die Adressleiste von Firefox[^1] eingibt, wird es umgeschrieben. Das selbe gilt für alle datumsähnlichen Strings, bei denen der Tag und Monat kleiner 256 und das Jahr kleiner 65536 ist.
[^1]: Aktuell benutze ich Firefox 94.0.2

Der Grund dafür ist, das Firefox das Datum als IP-Adresse interpretiert: Tag und Monat bilden die ersten beiden Oktette der Adresse, die letzte Zahl wird mit Nullen gepaddet und als die letzten zwei Oktette interpretiert.

Beispielsweise wird 24.11.2021 zu 24.11.7.229:

~~~
   24       11          2021
   11000     1011      11111100101
00011000 00001011 0000011111100101

00011000 00001011 00000111 11100101
   24       11        7       229
~~~

Die letzte Zahl wird ebenfalls umgewandelt, wenn sie kleiner als 256 ist, beispielsweise bei 24.11.21 -> 24.11.0.37.

~~~
   24       11            21
   11000     1011            10101
00011000 00001011 0000000000010101

00011000 00001011 00000000 00010101
   24       11        0       21
~~~

Dieses Verhalten ist bekannt und wird in [Bug #1602034](https://bugzilla.mozilla.org/show_bug.cgi?id=1602034) verfolgt, allerdings sieht es nicht nach einer Änderung dieses Verhaltens aus. Die Umwandlung wurde in [Bug #1067168](https://bugzilla.mozilla.org/show_bug.cgi?id=1067168) eingeführt.

Chrome akzeptiert im übrigen nur IP-Adressen in der Dezimalpunktschreibweise, allerdings interpretieren Firefox und Chrome eine Nummer mit `http://` Präfix ebenfalls als IP-Adresse:

`http://24112021` -> `http://1.111.235.149/`

~~~
             24112021
       1 01101111 11101011 10010101
00000001 01101111 11101011 10010101
    1       111      235      149
~~~
---
title: "Dates in Firefox"
publishDate: 2021-11-24
tags: ["firefox", "network"]
translationKey: "37257ea300fd9c0e206720629723a330b27e3d1613c6294df5a210a970218750"
---

If you input a date in the URL bar of Firefox[^1], it gets rewritten into an ip if the year is less than 65536. Actually, every date-like string gets rewritten if the day and month are less than 256 and the year is less than 65536.
[^1]: I am using Firefox 94.0.2 right now.

The reason is that Firefox uses this string as an ip adress: The day and month are the first two octets, the last number gets paddded with zeros, until it is 16 bits long, and converted into the last octets.

One example: 24.11.2021 -> 24.11.7.229.

~~~
   24       11          2021
   11000     1011      11111100101
00011000 00001011 0000011111100101

00011000 00001011 00000111 11100101
   24       11        7       229
~~~

The last number also gets converted if it is less than 256, e.g. 24.11.21 -> 24.11.0.21.

~~~
   24       11            21
   11000     1011            10101
00011000 00001011 0000000000010101

00011000 00001011 00000000 00010101
   24       11        0       21
~~~

The behaviour is known and tracked in [Bug #1602034](https://bugzilla.mozilla.org/show_bug.cgi?id=1602034) but it doesn't look like this behaviour will get changed. It got introduced in [Bug #1067168](https://bugzilla.mozilla.org/show_bug.cgi?id=1067168) in response to a comment.

Chrome only accepts properly formatted ip adresses in dot-decimal notation, however, both Firefox and Chrome interpret a number (with a `http://` prefix) as an ip adress as well:

`http://24112021` -> `http://1.111.235.149/`

~~~
             24112021
       1 01101111 11101011 10010101
00000001 01101111 11101011 10010101
    1       111      235      149
~~~
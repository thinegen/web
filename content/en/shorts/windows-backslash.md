---
title: "Windows Backslash"
publishDate: 2021-03-24
tags: ["windows", "unix"]
---

In MS-DOS you could change the path separator backslash (```\```) to a normal slash (```/```). For this you had to change the [```SWITCHCHAR``` parameter](https://github.com/microsoft/MS-DOS/blob/04a3d20ff411409ab98474892b2bb1713bde0f7f/v2.0/bin/CONFIG.DOC#L77) in ```config.sys```. Paths used in this example document generally looked more like Linux paths instead of Windows. ```/dev/``` could even be [enabled](https://github.com/microsoft/MS-DOS/blob/master/v2.0/bin/CONFIG.DOC#L60). To this day, navigation with forward slashes is still possible as well (e.g. ```cd C:\ProgramData```)

According to [Larry Osterman](https://docs.microsoft.com/en-us/archive/blogs/larryosterman/why-is-the-dos-path-character) ([archived](https://web.archive.org/web/20210118144553/https://docs.microsoft.com/en-us/archive/blogs/larryosterman/why-is-the-dos-path-character)), a long-time Microsoft employee, the backslash was chosen because the normal slash was already occupied by IBM for command line options.

When Windows introduced its code pages to support other characters, the backslash was replaced by the Yen (¥) and the Won character (￦) in the japanese (code page 932) and korean versions (code page 949). This made these characters the path separator instead of the backslash.

While it is used widely now, the origin of the backslash seems to be unknown. According to the [Wikipedia article](https://en.wikipedia.org/w/index.php?title=Backslash&oldid=1013570882#History) it has been around since at least 1937, but its function at that time is not known.

- [Hacker News on this topic](https://news.ycombinator.com/item?id=26272492)
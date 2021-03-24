---
title: "Windows Backslash"
publishDate: 2021-03-24
tags: ["windows", "unix"]
---

In MS-DOS konnte man den Pfadseparator Backslash (```\```) zu einem normalen Slash (```/```) umstellen. Dazu musste man in der ```config.sys``` den Parameter [```SWITCHCHAR```](https://github.com/microsoft/MS-DOS/blob/04a3d20ff411409ab98474892b2bb1713bde0f7f/v2.0/bin/CONFIG.DOC#L77) ändern. Auch ansonsten sahen die Pfade in diesem Dokument eher nach Unix als nach den heutigen Windowspfaden aus. Der ```/dev/``` Pfad konnte ebenfalls [aktiviert werden](https://github.com/microsoft/MS-DOS/blob/master/v2.0/bin/CONFIG.DOC#L60). Auch heute kann man noch mit normalen Slashes navigieren (z.B. ```cd C:\ProgramData```).

Laut [Larry Osterman](https://docs.microsoft.com/en-us/archive/blogs/larryosterman/why-is-the-dos-path-character) ([Archiv](https://web.archive.org/web/20210118144553/https://docs.microsoft.com/en-us/archive/blogs/larryosterman/why-is-the-dos-path-character)), einem langjährigen Microsoftmitarbeiter, wurde der Backslash gewählt, weil der normale Slash durch IBM bereits für Befehlszeilenoptionen belegt war.

Als Windows seine Code Pages einführte, um auch andere Schriftzeichen zu unterstützen, wurde der Backslash in der japanischen (Code Page 932) und koreanischen Version (Codepage 949) durch das Yen-Zeichen (¥) bzw. das Won-Zeichen (￦) ersetzt. Dadurch wurden diese Zeichen anstatt des Backslashes zum Pfadseparator.

Der Ursprung des Backslash scheint übrigens nicht bekannt zu sein. Laut dem [englischen Wikipedia-Artikel](https://en.wikipedia.org/w/index.php?title=Backslash&oldid=1013570882#History) gibt es ihn mindestens seit 1937, seine damalige Funktion ist aber nicht bekannt.

- [Hacker News](https://news.ycombinator.com/item?id=26272492)
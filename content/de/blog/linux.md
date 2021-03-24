---
title: "Linux"
publishDate: 2021-03-21T18:50:57+01:00
tags: ["linux"]
layout: wiki
---

Eine kurze Einführung in Linux mit Aufbau, Befehlen und einigen Grundkonzepten.

## Organisation

Linux ist hierarchisch organisiert. Das Dateisystem fängt hier bei ```/```, dem sogenannten Root-Verzeichnis, an.[^1] Darunter kommen dann folgende Ordner:
[^1]: Bei Windows ist das Dateisystem nach Festplatten organisiert. Hier fängt jeder Pfad mit einem Laufwerksbuchstaben an (z.B. ```C:\ProgramData```).

| Ordner                     | Inhalt                                                                                                             |
|----------------------------|--------------------------------------------------------------------------------------------------------------------|
| ```/bin/```                | Programme, die eher von Benutzern genutzt werden                                                                   |
| ```/boot/```               | Zum Hochfahren (Booten) des Rechners benötigten Dateien                                                            |
| ```/dev/```                | Erkannte Geräte (Festplatten, Maus, Tastatur, USB Sticks)                                                          |
| ```/etc/```                | Systemweite Konfigurationsdateien                                                                                  |
| ```/home/```               | Sämtliche Benutzerordner (z.B. ```/home/thinegen/```)                                                              |
| ```/lib/```, ```/lib64/``` | Systembibliotheken, die von Programmen genutzt werden                                                              |
| ```/mnt/```                | Eingehängte Laufwerke (manchmal auch unter ```/media/```)                                                          |
| ```/opt/```                | Nachträglich installierte Anwendungen                                                                              |
| ```/proc/```               | Prozessinformationen                                                                                               |
| ```/root/```               | ```/root/``` ist der Nutzerordner des root Nutzers                                                                 |
| ```/run/```                | Daten, die während der Laufzeit eines Programms benötigt werden                                                    |
| ```/sbin/```               | Programme, die eher von Systemadministratoren benutzt werden                                                       |
| ```/srv/```                | Dateien, die für den Betrieb eines installierten Servers benötigt werden                                           |
| ```/sys/```                | Systeminformationen                                                                                                |
| ```/tmp/```                | Temporäre Dateien, die beim Neustart gelöscht werden                                                               |
| ```/usr/```                | Anwendungssoftware, unterteilt in ```/usr/bin/``` und ```/usr/sbin/``` für Programme bzw. ```/usr/lib/``` für benötigte Bibliotheken |
| ```/var/```                | Logs, Caches, Mail, etc.                                                                                           |

In Linux gibt es den Grundsatz

> Everythings a file, Alles ist eine Datei

Deswegen können auch Informationen wie die aktuelle Prozessorauslastung aus einer Datei ausgelesen werden (z.B. gibt ```cat /sys/block/sda/size``` die Größe der Festplatte ```sda``` aus).

### Datei- und Ordnerreferenzierung

Um einen Ordner oder eine Datei zu referenzieren gibt es zwei Möglichkeiten: Man kann den kompletten Pfad referenzieren: ```/tmp/Datei```. Das ist der sogenannte **absolute** Pfad. Er startet immer mit einem Slash (```/```). Die andere Möglichkeit ist der **relative** Pfad: Hier wird eine Datei vom ausgehenden Pfad referenziert. Ist man in ```/tmp/``` kann man ```Datei``` einfach mit ```Datei``` referenzieren.

Bei relativen Pfaden gibt es Besonderheiten: Ein Punkt referenziert das aktuelle Verzeichnis, zwei Punkte das darüberliegende. Wenn man sich also in ```/tmp/``` befindet, zeigt ```.``` auf ```/tmp/``` und ```..``` auf ```/```. Eine weitere Besonderheit ist das Home-Verzeichnis des aktuellen Nutzers. Dieses kann mit ```~``` referenziert werden. Bei absoluten Pfaden können ebenfalls Punkte, aber nicht die Tilde verwendet werden (```/usr/./sbin/../../tmp/Datei``` zeigt also ebenfalls auf ```Datei```).

### Berechtigungen

Dateien und Ordner haben Einstellungen zur Berechtigung. Diese kann man sich mit ```ls -l``` (s. unten) anzeigen lassen. Die Ausgabe könnte so aussehen wie:

~~~
total 32
drwxr-xr-x 2 thinegen thinegen 4096 Mar 21 18:48 archetypes
drwxr-xr-x 5 thinegen thinegen 4096 Mar 21 18:48 assets
-rw-r--r-- 1 thinegen thinegen 1259 Mar 21 18:48 config.toml
drwxr-xr-x 4 thinegen thinegen 4096 Mar 21 18:48 content
drwxr-xr-x 2 thinegen thinegen 4096 Mar 24 15:11 i18n
drwxr-xr-x 6 thinegen thinegen 4096 Mar 21 18:48 layouts
drwxr-xr-x 3 thinegen thinegen 4096 Mar 21 18:50 resources
drwxr-xr-x 2 thinegen thinegen 4096 Mar 21 18:48 static
~~~

Die einzelnen Felder ergeben sich wie folgt:

~~~
Berechtigungen Nutzer   Gruppe Größe              Name
     |           |        |      |                 |
drwxr-xr-x 2 thinegen thinegen 4096 Mar 21 18:48 static
           |                               |
    Anzahl Hardlinks                letzte Änderung
~~~

Das ```d``` am Anfang zeigt an, das es sich um ein Verzeichnis (directory) handelt. Die Größe eines Verzeichnisses ist aber nicht die Summe aller enthaltenen Dateien und Verzeichnisse, sondern nur die Größe der Information über das Verzeichnis selbst (z.B. Datum der letzten Änderung o.ä.).

Es gibt drei Rechte:
- das Leserecht: ```r``` (read)
- das Schreibrecht: ```w``` (write)
- das Ausführungsrecht: ```x``` (execute)
    - für Verzeichnisse: Recht das Verzeichnis zu betreten

Um die Rechte auszulesen teilt man sie in Dreier-Gruppen auf:

~~~
Nutzer   Alle
  |       |
 rwx r-x r-x
      |
    Gruppe
~~~

In diesem Fall darf der Nutzer also lesen, schreiben und das Verzeichnis betreten, während die Mitglieder der Gruppe und alle anderen nur lesen und das Verzeichnis betretens dürfen.

Eine andere oft benutze Art Rechte zu schreiben ist die Umrechnung in das Oktalsystem[^2]. Hierfür addiert man die Werte der Rechte (```r=4```, ```w=2```, ```x=1```) im Oktalsystem:

~~~
rwx r-x r-x
421 4 1 4 1
 7   5   5
~~~

Wenn der Nutzer alles und andere nur lesen und ausführen dürfen, lauten die Berechtigungen also ```755```.

Für Dateien und Verzeichnisse ist meistens die Berechtigung ```644``` geeignet:

~~~
 6  4  4
42 4  4
rw-r--r--
~~~

[^2]: Im Oktalsystem gibt es nur die Zahlen von 0 bis 7. Eine Acht im Dezimalsystem (geschrieben 8{{< rawhtml >}}<sub>10</sub>{{< /rawhtml >}}) ist eine 10 im Oktalsystem (10{{< rawhtml >}}<sub>8</sub>{{< /rawhtml >}}). Auch die Rechenregeln ändern sich: 7{{< rawhtml >}}<sub>8</sub>{{< /rawhtml >}} + 1{{< rawhtml >}}<sub>8</sub>{{< /rawhtml >}} = 10{{< rawhtml >}}<sub>8</sub>{{< /rawhtml >}} (und: 7{{< rawhtml >}}<sub>10</sub>{{< /rawhtml >}}+1{{< rawhtml >}}<sub>10</sub>{{< /rawhtml >}} = 10{{< rawhtml >}}<sub>8</sub>{{< /rawhtml >}}). [Wikipedia](https://de.wikipedia.org/wiki/Oktalsystem)

### Versteckte Dateien

Auf Linux kann man Dateien verstecken, wenn man ihnen einen Punkt voranstellt. Der Befehl ```ls -la``` gibt beispielsweise Folgendes zurück:

~~~
total 52
drwxr-xr-x 11 thinegen thinegen 4096 Mar 24 15:11 .
drwx------ 23 thinegen thinegen 4096 Mar 24 13:00 ..
drwxr-xr-x  2 thinegen thinegen 4096 Mar 21 18:48 archetypes
drwxr-xr-x  5 thinegen thinegen 4096 Mar 21 18:48 assets
-rw-r--r--  1 thinegen thinegen 1259 Mar 24 16:33 config.toml
drwxr-xr-x  4 thinegen thinegen 4096 Mar 21 18:48 content
drwxr-xr-x  8 thinegen thinegen 4096 Mar 24 16:17 .git
drwxr-xr-x  3 thinegen thinegen 4096 Mar 21 18:48 .github
-rw-r--r--  1 thinegen thinegen   42 Mar 21 18:48 .gitignore
drwxr-xr-x  2 thinegen thinegen 4096 Mar 24 15:11 i18n
drwxr-xr-x  6 thinegen thinegen 4096 Mar 21 18:48 layouts
drwxr-xr-x  3 thinegen thinegen 4096 Mar 21 18:50 resources
drwxr-xr-x  2 thinegen thinegen 4096 Mar 21 18:48 static
~~~

Diese Dateien werden nur angezeigt, wenn man sie explizit anzeigen lässt.

## Befehle

Befehle in Linux werden nach dem folgenden Schema eingegeben:

    Befehl [Parameter]

Online wird Befehlen manchmal ein Dollar-Zeichen (```$```) oder ein Doppelkreuz (```#```) vorangestellt. Ein ```$``` bedeutet, das der Befehl als normaler Nutzer ausgeführt werden sollte, ein ```#``` bedeutet das der Befehl als Root-Nutzer ausgeführt werden soll. Das Zeichen selber wird aber nicht mit eingegeben. Da ein Doppelkreuz auch den Anfang eines Kommentars darstellt, wird alles nach ```#``` ignoriert, wenn es nicht am Anfang der Zeile steht.

Möchte man beispielsweise alle Dateien und Verzeichnisse mit Rechten ausgeben, lautet der Befehl:

~~~
Befehl
  |
$ ls -l # Das hier ist ein Kommentar, der ignoriert wird.
      |
  Parameter
~~~

Um mehr über einen Befehl zu erfahren helfen die sogenannten Man-Pages, die man mit

    $ man Befehl
aufrufen kann.

### Wichtige Befehle

Die folgenden Befehle werden öfter gebraucht. Falls ein Befehl nicht zu Kommandozeile zurückkehrt, kann er meistens mit ```q``` beendet werden.

- **```cat```**: Ausgabe des Inhalts einer Datei
- **```cd```**: Wechselt den aktuellen Ordner
    - ```$ cd ~ # wechselt in den Home-Ordner des Nutzers```
    - ```$ cd .. # Einen Ordner in der Hierarchie nach oben```
- **```chmod```**: Ändert die Dateiberechtigungen
    - ```$ chmod g+x Datei # Gibt der Gruppe der Datei Ausführungsrechte```
    - ```$ chmod 644 Datei # Ändert die Berechtigung zu rw-r--r--```
- **```chown```**: Ändert den Besitzer einer Datei. Der neue Besitzer muss auf dem System existieren
    - ```$ chown besitzer-neu:gruppe-neu Datei```
- **```cp```**: Kopiert eine Datei
    - ```cp Quelle Ziel # Kopiert Quelle nach Ziel```
    - ```cp -r Quelle Ziel # Kopiert Quelle rekursiv nach Ziel (für Ordner)```
- **```diff```**: Zeigt den Unterschied zwischen zwei Dateien an
    - ```cp Datei1 Datei2```
- **```echo```**: Gibt die Eingabe wieder aus
- **```exit```**: Schließt die Sitzung. Meistens funktioniert hier auch Ctrl+D
- **```grep```**: Durchsucht Text von der Eingabe
    - ```history | grep main # Zeigt alle Zeilen mit main an```
- **```groups```**: Gibt aus, in welchen Gruppen der aktuelle Nutzer Mitglied ist
- **```head```**: Gibt die ersten Zeilen einer Datei aus
- **```history```**: Zeigt die Befehlshistorie an
- **```less```**: Zeigt Dateien an, ohne sie vollständig auszugeben
- **```ls```**: Auflistung der im aktuellen Verzeichnis befindlichen Dateien
    - ```ls # Zeigt das aktuelle Verzeichnis an```
    - ```ls -l # Zeigt das aktuelle Verzeichnis mit Berechtigungen und Besitzern an```
    - ```ls -la # Zeigt das aktuelle Verzeichnis mit Berechtigungen und Besitzern, sowie versteckte Verzeichnisse an```
- **```man```**: Ruft die man-page auf
    - ``` man ls # Zeigt die man-page von ls an```
- **```mkdir```**: Erstellt ein Verzeichnis
    - ```mkdir Verzeichnis1 # Erstellt Verzeichnis1 im aktuellen Pfad```
    - ```mkdir -p Verzeichnis1/Verzeichnis2 # Erstellt Verzeichnis1 und Verzeichnis2 als Unterordner```
- **```mv```**: Bewegt eine Datei
    - ```mv Quelle Ziel # Bewegt Quelle nach Ziel```
- **```passwd```**: Ändert das Nutzerpasswort
- **```pwd```**: Gibt den aktuellen Pfad zurück
- **```reboot```**: Startet den Rechner neu
- **```rmdir```**: Löscht ein Verzeichnis
- **```rm```**: Löscht eine Datei. Vorsicht: Es gibt keinen Papierkorb!
    - ```rm Datei1 # Löscht die Datei1```
    - ```rm -rf / # Löscht ```*```alles```*```. Wenn dieser Befehl ausgeführt wird muss das Betriebssystem neu installiert werden.```
- **```shutdown```**: Fährt den Rechner herunter
- **```sort```**: Gibt die zeilenweise sortierte Eingabe aus
    - ``` history | sort ```
- **```sudo```**: Führt einen Befehl mit Root-Rechten aus (**Su**peruser**Do**).
    - ``` sudo ls ```
- **```su```**: Wechselt den Benutzer zum Root-Nutzer
- **```tail```**: Gibt die letzten Zeilen einer Datei aus
- **```touch```**: Erstellt eine Datei
    - ```touch Datei1```
- **```wget```**: Lädt eine Datei aus dem Internet herunter und speichert sie
   - ```wget {{< ref "linux.md" >}} # Lädt diese Seite herunter```
- **```whoami```**: Gibt den aktuellen Nutzer zurück

### Pipes

Die Ausgabe eines Befehls kann mit dem Pipe-Operator ```|``` in die Eingabe eines anderen Befehls umgeleitet werden:

    $ cat Liste.txt | sort

Hier wird der Inhalt von ```Liste.txt``` direkt in das ```sort```-Programm umgeleitet. Vor allem für Befehle wie ```grep``` ist das sinnvoll.
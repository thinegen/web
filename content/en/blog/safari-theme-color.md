---
title: "The other issue with Safari on iOS 15"
publishDate: 2021-10-05
tags: ["apple", "ui", "ios", "security"]
translationKey: "d2df5e60e26c7c57f01d52a06e0a6306b79d52179d2d55d5b7dcf4051f30756f"
description: "Why I think it is bad that Apple implemented theme-color in iOS 15."
---

iOS 15 was published on 20.09.2021. Apart from the adress bar position change, Apple also implemented the [`theme-color` meta-Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color) in Safari.

The `theme-color` tag is used to extend the websites design by coloring elements outside the actual page.

~~~
<meta name="theme-color" content="#4285f4">
~~~

![Image by Google ([Icons & Browser Colors](https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/)), licensed unter [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Edited.](meta-tag-theme-color.png "Example usage of the theme-color tag")

In iOS 15 that means changing the color of the status bar that is used since iOS 14 to [indicate microphone or camera usage](https://support.apple.com/en-us/HT211876).

![Screen recording, microphone and camera usage indicators; normal status bar](indicators-iOS15.png)

To keep a website from completely blocking these indicators with the `theme-color` tag, they are full-width and pulsing. The theme color, however, still has some influence over the bars color:

![microphone on and no `theme-color` tag, pulsing; microphone on and `theme color #ff8e00`, pulsing; no microphone, `theme color #ff8e00`, static](indicators-colored-iOS15.png)

This makes the status bar less valuable as an area to have security indicators in. These areas are important though.  
One example is the windows UAC window. The screen is darkened and the only element on it is the question for elevated rights with information about the program asking for them. This makes it clear to the user that something important is happening.

![UAC question on Windows](uac.png)

Apple has lost this advantage, at least in Safari.
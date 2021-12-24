---
title: "IP Adress Service"
publishDate: 2021-12-24
translationKey: "09f852b5d0d27a87fe4fa1f5d90662b98fb320df7370d3588089a940efbee43a"
---

## Link

[ipv4.thinegen.de](https://ipv4.thinegen.de)

[ipv6.thinegen.de](https://ipv4.thinegen.de)

## Beschreibung

Returns the IPv4 or IPv6 adress as string.

Built with NGINX:

~~~
location / {
    return 200 $remote_addr;
    add_header content-type "text/plain";
}
~~~
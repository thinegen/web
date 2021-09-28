---
title: "Prettymaps"
publishDate: 2021-10-04
tags: ["python", "karten", "osm", "anleitung"]
translationKey: "af6a440011923befe87a5557a69f851fbc2ebb9c0f754a176bdd858d49f40221"
description: "How to create pretty maps with marceloprates/prettymaps"
---

[prettymaps](https://github.com/marceloprates/prettymaps) can easily create pretty maps.

{{< img src="prettymaps-example.png" alt="prettymaps example picture" >}}

`circle = False` creates a square map. The corners can be rounded by setting `dilate` to an integer.  
For `buildings`, `'union'` can be set to `False` to render building separately.

To add Openstreetmap features, they have to be added to `layers`. An overview is in the [OSM Wiki](https://wiki.openstreetmap.org/wiki/Map_features). The Syntax for adding features is:

~~~
'<name>': {'tags': { '<OSM Key>': [ <OSM Value>, <OSM Value>, ...], '<OSM Key>': [...] }, circle': doCircle, 'dilate': dilate}
~~~

To color the features:
~~~
'<name>': {'fc': '<color in Hex>', 'ec': '#FF0000', 'alpha': 1, 'lw': 0, 'zorder': 3},
~~~
`'alpha'` sets the opacity (`1` is opaque, `0` transparent) and `'zorder'` the features order. Features with a higher order are rendered above lower ordered features.  
`'fc'` can be replaced by `'palette': ['<hex1>', '<hex2>']` to render a features objects in different colors.

The location and radius can be changed in the first two lines in `layer`.

Features directly on the edges seem to be cut off sometimes. Apart from that it does produce beautiful maps.

{{< highlight Python >}}
from prettymaps import *
import vsketch
import osmnx as ox
import matplotlib.font_manager as fm
from matplotlib import pyplot as plt
from descartes import PolygonPatch
from shapely.geometry import *
from shapely.affinity import *
from shapely.ops import unary_union

fig, ax = plt.subplots(figsize = (20, 20), constrained_layout = True)

dilate = 100
doCircle = False

layers = plot(
    'Brandenburger Tor',
    radius = 950,
    ax = ax,

    layers = {
            'perimeter': {'circle': doCircle, 'dilate': dilate},
            'streets': {
                'width': {
                    'motorway': 8,
                    'motorway_link': 3,
                    'service': 1,
                    'trunk': 6,
                    'primary': 6,
                    'secondary': 5,
                    'tertiary': 4,
                    'residential': 2,
                    'living_street': 2,
                    'pedestrian': 1.25,
                    'footway': 1.25,
                    'sideway': 1.25,
                    'track': 1,
                    'bridleway': 1,
                    'cycleway': 1,
                    'path': 0.5,
                    'unclassified': 3,
                    'construction': 1,
                }
            },
            'building': {'tags': {'building': True}, 'union': True,'circle': doCircle, 'dilate': dilate},
            'water': {'tags': {'natural': ['water', 'bay', 'wetland'], 'waterway': ['ditch', 'stream', 'weir'], 'landuse': ['basin', 'reservoir'], 'water': True},'circle': doCircle, 'dilate': dilate},
            'green': {'tags': {'landuse': ['grass', 'allotments', 'village_green', 'allotments', 'nature_reserve', 'recreation_ground', 'cemetery', 'meadow'], 'natural': ['island', 'grassland', 'scrub'], 'leisure': ['park', 'garden', 'sports_centre', 'playground']},'circle': doCircle, 'dilate': dilate},
            'cemeterystuff': {'tags': {'landuse': ['cemetery']},'circle': doCircle, 'dilate': dilate},
            'railway': {'custom_filter': '["railway"~"rail|light_rail|subway|tram"]', 'width': 2,'circle': doCircle, 'dilate': dilate},
            'forest': {'tags': {'landuse': ['forest'], 'natural': ['wood']},'circle': doCircle, 'dilate': dilate},
            'agriculture': {'tags':{'landuse': ['farmland']},'circle': doCircle, 'dilate': dilate},
            'developingLand': {'tags': {'landuse': ['brownfield', 'greenfield', 'construction', 'landfill']},'circle': doCircle, 'dilate': dilate},
            'sportstuff': {'tags': { 'leisure': ['pitch', 'track'] },'circle': doCircle, 'dilate': dilate},
            'parkplatz': {'tags': {'amenity': ['parking'], 'aeroway': ['apron', 'runway', 'taxiway']},'circle': doCircle, 'dilate': dilate},
            'gleisbett': {'tags': {'landuse': ['railway', 'industrial']},'circle': doCircle, 'dilate': dilate}
        },
        drawing_kwargs = {
            'background': {'fc': '#F2F4CB', 'ec': '#dadbc1', 'hatch': 'ooo...', 'zorder': -1},
            'perimeter': {'fc': '#F7F3F5', 'ec': '#2F3737', 'lw': 3, 'hatch': 'ooo...', 'hatch_c': '#EFE7EB',  'zorder': 0},
            'green': {'fc': '#AABD8C', 'ec': '#2F3737', 'lw': 0, 'zorder': 1},
            'water': {'fc': '#a1e3ff', 'lw': 0, 'zorder': 3},
            'streets': {'fc': '#3b4545', 'lw': 0, 'zorder': 4},
            'building': {'palette': ['#433633', '#FF5E5B'], 'ec': '#2F3737', 'lw': 0, 'zorder': 3},
            'railway': {'fc': '#a8a8a8', 'ec': '#FF0000', 'alpha': 1, 'lw': 0, 'zorder': 3},
            'forest': {'fc': '#228b22', 'ec': '#2F3737', 'lw': 0, 'zorder': 1},
            'agriculture': {'fc': '#f5d6a8', 'ec': '#2F3737', 'lw': 0, 'zorder': 1},
            'developingLand': {'fc': '#898878', 'ec': '#2F3737', 'lw': 0, 'zorder': 1},
            'sportstuff': {'fc': '#66A457', 'ec': '#32512b', 'lw': 0.3, 'zorder': 1},
            'parkplatz': {'fc': '#a3a3a3', 'ec': '#32512b', 'lw': 0, 'zorder': 1},
            'gleisbett': {'fc': '#ebdbe8', 'ec': '#32512b', 'lw': 0, 'zorder': 1},
            'cemeterystuff': {'fc': '#7BAE82', 'ec': '#2F3737', 'lw': 0, 'zorder': 1},
        },
        osm_credit = {'color': '#3b4545'}
)

print("savefig")

plt.savefig('berlin.png')
{{< /highlight >}}

The required packages are:

{{< highlight Text >}}
shapely
descartes
matplotlib
osmnx
vsketch
prettymaps
{{< /highlight >}}
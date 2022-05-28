import { Level } from "./interfaces";

let levels = [
    {
        blackScreenLength: 2500,
        ceilPoints: [
            [100, 0],
            [175, 190],
            [320, 190],
            [360, 260],
            [470, 70],
            [600, 220],
            [800, 110],
            [880, 450],
            [1032, 79],
            [1120, 210],
            [1287, 96],
            [1333, 174],
            [1480, 182],
            [1508, 250],
            [1665, 11],
            [1850, 11],
            [1906, 167],
            [2048, 190],
            [2085, 259],
            [2179, 72],
            [2326, 234],
            [2483, 104],
            [2605, 576],
            [2704, 557],
            [2744, 245],
            [2907, 245],
            [2959, 125],
            [3114, 123],
            [3176, 433],
            [3289, 213],
            [3423, 247],
            [3461, 178],
            [3770, 156],
            [3814, 243],
            [3919, 71],
            [4041, 248],
            [4190, 6],
            [4333, 413],
            [4539, 19],
            [4767, 79],
            [4806, 175],
            [4944, 60],
            [5020, 136],
            [5107, 19],
            [5188, 9],
            [5207, 240],
            [5382, 36],
            [5482, 435],
            [5604, 186],
            [5755, 220],
            [5784, 7],
            [5884, 9],
            [6036, 247],
            [5939, 457],
            [5960, 500],
            [6094, 506],
            [6224, 247],
            [6480, 98],
            [6517, 177],
            [6634, 139],
            [6693, 250],
            [6843, 14],
            [6968, 15],
            [7038, 338],
            [7231, 79],
            [7291, 194],
            [7465, 7],
            [7620, 11],
            [7724, 178],
            [7871, 9],
            [7957, 161],
            [8011, 61],
            [8137, 251],
            [8297, 3],
            [8410, 167],
            [8481, 473],
            [8595, 281],
            [8676, 247],
            [8821, 85],
            [8870, 166],
            [8937, 611],
            [9056, 473],
            [9084, 28],
            [9348, 50],
            [9417, 166],
            [9523, 60],
            [9631, 123],
            [9712, 11],
            [9799, 4],
            [9813, 240],
            [9899, 125],
            [10046, 120],
            [10090, 443],
            [10253, 101],
            [10337, 242],
            [10370, 190],
            [10369, 1],
            [10505, 22],
            [10608, 191],
            [10559, 480],
            [10698, 502],
            [10828, 256],
            [10852, 36],
            [10989, 4],
            [11067, 337],
            [11263, 71],
            [11319, 199],
            [11484, 1],
            [11643, 23],
            [11701, 182],
            [11738, 91],
            [11826, 91],
            [11864, 0],
            [11942, 0],
            [11988, 52],
            [12049, 53],
            [12168, -10],
            [12771, -10],
            [12912, 207],
            [13029, 4],
            [13142, 180],
            [13172, 58],
            [13326, 248],
            [13466, 3],
            [13610, 178],
            [13659, 494],
            [13823, 204],
            [13823, 4],
            [13952, 12],
            [14004, 177],
            [14036, 57],
            [14172, 224],
            [14180, 266],
            [14352, 14],
            [14409, 121],
            [14422, 250],
            [14528, 117],
            [14655, 126],
            [14697, 443],
            [14894, 96],
            [14944, 253],
            [14977, 194],
            [14978, 1],
            [15126, 55],
            [15219, 167],
            [15276, 638],
            [15385, 557],
            [15434, 22],
            [15702, 63],
            [15757, 161],
            [15835, 61],
            [15938, 60],
            [15969, 220],
            [16023, 55],
            [16166, 213],
            [16191, 277],
            [16245, 280],
            [16243, 101],
            [16368, 47],
            [16498, 194],
            [16541, 554],
            [16642, 443],
            [16709, 3],
            [16834, 38],
            [16889, 172],
            [16915, 57],
            [17067, 245],
            [17185, 57],
            [17295, 251],
            [17441, 9],
            [17533, 145],
            [17579, 440],
            [17696, 223],
            [17810, 0],
            [17989, 115]
        ],
        floorPoints: [
            [71, 1267],
            [131, 1084],
            [243, 999],
            [294, 1004],
            [408, 1162],
            [683, 1170],
            [769, 1048],
            [913, 1171],
            [968, 1078],
            [1006, 1075],
            [1051, 993],
            [1105, 1135],
            [1176, 1143],
            [1226, 1054],
            [1344, 1053],
            [1374, 844],
            [1445, 837],
            [1521, 1124],
            [1595, 1127],
            [1711, 1249],
            [1814, 1244],
            [1853, 1092],
            [1933, 1056],
            [1947, 999],
            [2020, 997],
            [2134, 1159],
            [2412, 1173],
            [2464, 1018],
            [2508, 1015],
            [2551, 939],
            [2621, 1126],
            [2888, 1187],
            [3010, 1146],
            [3072, 1042],
            [3221, 1181],
            [3273, 1078],
            [3316, 1069],
            [3357, 994],
            [3407, 1102],
            [3539, 1097],
            [3639, 1000],
            [3772, 997],
            [3779, 760],
            [3836, 704],
            [3973, 701],
            [4049, 589],
            [4098, 695],
            [4097, 980],
            [4173, 1015],
            [4255, 1148],
            [4380, 1198],
            [4458, 1197],
            [4509, 1108],
            [4547, 1110],
            [4589, 1190],
            [4713, 1184],
            [4746, 1081],
            [4852, 1000],
            [4890, 996],
            [5021, 1165],
            [5197, 1183],
            [5335, 1127],
            [5375, 1042],
            [5506, 1167],
            [5584, 1076],
            [5622, 1072],
            [5664, 996],
            [5713, 1200],
            [5842, 1192],
            [5890, 1105],
            [5914, 875],
            [6213, 875],
            [6276, 913],
            [6156, 969],
            [6108, 1154],
            [6354, 1233],
            [6400, 1059],
            [6531, 1045],
            [6556, 845],
            [6625, 820],
            [6686, 1100],
            [6797, 1129],
            [6851, 1183],
            [7028, 1170],
            [7076, 1019],
            [7114, 1015],
            [7161, 932],
            [7305, 1067],
            [7446, 1236],
            [7582, 1198],
            [7628, 1081],
            [7692, 1057],
            [7721, 993],
            [7849, 993],
            [7886, 847],
            [7941, 821],
            [8093, 847],
            [8137, 763],
            [8182, 807],
            [8191, 986],
            [8259, 1013],
            [8348, 1151],
            [8506, 1221],
            [8525, 1263],
            [8644, 1260],
            [8674, 1187],
            [8764, 1167],
            [8778, 1043],
            [8848, 1010],
            [8886, 935],
            [8957, 1116],
            [9057, 1137],
            [9106, 1216],
            [9291, 1260],
            [9342, 1095],
            [9423, 1050],
            [9443, 997],
            [9505, 996],
            [9642, 1170],
            [9892, 1168],
            [9990, 1050],
            [10138, 1176],
            [10185, 1075],
            [10230, 1073],
            [10269, 994],
            [10318, 1097],
            [10326, 1227],
            [10453, 1206],
            [10499, 1114],
            [10507, 901],
            [10587, 867],
            [10787, 866],
            [10888, 912],
            [10766, 974],
            [10720, 1156],
            [10799, 1183],
            [10844, 1257],
            [10950, 1255],
            [11001, 1179],
            [11061, 1167],
            [11108, 1021],
            [11151, 1013],
            [11187, 932],
            [11271, 1010],
            [11339, 1056],
            [11532, 1280],
            [11815, 1280],
            [11858, 1209],
            [11920, 1238],
            [11935, 1280],
            [12339, 1280],
            [12398, 1176],
            [12520, 1168],
            [12561, 1013],
            [12611, 999],
            [12672, 1118],
            [12794, 1100],
            [12879, 1050],
            [12898, 999],
            [13039, 1000],
            [13069, 848],
            [13287, 818],
            [13331, 763],
            [13372, 809],
            [13377, 988],
            [13447, 1008],
            [13538, 1149],
            [13709, 1235],
            [13836, 1249],
            [13898, 1092],
            [13971, 1053],
            [13991, 1000],
            [14062, 1002],
            [14169, 1156],
            [14520, 1171],
            [14598, 1043],
            [14669, 1116],
            [14800, 1091],
            [14884, 994],
            [14921, 1057],
            [15066, 1078],
            [15107, 996],
            [15184, 1118],
            [15377, 1171],
            [15602, 1170],
            [15624, 1097],
            [15680, 1094],
            [15719, 996],
            [15865, 999],
            [15881, 757],
            [15919, 712],
            [16028, 709],
            [16053, 633],
            [16133, 578],
            [16150, 533],
            [16196, 636],
            [16196, 928],
            [16342, 989],
            [16525, 1203],
            [16672, 1241],
            [16742, 1235],
            [16783, 1089],
            [16858, 1051],
            [16880, 997],
            [17015, 988],
            [17042, 745],
            [17074, 709],
            [17226, 703],
            [17297, 590],
            [17335, 630],
            [17352, 994],
            [17435, 1026],
            [17511, 1148],
            [17720, 1189],
            [17750, 1121],
            [17796, 1108],
            [17848, 1203],
            [17995, 1146]
        ],
        objects: [
            [
                [4730, 617],
                [4792, 516],
                [4871, 478],
                [4885, 426],
                [4960, 422],
                [5009, 462],
                [4960, 562],
                [4893, 601],
                [4876, 681],
                [4743, 666],
                [4727, 649],
                [4730, 617]
            ],
            [
                [9339, 617],
                [9401, 516],
                [9480, 478],
                [9494, 426],
                [9569, 422],
                [9618, 462],
                [9569, 562],
                [9502, 601],
                [9485, 681],
                [9352, 666],
                [9336, 649],
                [9339, 617]
            ],
            [
                [11546, 502],
                [11600, 464],
                [12029, 473],
                [12059, 338],
                [12137, 304],
                [12148, 254],
                [12307, 240],
                [12342, 190],
                [12380, 188],
                [12437, 313],
                [12439, 532],
                [12322, 587],
                [12236, 682],
                [12230, 821],
                [12119, 993],
                [12100, 907],
                [12049, 864],
                [11991, 950],
                [11874, 742],
                [11758, 962],
                [11701, 682],
                [11644, 967],
                [11589, 581],
                [11541, 530],
                [11546, 502]
            ],
            [
                [13846, 579],
                [13847, 498],
                [13906, 460],
                [14142, 464],
                [14226, 500],
                [14332, 460],
                [14357, 416],
                [14398, 460],
                [14398, 527],
                [14360, 551],
                [14351, 635],
                [14267, 631],
                [14284, 712],
                [14254, 738],
                [14134, 722],
                [14050, 717],
                [14026, 744],
                [13920, 741],
                [13855, 576],
                [13846, 579]
            ]
        ]
    }
];

function getLevel(lvlNumber: number) {
    let level: Level = {
        blackScreenLength: levels[lvlNumber].blackScreenLength,
        lines: [],
        enemySpawns: []
    };
    if (lvlNumber === 0) {
        level.enemySpawns = [
            { spawnTime: 3000, ai: 1, startY: 100 },
            { spawnTime: 6000, ai: 0, startY: 666 },
            { spawnTime: 9000, ai: 1, startY: 50 }
        ];
    }

    //Ceil lines
    addLines(level, levels[lvlNumber].ceilPoints)
    //Floor lines
    addLines(level, levels[lvlNumber].floorPoints)
    //Objects in the middle
    for (const object of levels[lvlNumber].objects)
        addLines(level, object);

    return level;
}

function addLines(level: Level, points: number[][]) {
    for (let i = 0; i < points.length - 1; i++) {
        let prev = points[i];
        let now = points[i + 1];
        level.lines.push({
            start: { x: prev[0] + level.blackScreenLength, y: prev[1] },
            end: { x: now[0] + level.blackScreenLength, y: now[1] }
        });
    }
}

export { getLevel };
let a = [
  550, 550, 550, 539, 528, 517, 506, 495, 484, 473, 462, 451, 440, 429, 418, 407, 396, 385, 374, 363, 352, 341, 330, 319, 308, 297, 286, 275, 264,
  253, 242, 231, 220, 214.5, 209, 203.5, 198, 192.5, 187, 181.5, 176, 170.5, 165, 159.5, 154, 148.5, 143, 137.5, 132, 126.5, 121, 115.5, 110, 104.5,
  99, 93.5, 88, 82.5, 77, 71.5,
];
let b = [
  550, 550, 550, 539, 528, 517, 506, 495, 484, 473, 462, 451, 440, 429, 418, 407, 396, 385, 374, 363, 352, 341, 330, 319, 308, 297, 286, 275, 264,
  253, 242, 231, 220, 214.5, 209, 203.5, 198, 192.5, 187, 181.5, 176, 170.5, 165, 159.5, 154, 148.5, 143, 137.5, 132, 126.5, 121, 115.5, 110, 104.5,
  99, 93.5, 88, 82.5, 77, 71.5,
];

for (let index = 0; index < a.length; index++) {
  if (a[index] !== b[index]) {
    console.log(a[index], b[index]);
    console.log("error");
  }
}

// console.log([
//     [
//         "550,0"
//     ],
//     [
//         "550,0"
//     ],
//     [
//         "550,0"
//     ],
//     [
//         "539,0"
//     ],
//     [
//         "528,0"
//     ],
//     [
//         "517,0"
//     ],
//     [
//         "506,0"
//     ],
//     [
//         "495,0"
//     ],
//     [
//         "484,0"
//     ],
//     [
//         "473,0"
//     ],
//     [
//         "462,0"
//     ],
//     [
//         "451,0"
//     ],
//     [
//         "440,0"
//     ],
//     [
//         "429,0"
//     ],
//     [
//         "418,0"
//     ],
//     [
//         "407,0"
//     ],
//     [
//         "396,0"
//     ],
//     [
//         "385,0"
//     ],
//     [
//         "374,0"
//     ],
//     [
//         "363,0"
//     ],
//     [
//         "352,0"
//     ],
//     [
//         "341,0"
//     ],
//     [
//         "330,0"
//     ],
//     [
//         "319,0"
//     ],
//     [
//         "308,0"
//     ],
//     [
//         "297,0"
//     ],
//     [
//         "286,0"
//     ],
//     [
//         "275,0"
//     ],
//     [
//         "264,0"
//     ],
//     [
//         "253,0"
//     ],
//     [
//         "242,0"
//     ],
//     [
//         "231,0"
//     ],
//     [
//         "220,0"
//     ],
//     [
//         "214,5"
//     ],
//     [
//         "209,0"
//     ],
//     [
//         "203,5"
//     ],
//     [
//         "198,0"
//     ],
//     [
//         "192,5"
//     ],
//     [
//         "187,0"
//     ],
//     [
//         "181,5"
//     ],
//     [
//         "176,0"
//     ],
//     [
//         "170,5"
//     ],
//     [
//         "165,0"
//     ],
//     [
//         "159,5"
//     ],
//     [
//         "154,0"
//     ],
//     [
//         "148,5"
//     ],
//     [
//         "143,0"
//     ],
//     [
//         "137,5"
//     ],
//     [
//         "132,0"
//     ],
//     [
//         "126,5"
//     ],
//     [
//         "121,0"
//     ],
//     [
//         "115,5"
//     ],
//     [
//         "110,0"
//     ],
//     [
//         "104,5"
//     ],
//     [
//         "99,0"
//     ],
//     [
//         "93,5"
//     ],
//     [
//         "88,0"
//     ],
//     [
//         "82,5"
//     ],
//     [
//         "77,0"
//     ],
//     [
//         "71,5"
//     ]
// ].map(i=>Number(i[0].replace(",","."))))

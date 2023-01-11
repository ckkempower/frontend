// Library components
import { Link, useLocation } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

// styles
import "./styles.scss";

const links = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="40"
        viewBox="0 0 1174 1158"
        version="1.1"
      >
        <path
          d="M 27 578.462 L 27 1156.925 17.750 1157.255 L 8.500 1157.585 18.250 1157.792 L 28 1158 28 579 C 28 260.550, 27.775 0, 27.500 0 C 27.225 0, 27 260.308, 27 578.462 M 633 65.618 C 559.361 67.659, 479.899 76.269, 411.500 89.618 C 247.479 121.631, 148.709 185.012, 130.402 270 C 128.733 277.749, 128.596 283.271, 128.853 332.500 C 129.109 381.759, 129.304 387.232, 131.070 394.842 C 136.749 419.310, 152.152 444.232, 175.760 467.148 C 182.360 473.555, 188.939 479.569, 190.380 480.513 L 193 482.230 193 507.957 L 193 533.684 185.750 536.481 C 181.762 538.020, 174.900 541.444, 170.500 544.091 C 152.222 555.086, 141.530 565.792, 136.958 577.678 C 134.722 583.491, 134.719 583.592, 134.941 640.909 C 135.142 692.712, 135.341 699.014, 136.985 705.440 C 143.444 730.696, 157.577 753.507, 180.906 776.332 L 193 788.165 193 837.422 C 193 883.588, 193.127 887.177, 195.022 894.590 C 204.981 933.541, 235.653 970.987, 280.191 998.571 C 339.798 1035.487, 424.856 1058.326, 533 1066.451 C 635.265 1074.134, 727.679 1068.063, 814.430 1047.960 C 889.448 1030.577, 957.414 1001.716, 995 971.283 C 1021.743 949.630, 1047.262 915.793, 1057.639 888.227 L 1060 881.954 1060 800.587 L 1060 719.220 1053.143 706.829 C 1036.938 677.544, 1031.051 669.060, 1019.186 657.890 L 1010.270 649.498 1017.737 641.499 C 1033.191 624.944, 1047.042 604.239, 1055.196 585.500 L 1059.983 574.500 1059.992 492.611 L 1060 410.723 1053.324 398.611 C 1043.640 381.043, 1032.478 363.281, 1027.344 357.268 C 1024.887 354.391, 1019.529 349.268, 1015.438 345.884 L 1008 339.731 1008 279.563 L 1008 219.395 998.376 202.447 C 993.083 193.126, 985.943 181.380, 982.511 176.345 L 976.270 167.189 978.851 165.262 L 981.433 163.334 978.243 159.306 C 969.364 148.096, 948.360 131.619, 928.843 120.552 C 876.337 90.782, 801.129 72.101, 713.500 67.064 C 693.973 65.941, 649.907 65.150, 633 65.618 M 617.500 83.663 C 490.897 89.666, 380.114 108.499, 303.480 137.044 C 212.125 171.072, 159.188 217.718, 147.531 274.458 C 145.771 283.027, 145.262 298.121, 146.434 307 C 147.128 312.253, 147.527 312.853, 155.330 320.360 C 177.562 341.750, 213.673 366.511, 238.474 377.373 C 288.765 399.397, 376.122 417.382, 472 425.451 C 549.776 431.996, 594.930 429.591, 689.395 413.874 C 792.587 396.705, 876.504 372.719, 912 350.248 C 922.128 343.836, 926.972 339.632, 935.866 329.534 C 958.901 303.380, 972.407 281.630, 978.178 261.395 C 981.615 249.344, 981.276 233.281, 977.263 218 C 973.718 204.502, 968.904 191.305, 961.211 174 C 954.590 159.104, 952.305 156.624, 934 144.467 C 881.449 109.565, 803.668 89.213, 703 84.024 C 685.636 83.129, 633.407 82.908, 617.500 83.663 M 562 126.077 C 456.729 130.713, 339.004 159.493, 287.185 193.260 C 275.817 200.668, 263.782 213.117, 259.780 221.607 C 255.462 230.768, 254.797 240.875, 257.899 250.197 C 263.777 267.861, 283.330 287.298, 313.500 305.470 C 325.414 312.647, 349.856 325, 352.140 325 C 353.547 325, 433.028 296.305, 433.823 295.510 C 434.054 295.279, 432.399 292.776, 430.146 289.946 C 409.011 263.401, 419.669 239.639, 459.746 223.954 C 484.470 214.278, 527.366 206.314, 579 201.813 C 598.125 200.146, 661.146 200.139, 680 201.801 C 700.444 203.604, 716.256 205.643, 732.701 208.597 L 746.903 211.148 803.642 191.517 C 834.849 180.720, 861.020 171.528, 861.800 171.092 C 863.526 170.126, 864.488 170.532, 843.602 163.414 C 761.300 135.366, 659.015 121.804, 562 126.077 M 570 218.587 C 568.075 218.809, 562.225 219.472, 557 220.061 C 527.629 223.368, 493.537 233.497, 474.778 244.491 C 470.531 246.980, 464.048 251.825, 460.372 255.258 C 452.278 262.817, 449.014 269.075, 449.032 277 C 449.056 287.865, 454.923 295.670, 471.602 307.023 C 477.706 311.177, 482.620 315.299, 483.500 317.001 C 485.550 320.964, 485.376 325.871, 483.052 329.683 C 478.399 337.314, 459.632 348.026, 437.716 355.559 C 431.786 357.598, 427.061 359.376, 427.216 359.510 C 427.437 359.700, 543.724 345.427, 544.750 345.084 C 544.888 345.038, 545 340.950, 545 336 C 545 331.050, 545.112 326.981, 545.250 326.959 C 545.388 326.936, 554.050 325.880, 564.500 324.613 C 578.021 322.972, 583.697 322.624, 584.184 323.404 C 592.142 336.157, 597.805 344.451, 599 345.104 C 600.923 346.155, 777.188 380.146, 777.758 379.575 C 778.302 379.032, 730.094 308.001, 729.179 307.998 C 728.806 307.997, 709.858 305.972, 687.073 303.498 C 664.288 301.024, 645.500 299, 645.323 299 C 645.145 299, 645 294.908, 645 289.906 L 645 280.812 649.750 281.417 C 652.362 281.749, 675.875 284.041, 702 286.511 C 728.125 288.980, 751.638 291.268, 754.250 291.594 L 759 292.188 759.004 300.344 L 759.007 308.500 778.110 319.310 C 788.617 325.256, 797.450 329.883, 797.740 329.594 C 798.525 328.809, 795.329 312.035, 791.982 299.379 C 786.877 280.070, 781.702 269.790, 769.366 254.448 C 761.327 244.450, 753.333 235.702, 748.694 231.824 L 744.315 228.164 725.907 230.971 C 715.783 232.516, 707.213 233.609, 706.863 233.401 C 705.519 232.601, 681.992 227.028, 671.518 225.027 C 646.923 220.330, 631.581 218.897, 602 218.534 C 586.325 218.341, 571.925 218.365, 570 218.587 M 545.205 258.840 C 526.935 265.336, 525.548 280.386, 542.500 288.196 C 546.839 290.195, 549.086 290.500, 559.500 290.500 C 570.646 290.500, 571.910 290.299, 577.258 287.672 C 591.674 280.594, 591.817 267.818, 577.564 260.529 C 572.287 257.830, 570.592 257.492, 561.091 257.239 C 552.731 257.017, 549.385 257.354, 545.205 258.840 M 1008 375.660 C 1008 381.319, 1006.897 385.044, 1001.618 397.206 C 999.300 402.549, 989.931 418.581, 985.062 425.538 C 972.674 443.240, 953.534 463.223, 937.363 475.338 C 875.577 521.624, 760.034 557.229, 638.500 567.432 C 550.849 574.791, 439.750 568.775, 361.885 552.454 C 347.220 549.380, 321.057 542.898, 312.250 540.156 C 308.812 539.085, 306 538.549, 306 538.963 C 306 539.377, 313.987 543.342, 323.750 547.773 C 424.995 593.732, 516.546 617.786, 597.500 619.698 C 631.015 620.490, 663.041 617.773, 719 609.390 C 833.929 592.173, 929.900 565.325, 969.059 539.436 C 985.587 528.510, 1012.497 494.914, 1023.897 470.972 C 1035.508 446.589, 1036.394 427.515, 1027.040 403.261 C 1023.928 395.190, 1016.212 381.036, 1011.009 373.854 L 1008 369.700 1008 375.660 M 183.222 556.996 C 167.911 565.342, 156.964 575.055, 153.486 583.380 C 151.611 587.868, 151.569 597.034, 153.405 601.427 C 154.431 603.882, 154.512 605.088, 153.705 605.895 C 153.009 606.591, 152.952 607.338, 153.550 607.912 C 157.100 611.321, 226.905 649.177, 228.183 648.387 C 228.582 648.140, 226.106 644.465, 222.679 640.219 C 210.713 625.392, 201.478 608.258, 196.418 591.495 C 194.154 583.997, 193.626 580.045, 193.242 567.750 C 192.926 557.625, 192.424 553.004, 191.641 553.014 C 191.013 553.022, 187.225 554.814, 183.222 556.996 M 1003 682.286 C 1003 691.624, 1002.681 693.500, 999.970 700.072 C 984.656 737.211, 952.964 773.607, 915.704 796.850 C 866.463 827.566, 790.540 853.372, 709.500 866.940 C 660.087 875.212, 613.412 878.988, 560.500 878.992 C 466.434 879, 377.922 867.896, 312.892 847.929 C 305.673 845.713, 299.581 844.085, 299.355 844.312 C 298.202 845.465, 353.714 869.831, 383.500 881.245 C 471.546 914.987, 561.444 932.182, 628.276 928.064 C 684.140 924.621, 769.078 911.358, 834.500 895.861 C 888.471 883.077, 927.387 870.173, 955 855.906 C 969.372 848.480, 977.846 842.164, 986.743 832.249 C 1015.021 800.735, 1029.673 774.752, 1032.981 750.250 C 1034.926 735.847, 1031.633 720.296, 1022.813 702.236 C 1018.858 694.139, 1010.090 680.278, 1005.377 674.673 L 1003 671.847 1003 682.286 M 1.762 1157.707 C 3.006 1157.946, 4.806 1157.937, 5.762 1157.687 C 6.718 1157.437, 5.700 1157.241, 3.500 1157.252 C 1.300 1157.263, 0.518 1157.468, 1.762 1157.707 "
          stroke="none"
          fill="black"
          fillRule="evenodd"
        />
      </svg>
    ),
    route: "/spent",
    text: "Spent",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="40"
        viewBox="0 0 1232 1144"
        version="1.1"
      >
        <path
          d="M 430.500 106.235 C 376.600 128.845, 332.356 147.448, 332.180 147.575 C 331.044 148.399, 280.488 264.565, 281.150 264.829 C 282.789 265.483, 426.528 241.746, 427.646 240.637 C 428.789 239.503, 530 66.255, 530 65.433 C 530 65.195, 529.663 65.029, 529.250 65.064 C 528.837 65.099, 484.400 83.626, 430.500 106.235 M 839.065 77.155 C 843.897 86.315, 933.317 247.661, 933.898 248.266 C 934.657 249.058, 1068.264 282.951, 1068.802 282.488 C 1068.968 282.346, 1055.693 250.139, 1039.301 210.918 L 1009.497 139.607 925.499 107.824 C 879.299 90.343, 840.674 75.764, 839.664 75.426 C 838.021 74.875, 837.958 75.056, 839.065 77.155 M 231.168 281.250 C 223.286 337.488, 214.483 400.261, 211.607 420.747 C 207.010 453.483, 206.586 457.843, 208.108 456.747 C 212.400 453.655, 407.967 273.489, 407.277 273.263 C 406.850 273.124, 375.035 278.630, 336.578 285.500 C 298.121 292.369, 266.463 297.796, 266.226 297.560 C 265.989 297.323, 261.454 270.551, 256.148 238.066 C 250.842 205.581, 246.275 179.002, 246 179.002 C 245.725 179.001, 239.051 225.013, 231.168 281.250 M 1096.736 197.500 C 1096.378 198.600, 1090.646 226.950, 1083.997 260.500 C 1077.349 294.050, 1071.592 322.447, 1071.204 323.604 C 1070.542 325.583, 1069.509 325.159, 1053.841 316.487 L 1037.181 307.267 991.452 298.605 C 966.301 293.842, 945.607 290.069, 945.464 290.222 C 945.322 290.375, 983.522 329.696, 1030.353 377.602 C 1103.276 452.199, 1115.599 464.402, 1116.187 462.602 C 1116.565 461.446, 1119.639 439.350, 1123.018 413.500 L 1129.162 366.500 1113.574 282.500 C 1105.001 236.300, 1097.851 197.825, 1097.686 197 C 1097.470 195.920, 1097.204 196.060, 1096.736 197.500 M 637 389 L 637 475 551.058 475 L 465.116 475 465.308 509.750 L 465.500 544.500 551.250 544.756 L 637 545.011 637 630.506 L 637 716 672 716 L 707 716 707 630.506 L 707 545.011 792.750 544.756 L 878.500 544.500 878.763 509.750 L 879.026 475 793.013 475 L 707 475 707 389 L 707 303 672 303 L 637 303 637 389 M 279.495 419.994 L 238.500 460.987 233.969 484.244 L 229.437 507.500 187.521 457.093 C 164.467 429.369, 145.473 407.094, 145.312 407.593 C 145.152 408.092, 150.631 434.785, 157.488 466.910 L 169.956 525.320 189.094 554.410 C 199.619 570.410, 216.391 595.966, 226.365 611.202 C 236.339 626.438, 244.876 638.800, 245.336 638.674 C 245.795 638.547, 256.690 614.413, 269.547 585.043 L 292.922 531.643 306.466 457.071 C 313.916 416.057, 320.191 381.712, 320.412 380.750 C 320.632 379.788, 320.740 379, 320.652 379 C 320.563 379, 302.043 397.447, 279.495 419.994 M 1030.361 410.750 C 1030.634 411.712, 1037.242 442.425, 1045.046 479 L 1059.236 545.500 1082.720 598 C 1095.636 626.875, 1106.305 650.609, 1106.428 650.742 C 1106.739 651.080, 1186.317 550.059, 1187.297 548.081 C 1188.567 545.520, 1214.724 428.920, 1213.961 429.225 C 1213.583 429.376, 1189.527 451.212, 1160.505 477.750 C 1131.483 504.288, 1107.434 526, 1107.064 526 C 1106.693 526, 1102.404 513.158, 1097.532 497.462 L 1088.674 468.923 1059.732 438.962 C 1043.814 422.483, 1030.582 409, 1030.327 409 C 1030.073 409, 1030.088 409.788, 1030.361 410.750 M 309.645 519 C 309.339 520.375, 306.112 556.369, 302.474 598.986 C 298.837 641.604, 295.780 676.542, 295.680 676.626 C 295.581 676.710, 261.569 663.547, 220.098 647.375 C 178.627 631.203, 144.558 618.109, 144.390 618.277 C 144.222 618.445, 172.797 650.890, 207.891 690.377 L 271.698 762.171 347.506 804.095 C 389.200 827.154, 423.533 845.800, 423.802 845.531 C 424.207 845.127, 321.695 547.760, 312.960 524 C 310.664 517.755, 310.109 516.918, 309.645 519 M 987.722 699.217 C 956.580 780.186, 931.211 846.544, 931.345 846.678 C 931.479 846.813, 966.894 827.275, 1010.045 803.261 L 1088.501 759.599 1140.500 699.742 C 1169.100 666.820, 1193.132 638.988, 1193.905 637.893 C 1195.584 635.512, 1203.558 632.588, 1124 663.528 C 1091.825 676.041, 1064.795 686.471, 1063.934 686.708 C 1062.583 687.078, 1061.218 677.905, 1053.949 619.568 C 1049.319 582.406, 1045.263 552, 1044.937 552 C 1044.610 552, 1018.864 618.248, 987.722 699.217 M 523.891 840.177 C 492.600 858.911, 477.705 867.298, 475.942 867.175 C 474.535 867.077, 438.563 861.581, 396.003 854.962 C 353.444 848.342, 318.068 843.055, 317.391 843.213 C 316.418 843.440, 384.337 896.339, 468.991 961.289 L 477.840 968.079 538.645 925.345 C 572.087 901.841, 600.136 882.586, 600.975 882.555 C 601.814 882.525, 610.030 886.735, 619.233 891.912 L 635.967 901.323 589.662 929.105 L 543.358 956.888 510.737 1008.694 C 492.796 1037.187, 478.653 1060.615, 479.309 1060.755 C 479.964 1060.895, 505.430 1055.045, 535.901 1047.755 L 591.302 1034.500 606.677 1001.468 L 622.053 968.435 652.776 937.728 L 683.500 907.021 714.658 937.761 L 745.817 968.500 761.040 1001.544 L 776.264 1034.587 832.204 1047.888 C 862.971 1055.204, 888.379 1060.954, 888.667 1060.666 C 888.955 1060.379, 874.635 1036.992, 856.845 1008.697 L 824.500 957.250 778.250 929.483 C 752.813 914.212, 732 901.581, 732 901.415 C 732 901.249, 739.720 896.748, 749.155 891.413 C 764.611 882.672, 766.517 881.841, 768.405 883.013 C 769.557 883.728, 797.050 902.979, 829.500 925.792 C 861.950 948.606, 888.950 967.323, 889.500 967.386 C 890.050 967.449, 926.688 939.600, 970.918 905.500 C 1023.279 865.131, 1050.667 843.419, 1049.418 843.269 C 1048.363 843.142, 1012.001 848.583, 968.613 855.360 L 889.726 867.682 844.613 840.706 C 819.801 825.869, 798.810 813.538, 797.967 813.305 C 797.123 813.071, 771.317 822.582, 740.621 834.440 C 709.924 846.298, 684.289 855.997, 683.654 855.994 C 683.019 855.990, 657.530 846.315, 627.011 834.494 C 596.492 822.672, 571.018 813, 570.402 813 C 569.786 813, 548.856 825.229, 523.891 840.177 M 1.762 1143.707 C 3.006 1143.946, 4.806 1143.937, 5.762 1143.687 C 6.718 1143.437, 5.700 1143.241, 3.500 1143.252 C 1.300 1143.263, 0.518 1143.468, 1.762 1143.707 M 13.784 1143.738 C 16.689 1143.941, 21.189 1143.939, 23.784 1143.734 C 26.378 1143.528, 24 1143.363, 18.500 1143.365 C 13 1143.368, 10.878 1143.536, 13.784 1143.738 "
          stroke="none"
          fill="black"
          fillRule="evenodd"
        />
      </svg>
    ),
    route: "/add",
    text: "",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="40"
        viewBox="0 0 1344 1230"
        version="1.1"
      >
        <path
          d="M 183.561 130.086 C 181.456 136.007, 172.761 172.918, 171.097 183 C 159.367 254.050, 165.830 332.364, 189.052 400.570 C 201.003 435.673, 215.626 465.341, 236.581 497 C 266.843 542.720, 301.002 576.254, 345.711 604.132 C 373.690 621.578, 401.376 635.412, 434.500 648.497 C 443.850 652.190, 453.075 656.397, 455 657.846 C 456.925 659.294, 466.825 667.427, 477 675.917 C 530.077 720.209, 570.046 758.463, 587.318 781.500 C 595.614 792.564, 604.724 812.008, 612.403 835.036 C 618.173 852.341, 628 888.406, 628 892.280 C 628 893.200, 625.133 894.750, 620.250 896.470 C 608.472 900.618, 601.368 904.697, 599.947 908.127 C 598.728 911.071, 599.073 921.718, 600.502 925.244 C 601.170 926.891, 597.040 927.001, 525.387 927.244 L 449.566 927.500 419.849 996.500 L 390.132 1065.500 368.066 1065.769 L 346 1066.038 346 1081.020 L 346 1096.003 708.750 1095.751 L 1071.500 1095.500 1071.777 1080.750 L 1072.053 1066 1052.277 1065.973 L 1032.500 1065.947 1002.806 996.723 L 973.112 927.500 904.949 927.243 L 836.787 926.986 837.525 924.243 C 840.911 911.662, 839.831 907.658, 832 903.768 C 828.975 902.265, 820.425 899.396, 813 897.392 C 805.575 895.388, 799.400 893.668, 799.278 893.569 C 798.772 893.159, 803.170 876.432, 806.564 865.858 C 816.232 835.740, 830.880 806.626, 847.426 784.642 C 857.326 771.487, 874.734 752.217, 898.141 728.500 C 920.291 706.057, 921.006 705.442, 927.670 703.092 C 950.041 695.206, 988.612 677.458, 1012.460 664.079 C 1056.334 639.463, 1093.574 610.021, 1119.979 579.073 C 1164.686 526.675, 1196.105 467.233, 1214.916 399.461 C 1228.130 351.854, 1234.661 291.910, 1232.100 241.750 C 1230.179 204.129, 1227.313 184.185, 1218.880 149.750 L 1213.798 129 1057.899 129 C 940.048 129, 902 129.284, 902 130.163 C 902 131.045, 865.205 131.167, 749.750 130.666 C 307.560 128.749, 184.081 128.622, 183.561 130.086 M 254.219 218.750 C 252.930 221.888, 253.405 284.736, 254.803 296 C 262.441 357.563, 280.109 406.077, 311.797 452.496 C 327.117 474.939, 341.644 491.523, 358 505.240 C 369.018 514.481, 386.212 527, 387.887 527 C 388.559 527, 388.834 526.064, 388.549 524.750 C 387.852 521.548, 386.147 499.485, 385.014 479 C 382.791 438.819, 381.757 384.510, 381.668 303.250 L 381.574 217 318.256 217 C 258.893 217, 254.892 217.109, 254.219 218.750 M 1040.101 312.250 C 1040.118 437.565, 1037.922 502.199, 1032.347 540.500 L 1031.764 544.500 1041.468 535 C 1063.900 513.038, 1085.539 482.409, 1102.932 448 C 1124.354 405.622, 1136.277 365.093, 1142.648 313 C 1144.604 297.012, 1145.239 242.204, 1143.660 225.750 L 1142.820 217 1091.455 217 L 1040.089 217 1040.101 312.250 M 721 227 C 679.312 230.197, 639.155 244.859, 598.743 271.639 C 551.671 302.832, 521.731 338.541, 507.972 379.901 C 501.924 398.078, 500.546 407.408, 500.573 430 C 500.597 450.633, 501.584 458.483, 506.562 477.641 C 514.663 508.822, 535.844 549.285, 559.165 578.136 L 566.368 587.047 569.934 583.717 C 572.744 581.092, 603.800 551.675, 620.417 535.897 L 623.334 533.127 620.622 524.613 C 615.082 507.221, 613.619 497.167, 613.623 476.500 C 613.626 459.050, 613.845 456.690, 616.301 447.571 C 626.279 410.529, 651.299 386.973, 697.636 370.995 C 704.138 368.753, 715.092 365.712, 721.979 364.236 C 733.595 361.747, 736.235 361.553, 758.500 361.556 C 779.577 361.558, 783.738 361.829, 792.664 363.781 C 806.228 366.746, 819.507 371.165, 830.498 376.372 L 839.531 380.651 877.516 346.290 C 898.407 327.391, 916.387 311.045, 917.470 309.966 C 919.430 308.014, 919.408 307.970, 913.470 301.910 C 892.271 280.274, 853.369 255.370, 821 242.712 C 788.930 230.172, 753.083 224.539, 721 227 M 730.176 382.074 C 689.265 387.384, 651.227 416.255, 638.711 451.500 C 629.770 476.675, 634.028 502.220, 651.077 525.685 C 658.744 536.238, 661.182 541.808, 661.778 550.135 C 662.750 563.725, 655.344 578.623, 640.386 593.170 C 631.736 601.582, 628.509 604.320, 622.518 608.333 C 619.864 610.110, 619.140 611, 620.348 611 C 621.345 611, 641.250 605.967, 664.581 599.815 L 707 588.630 707 573.527 L 707 558.425 720.750 555.066 C 728.313 553.219, 734.983 551.530, 735.573 551.314 C 736.204 551.083, 738.845 558.462, 741.978 569.211 C 744.910 579.270, 747.587 587.826, 747.928 588.223 C 748.769 589.206, 883.308 645.079, 884.056 644.756 C 884.796 644.436, 848.559 530.135, 847.368 529.033 C 846.891 528.592, 832.212 524.952, 814.750 520.944 L 783 513.658 783 498.829 C 783 490.673, 783.337 483.988, 783.750 483.972 C 784.163 483.957, 803.737 487.893, 827.250 492.719 L 870 501.494 870.029 514.997 L 870.059 528.500 884.687 546.259 C 892.733 556.027, 899.442 563.891, 899.597 563.737 C 900.098 563.235, 897.032 529.961, 894.921 513 C 890.823 480.074, 886.167 461.694, 874.275 431.500 C 871.242 423.800, 866.581 413.152, 863.916 407.839 L 859.071 398.178 845.063 402.619 L 831.055 407.060 827.224 404.642 C 800.197 387.580, 759.920 378.214, 730.176 382.074 M 706 432.935 C 692.843 436.952, 684.925 447.456, 684.883 460.950 C 684.847 472.291, 690.581 481.976, 700.500 487.328 C 706.358 490.488, 720.712 490.438, 726.723 487.236 C 740.608 479.840, 746.394 463.377, 740.082 449.221 C 734.475 436.645, 718.638 429.077, 706 432.935 M 1.762 1229.707 C 3.006 1229.946, 4.806 1229.937, 5.762 1229.687 C 6.718 1229.437, 5.700 1229.241, 3.500 1229.252 C 1.300 1229.263, 0.518 1229.468, 1.762 1229.707 M 13.784 1229.738 C 16.689 1229.941, 21.189 1229.939, 23.784 1229.734 C 26.378 1229.528, 24 1229.363, 18.500 1229.365 C 13 1229.368, 10.878 1229.536, 13.784 1229.738 "
          stroke="none"
          fill="black"
          fillRule="evenodd"
        />
      </svg>
    ),
    route: "/ranks",
    text: "Ranks",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="40"
        viewBox="0 0 1036 1172"
        version="1.1"
      >
        <path
          d="M 477 121.713 L 425.500 140.260 380.155 171.312 C 338.958 199.524, 334.094 203.149, 326.987 210.932 C 322.685 215.645, 297.067 244.250, 270.058 274.500 L 220.951 329.500 186.975 396.860 L 153 464.221 153 498.371 L 153 532.522 181.695 552.511 C 197.477 563.505, 210.761 572.653, 211.214 572.840 C 211.668 573.027, 211.507 572.012, 210.857 570.586 C 210.207 569.159, 209.861 567.813, 210.088 567.595 C 210.314 567.378, 215.225 565.090, 221 562.513 C 226.775 559.935, 231.835 557.507, 232.244 557.119 C 232.653 556.730, 229.861 547.055, 226.040 535.618 L 219.091 514.825 228.589 484.162 C 233.813 467.298, 238.792 451.323, 239.653 448.662 C 240.932 444.711, 245.621 438.885, 265.207 416.912 C 278.401 402.110, 289.490 390, 289.851 390 C 290.212 390, 293.037 404.288, 296.129 421.750 L 301.751 453.500 295.681 491.722 C 292.342 512.744, 289.849 530.182, 290.140 530.473 C 290.841 531.174, 335.979 510.731, 335.991 509.708 C 335.996 509.272, 332.190 499.699, 327.533 488.434 L 319.065 467.953 331.050 432.727 C 342.082 400.297, 343.330 397.213, 346.767 393.881 C 372.329 369.099, 399.438 343.827, 399.666 344.567 C 399.825 345.080, 403.319 359.743, 407.431 377.151 L 414.908 408.802 409.417 443.530 C 406.396 462.631, 404.150 478.483, 404.425 478.758 C 405.320 479.654, 446.091 460.678, 445.645 459.573 C 445.407 458.983, 441.081 447.834, 436.031 434.798 L 426.850 411.096 438.501 375.798 L 450.151 340.500 476.797 313.772 C 491.452 299.071, 503.742 287.371, 504.106 287.772 C 504.471 288.172, 507.799 302.675, 511.501 320 L 518.233 351.500 511.733 392.500 C 508.157 415.050, 505.292 433.560, 505.366 433.634 C 505.513 433.780, 556.244 410.839, 556.916 410.322 C 557.144 410.146, 554.384 398.496, 550.782 384.433 L 544.234 358.865 559.867 323.948 L 575.500 289.032 604.872 264.471 C 621.026 250.962, 634.476 240.143, 634.760 240.427 C 635.044 240.711, 636.776 255.835, 638.608 274.037 L 641.939 307.131 632.917 340.816 C 627.954 359.342, 623.506 375.954, 623.033 377.731 L 622.172 380.963 624.836 379.630 C 626.301 378.897, 642.800 371.404, 661.500 362.979 C 680.200 354.554, 695.660 347.540, 695.856 347.391 C 696.052 347.243, 691.595 338.134, 685.952 327.148 L 675.693 307.175 686.508 273.681 L 697.324 240.188 725.241 214.473 C 740.596 200.330, 753.529 189.151, 753.982 189.629 C 754.436 190.108, 758.979 203.775, 764.078 220 L 773.350 249.500 769.304 282.500 C 767.078 300.650, 765.320 315.583, 765.397 315.685 C 765.567 315.911, 821.976 290.446, 823.817 289.312 C 824.841 288.681, 823.562 284.452, 818.067 270.304 C 814.180 260.296, 811 251.639, 811 251.066 C 811 250.493, 814.834 241.391, 819.520 230.839 L 828.040 211.654 827.770 191.219 L 827.500 170.784 783 155.519 L 738.500 140.255 723 131.135 L 707.500 122.015 670.500 122.001 L 633.500 121.987 583 113.008 C 555.225 108.069, 531.600 103.835, 530.500 103.597 C 529.400 103.360, 505.325 111.512, 477 121.713 M 794.729 352.751 C 769.149 364.365, 758.111 369.846, 758.462 370.761 C 758.739 371.483, 767.411 382.497, 777.733 395.234 C 788.055 407.972, 796.500 418.606, 796.500 418.865 C 796.500 419.124, 786.150 423.586, 773.500 428.781 L 750.500 438.226 718.500 435.005 C 700.900 433.234, 686.219 431.495, 685.876 431.142 C 685.533 430.789, 683.325 425.047, 680.970 418.382 L 676.688 406.264 658.094 414.716 C 647.867 419.364, 638.938 423.403, 638.250 423.691 C 637.563 423.979, 637 424.450, 637 424.738 C 637 425.027, 645.212 436.750, 655.250 450.789 C 665.288 464.829, 673.826 476.860, 674.226 477.525 C 675.072 478.936, 628.723 496, 624.046 496 C 620.656 496, 564.523 487.215, 561.103 486.149 C 559.065 485.514, 558.227 483.761, 555.508 474.451 C 553.749 468.428, 551.900 463.500, 551.398 463.500 C 549.874 463.500, 515.012 479.453, 515.006 480.153 C 515.003 480.512, 519.768 483.494, 525.597 486.779 L 536.193 492.751 554.599 524.125 C 572.850 555.236, 572.982 555.503, 570.252 555.827 C 568.739 556.007, 555.350 557.435, 540.500 559.001 L 513.500 561.847 475.430 548.835 L 437.360 535.823 436.104 528.162 C 433.901 514.721, 435.373 515.546, 423.357 521.020 C 417.589 523.647, 412.708 525.959, 412.510 526.157 C 412.311 526.356, 416.914 529.246, 422.737 532.581 L 433.325 538.644 451.628 569.867 C 462.799 588.924, 469.457 601.238, 468.715 601.469 C 468.047 601.678, 454.413 603.097, 438.418 604.621 L 409.335 607.392 374.918 595.559 C 355.988 589.051, 339.110 583.166, 337.412 582.482 C 334.520 581.317, 334.240 580.736, 333.019 573.369 C 332.301 569.041, 331.437 564.962, 331.098 564.305 C 330.663 563.461, 327.839 564.297, 321.491 567.147 C 316.546 569.367, 312.143 571.521, 311.706 571.935 C 311.270 572.349, 316.253 577.465, 322.780 583.303 L 334.648 593.919 344.389 626.562 C 349.746 644.515, 353.946 659.387, 353.722 659.611 C 353.499 659.835, 340.901 659.328, 325.727 658.486 L 298.139 656.954 279.941 646.439 C 269.932 640.655, 261.654 636.053, 261.545 636.212 C 261.436 636.370, 272.027 663.649, 285.080 696.832 L 308.812 757.164 264.906 866.176 C 240.758 926.133, 221 975.546, 221 975.982 C 221 976.419, 263.862 987.405, 316.250 1000.397 L 411.500 1024.019 458.190 1030.676 L 504.881 1037.333 548.587 1030.686 C 572.626 1027.031, 592.393 1023.918, 592.515 1023.770 C 593.889 1022.092, 679.847 873.514, 679.591 873.258 C 679.399 873.066, 668.950 871.804, 656.371 870.455 C 599.293 864.330, 555.873 857.976, 543.918 854 C 530.248 849.452, 514.706 837.522, 505.523 824.525 C 497.813 813.613, 497.295 814.997, 511.484 808.605 C 518.327 805.522, 524.280 803.001, 524.713 803.002 C 525.146 803.003, 526.768 805.010, 528.317 807.463 C 532.147 813.525, 540.854 821.292, 547.421 824.505 C 558.924 830.133, 602.947 836.531, 691.500 845.445 C 765.781 852.923, 781.145 854, 813.508 854 L 844.592 854 859.802 792.250 L 875.012 730.500 868 685.590 C 864.143 660.889, 861.103 640.592, 861.244 640.485 C 861.595 640.219, 910.840 627.267, 914.180 626.562 C 920.461 625.237, 921.507 620.047, 917.720 609 C 916.494 605.425, 902.478 578.200, 886.574 548.500 C 870.670 518.800, 857.704 493.741, 857.761 492.814 C 857.819 491.887, 861.724 472.762, 866.438 450.314 L 875.011 409.500 868.005 380.633 C 864.152 364.756, 861 351.527, 861 351.235 C 861 350.944, 856.768 351.002, 851.595 351.366 L 842.191 352.027 837.568 344.013 C 835.026 339.606, 832.621 336.012, 832.223 336.027 C 831.825 336.042, 814.953 343.568, 794.729 352.751 M 1.762 1171.707 C 3.006 1171.946, 4.806 1171.937, 5.762 1171.687 C 6.718 1171.437, 5.700 1171.241, 3.500 1171.252 C 1.300 1171.263, 0.518 1171.468, 1.762 1171.707 M 13.784 1171.738 C 16.689 1171.941, 21.189 1171.939, 23.784 1171.734 C 26.378 1171.528, 24 1171.363, 18.500 1171.365 C 13 1171.368, 10.878 1171.536, 13.784 1171.738 "
          stroke="none"
          fill="black"
          fillRule="evenodd"
        />
      </svg>
    ),
    route: "/plebeian",
    text: "Plebeian",
  },
];

const Footer = () => {
  const { isAuthenticate, redirectToLogin } = useAuthentication();
  const { pathname } = useLocation();
  return (
    <div className="footer">
      <footer>
        <nav className="footer-nav">
          <Link to={"/"}>
            <div
              className={
                pathname === "/" ? "active footer-icon" : `footer-icon`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="40"
                viewBox="0 0 1176 1242"
                version="1.1"
              >
                <path
                  d="M 672.232 87.146 C 663.641 88.377, 650.184 93.039, 643.450 97.116 C 640.376 98.977, 631.031 105.631, 622.685 111.903 C 595.080 132.644, 577.677 138.721, 539.162 141.065 C 505.560 143.110, 468.833 138.718, 429.602 127.961 C 421.710 125.797, 402.226 119.569, 386.304 114.121 C 345.053 100.006, 341.489 99.507, 337.928 107.350 C 332.560 119.174, 337.769 138.121, 357.586 178.856 C 383.713 232.559, 395.467 249.140, 423.931 272.442 C 430.844 278.101, 439.481 285.840, 443.124 289.638 C 454.493 301.492, 464.374 318.332, 473.259 341 C 480.150 358.582, 480.159 357, 473.173 357 C 465.853 357, 455.726 360.080, 450.877 363.780 C 441.848 370.671, 438.054 378.141, 438.022 389.090 C 438.003 395.590, 438.442 397.565, 441.076 402.835 C 446.506 413.702, 456.730 419.998, 470.250 420.798 C 474.512 421.050, 477.994 421.537, 477.987 421.878 C 477.961 423.172, 454.360 451.829, 423.942 487.500 C 388.917 528.574, 366.154 555.979, 345.866 581.500 C 253.300 697.939, 194.993 797.773, 172.113 879 C 163.951 907.977, 161.020 926.373, 160.324 953 C 159.532 983.314, 162.520 1002.598, 171.843 1027.330 C 190.284 1076.250, 228.134 1107.400, 286.260 1121.492 C 314.882 1128.432, 341.613 1130.991, 385.500 1130.994 C 417.608 1130.996, 432.858 1130.298, 494.500 1126.008 C 517.600 1124.400, 546.400 1122.559, 558.500 1121.915 C 588.451 1120.323, 642.840 1121.258, 672.500 1123.876 C 685.150 1124.993, 710.800 1127.271, 729.500 1128.939 C 841.610 1138.937, 898.286 1139.336, 950.599 1130.494 C 1034.792 1116.265, 1082.573 1076.451, 1096.087 1009.265 C 1098.834 995.612, 1099.789 966.911, 1098.038 950.694 C 1093.354 907.332, 1078.541 862.027, 1050.564 805.500 C 1005.397 714.239, 932.954 612.341, 821.723 483.611 C 810.845 471.022, 802.108 460.559, 802.307 460.360 C 802.506 460.161, 820.140 462.698, 841.493 465.999 C 862.847 469.300, 880.359 472.001, 880.409 472.001 C 880.459 472.002, 880.518 475.265, 880.539 479.251 C 880.601 490.770, 886.214 499.011, 897.907 504.753 C 903.037 507.272, 904.453 507.498, 915 507.474 C 928.379 507.443, 932.871 505.926, 940.554 498.843 C 949.362 490.725, 950.829 484.240, 948.099 465.500 C 944.148 438.375, 932.954 416.687, 913.128 397.744 C 908.698 393.513, 902.808 388.422, 900.037 386.431 C 897.267 384.441, 895 382.593, 895 382.324 C 895 381.039, 921.667 352.860, 925.464 350.133 C 930.517 346.505, 935.562 339.333, 937.124 333.559 C 937.728 331.327, 938.017 326.285, 937.768 322.356 C 937.217 313.689, 934.437 308.376, 926.911 301.610 C 910.435 286.796, 881.501 291.930, 871.269 311.483 C 870.410 313.123, 867.274 317.187, 864.298 320.514 L 858.889 326.561 851.195 322.761 C 830.326 312.454, 807.663 314.374, 789.646 327.977 C 785.606 331.028, 776.196 341.464, 775.538 343.625 C 775.437 343.955, 755.797 341.131, 755.395 340.728 C 754.735 340.068, 765.946 325.094, 775.032 314.500 C 797.885 287.855, 824.879 265.728, 873 234.195 C 915.840 206.123, 924.151 200.007, 933.857 189.414 C 943.777 178.589, 947.971 167.393, 946 157.001 C 944.615 149.698, 942.393 146.062, 938.257 144.334 C 933.612 142.393, 929.834 142.933, 909 148.514 C 887.227 154.347, 875.920 156.216, 862 156.282 C 848.143 156.347, 838.889 154.870, 825.204 150.410 C 801.893 142.811, 787.982 134.300, 767.885 115.343 C 753.858 102.112, 747.498 97.584, 736.957 93.327 C 721.786 87.199, 691.818 84.337, 672.232 87.146 M 603.500 503.625 C 542.847 509.833, 490.625 530.700, 445.225 566.870 C 398.109 604.405, 362.473 658.032, 345.530 716.894 C 336.520 748.198, 333.581 770.027, 333.598 805.500 C 333.613 834.414, 334.680 845.872, 339.590 869.797 C 359.230 965.499, 423.550 1045.516, 511.368 1083.497 C 582.855 1114.416, 666.587 1115.817, 738.984 1087.307 C 833.045 1050.266, 901.745 966.307, 920.887 865 C 925.923 838.351, 927.660 800.443, 925.034 774.500 C 917.736 702.379, 887.953 638.312, 838.782 588.959 C 794.225 544.238, 737.673 515.728, 674.004 505.889 C 663.432 504.256, 654.746 503.739, 634 503.509 C 619.425 503.348, 605.700 503.400, 603.500 503.625 M 616.500 567.640 C 589.507 570.498, 561.016 579.020, 534.691 592.112 C 517.380 600.721, 513.852 602.941, 514.424 604.863 C 514.810 606.161, 530.408 662.344, 532.646 670.500 C 532.948 671.600, 522.158 661.510, 508.668 648.078 L 484.140 623.656 480.320 626.516 C 465.059 637.942, 442.222 660.320, 430.843 675 C 417.914 691.680, 406.792 711.026, 400.017 728.618 L 397.186 735.972 406.909 742.343 C 412.256 745.847, 426.840 755.348, 439.316 763.457 C 451.792 771.566, 462 778.505, 462 778.877 C 462 779.249, 460.313 779.411, 458.250 779.237 C 456.188 779.064, 439.875 777.638, 422 776.068 C 404.125 774.499, 389.318 773.386, 389.096 773.595 C 387.633 774.971, 386.913 798.211, 387.907 812 C 391.139 856.862, 408.611 905.456, 437.271 949.288 C 446.500 963.403, 456.875 977.231, 457.917 976.805 C 458.326 976.637, 471.959 962.810, 488.212 946.077 L 517.763 915.653 515.346 908.577 C 508.846 889.546, 505.423 860.683, 507.131 839.313 C 510.728 794.292, 532.306 762.278, 573 741.585 C 604.727 725.452, 632.365 719.162, 666.465 720.315 C 692.554 721.197, 711.269 725.753, 733.842 736.716 L 745.185 742.225 749.294 738.363 C 751.554 736.238, 770.681 717.625, 791.799 697 L 830.194 659.500 816.298 645.945 C 782.317 612.799, 739.965 587.570, 698.094 575.530 C 678.061 569.771, 664.105 567.806, 641 567.494 C 629.725 567.342, 618.700 567.407, 616.500 567.640 M 624.500 746.921 C 601.056 751.831, 582.298 762.007, 563.711 779.899 C 545.144 797.773, 533.605 818.737, 529.989 841.165 C 528.277 851.785, 529.183 871.357, 531.847 881.284 C 534.528 891.277, 540.320 903.601, 546.959 913.439 C 556.266 927.231, 557.473 930.742, 557.468 944 C 557.464 953.411, 557.062 956.573, 555.252 961.408 C 549.219 977.525, 534.421 995.377, 513.981 1011.194 L 510.500 1013.888 514 1012.939 C 515.925 1012.417, 537.300 1006.239, 561.500 999.209 L 605.500 986.429 605.772 968.880 L 606.045 951.331 621.568 947.045 C 630.106 944.687, 637.222 942.925, 637.381 943.129 C 637.541 943.333, 640.107 952.679, 643.085 963.897 C 646.063 975.115, 648.950 984.898, 649.500 985.637 C 650.632 987.157, 792.987 1052.346, 793.674 1051.659 C 793.919 1051.415, 785.378 1020.904, 774.696 983.857 L 755.273 916.500 738.887 912.315 C 729.874 910.014, 714.288 906.012, 704.250 903.423 L 686 898.716 686 881.917 C 686 872.678, 686.337 864.930, 686.750 864.699 C 687.382 864.346, 720.355 871.615, 767.750 882.556 L 779 885.153 779 900.918 L 779 916.683 793.114 935.591 C 800.876 945.991, 807.898 955.175, 808.717 956 C 810.037 957.329, 810.132 956.361, 809.549 947.500 C 807.385 914.621, 802.723 875.359, 798.507 854.500 C 793.679 830.609, 770.282 765, 766.591 765 C 765.973 765, 759.208 767.241, 751.558 769.979 L 737.648 774.958 730.574 770.401 C 715.868 760.926, 694.666 752.141, 676.262 747.898 C 663.189 744.884, 636.624 744.383, 624.500 746.921 M 604.672 806.378 C 586.205 811.552, 577.766 832.980, 587.591 849.745 C 590.290 854.351, 596.835 859.653, 602.316 861.674 C 607.627 863.632, 618.865 863.243, 624 860.923 C 634.354 856.246, 640.083 847.653, 640.795 835.734 C 641.225 828.529, 641.026 827.495, 638.037 821.423 C 631.863 808.882, 618.017 802.639, 604.672 806.378 M 1.762 1241.707 C 3.006 1241.946, 4.806 1241.937, 5.762 1241.687 C 6.718 1241.437, 5.700 1241.241, 3.500 1241.252 C 1.300 1241.263, 0.518 1241.468, 1.762 1241.707 M 13.784 1241.738 C 16.689 1241.941, 21.189 1241.939, 23.784 1241.734 C 26.378 1241.528, 24 1241.363, 18.500 1241.365 C 13 1241.368, 10.878 1241.536, 13.784 1241.738 "
                  stroke="none"
                  fill="black"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <p>{"Earn"}</p>
          </Link>
          {links.map((link, index) => (
            <Link
              to={isAuthenticate ? link.route : redirectToLogin}
              key={index}
            >
              {/* <img
                src={require(`../../assets/icons/${link.icon}`)}
                alt=""
                className={
                  pathname === link?.route
                    ? `active footer-icon ${!link.text ? "midd-icon" : ""}`
                    : `footer-icon ${!link.text ? "midd-icon" : ""}`
                }
              /> */}
              <div
                className={
                  pathname === link?.route
                    ? `active footer-icon ${!link.text ? "midd-icon" : ""}`
                    : `footer-icon ${!link.text ? "midd-icon" : ""}`
                }
              >
                {link.icon}
              </div>
              <p>{link.text}</p>
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default Footer;

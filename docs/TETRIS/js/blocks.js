const BLOCKS = {
    square: [
        [
            [0,0],[0,1],[1,0],[1,1],
        ],
        [
            [0,0],[0,1],[1,0],[1,1],
        ],
        [
            [0,0],[0,1],[1,0],[1,1],
        ],
        [
            [0,0],[0,1],[1,0],[1,1],
        ],
    ],
    bar: [
        [
            [1,0],[2,0],[3,0],[4,0],
        ],
        [
            [2,-1],[2,0],[2,1],[2,2],
        ],
        [
            [1,0],[2,0],[3,0],[4,0],
        ],
        [
            [2,-1],[2,0],[2,1],[2,2],
        ],
    ],
    tree: [
        [[2,1],[0,1],[1,0],[1,1],],
        [[1,2],[0,1],[1,0],[1,1],],
        [[1,2],[0,1],[2,1],[1,1],],
        [[2,1],[1,2],[1,0],[1,1],],
    ], // ㅗ 모양 블럭
    zee: [
        [
            [0,0],[1,0],[1,1],[2,1],
        ],
        [
            [0,1],[1,0],[1,1],[0,2],
        ],
        [
            [0,1],[1,1],[1,2],[2,2],
        ],
        [
            [2,0],[2,1],[1,1],[1,2],
        ],
    ],
    elLeft: [
        [
            [0,0],[0,1],[1,1],[2,1],
        ],
        [
            [1,0],[1,1],[1,2],[0,2],
        ],
        [
            [0,1],[1,1],[2,1],[2,2],
        ],
        [
            [1,0],[2,0],[1,1],[1,2],
        ],
    ],
    elRight: [
        [
            [0,0],[1,0],[1,1],[1,2], // ㄱ
        ],
        [
            [2,0],[0,1],[1,1],[2,1], // ㅢ
        ],
        [
            [2,2],[1,0],[1,1],[1,2], // L
        ],
        [
            [0,1],[1,1],[2,1],[0,2], // ㅣㅡ
        ],
    ],

    
};

export default BLOCKS;


const OBJECT_TYPES = ['environment','light','label','tree','stairs','link','gate'];


const BLOCK_SIZE=5;
//var BLOCK_SIZE_VERTICAL=10;
//var BLOCK_SIZE_DOOR=2;

const RESPAWN_VERTICAL = -30;
const EYE_VERTICAL = 2.5;
const LIGHT_VERTICAL = 3;

const SPEED = 7;
const SPEED_INERTIA = 0.5;
const SPEED_ROTATION = Math.PI/2;




var BLOCK_SHAPES = ['none','room','wall','door','window','low-window','floor','ceil','small-fence','medium-fence','big-fence'];


const BLOCKS_2D_3D_SHAPES = {
    room:           [1,0,0,0,0,0,0,0,1],
    door:           [1,0,0,0,1,1,1,1,1],
    gate:           [1,0,0,0,1,1,1,1,1],
    wall:           [1,1,1,1,1,1,1,1,1],
    window:         [1,1,1,0,0,1,1,1,1],
    'low-window':   [1,1,0,0,1,1,1,1,1],
    floor:          [1,0,0,0,0,0,0,0,0],
    ceil:           [0,0,0,0,0,0,0,0,1],
    'small-fence':  [1,1,0,0,0,0,0,0,0],
    'medium-fence': [1,1,1,0,0,0,0,0,0],
    'big-fence':    [1,1,1,1,0,0,0,0,0]
};





const STOREYS = [
    '1NP',
    '2NP',
    '3NP',
    '4NP',
    '5NP',
    '6NP'
];


const BLOCKS_1NP_LEVEL = (0.5 - 0.9);
const BLOCKS_STOREYS_LEVELS = {
    '1NP':  0*8,
    '2NP':  1*8,
    '3NP':  2*8,
    '4NP':  3*8,
    '5NP':  4*8,
    '6NP':  5*8,
};






const BLOCK_MATERIALS = [//todo maybe TEXTURES or MATERIALS
    //'color-white',
    'color-light-gray',
    'color-dark-gray',
    'clay-bricks',
    'clay-roof',
    'grass',
    'iron-plates',
    'stone-bricks',
    'stone-plain',
    'wood-boards',
    'wood-fence',
    'wood-raw'];






//--------------------------------------------------------------Only for Editor
const ZOOMS = [
    '5',
    '10',
    '20',
    '30',
    '50'
];
/// <reference path="reference.ts" />



// init bunch of sounds
ion.sound({
    sounds: [
        {name: "step-room",multiplay: false,volume: 0.2},
        {name: "step-ground",multiplay: false,volume: 0.4},
        {name: "step-stairs",multiplay: false,volume: 0.2},



        {name: "link-teleport"},
        {name: "link-key"},
        //{name: "link-key-none"},
        {name: "gate-locked",multiplay: false},


        {name: "nuke",multiplay: false},
    ],

    // main config
    path: "../media/sound/",
    preload: true,
    multiplay: true,
    volume: 1
});




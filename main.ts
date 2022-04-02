sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
    grid.place(mySprite, tiles.getTileLocation(grid.spriteCol(mySprite), 0))
})
let mySprite2: Sprite = null
let mySprite: Sprite = null
let minSpeed = 10
let maxSpeed = 100
let times = 2000
info.setLife(3)
let transportL = [img`
    ................................
    ..................bbbb.bbbb.....
    ...bbbb...66666666bbbb6bbbb66...
    .77766677768888888888888888887..
    .55766677768686868688888888882..
    .57766777768686868666666666682..
    .77766777768686868888888888887..
    .77766777768686866666666666687..
    .77766777768686888888888888887..
    .77766777768686666666666666687..
    .57766777768688888888888888882..
    .55766677768666666666666666682..
    .77766677768888888888888888887..
    ...bbbb...68888888bbbb8bbbb88...
    ..................bbbb.bbbb.....
    ................................
    `, img`
    ....................bbbb.bbbb...
    .....bbbb..666666666bbbb6bbbb6..
    ....4bbbb4.6777777777777777777..
    ..5544664446c7c7c7c7c7c7c7c7c72.
    ..5444664446c7c7c7c7c7c7c7c7c72.
    ..5444664446c7c7c7c7c7c7c7c7c74.
    ..4444664446c7c7c7c7c7c7c7c7c74.
    ..4444664446c7c7c7c7c7c7c7c7c74.
    ..5444664446c7c7c7c7c7c7c7c7c74.
    ..5444664446c7c7c7c7c7c7c7c7c72.
    ..5544664446c7c7c7c7c7c7c7c7c72.
    ....4bbbb4.6c7c7c7c77777777777..
    .....bbbb..677777777bbbb7bbbb7..
    ....................bbbb.bbbb...
    `]
let transportR = [img`
    ................................
    .....bbbb.bbbb...........bbbb...
    ...68bbbb8bbbb88888888...bbbb...
    ..76888888888888888888977667777.
    ..26866666666666666668977667755.
    ..26888888888888888868977667755.
    ..76866666666666666868977667777.
    ..76888888888888886868977777777.
    ..76866666666666686868977667777.
    ..76888888888888686868977667777.
    ..26866666666668686868977667755.
    ..26888888888868686868977667755.
    ..76888888888888888888999999997.
    ...66bbbb6bbbb66666666...bbbb...
    .....bbbb.bbbb...........bbbb...
    ................................
    `, img`
    ...bbbb.bbbb....................
    ..6bbbb7bbbb777777777..bbbb.....
    ..6777777777777777777.444444....
    .267c7c7c7c7c7c7c7c77e44664444..
    .467c7c7c7c7c7c7c7c77e44664445..
    .467c7c7c7c7c7c7c7c77e44664445..
    .467c7c7c7c7c7c7c7c77e44664444..
    .467c7c7c7c7c7c7c7c77e44664444..
    .467c7c7c7c7c7c7c7c77e44664445..
    .467c7c7c7c7c7c7c7c77e44664445..
    .267c7c7c7c7c7c7c7c77e44664444..
    ..6777777777777777777.eeeeee....
    ..6bbbb6bbbb666666666..bbbb.....
    ...bbbb.bbbb....................
    `]
let dirLeft = [2, 4]
let dirRight = [1, 3, 5]
mySprite = sprites.create(img`
    e e e . . . . e e e . . . . 
    4 e e 4 . . 4 e e 4 . . . . 
    4 4 e e c c e e 4 4 . . . . 
    4 3 4 e e 4 e 4 3 4 . . . . 
    c 4 3 e e e e 3 4 c . . . . 
    e e e e e e e e e e . . . . 
    e e c e e e e c e e . . . . 
    . e e c e e c e e . . . e . 
    . 4 e e 4 4 e e 2 . . . e . 
    . . 2 2 2 2 2 2 4 4 . . e . 
    . . 4 e e e e e e 4 4 e 4 . 
    . . e e e e e 4 e e . . . . 
    . . e . . . e . . e . . . . 
    . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.setStayInScreen(true)
tiles.setCurrentTilemap(tilemap`level1`)
scene.centerCameraAt(120, 0)
grid.place(mySprite, tiles.getTileLocation(7, 0))
grid.moveWithButtons(mySprite)
game.onUpdateInterval(times, function () {
    if (Math.percentChance(50)) {
        mySprite2 = sprites.create(transportL[randint(0, transportL.length - 1)], SpriteKind.Enemy)
        grid.place(mySprite2, tiles.getTileLocation(0, dirLeft[randint(0, dirLeft.length - 1)]))
        mySprite2.x = 220
        mySprite2.vx = randint(0 - minSpeed, 0 - maxSpeed)
    } else {
        mySprite2 = sprites.create(transportR[randint(0, transportR.length - 1)], SpriteKind.Enemy)
        grid.place(mySprite2, tiles.getTileLocation(0, dirRight[randint(0, dirRight.length - 1)]))
        mySprite2.x = 0
        mySprite2.vx = randint(minSpeed, maxSpeed)
    }
    mySprite2.setFlag(SpriteFlag.DestroyOnWall, true)
    if (grid.spriteRow(mySprite) >= 6) {
        info.changeScoreBy(1)
        grid.place(mySprite, tiles.getTileLocation(7, 0))
        minSpeed += 2
        maxSpeed += 5
        times += -10
    }
})

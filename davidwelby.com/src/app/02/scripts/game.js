window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, Anim, 2D, Input, Touch, UI, TMX, Audio")
    .include("ActionPlatformerPlayer , ActionPlatformerEnemy , ActionPlatformerPlatform , ActionPlatformerFood, ActionPlatformerBullet")
    .setup({
      width: 320,   //to fit devices with a screne resolution of 1280 x 720
      height: 180,
      scaleToFit: true
    }).controls().touch();

    Q.enableSound();
    Q.setImageSmoothing(false);

    Q.scene("level",function(stage) {
      var player;
      Q.stageTMX("small_level.tmx",stage);
      player = Q("Player").first();

      stage.add("viewport").follow(player,{x:true,y:true});

    });

    Q.scene("endGame",function(stage) {
      var label = stage.insert(new Q.UI.Text({
        x: Q.width/2,
        y: Q.height/2,
        label: stage.options.label
      }));
    });


    //here i create a hud scene, which will be displayed in a higher stage
    Q.scene("hud", function(stage){
      //var label = stage.insert(new Q.UI.Text({
      //  x: 100,
      //  y: 10,
      //  label: stage.options.label
      //}));

      //counter
      stage.insert(new Q.UI.Text({
        x: 10,
        y: 20,
        scale: 0.5,
        label: stage.options.corn.toString()
      }));

      //hearts
      for(var i = 0; i < stage.options.val; i++) {
        stage.insert(new Q.Sprite({
          asset: 'heart.png',
          x: 10 + (i*20),
          y: 10,
          scale: 0.5
        }));
      }

    });



  //load assets
    Q.loadTMX("small_level.tmx, sprites.json, sprites.png ,spritesheet.json, spritesheet.png, floppy.json, floppycock.png, kill-enemy.mp3, heart.png", function() {
      Q.compileSheets("sprites.png","sprites.json");
      Q.compileSheets("spritesheet.png","spritesheet.json");
      Q.compileSheets("floppycock.png", "floppy.json");

      Q.animations("player",{
        walk_right:{frames:[0,1,2,3,4], rate: 1/15, loop:true, flip:false},
        walk_left:{frames:[0,1,2,3,4], rate: 1/15, loop:true, flip:'x'},
        stand_right:{frames:[0], rate: 1/15, loop:false, flip:false},
        stand_left:{frames:[0], rate: 1/15, loop:false, flip:'x'}
      });

      Q.stageScene("level");

      Q.stageScene("hud",1, {
        val:3,
        corn:0
      });
    });

    
});
        
        
        
        
        
        
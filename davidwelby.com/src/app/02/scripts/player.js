Quintus.ActionPlatformerPlayer = function(Q){

    Q.Sprite.extend("Player", {

        init:function(p){
            this._super(p,{
                sheet: "walk",
                sprite:"player",
                direction:"right",
                jumpSpeed:-300,
                speed:100,
                lives:3,
                corn:0,
                bulletDir: 0,
                points: [ [0, -10 ], [ 5, 10 ], [ -5,10 ]],
                bulletSpeed: 300
            });
            this.add("2d, platformerControls, animation, ActionPlatformerBullet");
            Q.input.on("fire",this,"shootCorn");

            this.movewith = false;
            this.movingVal = 0;
        },
        step: function(dt) {


            //play walking animations
            if(this.p.vx > 0) {
                this.play("walk_right");
                this.p.direction = "right";
                this.p.bulletDir = 1;

            }else if(this.p.vx < 0) {
                this.play("walk_left");
                this.p.direction = "left";
                this.p.bulletDir = -1;
            }
            else {
                this.play("stand_" + this.p.direction);
            }

            if(this.p.timeInvincible > 0) {
                this.p.timeInvincible = Math.max(this.p.timeInvincible - dt, 0);
            }

            if(this.movewith){
                this.p.vx =  this.p.vx + this.movingVal;
                this.movewith = false;
            }





        },
        damage: function() {

            if(!this.p.timeInvincible) {
                this.p.lives--;

                //will be invincible for 1 second
                this.p.timeInvincible = 1;

                if(this.p.lives<=0) {
                    this.destroy();
                    Q.stageScene("endGame",1, { label: "Game Over" });
                }
                else {
                    Q.stageScene("hud",1, { val: this.p.lives, corn: this.p.corn});
                }

            }
        },
        moveWithPlatform: function(movVal){
            this.movewith = true;
            this.movingVal = movVal;
        },
        eatCorn: function(){
            this.p.corn++;
            Q.stageScene("hud",1, { val: this.p.lives, corn: this.p.corn});
        },
        shootCorn: function(){
            if(this.p.corn > 0){

                var dx =  Math.sin(this.p.angle * Math.PI / 180),
                    dy = -Math.cos(this.p.angle * Math.PI / 180);
console.log(dx);
console.log(dy);
console.log(this.p.angle);

                this.stage.insert(
                    new Q.Bullet({ x: this.c.points[0][0],
                        y: this.c.points[0][1],
                        vx: this.p.bulletDir * this.p.bulletSpeed,
                        vy: dy * this.p.bulletSpeed
                    })
                );

                //this.p.corn--;
                Q.stageScene("hud",1, { val: this.p.lives, corn: this.p.corn});
            }
        }

    });




};
Quintus.ActionPlatformerEnemy = function(Q){

    //this is functionality common to all enemies that have the "commonEnemy" component added to them
    Q.component("commonEnemy",{
       added: function(){
           var entity = this.entity;
           entity.on("bump.left, bump.right, bump.bottom", function(collision){
               if(collision.obj.isA("Player")) {
                   console.log('collision with enemy!');
                   collision.obj.damage();
               }
           });
           entity.on("bump.top", function(collision){
                if(collision.obj.isA("Player")){
                    //make the player jump.
                    collision.obj.p.vy = -100;
                    Q.audio.play("kill-enemy.mp3");

                    //kill the enemy
                    this.destroy();
                }
           });
       }
    });


    //this is the behaviour given to all ground enemy classes
    Q.Sprite.extend("GroundEnemy", {
        init:function(p){
            this._super(p,{
                vx:-50,
                defaultDirection:"left"
            });
            this.add("2d, aiBounce, commonEnemy");
        },
        step: function(dt){
            //step here gets called at every step of the enemy class

            //find the direction of the enemy (1 or -1)
            var dirX = this.p.vx / Math.abs(this.p.vx);
            //find what is in the current x direction & beneath (half the height of the enemy sprite + 1)
            var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 +1, Q.SPRITE_DEFAULT);
            //find what the next element is in the direction of movement of the enemy and down half the height of the enemy (-> V)
            var nextElement = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2, Q.SPRITE_DEFAULT);
            var nextTile;

            //check if the next element is a tile element
            if(nextElement instanceof Q.TileLayer){
                nextTile = true;
            }

            //if we meet a ledge
            if(!nextTile && ground){
                //if moving right +X direction
                if(this.p.vx > 0){
                    //check if the defaultDirection is right
                    if(this.p.defaultDirection == "right"){
                        this.p.flip = "x";
                    }
                    else{
                        this.p.flip = false;
                    }
                }
                else{//if moving left -X direction
                    //check if the defaultDirection is right
                    if(this.p.defaultDirection == "left"){
                        this.p.flip = "x";
                    }
                    else{
                        this.p.flip = false;
                    }
                }
                this.p.vx = -this.p.vx;
            }


        }
    });


    //this is the behaviour given to all VerticalEnemy classesd
    Q.Sprite.extend("VerticalEnemy", {
        init:function(p){
            this._super(p,{
                vy:-100,
                rangeY: 40,
                gravity: 0
            });
            this.add("2d, commonEnemy");

            this.p.initialY = this.p.y;
            this.p.initialVy = this.p.vy;
            this.p.vyDirection = this.p.vy / Math.abs(this.p.vy);


            var that = this;
            this.on("bump.top, bump.bottom", function(collision){
                that.p.vy = -Math.abs(that.p.initialVy) * that.p.vDirection;
                that.p.vyDirection = that.p.vy/ Math.abs(that.p.vy);
            });
        },
        step: function(dt){

            //each step, check if the range in the y direction has been met
            if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0){
                this.p.vy = -this.p.vy;
                this.p.vyDirection *= -1;
            }
            else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0){
                this.p.vy = -this.p.vy;
                this.p.vyDirection *= -1;
            }


        }
    });






};
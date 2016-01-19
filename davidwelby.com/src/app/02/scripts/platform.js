Quintus.ActionPlatformerPlatform = function(Q){

    //this is functionality common to all enemies that have the "commonEnemy" component added to them
    Q.component("commonPlatform",{
        added: function(){
            var entity = this.entity;

            entity.on("bump.top", function(collision){
                //here i need to let the player move with the platform
                if(collision.obj.isA("Player")){
                    //make the player move with the platform.
                    collision.obj.moveWithPlatform(entity.p.vx);
                }

            });

        }
    });


    //this is the behaviour given to all ground enemy classes
    Q.Sprite.extend("HorizontalPlatform", {
        init:function(p){
            this._super(p,{
                vx:-50,
                defaultDirection:"left",
                rangeX: 40,
                gravity: 0
            });
            this.add("2d, commonPlatform");

            this.p.initialX = this.p.x;
            this.p.initialVx = this.p.vx;
            this.p.vxDirection = this.p.vx / Math.abs(this.p.vx);

            this.allowBump = true;

        },
        step: function(dt){

            //each step, check if the range in the y direction has been met
            if(this.p.x - this.p.initialX >= this.p.rangeX && this.p.vx > 0){
                this.p.vx = -this.p.vx;
                this.p.vxDirection *= -1;
            }
            else if(-this.p.x + this.p.initialX >= this.p.rangeX && this.p.vx < 0){
                this.p.vx = -this.p.vx;
                this.p.vxDirection *= -1;
            }

            var that = this;
            this.on("bump.left, bump.right", function(collision){

                if(this.allowBump){
                    that.p.vx = -that.p.vx;
                    that.allowBump = false;
                    setTimeout(function(){
                        that.allowBump = true;
                        that.p.vx = 50;
                        that.p.vx *= -1;
                    }, 100);
                }

            });

        }
    });
    //this is the behaviour given to all VerticalEnemy classesd
    Q.Sprite.extend("VerticalPlatform", {
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
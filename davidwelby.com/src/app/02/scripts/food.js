Quintus.ActionPlatformerFood = function(Q){

    //this is functionality common to all enemies that have the "commonEnemy" component added to them
    Q.component("food",{
        added: function(){
            var entity = this.entity;

            entity.on("bump.top, bump.bottom, bump.left, bump.right", function(collision){
                //here i need to let the player move with the platform
                if(collision.obj.isA("Player")){
                    //eat the corn
                    collision.obj.eatCorn();

                    //remove the food element
                    this.destroy();
                }

            });

        }
    });


    //for hot food -- firey poos!
    Q.Sprite.extend("hotFood", {
        init:function(p){
            this._super(p,{
                gravity: 1
            });
            this.add("2d, food");


        },
        step: function(dt){


        }
    })



};
Quintus.ActionPlatformerBullet = function(Q) {

    Q.Sprite.extend("Bullet", {
        init: function (p) {

            this._super(p, {
                w: 10,
                h: 10
            });

            this.add("2d");
            //this.on("hit.sprite",this,"collision");
        },

        collision: function (col) {
            // var objP = col.obj.p;


            //col.obj.destroy();
            //this.destroy();
        },

        draw: function (ctx) {
            ctx.fillStyle = "#f4a460";
            ctx.fillRect(-this.p.cx, -this.p.cy, this.p.w, this.p.h);
        },

        step: function (dt) {
            if (!Q.overlap(this, this.stage)) {
                this.destroy();
            }
        }
    });

};
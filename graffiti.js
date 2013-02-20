
jQuery.event.add(window, "load", function(){
    console.log('Load graffiti.js');
});

Graffiti = {
    getGraffiti :
        function(canvasId){
            graffiti = {};
            graffiti.canvas = document.getElementById(canvasId);
            graffiti.color = 'rgba(15,15,15,1.0)';
            graffiti.fontSize = 18;

            //{{{ public setSize(width,height) ;
            graffiti.setSize = function(width, height){
                this.width = width;
                this.height = height;
                this.canvas.width = width;
                this.canvas.height = height;
            }
            //}}}

            //{{{ public setFontSize(size) ;
            graffiti.setFontSize = function(size){
                this.fontSize = size;
            }
            //}}}

            //{{{ public setColor(color) ;
            graffiti.setColor = function(color){
                this.color = color;
            }
            //}}}

            //{{{ public draw(url) ;
            graffiti.draw = function(url){
                var me = this;
                var color = this.color;
                $.ajax({
                    url:url,
                    dataType:'text',
                    type:'GET',
                }).done(function(text, mes,res){
                    var lines = res.responseText.split('\r').join('').split('\n');
                    me._draw(lines,color);
                }).fail(function(res){
                    console.log(res);
                }).always(function(res){
                });
            }
            //}}}

            //{{{ public getCanvas() ;
            graffiti.getCanvas = function(){
                return this.canvas;
            }
            //}}}

            //{{{ private _draw(code) ;
            graffiti._draw = function(code,color){
                var canvas = this.canvas;
                var context = canvas.getContext('2d');
                var yposit = Math.random() * canvas.height;
                var xposit = Math.random() * canvas.width;
                yposit -= Math.random() * this.fontSize * code.length * 0.4;
                xposit -= this.fontSize * 0.5 * 0.5 *  (function(lines){
                    var max = 0;
                    for(var i=0; i<lines.length; i++){
                        if(max < lines[i].length){
                            max = lines[i].length;
                        }
                    }
                    return max;
                })(code);
                context.save();
                context.translate(xposit,yposit);
                context.font = this.fontSize + "px monospace";
                context.fillStyle = color;
                context.shadowBlur = 0.3;
                context.shadowColor = color;
                for(var i=0; i<code.length; i++){
                    context.fillText(code[i], 0, (this.fontSize+2)*i);
                }
                context.restore();
            };
            //}}}

            return graffiti;
        },

    getRandomColor :
        function(){
            var color = 'rgba(';//)
            color += Math.floor(Math.random()*256) + ',';
            color += Math.floor(Math.random()*256) + ',';
            color += Math.floor(Math.random()*256) + ',';
            color += (Math.round(Math.random()*100)/100 + 0.3) + ')';
            return color.toString();
        },

    drawBackground:
    {
        0:
            function(canvas){
                var context = canvas.getContext('2d');
                var width = canvas.width;
                var height = canvas.height;
                var cellSize = width < height ? width/15 : height/15;
                var xposit = cellSize;
                var yposit = cellSize;
                context.save();
                context.strokeStyle = 'rgba(150,150,150,0.2)';
                // 縦線
                while(xposit<width){
                    context.beginPath();
                    context.moveTo(xposit,0);
                    context.lineTo(xposit,height);
                    context.stroke();
                    context.closePath();
                    xposit += cellSize;
                }
                // 横線
                while(yposit<height){
                    context.beginPath();
                    context.moveTo(0,yposit);
                    context.lineTo(width,yposit);
                    context.stroke();
                    context.closePath();
                    yposit += cellSize;
                }
                context.restore();
            },
        1:
            function(canvas){
            },
    },

}


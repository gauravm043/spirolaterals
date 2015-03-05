define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var radioButtonsGroup = require("sugar-web/graphics/radiobuttonsgroup");
    var mustache = require("mustache");
    var moment = require("moment");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();
        function Spirolaterals_JS() {
            this.solution = [];
            this.input = [];
        }

        Spirolaterals_JS.prototype.start = function () {
            this.draw_problem("left-canvas");
            this.initial_solution("right-canvas");
        }

        Spirolaterals_JS.prototype.draw = function (element_id, input) {
            var c = document.getElementById(element_id);
            var cxt = c.getContext("2d");
            var unit = c.height*0.12;
            var dir = [90, 0, 270, 180];
            var iterations = 4;
            var where = 0;

            Xcenter = c.width/2;
            Ycenter = c.height * 0.8;
            this.draw_turtle(cxt, Xcenter, Ycenter);

            while (iterations > 0){
                iterations = iterations - 1;
                for(var turn = 0; turn < 5; turn++){
                    cxt.beginPath();
                    cxt.moveTo (Xcenter , Ycenter);
                    Xcenter = Xcenter + input[turn]* unit* Math.cos(this.toRadians(dir[where]));
                    Ycenter = Ycenter - input[turn]* unit* Math.sin(this.toRadians(dir[where]));
                    cxt.lineTo (Xcenter , Ycenter);
                    cxt.strokeStyle = "#00ff00";
                    cxt.lineWidth = 3;
                    cxt.stroke();
                    where = (where + 1)%4;
                }
            }
        }

        Spirolaterals_JS.prototype.draw_problem = function (element_id) {
            // Creating Random Figure Based on level
            for(var i=0; i < 5; i++)
            {
                var num = Math.floor((Math.random() * 5) + 1); 
                this.input[i] = num; 
            }
            this.input = [1,1,1,4,1];
            console.log(this.input);
            this.draw(element_id, this.input);
        }
        
        Spirolaterals_JS.prototype.initial_solution = function (element_id) {
            var c = document.getElementById(element_id);
            var dir = [90, 0, 270, 180];
            var cxt = c.getContext("2d");
            var unit = c.height*0.12;
            Xcenter = c.width/2;
            Ycenter = c.height * 0.8;
            this.draw_turtle(cxt, Xcenter, Ycenter);
        }

        Spirolaterals_JS.prototype.draw_solution = function (element_id) {
            // Retrieving User solution
            this.solution[0] = parseInt(document.getElementById("input1").value, 10);
            this.solution[1] = parseInt(document.getElementById("input2").value, 10);
            this.solution[2] = parseInt(document.getElementById("input3").value, 10);
            this.solution[3] = parseInt(document.getElementById("input4").value, 10);
            this.solution[4] = parseInt(document.getElementById("input5").value, 10);
            
            var board = document.getElementById("right-canvas");
            var context = board.getContext("2d");
            context.clearRect(0, 0, board.width, board.height);
            
            this.draw(element_id, this.solution);

            // Checking the correctness of solution
            flag = 1;
            for (var i=0; i<5; i++)
            {
                if (this.solution[i] != this.input[i])
                    flag = 0;
            }
            if(flag)
                console.log("Yes\n");
            else
                console.log("No\n");

        }

        Spirolaterals_JS.prototype.draw_turtle = function (context,x,y) {
            img = new Image();
            img.onload = function() {
                context.drawImage(img, x - img.width/2, y);
            }
            img.src = "./turtle.svg";
        }

        Spirolaterals_JS.prototype.toRadians = function (angle) {
            return angle * (Math.PI / 180);
        }

        Spirolaterals_JS.prototype.add = function (button_id) {
            var num = document.getElementById(button_id).value;
            num = (parseInt(num ,10) + 1) % 6;
            if (num == 0)
                num = 1;
            document.getElementById(button_id).value = num;
        }

        // Create the Spirolaterals_JS.

        var Spirolaterals_JS = new Spirolaterals_JS();
        Spirolaterals_JS.start();

        // UI controls.

        var Input1 = document.getElementById("input1");
        Input1.onclick = function () {
            Spirolaterals_JS.add("input1");
        };

        var Input2 = document.getElementById("input2");
        Input2.onclick = function () {
            Spirolaterals_JS.add("input2");
        };

        var Input3 = document.getElementById("input3");
        Input3.onclick = function () {
            Spirolaterals_JS.add("input3");
        };

        var Input4 = document.getElementById("input4");
        Input4.onclick = function () {
            Spirolaterals_JS.add("input4");
        };

        var Input5 = document.getElementById("input5");
        Input5.onclick = function () {
            Spirolaterals_JS.add("input5");
        };

        var Play = document.getElementById("play-button");
        Play.onclick = function () {
            Spirolaterals_JS.draw_solution("right-canvas");
        };

    });

});

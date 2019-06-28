function DifficultyCalcController(hikingService) {
    const ctrl = this;

    ctrl.showAssistant = false;
    ctrl.trail = hikingService.getHikingBuddy();

    ctrl.show = () => {
        ctrl.showAssistant = true;
    }
    ctrl.hide = () => {
        ctrl.showAssistant = false;
    }

    ctrl.$onInit = () => {
        ctrl.calculateTime();
        ctrl.waterIntake();
        ctrl.calculateCalories(170);

        ctrl.calculateDifficulty("Novice");
        ctrl.trailDifficultyConv(); 

        ctrl.responseToTrail(ctrl.trail.stars);
        ctrl.setDifficultyIcon();
    }
 
    ctrl.calculateTime = () => {        
        ctrl.totalHikeTime = ((ctrl.trail.length * 30) + ((ctrl.trail.ascent/1000) * 30));
        
        if (ctrl.totalHikeTime >= 60) {
            ctrl.totalHikeTimeFormat = (ctrl.totalHikeTime/60) +' hours';
            ctrl.formatTime = ctrl.totalHikeTimeFormat.fixed(2);
        } else {
            ctrl.totalHikeTimeFormat = (ctrl.totalHikeTime) + ' minutes';
            ctrl.formatTime = ctrl.totalHikeTimeFormat.fixed(2);

        }

        ctrl.trail.hikingTime = ctrl.totalHikeTime; 
        return ctrl.formatTime;
    }

    ctrl.waterIntake = () => {
        ctrl.totalWaterIntake = Math.ceil((ctrl.totalHikeTime/30) * 8);
        ctrl.totalWaterIntakeFormat = ctrl.totalWaterIntake;
        ctrl.setWaterIcon(ctrl.totalWaterIntakeFormat);
        return ctrl.totalWaterIntakeFormat;
    }
    ctrl.calculateCalories = (weight) => {
        // this is based on the MET,metabolic equivalent scores for hiking.
        // easy trails have a MET of 3  harder trails have a MET of 6 to 7
        // if(weight === ''){
        //     weight = 170;
        //     //if no weight is entered then set a defulat weight of 170 lbs
        // }
        let weightKgs = weight * 0.454;
        let metValue = 6;
        ctrl.calsPerHour = weightKgs * metValue;
        ctrl.totalCalsBurnFormat = Math.round(ctrl.calsPerHour * (ctrl.totalHikeTime / 60));


        ctrl.trail.caloriesBurned = ctrl.totalCalsBurnFormat;
        // return ctrl.totalCalsBurnFormat;
        ctrl.setCalorieIcon(ctrl.trail.caloriesBurned);

    }

    ctrl.trailDifficultyConv = () => {
        if(ctrl.trail.difficulty === "green"){
            ctrl.difficultyConv = "No obstacles. Flat."
        }
        if(ctrl.trail.difficulty === "greenBlue"){
            ctrl.difficultyConv = "Some sections of uneven terrain. Mostly flat."
        }
        if(ctrl.trail.difficulty === "blue"){
            ctrl.difficultyConv = "Uneven terrain. Small inclines (max 10% grade)."
        }
        if(ctrl.trail.difficulty === "blueBlack"){
            ctrl.difficultyConv = "Some obstacles such as rocks or roots present. Moderate inclines."
        }
        if(ctrl.trail.difficulty === "black"){
            ctrl.difficultyConv = "Tricky terrain. Steep. Not for beginners (max 15% grade)."
        }
        if(ctrl.trail.difficulty === "dblack"){
            ctrl.difficultyConv = "Potentially hazardous terrain. Very steep. Experts only."
        }
        return ctrl.difficultyConv;
    }

    ctrl.calculateDifficulty = (expLvl) => {
        // formula from https://www.hikingincolorado.org/hikecalc.html
        // Rating (Novice) = ( 0.002 x elevation gain [ in feet ] ) + round trip distance [ in miles ]
        // Rating (Experienced) = ( 0.0005 x elevation gain [ in feet ] ) + round trip distance / 2 [ in miles ]
        ctrl.hikerExpLvl = expLvl;
        
        if(ctrl.hikerExpLvl === "Novice"){
            ctrl.difficultyRating = (.002 * ctrl.trail.ascent) + ctrl.trail.length;
        }
        if(ctrl.hikerExpLvl === "Experienced"){
            ctrl.difficultyRating = (.0005 * ctrl.trail.ascent) + (ctrl.trail.length / 2);
        }
        // console.log("difficultyRating " + ctrl.difficultyRating);
        
        if(ctrl.difficultyRating <= 5){
            ctrl.difficultySuggestion = "an easy";
        }else if(ctrl.difficultyRating < 9){
            ctrl.difficultySuggestion = "a moderate";
        }else{
            ctrl.difficultySuggestion = "a Strenuous or Difficult";
        }
        // cosnsole.log("difficultySuggestion " + ctrl.difficultySuggestion);
        return ctrl.difficultySuggestion;
    }


    ctrl.responseToTrail = (stars) => {
        ctrl.roundedStars = Math.round(stars);
        ctrl.trailResponse = "Default Text";
        if (ctrl.roundedStars == 5) {
            ctrl.trailResponse = "This trail is really popular!"
        } else if (ctrl.roundedStars == 4) {
            ctrl.trailResponse = "Most hikers enjoy this trail quite a bit."
        } else if (ctrl.roundedStars == 3) {
            ctrl.trailResponse = "This is a pretty average trail, you might enjoy it."
        } else if (ctrl.roundedStars == 2) {
            ctrl.trailResponse == "Be careful, a lot of hikers didn't enjoy this hike."
        } else if (ctrl.roundedStars == 1) {
            ctrl.trailResponse = "Beware, This trail might have a lot of issues."
        } else {
            ctrl.trailResponse = "This trail needs to be reviewed! Maybe you can help? :)"
        }
        return ctrl.trailResponse;
    }

    ctrl.closeBuddy = (status) => {
         ctrl.displayBuddy = false;
         return ctrl.displayBuddy;
    }

    ctrl.setDifficultyIcon = () => {
        if (ctrl.trail.difficulty === 'green' || ctrl.trail.difficulty === 'greenBlue') {
             ctrl.difficultyIcon = 'assets/green-circle.svg';
        }
        else if (ctrl.trail.difficulty === 'blue' || ctrl.trail.difficulty === 'blueBlack') {
             ctrl.difficultyIcon = 'assets/blue-square.svg';
        } else {
             ctrl.difficultyIcon = 'assets/black-diamond.svg';
        }
    }

    ctrl.setCalorieIcon = (calories) => {
        if (calories <= 400) {
            ctrl.calorieIcons = [`assets/red-fire.svg`];
        } else if (calories <= 800) {
            ctrl.calorieIcons = [`assets/red-fire.svg`, `assets/red-fire.svg` ];
        } else {
            ctrl.calorieIcons = [`assets/red-fire.svg`, `assets/red-fire.svg`, `assets/red-fire-plus.svg`];
        }
    }

    ctrl.setWaterIcon = (water) => {
        if (water <= 24) {
            ctrl.waterIcons = [`assets/filled-water.svg`];
        } else if (water <= 48) {
            ctrl.waterIcons = [`assets/filled-water.svg`, `assets/filled-water.svg` ];
        } else {
            ctrl.waterIcons = [`assets/filled-water.svg`, `assets/filled-water.svg`, `assets/filled-water-plus.svg`];
        }
    }

}
    // 8oz every 30 minutes
    // prehydtrate 2 hours before 20 oz


angular.module("HikingApp")
.component("difficultyCalc", {
    template: `
   <!-- <div ng-if="$ctrl.showAssistant" class="window"></div> 
    <div ng-if="$ctrl.showAssistant" class="show"> -->

    <div class="buddy-popup">
    <button class="close-button" ng-click="$ctrl.closeBuddy()"><img style="width:25px;height:25px;" src="assets/close.svg"/></button>

    <div class="hiking-buddy-left">
        <h2>LASHer Assistant</h2>
        <h3>{{$ctrl.trail.name}}</h3>
    </div>

    

        <ul class="hiking-buddy-list">
        <li>
        <div>{{ $ctrl.trailResponse }}</div>
        <div><img class="buddy-description-icons" src="assets/gold-star.svg"></div>
        </li>

        <li>
        <div>This {{$ctrl.trail.length}} mile trail  should take you about {{$ctrl.totalHikeTimeFormat}}.</div>
        <div><img class="buddy-description-icons" src="assets/clock.svg"></div>
        </li>

        
        <li> 
        <div>I would recommend that you take {{$ctrl.totalWaterIntakeFormat}}oz. of water.</div>
        
        <div style="display:flex; justify-content:flex-end;">
            <div ng-repeat="icon in $ctrl.waterIcons track by $index">
            <img class="buddy-description-icons" src="{{icon}}"/>
            </div>
        </div>
        </li>
        
        <li> 
        <div>You will burn approximately {{$ctrl.totalCalsBurnFormat}} calories if you weigh 
        <input class="buddyInputLbs"  type="number" ng-model="hikerWeight" ng-init="hikerWeight = 170" ng-change="$ctrl.calculateCalories(hikerWeight)"> lbs.
        </div>

        <div style="display:flex;justify-content:flex-end;">
            <div ng-repeat="icon in $ctrl.calorieIcons track by $index">
            <img class="buddy-description-icons" src="{{icon}}"/>
            </div>
        </div>

        </li>
        

        <li>
        <div>Difficulty: {{$ctrl.trail.difficulty}}.  {{$ctrl.difficultyConv}}.</div>
        <div><img class="buddy-description-icons" src="{{$ctrl.difficultyIcon}}"/></div> 
        </li>

        <li>
        <div>If you are a 
        <select class="buddyInputExp" ng-model="expLevel" ng-init="expLevel = 'Novice'" ng-change="$ctrl.calculateDifficulty(expLevel)">
          <option value="Novice" selected >Novice</option>
          <option value="Experienced">Experienced</option>
        </select>
         hiker this will be {{$ctrl.difficultySuggestion}} hike.</div>
         <div><img class="buddy-description-icons" src="assets/info.svg"></div> 
         </li>
        </ul>




    
    </div>
    <!--<button class="buddyIconRepeat"><img class="buddyIconRepeat" src="assets/buddyIcon.png"></button>-->
   
   <!-- <button ng-click="$ctrl.show()">Show Assistant</button>
    <button ng-click="$ctrl.hide()">Hide Assistant</button> -->
    
    `,
    controller: DifficultyCalcController,
    bindings: {
        // trail: '<'
        displayBuddy: "="
    }
})
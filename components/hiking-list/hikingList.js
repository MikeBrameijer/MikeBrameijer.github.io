function HikingListController(hikingService) {
    const ctrl = this;
    ctrl.trailsArray = [];
    ctrl.allTrailsRating = [];
    ctrl.displayBuddy = false;

    ctrl.addFavorite = (favoriteParam) => {
        hikingService.setFavorites(favoriteParam);
        console.log("you clicked it");
      }

    ctrl.window = window.innerWidth;
    console.log(ctrl.window);
    ctrl.getList = (location, distance, length, stars) => {
        ctrl.trailsArray = [];

        console.log(location);
        hikingService.getTrails(location, distance, length, stars) 
            .then((results) => {
                results.forEach(function(value, key) {
                    let trailsObj = {
                        id: value.id,
                        caloriesBurned: (((170*.454)*6)*(((value.length * 30) + ((value.ascent/1000) * 30))/60)),
                        hikingTime: ((value.length * 30) + ((value.ascent/1000) * 30))*100,
                        lat: value.latitude,
                        lon: value.longitude,
                        name: value.name,
                        ascent: value.ascent,
                        descent: value.descent,
                        summary: value.summary,
                        conditionDate: value.conditionDate,
                        conditionStatus: value.conditionStatus,
                        difficulty: value.difficulty,
                        high: value.high,
                        length: value.length,
                        location: value.location,
                        stars: value.stars,
                        starsImg: null,
                        type: value.type,
                        imgMedium: value.imgMedium,
                        showDetails: false,
                        mapLocation: "https://www.google.com/maps/search/?api=1&query=" + value.latitude + "," + value.longitude
                    }
                    ctrl.trailsArray.push(trailsObj);
                    ctrl.formatLocation =  hikingService.formatLocation;
                });

                console.log(ctrl.trailsArray);
                ctrl.starRating();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    ctrl.starRating = () => {
        let filledStar = 'assets/gold-star.svg';

        ctrl.trailsArray.forEach( function(value, key)  {
            let emptyStars = ["assets/hollow-star.svg", "assets/hollow-star.svg", "assets/hollow-star.svg", "assets/hollow-star.svg", "assets/hollow-star.svg"];

            for (let i=0; i < Math.round(value.stars); i++) {
                emptyStars.pop();
                emptyStars.unshift(filledStar);
            }

            ctrl.allTrailsRating.push(emptyStars);
            value.starsImg = emptyStars;
        });

    }

    ctrl.changeHeight = (flag, theId) => {
        ctrl.trailsArray.forEach( (value, index) => {
            console.log(value)
            if (theId === value.id) {
                value.showDetails = flag;
            }
        });
    }

    ctrl.retrieveBuddyData = (trail) => {
        hikingService.setHikingBuddy(trail);
        ctrl.displayBuddy = true;
    } 

    // console.log(ctrl.formatLocation);

    ctrl.checkWindowWidth = () => {
        if (ctrl.window < 768) {
            ctrl.isDesktop = false;
        } else {
            ctrl.isDesktop = true;
        }
    }
    ctrl.$onInit = () => {
        ctrl.checkWindowWidth();
        console.log(ctrl.isDesktop);
    }
}

angular
    .module('HikingApp')
    .component('hikingList', {
        template: `

        <div ng-if="$ctrl.displayBuddy">
        <div style="position:fixed;height:100%;width:100%;z-index:11;background:black;opacity:.75;top:0;"></div>
        <difficulty-calc display-buddy="$ctrl.displayBuddy"></difficulty-calc>
    </div>
    
    <search-component search-rec="$ctrl.getList(que, maxDistance, minLength, minStars)"></search-component>
    
    <div class="location-and-sort">
        <select class="sort-trail" ng-show="$ctrl.formatLocation" ng-model="sorting">
            <option value="">Filter By:</option>
            <option value="-stars">Star Rating- High to Low</option>
            <option value="stars">Star Rating- Low to High</option>
            <option value="-hikingTime">Hike Time- High to Low</option>
            <option value="hikingTime">Hike Time- Low to High</option>
            <option value="-caloriesBurned">Calories- High to Low </option>
            <option value="caloriesBurned">Calories- Low to High </option>
        </select>
    
        <h2 class="format-location" ng-if="$ctrl.formatLocation != null">Showing Results For: {{$ctrl.formatLocation}}</h2>
    </div>
    
    
    <div class="mainContainer" id="searchResults">
    
        <div class="container" ng-repeat="trail in $ctrl.trailsArray | orderBy: sorting track by trail.id"
            ng-class="{true: 'fullView ', false: 'partialView'}[trail.showDetails == true]">
    
            <div ng-style=" trail.imgMedium != '' && {'background':'url({{trail.imgMedium}})', 'background-repeat':'no-repeat', 'background-size':'cover'} || trail.imgMedium === '' && {'background':'url(assets/trail-bg.jpg)', 'background-repeat':'no-repeat', 'background-size':'cover'}"
                ng-class="{true: 'fullview-trail-card ', false: 'trail-card'}[trail.showDetails == true]">
                <div class="trail-card-info">
                <div class="favorite" ng-click="$ctrl.addFavorite(trail); favorite=true">
            <i ng-hide="favorite" class="material-icons" >check_box_outline_blank</i>
            <i ng-show="favorite" class="material-icons" >check_box</i>           
            </div>
                    <span class="trailName">{{trail.name}}</span>
                    <span class="starRating">
                        <span ng-repeat="star in trail.starsImg track by $index">
                            <img class="star" src="{{star}}" />
                        </span>
                    </span>
                </div>
    
                <div class="trail-nav">
                    <button class="" ng-click="$ctrl.retrieveBuddyData(trail)">
                        <img class="hiking-buddy-icon bounce" src="assets/mountain.svg">
                    </button>
    
                    <div class="trail-details-button hide-me">
                        <button ng-click="$ctrl.changeHeight(true, trail.id)" ng-if="!trail.showDetails"> <img
                                class="more-less-button" src="assets/plus.svg" /> </button>

                        <button ng-click="$ctrl.changeHeight(false, trail.id)" ng-if="trail.showDetails"> <img
                                class="more-less-button" src="assets/minus.svg" /> </button>
                    </div>
                </div>
            </div>
    
            <div ng-class="{true: 'show', false: 'hide'}[trail.showDetails == true]">
                <div class="trail-details details-1">
                    <p style="font-weight:bold">Trail</p>
                    <p>Location: {{trail.location}}</p>
                    <p>length: {{trail.length}} miles</p>
                    <p>Peak: {{trail.high}}ft</p>
                    <p>Type: {{trail.type}}</p>
                    <a href="{{trail.mapLocation}}" target="_blank">click for directions</a>
                </div>
    
                <div class="trail-details details-2">
                    <p style="font-weight:bold">Condition</p>
                    <p>Condition Status: {{trail.conditionStatus}}</p>
                    <p ng-if !="trail.conditionStatus = 'Unknown">Condition Date: {{trail.conditionDate}}</p>
                    <p>Difficulty: {{trail.difficulty}}
                </div>
    
                <div class="trail-details details-3">
                    <p style="font-weight:bold"> Summary</p>
                    <p>{{trail.summary}}</p>
                </div>
            </div>
    
        </div>
    
    </div>
        
    `, 
        controller: HikingListController,
        // bindings: {
        //   me: '<',
        //   onDelete: '&',
        //   onUpdate: '&'
        // }
    });


    // <i class="material-icons favoriteIcon redIcon">favorite_border</i>
"use strict";
function SavedController(hikingService) {  
    const ctrl = this;

    ctrl.favoriteArray = hikingService.favoriteArray;
    // console.log(favoriteArray);
   
  ctrl.setRemoveFavorites = (removeParam) => {
    hikingService.setRemoveFavorites(removeParam)
    console.log("you removed it!");
  }

 
  }


angular
  .module("HikingApp")
  .component("saved", {
    template: `
    <section id="Saved">

        <div class="mainContainer" id="searchResults">
            <div ng-repeat="trail in $ctrl.favoriteArray" class="fullCard">
                <div class="imageCard">
      

      <div ng-style=" trail.imgMedium != '' && {'background':'url({{trail.imgMedium}})', 'background-repeat':'no-repeat', 'background-size':'cover'} || trail.imgMedium === '' && {'background':'url(assets/trail-bg.jpg)', 'background-repeat':'no-repeat', 'background-size':'cover'}"
      class="trail-card">
      <div class="trail-card-info">
      <div class="favorite" ng-click="$ctrl.addFavorite(trail); favorite=true">
  <i ng-hide="favorite" class="material-icons" >check_box_outline_blank</i>
  <i ng-show="favorite" class="material-icons" >check_box</i>           
  </div>
          <span>{{trail.name}}</span>
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







   
    </section>
    `,  
    controller: SavedController,
 
});

/* <div class="mainContainer" id="searchResults">
<div ng-repeat="trail in $ctrl.favoriteArray" class="fullCard">
  <div class="imageCard">
  




      
      <div class="informationCard">
        <h2 class="cardDefault cardParams cardHeader cardSpacing">{{trail.name}}</h2>
        <div class="cardStats">
       
        <div ng-style=" trail.imgMedium != '' && {'background':'url({{trail.imgMedium}})', 'background-repeat':'no-repeat', 'background-size':'cover'} || trail.imgMedium === '' && {'background':'url(assets/trail-bg.jpg)', 'background-repeat':'no-repeat', 'background-size':'cover'}"
        class="trail-card">
        <div class="trail-card-info">
        
        <div class="favorite" ng-click="$ctrl.setRemoveFavorites(trail)">
        <i ng-hide="favorite" class="material-icons">check_box_outline_blank</i>
        <i ng-show="favorite" class="material-icons">check_box</i>
    </div>
            <span>{{trail.name}}</span>
            <span class="starRating">
                <span ng-repeat="star in trail.starsImg track by $index">
                    <img class="star" src="{{star}}" />
                </span>
            </span>
        </div>

          </div>
        </div>
  </div>
</div>
</div> */

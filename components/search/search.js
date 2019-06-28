"use strict";
function SearchController() {  
    const ctrl = this;

    ctrl.getSearch = (search, distance, length, stars) => {
        ctrl.searchRec({
          que: search,
          maxDistance: distance,
          minLength: length,
          minStars: stars,
        });

      }

    // ctrl.search = (location) => {
    //     hikingService.getGeocode(location) 
    // }

}
angular
  .module("HikingApp")
  .component("searchComponent", {
    template: `
        
    
    
    <form  class="search-container" ng-submit="$ctrl.getSearch(location, distance, length, stars)">
       <input class="searchInput location-search" type="text" ng-model="location" placeholder="Enter Location" style="text-align:left;"/>
        
        <div class="distanceAndStar">
        <div class="distanceSearch">
        <input class="searchInput secondary-search-param distances dOne" type="text" ng-model="distance" placeholder="Max Radius" style="text-align:left;"/>
        <input class="searchInput secondary-search-param distances dTwo" type="text" ng-model="length" placeholder="Min Length" style="text-align:left;"/>
        </div>
        <select class="searchInput secondary-search-param selectStars" ng-model="stars">
          <option value="">Min Stars</option>
          <option value="0">Zero</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
        </select>
        </div>
      
        


        <button class="searchButton" >Search</button>
        </form>
     
    `,  
    controller: SearchController,
    bindings: {
        searchRec: '&'
      }
});

/* <div class="extra-search-params"></div>  </div> */
/* <div class="searchForm"></div>   </div> */
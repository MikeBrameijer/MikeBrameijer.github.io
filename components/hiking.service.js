function HikingService($http, $q) {
    const service = this;
    service.favoriteArray = [];
    service.hikingBuddy = null;
    service.key = '200488347-7449e5616f0f75c446c24d3c0da3ba39';
    service.geoKey = 'AIzaSyAzWLrTiTrHUeTKCGNNpPkFLVrJ-ncycK0';
    service.weatherKey = 'd3b1d3b9eac060080c71477c330b65e0';

    service.getTrails = (search, distance, length, stars) => {
        return $q(function (resolve, reject) {

        service.getGeocode(search)
        .then((results) => {
            //testing sending lat&lon to weather api-stretch goal
            // service.getWeather(results);
            
            service.trailLat = results.lat;
            service.trailLon = results.lon;
            service.formatLocation = results.formatLocation;
        
            let url = 'https://www.hikingproject.com/data/get-trails';
            let apiParam = {
                lat: service.trailLat,
                lon: service.trailLon,
                //NOTE: distance refers to distance between trail and LAT&LONG point(miles)
                maxDistance: distance,
                // maxResults: 3,
                //NOTE: minLength refers to length of trail(miles)
                minLength: length,
                minStars: stars,
                //NOTE: Need to find sortby values other than distance & quality
                sort: 'distance',
                key: service.key
            };

            $http({
                url: url,
                method: 'GET',
                params: apiParam,
            })
                .then((response) => {
                    // console.log("getTrails service response");
                    // console.log(response);

                    service.globalLocation = response.data.trails;
                    console.log(response);
                    resolve(response.data.trails);
                })
                .catch((err) => {
                    // console.log("it didnt work in the service");
                    // console.log(err);
                    reject(error);
                })
        })
    })
    }

    service.getCamping = (locationLat, localtionLon) => {
        let url = 'https://www.hikingproject.com/data/get-campgrounds';
        let apiParam = {
            lat: locationLat,
            lon: localtionLon,
            sort: 'distance',
            key: service.key
        }
        return $q(function (resolve, reject) {
            $http({
                url: url,
                method: 'GET',
                params: apiParam,
            })
                .then((response) => {
                    // console.log("getCampgrounds service response");
                    // console.log(response.data.campgrounds);
                    resolve(response.data.campgrounds);
                })
                .catch((err) => {
                    // console.log("Camping didn't work in the service");
                    // console.log(err);
                    reject(error);
                })
        })
    }

    service.getGeocode = (search) => {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json';
        let apiParam = {
            address: search,
            key: service.geoKey
        }

        return $q(function (resolve, reject) {
            $http({
                url: url,
                method: 'GET',
                params: apiParam,
            })
                .then((response) => {
                    console.log(response);
                    let location = {
                        formatLocation: response.data.results[0].formatted_address,
                        lat:  response.data.results[0].geometry.location.lat,
                        lon: response.data.results[0].geometry.location.lng
                    }
                    // console.log("geoCode service response");
                    // console.log(response);
                    // console.log(response.data.results[0].geometry.location);
                    
                    // service.getTrails(location.lat, location.lon);
                    // service.getTrails(location.lat, location.lon).then( (resp) => {
                    //     resolve(resp);
                    // })
                    // resolve(service.getTrails(location.lat, location.lon));
                    // service.getCamping(location.lat, location.lon);
                    resolve(location);
                })
                .catch( (err) => {
                    // console.log("geocode didnt work");
                    // console.log(err);
                    reject(error);
                })
        })
    }

        /**  **************************************************************
         * STRETCH GOAL
        service.getWeather = (search) => {
            return $q(function (resolve, reject) {
                $http({
                    url: `https://api.openweathermap.org/data/2.5/forecast`,
                    method: `GET`,
                    params: {
                        lat: search.lat,
                        lon: search.lon,
                        units: 'imperial',
                        appid: service.weatherKey
                    }
                })
                    .then((response) => {
                        //data.list[""0""].dt
                        let d = new Date(response.data.list[0].dt);
                        // console.log(response);
                        console.log(d);
                    })
                    .catch((error) => {
                        // reject(error);
                    })
            })
        }
        ************************************************************* **/

    

    service.setHikingBuddy = (data) => {
        service.hikingBuddy = data;
    }

    service.getHikingBuddy = () => {
        return service.hikingBuddy;
    }

    service.setFavorites = (favoriteParam) => {
        service.favoriteArray.push(favoriteParam);
    }
    service.setRemoveFavorites = (removeParam) =>{
        service.favoriteArray.splice(service.favoriteArray.indexOf(removeParam), 1);
    }

   
 }

angular
    .module('HikingApp')
    .service('hikingService', HikingService);
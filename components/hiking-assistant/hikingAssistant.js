function HikingAssistant(hikingService, $q) {
    const ctrl = this;

  
  
  }
  
  // $('.closeButton').on('click', ()=>{
  //   $('#newEntry').hide()
  //  });
  
    angular.module('HikingApp').component('hikingAssistant', {
      template: `

      <div style="height:500px;width:300px;background-color:red;"/></div>
      
  
        `, 
      controller: HikingAssistant,
      bindings: {
        moduleFlag: '=',
      }
    });
  
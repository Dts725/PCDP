export default {
   
 getDataUrl : ()=> {
 
        var url = window.location.href;
        console.log(url);
     if (url.substr(-6) === "/login" || url.substr(-1) === "/" || url.substr(-6) === "/reset"   ){
         return false;
     } else {
      
  
            //   self.location.reload(); 
              return true;
    
        
     }

    },
   
}
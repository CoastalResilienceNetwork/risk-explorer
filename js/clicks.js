define([
	"dojo/_base/declare", "esri/tasks/query", "esri/tasks/QueryTask", "esri/graphicsUtils"
],
function ( declare, Query, QueryTask, graphicsUtils ) {
        "use strict";

        return declare(null, {
			eventListeners: function(t){
				$("#" + t.id + "top-wrap input[name='slrCh']").click(function(c){
					t.obj.slr = c.currentTarget.value;
					t.esriapi.updateGraphics(t);
				});	
				$("#" + t.id + "top-wrap input[name='popCh']").click(function(c){
					if ( c.currentTarget.checked ){
						t.obj.vulArray.push(c.currentTarget.value)	
					}else{
						var index = t.obj.vulArray.indexOf(c.currentTarget.value)
						if (index > -1){
							t.obj.vulArray.splice(index,1)
						}
					}
					t.esriapi.updateGraphics(t);
				});	 	
			},
			makeVariables: function(t){
				
			}
        });
    }
);

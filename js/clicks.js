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
				$("#" + t.id + "top-wrap input[name='reVis']").click(function(c){
					if (c.currentTarget.value == "riskScore"){
						$(".re-pcaLegend").hide();
						$(".re-riskLegend").show();
						t.obj.visibleLayers = [];
						t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
						t.map.graphics.setOpacity(1);
						t.clicks.setDisabled(t,false);
					}
					if (c.currentTarget.value == "pca"){
						$(".re-riskLegend").hide();
						$(".re-pcaLegend").show();
						t.obj.visibleLayers.push(0);
						t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
						t.map.graphics.setOpacity(0);
						t.clicks.setDisabled(t,true);
					}
				});	
				// methods click
				$("#" + t.id + "reMethods").click(function(){
					window.open("plugins/risk-explorer-nj/Arkema_et_al_2013_Nature_Climate_Change.pdf")
				})
			},
			setDisabled: function(t,b){
				var ar = ["slrCh", "popCh"];
				$.each(ar,function(i,v){
					$("#" + t.id + "top-wrap input[name='" + v + "']").each(function(i1,v1){
						$(v1).prop("disabled",b);
					});
				});
			},
			makeVariables: function(t){
				
			}
        });
    }
);

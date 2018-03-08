define([
	"esri/layers/ArcGISDynamicMapServiceLayer", "esri/geometry/Extent", "esri/SpatialReference", "esri/tasks/query" ,"esri/tasks/QueryTask", "dojo/_base/declare", "esri/layers/FeatureLayer", 
	"esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol","esri/symbols/SimpleMarkerSymbol", "esri/graphic", "dojo/_base/Color", "dojo/_base/lang",
	"esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters",
],
function ( 	ArcGISDynamicMapServiceLayer, Extent, SpatialReference, Query, QueryTask, declare, FeatureLayer, 
			SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol, Graphic, Color, lang,
			IdentifyTask, IdentifyParameters) {
        "use strict";

        return declare(null, {
			esriApiFunctions: function(t){	
				// Add dynamic map service
				t.dynamicLayer = new ArcGISDynamicMapServiceLayer(t.url, {opacity:0.7});
				t.map.addLayer(t.dynamicLayer);
				t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
			
				t.dynamicLayer.on("load", function () { 			
					t.layersArray = t.dynamicLayer.layerInfos;
					// Save and Share Handler					
					if (t.obj.stateSet == "yes"){
						//extent
						var extent = new Extent(t.obj.extent.xmin, t.obj.extent.ymin, t.obj.extent.xmax, t.obj.extent.ymax, new SpatialReference({ wkid:4326 }))
						t.map.setExtent(extent, true);
						t.obj.stateSet = "no";
					}	
				});
				// Query all features for grahpics layer
				var q = new Query();
				var qt = new QueryTask(t.url + "/0" );
				q.where = "OBJECTID > -1";
				q.returnGeometry = true;
				q.outFields = ["*"];
				qt.execute(q, function(e){
					t.features = e.features;
					t.esriapi.addGraphics(t);			
				});	
				// create symbols
				t.sym1  = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 9, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,0,0,0.5]), 1), new Color([44,123,182]));
				t.sym2  = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 9, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,0,0,0.5]), 1), new Color([171,217,233]));
				t.sym3  = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 9, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,0,0,0.5]), 1), new Color([255,255,191]));
				t.sym4  = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 9, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,0,0,0.5]), 1), new Color([253,174,97]));
				t.sym5  = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 9, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,0,0,0.5]), 1), new Color([215,25,28]));
			},
			addGraphics: function(t){
				t.obj.slr = $("#" + t.id + "top-wrap input[name='slrCh']:checked").val();
				$.each(t.features, function(i,v){
					var graphic = v;
					var vul = (v.attributes.pop_score + v.attributes.pov_score + v.attributes.older_scor)/3;
					var exp = v.attributes[t.obj.slr];
					var score = vul * exp;
					if (score < 5){ graphic.setSymbol(t.sym1); }
					if (score >= 5 && score < 10){ graphic.setSymbol(t.sym2); }
					if (score >= 10 && score < 15){ graphic.setSymbol(t.sym3); }
					if (score >= 15 && score < 20){ graphic.setSymbol(t.sym4); }
					if (score >= 20 && score <= 25){ graphic.setSymbol(t.sym5); }
					graphic.setAttributes(v.attributes);
					t.map.graphics.add(graphic);
				})
			},
			updateGraphics:function(t){
				var db = t.obj.vulArray.length
				var vul = 5;
				$.each(t.map.graphics.graphics,function(i,v){
					if (v.attributes){
						if (db > 0){
							var sm = 0;
							$.each(t.obj.vulArray,function(i1,v1){
								sm = sm + v.attributes[v1];
							})
							vul = sm / db;
						}	
						var exp = v.attributes[t.obj.slr];
						var score = vul * exp;	
						if (score < 5){ v.setSymbol(t.sym1); }
						if (score >= 5 && score < 10){ v.setSymbol(t.sym2);	}
						if (score >= 10 && score < 15){	v.setSymbol(t.sym3); }
						if (score >= 15 && score < 20){ v.setSymbol(t.sym4); }
						if (score >= 20 && score <= 25){ v.setSymbol(t.sym5); }
					}
				})
			},
			clearAtts: function(t){
				t.map.graphics.clear();
			} 				
		});
    }
);
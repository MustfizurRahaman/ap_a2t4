require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/ImageryLayer",
  "esri/layers/support/RasterFunction"
], (Map, MapView, ImageryLayer, RasterFunction) => {
  /***************************************
         * Set up popup template of image layer
         **************************************/

const imagePopupTemplate = {
  title: "Landsat 8 NDVI Information",
  content: `
    This NDVI data is derived from Landsat 8 OLI sensor bands.
    <ul>
        <li>Near-Infrared (NIR) Band: <b>5</b></li>
        <li>Red Band: <b>4</b></li>
    </ul>
    NDVI is calculated using the formula: <b>(NIR - Red) / (NIR + Red)</b>.
    This index is a measure of the amount and health of vegetation.
  `
};

  /*******************************************************************
         * Create image layer with server defined raster function templates
         ******************************************************************/

  const serviceRFT = new RasterFunction({
    functionName: "NDVI Colorized",
    variableName: "Raster"
  });

  const layer = new ImageryLayer({
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    rasterFunction: serviceRFT,
    popupTemplate: imagePopupTemplate
  });

  /*************************
         * Add image layer to map
         ************************/

  const map = new Map({
    basemap: "hybrid",
    layers: [layer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: {
      // Ames, Iowa coordinates
      x: -93.6250,
      y: 42.0308,
      spatialReference: 4326 // WGS 84
    },
    zoom: 8, // Adjusted zoom level for a state-wide view
    popup: {
      actions: []
    }
  });
});

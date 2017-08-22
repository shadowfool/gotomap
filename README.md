# gotomap
A simple module for integrating speech -> location on ESRI ArcGIS maps.


## Getting Started

Currently the module takes the following properties on the config

  ### config.data
    ```javascript
      {
        "foo": {
          "latitude": number,
          "longitude": number
        },
        "bar": {
          "latitude": number,
          "longitude": number
        }
      }
    ```

  ### config.continuous

A bool (true/false) that sets whether or not the speech module will
time out after several seconds of inactivity. If true it will stay on until the
session is closed. 

Defaults to true.

### config.view
An instance of an [argis MapView](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html). Allows the module to access certian functions
nessecary to control the extend of the view. 

  ### config.grammar
To be depricated because of complexity of the item but basically the grammar for the map.
This should be initialized in the module. See index.html's script for how the grammar property is structured. 

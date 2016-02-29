/* =========================================================================
 * pickerResultInterface.js
 * Version 1.0
 * Project: CMZwoelf
 *
 * Last Modified:
 *      $LastChangedDate: 2012-02-03 14:36:10 +0100 (Fri, 03 Feb 2012) $
 *      $LastChangedBy: mswiente $
 *      $LastChangedRevision: 50745 $
 *
 * Copyright   : Copyright (c) 2011-2012
 * Organisation: Zweites Deutsches Fernsehen
 *
 *
 * This file creates a global PickerResultInterface object containing the method sendResult.
 *
 *     PickerResultInterface.sendResult(result, targetOrigin)
 *         result           an object containg the result picked by the editor
 *         targetOrigin     the targetOrigin of the parent window containing the CoreMedia Studio application
 *          
 *         This method sends the results picked by the editor to the parent window containing the CoreMedia Studio application.
 *         Upon receiving the result message, the CoreMedia Studio creates a new dynamic container object and attributes it with the given results.
 *
 *         Example:
 *         var targetOrigin = "http://editor.zdf.de";
 *         var result = {
 *              "content": [
 *                  {
 *                      "id": "id1",
 *                      "description": "Beschreibungstext1",
 *                      "visibleFrom": "2011-11-24T00:00:00+01:00",
 *                      "visibleTo": "2011-11-24T00:00:00+01:00",
 *                      "fragments": [
 *                          {
 *                              "playout": "xml",
 *                              "fragmentURI": "http://vote.zdf.de/xml/1"
 *                          },
 *                          {
 *                              "playout": "web",
 *                              "fragmentURI": "http://vote.zdf.de/web/2"
 *                          }
 *                      ]
 *                  }
 *              ]
 *         };
 *         PickerResultInterface.sendResult(result, targetOrigin);
 *
 * =========================================================================
 */
 
var PickerResultInterface;
if (!PickerResultInterface) {
    PickerResultInterface = {};
}

(function() {

    PickerResultInterface.sendResult = function(result, targetOrigin) {
        
        if (targetOrigin == null || targetOrigin.length == 0) {
            throw new PickerResultException("Parameter targetOrigin is not set!");
        }
        if (result == null) {
            throw new PickerResultException("Parameter result is null or undefined!");
        }
        if (parent == null) {
            throw new PickerResultException("Parent window is null or undefined!");    
        }

        var resultString = JSON.stringify(result);
        parent.postMessage(resultString, targetOrigin);
    };
    
    function PickerResultException(message) {
        this.message = message;
        this.name = "pickerResultInterfaceException";    
    }    
        
}());

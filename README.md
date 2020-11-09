Udacity Front-End Developer Project: Travel Forecast
====================================

Pre-requisites:
---------------
- Modern standards-compliant browser
- **node** version 12.18.3 or later
- **node** dependencies:
    - express 4.17.1 or later
    - body-parser 1.19.0 or later
    - CORS 2.8.5 or later
    - workbox-webpack-plugin 5.1.4 or later
    On the coding side (not needed to view / run the web page)
- **webpack** version 3.7.2 or later (to work from the code side)    
    - Jest 26.5.3 or later
    - Sass-loader 10.0.2 or later
    - Babel 7.11.6 or later
    - CSS-loader 4.3.0 or later
    - HTML-webpack-plugin 3.2.0 or later
    - mini-css-extract-plugin 0.11.3 or later
    - Sass 4.14.1 or later
    - style-loader 1.3.0 or later

Description:
------------
Like the Natural Language Processing project, this project had several
requirements, all to be performed using JavaScript:
- Retrieve a destination city and anticipated arrival date from the user
- Send that information local node server
- Have the local node server retrieve several stored API keys so they're not
  exposed on the user side
- Use the user's destination city and the stored GeoNames API key to obtain
  latitude and longitude information for the requested city
- Use that latitude and longitude information in addition to a second stored
  API key to request weather data from weatherbit.io
    - If the anticipated arrival date is 14 days or less than today,
    request a predicted forecast
    - If the anticipated arrival date is more than 14 days from today,
        provide historical weather data for that particular day of the year.

In addition, the user fields are validated to ensure that no blank fields are
sent and that the user date is not before today's date.

User Input:
-----------
User input is accomplished via text areas on the *index.html* page. Once the
user has entered text in the **Destination City** and **Arrival Date**
fields they can click the **submit** button; an event listener then runs code to
 validate and pass this text to the node server (via *formHandler.js* and
     *fieldChecker.js*)

Server Side
----------
On the server side (code in */server/index.js*) the API key generated by
GeoNames.org is retrieved from an .env file, combined with the user's
destination city, the base GeoNames URL, and several other search terms to
ensure only one row is returned. The server then sends this string to GeoNames
where the city name is analyzed and a JSON object returned that includes the
latitute, longitude, City, State, and Country codes.The latitude and longitude
codes are stored in one JavaScript object while the City, State, and Country
values are stored to the main JavaScript object that will eventually be returned
 to the client side.

A second URL is created using the returned lat and long values in addition to a
second stored API key; depending on how far away the anticipated arrival date is
 the URL will be created for one of two purposes:
    - If the anticipated arrival date is less than 2 weeks (14 days) away, a URL
     will be created to request a projected forecast (Weatherbit offers
     projected forecasts up to 16 days from travel but I made a conscious
     decision to cut this back to 14 days).
    - If the arrival date is more than 14 days away a different URL is created
    using the lat and long as well as the user's anticipated arrival date; this
    URL will request average weather data for the past 30 years based on the day
    and month provided. For example, if a user's arrival date were July 1st,
    2022, the URL would be generated to request historical data for July 1 for
    the last 30 years.

The information returned from this API call is stored in the main *weatherData*
JavaScript object; because the information returned is based on the type of call
(i.e., Projected Forecast vs. Historical Weather Data) specific data points are
retrieved later based on anticipated arrival date.

Finally, the user location and a third API key are combined and a call made to
Pixabay.com, an image retrieval site. An image URL is retrieved and added to the
*weatherData* object.

Client Side (Returned Data and Updating DOM)
--------------------------------------------
Once the server returns the contents of the *weatherData* object the
*formHandler.js* file updates the DOM so the user can see the results. First,
the City, State, and Country code retrieved from GeoNames.org are filled in the
display area; this allows the user to verify that the correct city was chosen
by GeoNames. If the anticipated arrival date is less than two weeks from today
forecast information including weather, temperature, and a weather icon are
displayed; if the arrival date is more than 2 weeks away historical weather
data such as average high / low, average temperature, and average precipitation
are displayed in the weather area. Finally, the Pixabay image URL is passed to
the DOM and a preview image of their destination is displayed to the left of the
weather data.

Future Additions
----------------
While generally good at finding appropriate images and correct geographical
locations, some fine tuning could be performed:
- Additional fields for State and Country could be added to help refine the
  GeoNames search.
- Rather than displaying a single image from Pixabay a collection of images
  might be made available based on availability
- Recommendations for clothing might be made based on projected or
    historical weather data; for instance, if historical precipitation is
    greater than 1" a recommendation to pack an umbrella might be made, or a
    heavy jacket for predicted / historical weather less than 50 degrees F.
- The developer is admittedly American-centric as far as measurements go;
    the ability to switch between F and C at the user's request would make the
    page more universally friendly and helpful.

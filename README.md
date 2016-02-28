# Music listener

This app is used together with the Audacious Linux music player. 

## Usage

Set a port for the webserver and start it (using pm2 for example):

````
export MUSIC_PORT=8080
pm2 start index.js
````

In Audacious, go to settings > plugins and enable the 'Song Change' plugin.
 
Go to the settings for the plugin and add the following command in the first inputfield to send each new playing song to the API:
````
curl --data-urlencode "data=%a____%b____%T____%l" http://<host>:8080/pushSong
````

After that, you can call the currently playing song from:
````
http://<host>:8080/getSong
````

Example JSON output:
````
{"artist":"Geinoh Yamashirogumi","album":"Akira","track":"Shohmyoh"}
````

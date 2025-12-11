# Music listener

This app is used together with the Audacious Linux music player. 

## Usage

Set a port for the webserver and start it (using pm2 for example):

````
export MUSIC_PORT=8080
export API_KEY=TESTKEY
pm2 start index.js
````

In Audacious, go to settings > plugins and enable the 'Song Change' plugin.
 
Go to the settings for the plugin and add the following command in the first inputfield to send each new playing song to the API:
````
curl --data-urlencode "data=%a____%b____%T____%l" http://<host>:8080/pushSong?key=<API_KEY>
````

After that, you can call the currently playing song from:
````
http://<host>:8080/getSong?key=<API_KEY>
````

Example JSON output:
````
{"artist":"Geinoh Yamashirogumi","album":"Akira","track":"Shohmyoh"}
````

When the song has expired or no sing has played yet, it will just return 'OK'. 

If the `key` argument does not match the configured `API_KEY`, it will return 'Forbidden'.
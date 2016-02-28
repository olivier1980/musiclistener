# Music listener

This app is used together with the Audacious Linux music player.

Enable the 'Song Change' plugin and add the following command to send each new playing song to the API:
````
curl --data-urlencode "data=%a____%b____%T____%l" http://<host>:<port>/pushSong
````

After that, you can call the currently playing song from:
````
http://<host>:<port>/getSong
````

Example JSON output:
````
{"artist":"Geinoh Yamashirogumi","album":"Akira","track":"Shohmyoh"}
````

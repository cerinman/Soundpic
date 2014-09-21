##Soundpic##

###Description###

Soundpic is an open source web app that scrapes art from Deviantart.com that pertains to the lyrics of the song you have searched for on Spotify.

Soundpic was an exercise in learning the gem mechanize, the Spotify api, and Sidekiq for background jobs.

####Technologies Used####

* Ruby
* JavaScript
* Sinatra
* Mechanize
* Spotify
* Lyricwiki
* Redis
* Sidekiq
* Postgresql
* ActiveRecord

####Instructions####

I have no current plans to host Soundpic anywhere so if you wish to use it you will have to clone this repo down to your computer.  Soundpic works only if you have WEBrick, Redis, and Sidekiq servers running.

To start, run Bundle install from your terminal.  Once all dependencies are installed you will need to do the following

1. Start a Redis server.  You can do this by typing redis-server in your terminal.  If you do not have Redis installed please visit www.redis.io for more information on how to download and install it.

2. Start a Sidekiq server.  You can do this by typing sidekiq -r 'path to environment.rb file'.  The environment.rb file can be found in the config directory of this repo.

3. Start your WEBrick server from within the cloned Soundpic repo folder in your terminal.  To do this type shotgun.

4. Open your web browser and go to localhost:9393 and enjoy.


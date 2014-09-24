web: bundle exec unicorn config.ru -p $PORT
worker: bundle exec sidekiq -c 5 -v
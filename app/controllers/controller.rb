require 'sinatra'
require 'HTTParty'

get '/' do
  response = HTTParty.get("http://lyricwiki.org/api.php?artist=Ellie%20Goulding&song=Burn&fmt=json")

  content_type :json

  return response.to_json
end

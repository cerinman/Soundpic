
get '/' do
  erb :test
end

get '/lyrics' do
  artist = params[:artist].split().join("%20")
  url = "http://lyricwiki.org/api.php?artist=#{artist}&song=#{params[:song]}&fmt=json"

  response = HTTParty.get(url)

  content_type :json

  return response.to_json
end

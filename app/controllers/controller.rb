
get '/' do
  erb :player
end

get '/lyrics' do
  artist = params[:artist].split().join("%20")
  song = params[:song].split().join("%20")
  url = "http://lyricwiki.org/api.php?artist=#{artist}&song=#{song}&fmt=realjson"

  response = HTTParty.get(url)

  content_type :json

  return response.parsed_response.to_json
end

get '/art' do
  resources = Resource.where(song_name: params[:song], song_artist: params[:artist])

  if resources.any?
    resources[rand(0..(resources.length-1))].to_json
  end
end

post '/art' do
  params[:terms].each do |term|
    Scrape.perform_async(term, params[:song], params[:artist], '/digitalart/paintings/landscapes/')
  end
end



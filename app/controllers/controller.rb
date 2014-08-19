
get '/' do
  erb :test
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
    resources[rand(0..(resources.length-1))].img_url
  end
end

post '/art' do

    a = Mechanize.new { |agent|
      agent.user_agent_alias = 'Mac Safari'
    }

    params[:terms].each do |term|

      a.get('http://www.deviantart.com/digitalart/paintings/landscapes/') do |page|
        search_result = page.form_with(:id => 'browse-search-box') do |search|
          search.q = term
        end.submit

        search_result.links_with(:class => "t").each do |link|
          art_page = link.click

          img_link = art_page.search("//img[@class='dev-content-full']")

          Resource.create(song_name: params[:song], song_artist: params[:artist], img_url: img_link.to_s)
        end
      end
    end

end



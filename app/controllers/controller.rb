
get '/' do
  erb :test
end

get '/lyrics' do
  artist = params[:artist].split().join("%20")
  song = params[:song].split().join("%20")
  url = "http://lyricwiki.org/api.php?artist=#{artist}&song=#{song}&fmt=json"

  response = HTTParty.get(url)

  content_type :json

  return response.to_json
end

get '/art' do

  a = Mechanize.new { |agent|
    agent.user_agent_alias = 'Mac Safari'
  }

  a.get('http://www.deviantart.com/') do |page|
    search_result = page.form_with(:id => 'browse-search-box') do |search|
      search.q = 'burn'
    end.submit

    search_result.links_with(:class => "t").each do |link|
      art_page = link.click

      img_link = art_page.search("//img[@class='dev-content-full']").first

      p img_link
    end
  end
end
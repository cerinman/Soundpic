
class Scrape
  include Sidekiq::Worker
  def perform(term, song, artist, category)
    base_uri = 'http://www.deviantart.com'

    a = Mechanize.new { |agent|
      agent.user_agent_alias = 'Mac Safari'
    }

    a.get(base_uri + category) do |page|
      #user search form on page to search for term
      search_result = page.form_with(:id => 'browse-search-box') do |search|
        search.q = term
      end.submit

      #for all links on the resulting page, find the links that have a class of t
      #and follow them.  On followed page grab all img tags with class of dev-content-full
      
      counter = 0

      search_result.links_with(:class => "t").each do |link|
        break unless counter <= 5
        counter += 1

        art_page = link.click

        # Gets the Author and his/her's link to their profile
        author_link = art_page.at('.username-with-symbol a')

        # Gets the title and its link for the art in question
        title_link = art_page.at('.dev-title-container h1 a')

        # Gets the img link for the art in question
        img_link = art_page.search("//img[@class='dev-content-full']")

        #Save resulting img tags to DB
        Resource.create(search_term: term, song_name: song, song_artist: artist, img_url: img_link.to_s, deviation_link: title_link.to_s, author_link: author_link.to_s)
      end
    end
  end
end
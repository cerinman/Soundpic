class CreateResourceTable < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.text :song_name
      t.text :song_artist
      t.text :search_term
      t.text :img_url
      t.timestamps
    end
  end
end

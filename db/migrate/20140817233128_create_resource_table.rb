class CreateResourceTable < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :song_name
      t.string :song_artist
      t.string :img_url
      t.string :img_deviant_url
      t.string :artist_name
      t.string :artist_deviant_url
      t.timestamps
    end
  end
end

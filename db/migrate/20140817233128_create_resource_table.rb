class CreateResourceTable < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :song_name
      t.string :song_artist
      t.string :search_term
      t.string :img_url
      t.timestamps
    end
  end
end

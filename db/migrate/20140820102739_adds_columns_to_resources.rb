class AddsColumnsToResources < ActiveRecord::Migration
  def change
    add_column :resources, :deviation_link, :text
    add_column :resources, :author_link, :text
  end
end

class CreateVinyls < ActiveRecord::Migration[6.1]
  def change
    create_table :vinyls do |t|
      t.string :title
      t.string :artist
      t.string :cover
      t.string :song

      t.timestamps
    end
  end
end

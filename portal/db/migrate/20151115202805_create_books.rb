class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.string :name 
      t.string :author
      t.string :cover
      t.timestamps null: false
    end
  end
end

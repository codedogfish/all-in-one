class CreateReadNotes < ActiveRecord::Migration
  def change
    create_table :read_notes, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.integer :book_id
      t.text :content
      t.timestamps null: false
    end
    add_foreign_key :read_notes, :books, column: :book_id
  end
end

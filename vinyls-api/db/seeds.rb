# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
DATA = {
  :user_keys =>
    ["username", "password"],
  :users => [
    ["Max Charles", "password"],
    ["Skai Jackson", "password"],
    ["Kaleo Elam", "password"],
    ["Megan Charpentier", "password"],
    ["Hayden Byerly", "password"],
    ["Tenzing Norgay Trainor", "password"],
    ["Davis Cleveland", "password"],
    ["Cole Sand", "password"],
    ["Quvenzhané Wallis", "password"]
  ],
  :game_ids => [
    "28131",
    "3498",
    "290376",
    "290378",
    "40847",
    "445442",
    "5621",
    "10141"
  ]
}

def main
  make_users
  make_games
  make_posts_and_plays
end

def make_users
  DATA[:users].each do |user|
    new_user = User.new
    user.each_with_index do |attribute, i|
      new_user.send(DATA[:user_keys][i]+"=", attribute)
    end
    new_user.save
  end
end
DATA = {
  :vinyl_keys =>
    ["title", "artist", "cover", "song"],
  :vinyls => [
    ["abgm", "GYARISUTA!", "abgm.jpg", "01. abgm.mp3"],
    ["ＷＡＡＡＡ！", "GYARISUTA!", "waaaa!.jpg", "1-01 ＷＡＡＡＡ！.flac"],
    ["easy vacation", "イワクラコマキ", "cirno.jpg", "03. easy vacation.mp3"],
    ["Song of the Ancients Devola", "Keiichi Okabe, Kakeru Ishihama, Keigo Hoashi, Takafumi Nishimura, & Ryuichi Takada feat. Emi Evans;", "Nier.jpg", "07 Keiichi Okabe, Kakeru Ishihama, Keigo Hoashi, Takafumi Nishimura, & Ryuichi Takada feat. Emi Evans Song of the Ancients Devola.flac"],
    ["Bad Apple!!（東方幻想郷）", "Marasy", "marasy.png", "08 Bad Apple!!（東方幻想郷）.flac"],
    ["Mirage", "F", "CDT-7.jpg", "F - Mirage.flac"],
    ["black-coffee", "Xi", "CDT-5.jpg", "Xi - black-coffee.flac"]
  ]
}

def main
  make_vinyls
end

def make_vinyls
  DATA[:vinyls].each do |vinyl|
    new_vinyl = Vinyl.new
    vinyl.each_with_index do |attribute, i|
      new_vinyl.send(DATA[:vinyl_keys][i]+"=", attribute)
    end
    new_vinyl.save
  end
end

main
FactoryGirl.define do

  factory :author do
    name { Faker::Internet.user_name }
    password "starwars"
  end

end

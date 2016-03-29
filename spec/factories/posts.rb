FactoryGirl.define do

  factory :post do
    title { Faker::Hacker.noun }
    body { Faker::Hacker.say_something_smart }
  end

end

feature "posts" do

  scenario "redirects to sign in page if not signed in" do

    visit(posts_path)

    expect(page).to have_content("Sign In!")

  end

  feature "if signed in" do

    let!(:tommy) { FactoryGirl.create(:author) }
    let!(:post)  { FactoryGirl.create(:post, author_id: tommy.id) }

    before(:each) do
      # tommy = FactoryGirl.create(:author)

      # Post.create!( # can be done through factory associations.
      #   title: "The title",
      #   body: "The body",
      #   author_id: tommy.id
      # )

      visit(new_session_path)

      fill_in("Username", with: tommy.name)
      fill_in("Password", with: "starwars")
      click_button("Sign In")

      save_and_open_page

      visit(posts_path)
    end

    scenario "displays index if signed in" do

      expect(page).to have_content(post.title)
      expect(page).to have_content(post.body)

    end

    scenario "index has link to post show" do

      click_link(post.title)

      expect(page).to have_content(post.title)
      expect(page).to have_content(post.body)

    end

  end

end

module ApplicationHelper

  def auth_token
    <<-HTML.html_safe
      <input
        type="hidden"
        name="authenticity_token"
        value="#{form_authenticity_token}"
        >
    HTML
  end

  def header_link(text, url)
    <<-HTML.html_safe
      <strong>
        <a href="#{url}">#{h(text)}</a>
      </strong>
    HTML
  end

  def my_button_to(text, url, options = { method: :post })
    <<-HTML.html_safe
      <form action="#{url}" method="POST">
        #{auth_token}
        <input type="hidden" name="_method" value="#{options[:method]}">
        <input type="submit" value="#{text}">
      </form>
    HTML
  end

end

# Generates the CV "Publications" section from the jekyll-scholar bibliography
# so the CV stays in sync with _bibliography/papers.bib (single source of
# truth). At build time it replaces the `contents` of the cv.yml section
# titled "Publications" with entries grouped by year (descending).
#
# Citation style is derived from existing bib fields only (no extra fields):
#   Authors, "Title," in Proc. {series}[, pp. X-Y][ (note)]            (series)
#   Authors, "Title," in Proc. {ABBR} '{yy}[, pp. X-Y]   (booktitle ends "(ABBR)")
#   Authors, "Title," in {booktitle}[, pp. X-Y]                  (no abbreviation)
#   Authors, "Title," {journal}[, vol. V][, no. N][, pp. X-Y]        (@article)
# Titles link to html / url / doi when one is present.
module Jekyll
  class CvPublications < Generator
    safe true
    priority :high

    def generate(site)
      scholar = site.config["scholar"] || {}
      source = (scholar["source"] || "/_bibliography/").gsub(%r{\A/|/\z}, "")
      file = scholar["bibliography"] || "papers.bib"
      path = File.join(site.source, source, file)
      return unless File.exist?(path)

      contents = build_contents(File.read(path), Array(scholar["last_name"]), Array(scholar["first_name"]))
      return if contents.empty?

      section = Array(site.data["cv"]).find do |s|
        s.is_a?(Hash) && s["title"] == "Publications"
      end
      section["contents"] = contents if section
    end

    # Returns [{ "year" => Int, "items" => [String, ...] }, ...] for the CV.
    # last_names/first_names identify the site owner so their name can be
    # emphasized (bold + underline) within each author list.
    def build_contents(raw, last_names = [], first_names = [])
      @my_last_names = last_names.map { |x| x.to_s.strip }
      @my_first_names = first_names.map { |x| x.to_s.strip }
      by_year = {}
      raw.scan(/^@(\w+)\s*\{(.*?)(?=^@\w|\z)/m) do |type, body|
        type = type.downcase
        next unless %w[article inproceedings conference].include?(type)
        fields = parse_fields(body)
        year = fields["year"].to_s[/\d{4}/]
        next if year.nil?
        cite = format_entry(type, fields, year)
        next if cite.nil?
        (by_year[year] ||= []) << cite
      end

      by_year.keys.sort_by { |y| -y.to_i }.map do |y|
        { "year" => y.to_i, "items" => by_year[y] }
      end
    end

    private

    def parse_fields(body)
      fields = {}
      body.each_line do |line|
        if (m = line.match(/^\s*(\w+)\s*=\s*\{(.*)\}\s*,?\s*$/))
          fields[m[1].downcase] = m[2].strip
        end
      end
      fields
    end

    def format_entry(type, f, year)
      return nil unless f["author"] && f["title"]
      title = f["title"].gsub(/[{}]/, "").strip
      link = f["html"] || f["url"] || (f["doi"] ? "https://doi.org/#{f["doi"]}" : nil)
      title = %(<a href="#{link}" target="_blank" rel="noopener noreferrer">#{title}</a>) if link
      venue = type == "article" ? journal_venue(f) : conf_venue(f, year)
      %(#{format_authors(f["author"])}, "#{title}," #{venue}).strip
    end

    def conf_venue(f, year)
      if present?(f["series"])
        base = "Proc. #{f["series"]}"
      elsif (abbr = f["booktitle"].to_s[/\(([^)]+)\)\s*\z/, 1])
        base = "Proc. #{abbr} '#{year[-2..]}"
      else
        base = f["booktitle"].to_s
      end
      out = "in #{base}"
      out += ", pp. #{pages(f)}" if present?(f["pages"])
      out += " (#{f["note"]})" if present?(f["note"])
      out
    end

    def journal_venue(f)
      parts = [f["journal"]]
      parts << "vol. #{f["volume"]}" if present?(f["volume"])
      parts << "no. #{f["number"]}" if present?(f["number"])
      parts << "pp. #{pages(f)}" if present?(f["pages"])
      parts.compact.join(", ")
    end

    def pages(f)
      f["pages"].gsub("--", "-")
    end

    def format_authors(raw)
      names = raw.split(/\s+and\s+/).map { |n| abbreviate(n) }
      case names.length
      when 0 then ""
      when 1 then names[0]
      when 2 then "#{names[0]} and #{names[1]}"
      else "#{names[0..-2].join(", ")}, and #{names[-1]}"
      end
    end

    def abbreviate(name)
      name = name.gsub(/[*†‡§¶‖&^]/, "").strip
      if name.include?(",")
        last, given = name.split(",", 2)
      else
        toks = name.split(/\s+/)
        last = toks.pop
        given = toks.join(" ")
      end
      last = last.to_s.strip
      given = given.to_s.strip
      initials = given.split(/\s+/).map { |g| "#{g[0]}." }.join(" ")
      formatted = [initials, last].reject(&:empty?).join(" ")
      mine?(last, given) ? "<u><strong>#{formatted}</strong></u>" : formatted
    end

    # True when the author is the site owner, matched against the scholar
    # last_name / first_name config (first name or its initial).
    def mine?(last, given)
      return false unless Array(@my_last_names).any? { |l| l.casecmp?(last) }
      token = given.to_s.split(/\s+/).first.to_s
      return false if token.empty?
      Array(@my_first_names).any? { |f| f.casecmp?(token) || f.casecmp?("#{token[0]}.") }
    end

    def present?(value)
      !value.nil? && !value.to_s.strip.empty?
    end
  end
end

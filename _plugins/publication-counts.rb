# Derives publication counts from the jekyll-scholar bibliography and exposes
# them as site.pub_counts so the publications page header (and any other page)
# can show numbers that update automatically when _bibliography/papers.bib
# changes -- no more hand-editing the totals.
#
# Counts mirror exactly what the publications page renders: only @article and
# @inproceedings entries tagged keywords={international} or keywords={domestic}.
module Jekyll
  class PublicationCounts < Generator
    safe true
    priority :high

    SCOPES = %w[international domestic].freeze

    def generate(site)
      scholar = site.config["scholar"] || {}
      source = (scholar["source"] || "/_bibliography/").gsub(%r{\A/|/\z}, "")
      file = scholar["bibliography"] || "papers.bib"
      path = File.join(site.source, source, file)
      return unless File.exist?(path)

      counts = {
        "international_journal" => 0,
        "international_conference" => 0,
        "domestic_journal" => 0,
        "domestic_conference" => 0,
      }

      raw = File.read(path)
      # Chunk the file into entry blocks: from one line-leading @type{ up to the
      # next one (or end of file), then read each block's type and keywords.
      raw.scan(/^@(\w+)\s*\{(.*?)(?=^@\w|\z)/m) do |type, body|
        kind =
          case type.downcase
          when "article" then "journal"
          when "inproceedings", "conference" then "conference"
          end
        next unless kind

        keywords = body[/keywords\s*=\s*\{([^}]*)\}/i, 1].to_s.downcase
        scope = SCOPES.find { |s| keywords.include?(s) }
        next unless scope

        counts["#{scope}_#{kind}"] += 1
      end

      ordered = [
        ["international_journal", "international", "journal"],
        ["international_conference", "international", "conference"],
        ["domestic_journal", "domestic", "journal"],
        ["domestic_conference", "domestic", "conference"],
      ]

      summary = ordered.filter_map do |key, scope, noun|
        n = counts[key]
        next if n.zero?
        "#{n} #{scope} #{n == 1 ? noun : "#{noun}s"}"
      end.join(", ")

      site.config["pub_counts"] = counts.merge(
        "total" => counts.values.sum,
        "summary" => summary,
      )
    end
  end
end

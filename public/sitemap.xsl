<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>agetolabs · sitemap</title>
        <style>
          :root {
            color-scheme: dark;
          }
          * { box-sizing: border-box; }
          html, body {
            margin: 0;
            padding: 0;
            background: #0A0A0B;
            color: #E5E7EB;
            font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.55;
            -webkit-font-smoothing: antialiased;
          }
          .page {
            max-width: 1280px;
            margin: 0 auto;
            padding: 40px 24px 80px;
          }
          .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 11px;
            letter-spacing: 0.32em;
            text-transform: uppercase;
            color: rgba(142, 240, 181, 0.85);
            margin-bottom: 16px;
          }
          .eyebrow::before {
            content: "";
            display: inline-block;
            width: 28px;
            height: 1px;
            background: rgba(142, 240, 181, 0.6);
          }
          h1 {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin: 0 0 8px;
            color: #FFFFFF;
          }
          .lede {
            color: #9CA3AF;
            margin: 0 0 28px;
            max-width: 64ch;
          }
          .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 32px;
            font-size: 12px;
          }
          .chip {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: #D1D5DB;
          }
          .chip strong {
            color: #8EF0B5;
            font-weight: 600;
          }
          .table-wrap {
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            overflow: hidden;
            background: rgba(19, 21, 26, 0.7);
            backdrop-filter: blur(12px);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          thead th {
            text-align: left;
            font-weight: 600;
            font-size: 11px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #9CA3AF;
            padding: 14px 18px;
            background: rgba(255, 255, 255, 0.025);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            position: sticky;
            top: 0;
          }
          tbody td {
            padding: 12px 18px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            vertical-align: middle;
          }
          tbody tr:last-child td {
            border-bottom: none;
          }
          tbody tr:hover {
            background: rgba(142, 240, 181, 0.04);
          }
          a {
            color: #8EF0B5;
            text-decoration: none;
            transition: color 0.15s;
            word-break: break-all;
          }
          a:hover {
            color: #FFFFFF;
            text-decoration: underline;
            text-underline-offset: 3px;
          }
          .locale-tag {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: ui-monospace, monospace;
            font-size: 10px;
            font-weight: 700;
            margin-right: 8px;
            letter-spacing: 0.05em;
          }
          .locale-tr {
            background: rgba(239, 68, 68, 0.12);
            color: #FCA5A5;
          }
          .locale-en {
            background: rgba(59, 130, 246, 0.12);
            color: #93C5FD;
          }
          .locale-other {
            background: rgba(255, 255, 255, 0.06);
            color: #9CA3AF;
          }
          .priority {
            font-family: ui-monospace, monospace;
            font-size: 12px;
            color: #D1D5DB;
          }
          .priority-bar {
            display: inline-block;
            width: 64px;
            height: 4px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 999px;
            margin-left: 8px;
            position: relative;
            vertical-align: middle;
            overflow: hidden;
          }
          .priority-bar-fill {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: linear-gradient(90deg, #8EF0B5, #a855f7);
            border-radius: 999px;
          }
          .freq {
            font-family: ui-monospace, monospace;
            font-size: 11px;
            color: #9CA3AF;
            text-transform: lowercase;
          }
          .lastmod {
            font-family: ui-monospace, monospace;
            font-size: 11px;
            color: #9CA3AF;
            white-space: nowrap;
          }
          .footer {
            margin-top: 32px;
            font-size: 12px;
            color: #6B7280;
          }
          .footer a {
            color: #9CA3AF;
          }
          @media (max-width: 720px) {
            .page { padding: 24px 16px 48px; }
            h1 { font-size: 24px; }
            thead th { display: none; }
            tbody td { display: block; padding: 6px 16px; border-bottom: none; }
            tbody tr {
              display: block;
              padding: 14px 0;
              border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            tbody tr td:first-child { padding-top: 14px; font-size: 14px; }
            .priority-bar { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="eyebrow">agetolabs · sitemap</div>
          <h1>XML sitemap</h1>
          <p class="lede">
            Bu sayfa Google ve diğer arama motorları için üretilmiştir. Aşağıda sitenin TR ve EN sürümlerindeki indekslenebilir URL'ler listelenmiştir.
          </p>

          <div class="meta">
            <span class="chip">
              <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
              <span>URL</span>
            </span>
            <span class="chip">
              <strong>2</strong>
              <span>locale (tr · en)</span>
            </span>
            <span class="chip">
              <span>hreflang</span>
              <strong>enabled</strong>
            </span>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Last modified</th>
                  <th>Frequency</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:sort select="sitemap:priority" order="descending" data-type="number"/>
                  <tr>
                    <td>
                      <xsl:variable name="loc" select="sitemap:loc"/>
                      <xsl:choose>
                        <xsl:when test="contains($loc, '/tr/') or substring-after($loc, 'agetolabs.com/') = 'tr'">
                          <span class="locale-tag locale-tr">TR</span>
                        </xsl:when>
                        <xsl:when test="contains($loc, '/en/') or substring-after($loc, 'agetolabs.com/') = 'en'">
                          <span class="locale-tag locale-en">EN</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="locale-tag locale-other">·</span>
                        </xsl:otherwise>
                      </xsl:choose>
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td class="lastmod">
                      <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                    </td>
                    <td class="freq">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td class="priority">
                      <xsl:value-of select="sitemap:priority"/>
                      <span class="priority-bar">
                        <span class="priority-bar-fill">
                          <xsl:attribute name="style">
                            width: <xsl:value-of select="number(sitemap:priority) * 100"/>%;
                          </xsl:attribute>
                        </span>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <p class="footer">
            Görüntülenen XML sitemap dosyası kaynak kodu için
            <a href="javascript:void(0)" onclick="document.body.innerHTML = '&lt;pre&gt;' + new XMLSerializer().serializeToString(document.implementation.createDocument(null, null)) + '&lt;/pre&gt;'">sayfa kaynağı</a>'na bakabilirsiniz. — <a href="https://agetolabs.com/">agetolabs.com</a>
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

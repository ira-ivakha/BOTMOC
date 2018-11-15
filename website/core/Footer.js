/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('1-why-use-it.html', this.props.language)}>Getting Started</a>
            <a href={this.docUrl('1.3-download.html', this.props.language)}>Download</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="http://stackoverflow.com/questions/tagged/" target="_blank" rel="noreferrer noopener">
              Stack Overflow
            </a>
            <a href="https://masterofcode.com">Master of Code</a>
          </div>
          <div>
            <h5>More</h5>

            <a href="https://github.com/davidbudnick/BOTMOC">GitHub</a>
            <a
              className="github-button"
              href="https://github.com/davidbudnick/BOTMOC"
              data-icon="octicon-star"
              aria-label="Star davidbudnick/BOTMOC on GitHub"
            >
              Star
            </a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;

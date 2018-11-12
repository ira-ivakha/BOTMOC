/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? `${language}/` : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = (props) => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const CustomButton = () => (
  <a className="customButton" href={docUrl('1-why-use-botmoc.html')}>
    Documenation
  </a>
);

const ProjectTitle = () => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const Features = () => (
  <Block layout="threeColumn">
    {[
      {
        content: 'A collection of all facebook elements',
        image: imgUrl('homepage/facebook.png'),
        imageAlign: 'top',
        title: 'Facebook Elements',
      },
      {
        content: 'Integrated with Figma a leading online desing program',
        image: imgUrl('homepage/figma.jpg'),
        imageAlign: 'top',
        title: 'Figma Integration',
      },
      {
        content: 'Designed internally by Master of Code',
        image: imgUrl('homepage/logo.png'),
        imageAlign: 'top',
        title: 'Designed by MOC',
      },
    ]}
  </Block>
);

const PromoSection = (props) => (
  <div className="section promoSection buttonPadding">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href="botmoc.fig">Download Now</Button>
            <CustomButton />
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = (props) => (
  <Container padding={['bottom', 'top']} id={props.id} background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const BlockCustom = (props) => (
  <Container padding={['bottom', 'top']} id={props.id} background={props.background}>
    <GridBlock align="left" contents={props.children} layout={props.layout} />
  </Container>
);

const LearnHow = () => (
  <BlockCustom background="light" className="leftAlignIndex">
    {[
      {
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in convallis est. Suspendisse et sapien sed felis placerat sollicitudin. Donec egestas, ante congue feugiat mollis, nunc dolor pretium mauris, vitae mollis felis felis in purus. Phasellus nec sem tincidunt, mattis metus egestas, dignissim augue. Fusce a quam tincidunt, commodo sapien at, euismod elit.',
        image: imgUrl('homepage/logo.png'),
        imageAlign: 'right',
        title: 'Quick Setup',
      },
    ]}
  </BlockCustom>
);

const Description = () => (
  <BlockCustom background="dark">
    {[
      {
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in convallis est. Suspendisse et sapien sed felis placerat sollicitudin. Donec egestas, ante congue feugiat mollis, nunc dolor pretium mauris, vitae mollis felis felis in purus. Phasellus nec sem tincidunt, mattis metus egestas, dignissim augue. Fusce a quam tincidunt, commodo sapien at, euismod elit. ',
        image: imgUrl('/homepage/logo.png'),
        imageAlign: 'left',
        title: 'About Product',
      },
    ]}
  </BlockCustom>
);

const Showcase = (props) => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }

  const showcase = siteConfig.users
    .filter((user) => user.pinned)
    .map((user) => (
      <a href={user.infoLink} key={user.infoLink}>
        <img src={user.image} alt={user.caption} title={user.caption} />
      </a>
    ));

  return (
    <div className="productShowcaseSection paddingTop">
      <h2>Who is Using This?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in convallis est. Suspendisse et sapien sed felis
        placerat sollicitudin. Donec egestas, ante congue feugiat mollis, nunc dolor pretium mauris, vitae mollis felis
        felis.
      </p>
      <div className="logos">{showcase}</div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    const language = this.props.language || '';
    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <LearnHow />
          <Description />
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
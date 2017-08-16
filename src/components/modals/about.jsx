import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { browserHistory, Link } from 'react-router';
import { Overlay } from '../general/general';
import { C, actions } from '../../core/core';


class AboutOverlay extends React.Component {
  close () {
    browserHistory.push('/');
  }

  selectTab (e, tab) {
    e.preventDefault();
    const { selectedTab, dispatch } = this.props;
    if (tab === selectedTab) {
      return;
    }
    dispatch(actions.selectAboutTab(tab));
  }

  getTabContent () {
    const { selectedTab, intl } = this.props;
    if (selectedTab === C.ABOUT_TABS.ABOUT) {
      return <AboutTab intl={intl} />;
    } else if (selectedTab === C.ABOUT_TABS.HISTORY) {
      return <HistoryTab intl={intl} />;
    } else if (selectedTab === C.ABOUT_TABS.TRANSLATE) {
      return <TranslateTab intl={intl} />;
    } else if (selectedTab === C.ABOUT_TABS.CONTACT) {
      return <ContactTab intl={intl} />;
    }
  }

  render () {
    const { selectedTab } = this.props;

    const aboutClasses = (selectedTab === C.ABOUT_TABS.ABOUT) ? 'active' : '';
    const historyClasses = (selectedTab === C.ABOUT_TABS.HISTORY) ? 'active' : '';
    const translateClasses = (selectedTab === C.ABOUT_TABS.TRANSLATE) ? 'active' : '';
    const contactClasses = (selectedTab === C.ABOUT_TABS.CONTACT) ? 'active' : '';

    return (
      <Overlay id="about-overlay" showCloseIcon={true} onClose={this.close}>
        <div>
          <ul className="nav nav-pills">
            <li className={aboutClasses}><a href="about" onClick={(e) => this.selectTab(e, C.ABOUT_TABS.ABOUT)}><FormattedMessage id="about" /></a></li>
            <li className={historyClasses}><a href="about" onClick={(e) => this.selectTab(e, C.ABOUT_TABS.HISTORY)}><FormattedMessage id="history" /></a></li>
            <li className={translateClasses}><a href="about" onClick={(e) => this.selectTab(e, C.ABOUT_TABS.TRANSLATE)}><FormattedMessage id="translate" /></a></li>
            <li className={contactClasses}><a href="about/" onClick={(e) => this.selectTab(e, C.ABOUT_TABS.CONTACT)}><FormattedMessage id="contact" /></a></li>
          </ul>
          {this.getTabContent()}
        </div>
      </Overlay>
    );
  }
}

export default injectIntl(connect(state => ({
  selectedTab: state.aboutOverlay.selectedTab
}))(AboutOverlay));


const AboutTab = ({ intl }) => (
  <div>
    <img src="/images/photos/sandhill.png" width="200" height="149" className="photo" title="Sandhill crane, BC, Canada" alt="" />
    <p>
      <FormattedMessage id="aboutPara1"
        values={{
          birdsearchSite: <i>birdsearch.org</i>,
          week: <b>{intl.formatMessage({ id: 'week' })}</b>,
          month: <b>{intl.formatMessage({ id: 'month' })}</b>,
          settingsLink: <Link to="/settings">{intl.formatMessage({ id: 'searchSettings' }).toLowerCase()}</Link>
        }} />
    </p>
    <p>
      <FormattedMessage id="aboutPara2"
        values={{ eBirdSiteLink: <a href="http://ebird.org" target="_blank" rel="noopener noreferrer">eBird.org</a> }} />
    </p>
  </div>
);


const HistoryTab = ({ intl }) => (
  <div>
    <p>
      <FormattedMessage id="historyPara1"
        values={{ eBirdSiteLink: <a href="http://ebird.org" target="_blank" rel="noopener noreferrer">eBird.org</a> }} />
    </p>
    <p>
      <FormattedMessage id="historyPara2" values={{ rightNow: <i>{intl.formatMessage({ id: 'rightNow' })}</i> }} />
    </p>
  </div>
);


const TranslateTab = ({ intl }) => (
  <div>
    <img src="/images/photos/magenta-throated-woodstar.png" width="200" height="150" className="photo"
      title="Magenta-throated woodstar, Costa Rica" alt="" />
    <p>
      <FormattedMessage id="translatePara1"
        values={{
          githubLink: <a href="https://github.com/benkeen/birdsearch.org/tree/master/src/i18n" target="_blank" rel="noopener noreferrer">{intl.formatMessage({ id: 'foundHere' })}</a>
        }} />
    </p>
  </div>
);


const ContactTab = ({ intl }) => (
  <div>
    <img src="/images/photos/snowy.png" width="200" height="147" className="photo" title="Snowy egret, Mexico" alt="" />
    <p>
      <FormattedMessage id="contactPara1"
        values={{
          postLink: <a href="https://github.com/benkeen/birdsearch.org/issues" target="_blank" rel="noopener noreferrer">github</a>,
          email: <a href="mailto:ben.keen@gmail.com">ben.keen@gmail.com</a>
        }} />
    </p>
    <p>
      <FormattedMessage id="contactPara2"
        values={{
          openSourceLink: <a href="http://github.com/benkeen/birdsearch.org" target="_blank" rel="noopener noreferrer">{intl.formatMessage({ id: 'openSource' })}</a>
        }} />
    </p>
  </div>
);

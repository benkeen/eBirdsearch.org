import styled from 'styled-components';
import { C } from '../../core/core';


const StyledHeader = styled.header`
.navbar {
  line-height: 56px;

  .brand {
    cursor: pointer;
    background: transparent url(../../images/bird-silhoette.png) left center no-repeat;
    margin: 0 0 0 15px;
    padding: 15px 0 15px 40px;
    color: #ffffff;
    font-family: ${C.STYLES.WEBFONT};
    font-size: 24px;
    display: block;
    float: left;
  }
  .beta {
    background: rgba(34,111,136,1);
    background: -moz-linear-gradient(top, rgba(34,111,136,1) 0%, rgba(28,97,120,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(34,111,136,1)), color-stop(100%, rgba(28,97,120,1)));
    background: -webkit-linear-gradient(top, rgba(34,111,136,1) 0%, rgba(28,97,120,1) 100%);
    background: -ms-linear-gradient(top, rgba(34,111,136,1) 0%, rgba(28,97,120,1) 100%);
    background: linear-gradient(to bottom, rgba(34,111,136,1) 0%, rgba(28,97,120,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#226f88', endColorstr='#1c6178', GradientType=0 );
    color: white;
    border-radius: 2px;
    padding: 2px 10px 3px;
    font-size: 10px;
    margin: 0 0 0 10px;
    vertical-align: middle;
  }
}

.tagLine {
  font-size: 10px;
}
a {
  color: #cccccc;
}
.nav {
  margin-bottom: 0;
}

#select-locale {
  margin: 0;
  padding: 5px;
  width: 90px;
  height: 30px;
  color: #333333;
}

.header-search {
  position: relative;
  display: flex;
  height: 60px;
  input {
    margin: 13px;
    padding: 0 10px;
  }
  button {
    margin-left: 4px;
  }
}

.nav-items {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  font-size: 9pt;
  li {
    flex: 0 0 auto;
    font-size: 11pt;
    a {
      display: inline-block;
      padding: 21px 16px;
    }
    &.lang-toggle {
        padding: 15px;
      }
    }
  }
}

.location-error {
  position: absolute;
  width: 100%;
  top: 51px;
  margin-left: 14px;
  padding-right: 27px;
  font-size: 12pt;
  z-index: 4;

  div div {
    padding: 10px;
    border-radius: 3px;
    background-color: #FFBABA;
    color: #bb0000;
  }
}

#intro-tooltip {
  top: 66px !important;
  left: 306px !important;
  opacity: 1;
  transition: opacity 300ms ease-in;

  &.is-hidden {
    opacity: 0;
    visibility: hidden;
  }

  .tooltip-arrow {
    top: -5px;
    border-width: 0 10px 10px;
    border-bottom-color: #ffffff;
    border-right-color: transparent;
    left: 46%;
  }

  .tooltip-inner {
    background-color: white;
    color: #111111;
    font-size: 16px;
    padding: 16px;
    max-width: 350px;
    text-align: left;
    line-height: 24px;
  }
  .close-panel {
    float: right;
    margin: -4px -4px 0 0;
    color: #b9b9b9;
    &:hover {
      color: #333333;
    }
  }
}

.report-sightings-icon {
  border-radius: 0;
  margin: 0;
  padding: 17px 14px 14px;
  font-size: 19px;
  &:focus {
    outline: none;
  }
}

#report-sightings-btn {
  box-shadow: none;
  display: inline-block;
  &:after {
    content: '';
  }
}


@keyframes bounce {
  0% {
    transform: translateY(20px);
  }
  15%, 45%, 80%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(12px);
  }
  60% {
    transform: translateY(4px);
  }
}

.bounce {
  animation: 1.8s bounce;
}

#report-sightings-tooltip {
  top: 59px !important;
}`;

export default StyledHeader;

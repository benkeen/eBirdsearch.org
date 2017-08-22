import { injectGlobal } from 'styled-components';

// French overrides
injectGlobal`
.fr {
  #intro-overlay button {
    width: 200px;
    float: left;
    margin-top: 2px;
  }
  #locations-panel .location {
    width: 250px;
  }
  #locations-panel .location div {
    width: 230px;
  }
}

@media (max-width: 768px) {
  .fr {
    #intro-overlay button {
      width: 100%;
      float: none;
    }

    #locations-panel .location {
      width: 100%;
      div {
        width: 100%;
      }
    }
  }
}
`;
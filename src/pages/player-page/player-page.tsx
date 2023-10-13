import { Helmet } from 'react-helmet-async';
import './player-page.css';

function PlayerPage(): JSX.Element {
  return (
    <div className="player">
      <Helmet>
        <title>Что посмотреть. Видеоплеер</title>
      </Helmet>
      <video src="#" className="player__video" poster="img/player-poster.jpg" />
      <button type="button" className="player__exit">
        Exit
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={30} max={100} />
            <div className="player__toggler">
              Toggler
            </div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg className="player__play--icon-item" viewBox="0 0 19 19">
              <use xlinkHref="#play-s" />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen">
            <svg className="player__full-screen--icon-item" viewBox="0 0 27 27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;

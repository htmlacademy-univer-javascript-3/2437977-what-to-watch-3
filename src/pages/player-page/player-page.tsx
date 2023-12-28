import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';

import './player-page.css';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import { fetchFilmByID } from '@store/api-actions';
import { getFilm } from '@store/film-reducer/film-selectors';
import { Reducer } from '@consts/consts';
import Loader from '@components/loader/loader';
import { getTimeLeft } from '@components/extra-functions/get-time-left';
import PlayerState from '@components/player-state/player-state';
import { errorHandle } from '@services/error-handle';

function Player() {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();
  const currentFilm = useAppSelector(getFilm);
  const isFilmLoadingStatus = useAppSelector((state) => state[Reducer.FILM_REDUCER].isFilmLoading);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPause, setIsPause] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const progressRef = useRef(null);
  const [progressPosition, setProgressPosition] = useState(0);

  const updateTime = () => {
    if (videoRef.current) {
      setTimeLeft(Math.round(videoRef.current?.duration - videoRef.current?.currentTime));
      setProgressPosition((videoRef.current?.currentTime * 100) / videoRef.current?.duration);
    }
  };

  const handleActByPlayPauseClick = () => {
    if (videoRef.current) {
      if (isPause) {
        videoRef.current.play();
        setIsPause(false);
      } else {
        videoRef.current.pause();
        setIsPause(true);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted && id) {
      dispatch(fetchFilmByID(id))
        .catch((err: AxiosError) => errorHandle(`Something went wrong. ${err.message}`));
      setIsPause(true);
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  if (!currentFilm) {
    return null;
  }

  if (isFilmLoadingStatus) {
    return <Loader />;
  }

  return (
    <div className="player">
      <video
        src={currentFilm?.videoLink}
        className="player__video"
        poster={currentFilm?.posterImage}
        ref={videoRef}
        onTimeUpdate={updateTime}
      >
      </video>

      <Link to={`/films/${currentFilm?.id}`} type="button" className="player__exit">
        Exit
      </Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100" />
            <div className="player__toggler" style={{ left: `${progressPosition}%` }} ref={progressRef}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeLeft(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handleActByPlayPauseClick}>
            {isPause
              ? <PlayerState viewBox={'0 0 19 19'} width={19} height={19} xlinkHref={'#play-s'} state={'Play'} />
              : <PlayerState viewBox={'0 0 14 21'} width={14} height={21} xlinkHref={'#pause'} state={'Pause'} />}
          </button>
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen" onClick={() => {
            videoRef.current?.requestFullscreen();
          }}
          >
            <PlayerState viewBox={'0 0 27 27'} width={27} height={27} xlinkHref={'#full-screen'} state={'Full screen'} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Player;

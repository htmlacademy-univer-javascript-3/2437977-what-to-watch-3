import { Action, ThunkDispatch } from '@reduxjs/toolkit';

import { Genre } from '@consts/consts';
import { Film, Review, State } from '../components/types';
import { createAPI } from '@services/api';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const takeTestFilm = (): Film => ({
  id: 'lalala',
  name: 'The Grand Budapest Hotel',
  genre: Genre.Drama,
  released: 2011,
  previewImage: 'img/the-grand-budapest-hotel-poster.jpg',
  posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
  backgroundImage: 'img/bg-the-grand-budapest-hotel.jpg',
  scoresCount: 154,
  rating: 8.9,
  description:
    'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. \
    (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege. \
    Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the \
    many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless \
    painting and the chief suspect in her murder.',
  director: 'Wes Anderson',
  starring: ['Jared Gilman', 'Kara Hayward', 'Bruce Willis'],
  runTime: '94',
  previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  videoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
  isFavorite: false,
});

export const takeTestFilms = (): Film[] => [
  {
    id: 'lalala',
    name: 'The Grand Budapest Hotel',
    genre: Genre.Drama,
    released: 2011,
    previewImage: 'img/the-grand-budapest-hotel-poster.jpg',
    posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
    backgroundImage: 'img/bg-the-grand-budapest-hotel.jpg',
    scoresCount: 154,
    rating: 8.9,
    description:
      'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. \
      (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege. \
      Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the \
      many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless \
      painting and the chief suspect in her murder.',
    director: 'Wes Anderson',
    starring: ['Jared Gilman', 'Kara Hayward', 'Bruce Willis'],
    runTime: '94',
    previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    videoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    isFavorite: false,
  },
  {
    id: 'lololo',
    name: 'Orlando',
    genre: Genre.Drama,
    released: 1992,
    previewImage: 'https://10.react.pages.academy/static/film/preview/orlando.jpg',
    posterImage: 'https://10.react.pages.academy/static/film/poster/Orlando.jpg',
    backgroundImage: 'https://10.react.pages.academy/static/film/background/Orlando.jpg',
    scoresCount: 14422,
    rating: 2.6,
    description:
      'Young nobleman Orlando is commanded by Queen Elizabeth I to stay forever young. Miraculously, he does just that. The film follows him as he moves through several centuries of British history, experiencing a variety of lives and relationships along the way, and even changing sex.',
    director: 'Sally Potter',
    starring: ['Tilda Swinton', 'Billy Zane', 'Quentin Crisp'],
    runTime: '94',
    previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    videoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    isFavorite: false,
  }
];

export const takeTestReviews = (): Review[] => [
  {
    id: 1,
    rating: 8.0,
    user: 'Amanda Greever',
    date: 'November 18, 2015',
    comment: 'It\'s a good film for watching with your family. My daughter was in a perfect mood all day after watching, thanks for it!'
  },
  {
    id: 2,
    rating: 8.0,
    user: 'Bill Goodykoontz',
    date: 'November 18, 2015',
    comment: 'I adore it! During the watching I was thinking about my husband and how I love him/'
  },
  {
    id: 3,
    rating: 2.0,
    user: 'Abbad Joringhton',
    date: 'April 8, 2005',
    comment: 'I didn\'t see something worse than that. I just want to wash my eyes with soap/'
  },
];

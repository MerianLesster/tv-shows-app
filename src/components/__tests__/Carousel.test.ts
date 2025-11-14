import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Carousel from '../Carousel.vue'
import type { IMovie } from '@/types/index'

// Mock the router
vi.mock('@/router', () => ({
  router: {
    push: vi.fn(),
  },
}))

// Mock the store
vi.mock('@/store/useMovies', () => ({
  useMovies: () => ({
    addOrRemoveFavorites: vi.fn(),
  }),
}))

// Mock PrimeVue Carousel component
vi.mock('primevue/carousel', () => ({
  default: {
    name: 'Carousel',
    template:
      '<div class="mock-carousel"><slot name="item" v-for="item in value" :data="item" :key="item.id"></slot></div>',
    props: ['value', 'numVisible', 'numScroll', 'responsiveOptions', 'circular', 'showIndicators'],
  },
}))

const mockMovie: IMovie = {
  id: 1,
  url: 'https://www.tvmaze.com/shows/1/under-the-dome',
  name: 'Under the Dome',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama', 'Science-Fiction', 'Thriller'],
  status: 'Ended',
  runtime: 60,
  averageRuntime: 60,
  premiered: '2013-06-24',
  ended: '2015-09-10',
  officialSite: 'http://www.cbs.com/shows/under-the-dome/',
  isFavorite: false,
  schedule: {
    time: '22:00',
    days: ['Thursday'],
  },
  rating: {
    average: 6.5,
  },
  weight: 98,
  network: {
    id: 2,
    name: 'CBS',
    country: {
      name: 'United States',
      code: 'US',
      timezone: 'America/New_York',
    },
    officialSite: 'https://www.cbs.com/',
  },
  webChannel: null,
  dvdCountry: null,
  externals: {
    tvrage: 25988,
    thetvdb: 264492,
    imdb: 'tt1553656',
  },
  image: {
    medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
    original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
  },
  summary:
    '<p>Under the Dome is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome.</p>',
  updated: 1704794065,
  _links: {
    self: {
      href: 'https://api.tvmaze.com/shows/1',
    },
  },
}

describe('Carousel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('renders movie items correctly and handles navigation click', async () => {
    const movies = [mockMovie]

    const wrapper = mount(Carousel, {
      props: {
        movies,
      },
      global: {
        stubs: {
          Carousel: {
            template:
              '<div class="mock-carousel"><slot name="item" v-for="item in value" :data="item" :key="item.id"></slot></div>',
            props: [
              'value',
              'numVisible',
              'numScroll',
              'responsiveOptions',
              'circular',
              'showIndicators',
            ],
          },
        },
      },
    })

    // Check if movie name is rendered
    expect(wrapper.text()).toContain('Under the Dome')

    // Check if rating is displayed
    expect(wrapper.text()).toContain('6.5')

    // Check if genres are rendered
    expect(wrapper.text()).toContain('Drama')
    expect(wrapper.text()).toContain('Science-Fiction')
    expect(wrapper.text()).toContain('Thriller')

    // Find and click the movie item (not the favorite button)
    const movieItem = wrapper.find('.w-full.pr-2.cursor-pointer')
    expect(movieItem.exists()).toBe(true)

    await movieItem.trigger('click')

    // Verify router navigation was called with correct movie id
    const { router } = await import('@/router')
    expect(vi.mocked(router.push)).toHaveBeenCalledWith('/1')
  })

  it('displays correct heart icon state based on favorite status', async () => {
    // Test with favorite movie
    const favoriteMovie = { ...mockMovie, isFavorite: true }
    const wrapperFavorite = mount(Carousel, {
      props: {
        movies: [favoriteMovie],
      },
      global: {
        stubs: {
          Carousel: {
            template:
              '<div class="mock-carousel"><slot name="item" v-for="item in value" :data="item" :key="item.id"></slot></div>',
            props: [
              'value',
              'numVisible',
              'numScroll',
              'responsiveOptions',
              'circular',
              'showIndicators',
            ],
          },
        },
      },
    })

    // Check if the heart icon shows as filled (favorite)
    const favoriteButton = wrapperFavorite.find('button')
    expect(favoriteButton.exists()).toBe(true)

    const heartIcon = favoriteButton.find('i')
    expect(heartIcon.classes()).toContain('pi-heart-fill')
    expect(heartIcon.classes()).toContain('text-favourite-500')

    // Test with non-favorite movie
    const nonFavoriteMovie = { ...mockMovie, isFavorite: false }
    const wrapperNonFavorite = mount(Carousel, {
      props: {
        movies: [nonFavoriteMovie],
      },
      global: {
        stubs: {
          Carousel: {
            template:
              '<div class="mock-carousel"><slot name="item" v-for="item in value" :data="item" :key="item.id"></slot></div>',
            props: [
              'value',
              'numVisible',
              'numScroll',
              'responsiveOptions',
              'circular',
              'showIndicators',
            ],
          },
        },
      },
    })

    // Check if the heart icon shows as empty (not favorite)
    const nonFavoriteButton = wrapperNonFavorite.find('button')
    const nonFavoriteHeartIcon = nonFavoriteButton.find('i')
    expect(nonFavoriteHeartIcon.classes()).toContain('pi-heart')
    expect(nonFavoriteHeartIcon.classes()).not.toContain('pi-heart-fill')
  })
})

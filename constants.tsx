
import { Property, PropertyImage, Category, Complex, ApartmentType, Space, Orientation, FloorLevel } from './types';

export const MOCK_PROPERTY: Property = {
  id: 'prop-101',
  name: '창원중동유니시티아파트',
  complex: '유니시티 3단지',
  address: '경상남도 창원시 의창구 중동로 59',
  createdAt: '2024-05-22',
  youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  categoryVideos: {
    '내부': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '외부': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '조망': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '커뮤니티': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  }
};

export const COMPLEX_TYPES: Record<Complex, ApartmentType[]> = {
  '1단지': ['25ty', '30ty', '35Aty', '35Bty', '41ty', '47ty', '56Aty', '56Bty'],
  '2단지': ['25ty', '30ty', '35Aty', '35Bty', '41ty'],
  '3단지': ['25ty', '30ty', '35Aty', '35Bty', '41ty'],
  '4단지': ['25ty', '30ty', '35Aty', '35Bty', '41ty', '48ty', '56Aty', '56Bty']
};

const createMockImages = (): PropertyImage[] => {
  const images: PropertyImage[] = [];
  const complexes: Complex[] = ['1단지', '2단지', '3단지', '4단지'];
  const spaces: Space[] = ['거실', '주방', '안방', '욕실(거실)'];

  let count = 0;
  complexes.forEach(comp => {
    const availableTypes = COMPLEX_TYPES[comp];
    availableTypes.forEach(type => {
      spaces.forEach(space => {
        images.push({
          id: `img-${count++}`,
          propertyId: 'prop-101',
          category: '내부',
          complex: comp,
          type: type,
          space: space,
          orientation: '남향',
          floorLevel: '중층',
          imageUrl: `https://picsum.photos/seed/unicity-${comp}-${type}-${space}/1200/800`,
          createdAt: '2024-05-22',
        });
      });
    });
  });

  return images;
};

export const MOCK_IMAGES = createMockImages();


export type Category = '내부' | '외부' | '조망' | '커뮤니티';
export type Complex = '1단지' | '2단지' | '3단지' | '4단지';
export type ApartmentType = '25ty' | '30ty' | '35Aty' | '35Bty' | '41ty' | '47ty' | '48ty' | '56Aty' | '56Bty';
export type Space = 
  | '거실' 
  | '주방' 
  | '안방' 
  | '욕실(거실)' 
  | '욕실(안방)' 
  | '작은방1' 
  | '작은방2' 
  | '작은방3' 
  | '작은방4' 
  | '드레스룸' 
  | '펜트리' 
  | '알파룸' 
  | '세탁실' 
  | '외부뷰' 
  | '옵션' 
  | '구조도' 
  | '평면도' 
  | '기타관련이미지';
export type Orientation = '남동향' | '남서향' | '남향';
export type FloorLevel = '저층' | '중층' | '고층';

export interface Property {
  id: string;
  name: string;
  complex: string;
  address: string;
  createdAt: string;
  youtubeUrl?: string; // General video
  categoryVideos?: Record<string, string>; // Mapping of Category name to YouTube URL
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  category: Category;
  complex: Complex;
  type: ApartmentType;
  space: Space;
  orientation: Orientation;
  floorLevel: FloorLevel;
  imageUrl: string;
  createdAt: string;
}

export interface FilterState {
  category: Category | '전체';
  complex: Complex | '전체';
  type: ApartmentType | '전체';
  space: Space | '전체';
}

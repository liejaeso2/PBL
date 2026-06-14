import type { Lion } from '../types/lion';

export const initialLions: Lion[] = [
    {
        id: 1,
        name: '김민수',
        part: 'Frontend',
        age: 23,
        email: 'frontend@example.com',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        introduction: 'React와 UI 구현에 관심이 많은 아기 사자입니다.',
        createdAt: Date.now() - 3000,
    },
    {
        id: 2,
        name: '이석호',
        part: 'Backend',
        age: 24,
        email: 'backend@example.com',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        introduction: 'API와 서버 구조를 공부하고 있습니다.',
        createdAt: Date.now() - 2000,
    },
    {
        id: 3,
        name: '박희민',
        part: 'Design',
        age: 22,
        email: 'design@example.com',
        image: 'https://randomuser.me/api/portraits/men/65.jpg',
        introduction: '사용자가 보기 편한 화면을 만드는 데 관심이 있습니다.',
        createdAt: Date.now() - 1000,
    },
];
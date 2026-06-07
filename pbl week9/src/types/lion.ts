export type Part = 'Frontend' | 'Backend' | 'Design';

export interface Lion {
    id: number;
    name: string;
    part: Part;
    age: number;
    email: string;
    image: string;
    introduction: string;
    createdAt: number;
}

export interface RandomUserResponse {
    results: {
        name: {
            first: string;
            last: string;
        };
        email: string;
        picture: {
            large: string;
        };
        dob: {
            age: number;
        };
    }[];
}
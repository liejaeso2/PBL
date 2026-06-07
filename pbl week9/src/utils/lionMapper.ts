import type { Database } from '../types/database';
import type { Lion } from '../types/lion';

type LionRow =
    Database['public']['Tables']['lions']['Row'];

type LionInsert =
    Database['public']['Tables']['lions']['Insert'];

export function rowToLion(row: LionRow): Lion {
    return {
        id: row.id,
        name: row.name,
        part: row.part,
        age: row.age,
        email: row.email,
        image: row.image,
        introduction: row.introduction,
        createdAt: row.created_at,
    };
}

export function lionToInsert(lion: Lion): LionInsert {
    return {
        id: lion.id,
        name: lion.name,
        part: lion.part,
        age: lion.age,
        email: lion.email,
        image: lion.image,
        introduction: lion.introduction,
        created_at: lion.createdAt,
    };
}
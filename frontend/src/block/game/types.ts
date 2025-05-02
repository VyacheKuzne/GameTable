// Обновленный интерфейс Mob для учета оружия и брони
export interface Mob {
    id: number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    speed: number;
    weaponId: number | null;   // Идентификатор оружия
    armorId: number | null;    // Идентификатор брони
    weapon: Weapon | null;    // Оружие (если есть)
    armor: Armor | null;      // Броня (если есть)
    turnOrder?: any;
    tokenMob?: string
    row: number;
    col: number;
    manevr?: number;
}

// Интерфейс для оружия
export interface Weapon {
    id: number;
    name: string;
    damage: number;
    weight: number;
}

// Интерфейс для брони
export interface Armor {
    id: number;
    name: string;
    defense: number;
    weight: number;
}

// Интерфейс пропсов для MobCell
export interface MobCellProps {
    mob: Mob;                    // Моб, для которого отображаем клетку
    handleMobClick: (mob: Mob) => void; // Обработчик кликов по мобу
    isSelected: boolean;              // Проверка, выбран ли моб
    cellSize: number;                 // Размер клетки
}
export interface Member {
    id: number;
    name: string;
    secondname: string;
    email: string;
    phone: string;
    password: string; // В большинстве случаев не стоит передавать это на клиент
    nickname: string;
    createdAt: string; // Date можно тоже, если не сериализовано
    updateAt: string;
    role: string;
    status: string;
    idTariff?: number | null;
    createdSessionId?: string | null;
    idSession?: string | null;
  }
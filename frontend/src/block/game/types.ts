// Обновленный интерфейс MobBlock для учета оружия и брони
export interface MobBlock {
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
    row: number;
    col: number;
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
    mob: MobBlock;                    // Моб, для которого отображаем клетку
    handleMobClick: (mob: MobBlock) => void; // Обработчик кликов по мобу
    isSelected: boolean;              // Проверка, выбран ли моб
    cellSize: number;                 // Размер клетки
}

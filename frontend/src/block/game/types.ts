export interface MobBlock {
    id: number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    speed: number;
    weaponId: number | null;
    armorId: number | null;
    turnOrder?: any;
    row: number;
    col: number;
}
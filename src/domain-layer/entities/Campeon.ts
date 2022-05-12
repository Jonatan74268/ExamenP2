import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Campeon {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, zerofill: true })
  public id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  public nombre: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  public alias: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  public rol: string;
  
  @Column({ type: 'varchar', length: 10, nullable: false })
  public dificultad: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  public historia: string;
  
  @Column({ type: 'varchar', length: 10000, nullable: false })
  public imagen: string;

  public constructor(id: number, nombre: string, alias: string, rol: string, dificultad: string, historia: string, imagen: string) {
    this.id = id;
    this.nombre = nombre;
    this.alias = alias;
    this.rol = rol;
    this.dificultad = dificultad;
    this.historia = historia;
    this.imagen = imagen;
  }
}